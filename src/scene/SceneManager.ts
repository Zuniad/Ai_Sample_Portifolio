import * as THREE from 'three';
import { WorldBuilder, InteractiveEntity } from './WorldBuilder';

export interface SceneCallbacks {
  onEntityHover?: (entity: InteractiveEntity | null, mouseEvent?: { clientX: number; clientY: number }) => void;
  onEntitySelect?: (entity: InteractiveEntity) => void;
  onGlobalPauseChange?: (isPaused: boolean) => void;
}

export class SceneManager {
  private container: HTMLElement;
  private canvas: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private clock: THREE.Clock;
  private worldBuilder!: WorldBuilder;

  private isRunning: boolean = true;
  private isGlobalPaused: boolean = false;
  private animationFrameId: number | null = null;

  // Raycasting & Interaction
  private raycaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2(-1000, -1000);
  private hoveredEntity: InteractiveEntity | null = null;
  private pointerDownPos = { x: 0, y: 0 };
  private pointerDownTime = 0;
  private isPointerDown = false;
  private dragThreshold = 6; // px to differentiate click from drag

  // Camera parallax
  private targetCameraPos = new THREE.Vector3(0, 12, 28);
  private defaultCameraPos = new THREE.Vector3(0, 12, 28);
  private cameraLookTarget = new THREE.Vector3(0, 1.5, 0);

  private callbacks: SceneCallbacks;

  constructor(container: HTMLElement, callbacks: SceneCallbacks = {}) {
    this.container = container;
    this.callbacks = callbacks;
    this.clock = new THREE.Clock();

    this.canvas = document.createElement('canvas');
    this.canvas.className = 'w-full h-full block select-none outline-none';
    this.canvas.setAttribute('aria-label', 'Interactive 3D Digital World with pausable miniature vehicles, birds, and computing stations');
    this.container.appendChild(this.canvas);

    this.init();
  }

  private isWebGLAvailable(): boolean {
    try {
      const testCanvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl')));
    } catch {
      return false;
    }
  }

  private init(): void {
    if (!this.isWebGLAvailable()) {
      console.warn('WebGL not supported on this device. Displaying fallback.');
      this.renderFallback();
      return;
    }

    // 1. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.renderer.setPixelRatio(dpr);
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;

    // 2. Scene & Fog
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x070a14, 0.018);

    // 3. Camera
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(42, aspect, 0.1, 100);
    this.camera.position.copy(this.targetCameraPos);
    this.camera.lookAt(this.cameraLookTarget);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.4);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.6);
    keyLight.position.set(16, 26, 20);
    this.scene.add(keyLight);

    const cyanRim = new THREE.PointLight(0x00f2fe, 2.2, 45);
    cyanRim.position.set(0, 3, 0);
    this.scene.add(cyanRim);

    const violetFill = new THREE.DirectionalLight(0x818cf8, 0.9);
    violetFill.position.set(-20, 10, -18);
    this.scene.add(violetFill);

    // 5. Build World
    this.worldBuilder = new WorldBuilder(this.scene);
    this.worldBuilder.buildWorld();

    // 6. Listeners
    this.setupEventListeners();

    // 7. Start render loop
    this.animate();
  }

  private renderFallback(): void {
    const fallback = document.createElement('div');
    fallback.className = 'w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-300';
    fallback.innerHTML = `
      <div class="p-8 max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div class="text-38bdf8 text-xl font-bold mb-2">ZUN // DIGITAL PLAYGROUND</div>
        <p class="text-sm text-slate-400 mb-4">Hardware WebGL acceleration is currently in standard 2D mode. All portfolio projects, skills, and terminal interactions remain fully accessible below.</p>
        <a href="#projects" class="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-cyan-400 rounded-lg hover:bg-cyan-300 transition-colors">
          Explore Projects
        </a>
      </div>
    `;
    this.container.appendChild(fallback);
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', this.onResize);

    this.canvas.addEventListener('pointerdown', this.onPointerDown);
    this.canvas.addEventListener('pointermove', this.onPointerMove);
    this.canvas.addEventListener('pointerup', this.onPointerUp);
    this.canvas.addEventListener('pointerleave', this.onPointerLeave);

    // Context loss safeguards
    this.canvas.addEventListener('webglcontextlost', (e) => {
      e.preventDefault();
      console.warn('WebGL context lost.');
      if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    });

    this.canvas.addEventListener('webglcontextrestored', () => {
      console.log('WebGL context restored.');
      this.init();
    });
  }

  private onResize = (): void => {
    if (!this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };

  private onPointerDown = (e: PointerEvent): void => {
    this.isPointerDown = true;
    this.pointerDownPos = { x: e.clientX, y: e.clientY };
    this.pointerDownTime = performance.now();
  };

  private onPointerMove = (e: PointerEvent): void => {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    // Camera subtle mouse parallax if not dragging
    if (!this.isPointerDown) {
      const offsetX = (this.mouse.x * 2.5);
      const offsetY = -(this.mouse.y * 1.5);
      this.camera.position.x += (this.defaultCameraPos.x + offsetX - this.camera.position.x) * 0.05;
      this.camera.position.y += (this.defaultCameraPos.y + offsetY - this.camera.position.y) * 0.05;
    }

    // Raycast hover check
    this.checkHover(e.clientX, e.clientY);
  };

  private checkHover(clientX: number, clientY: number): void {
    if (!this.worldBuilder) return;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.worldBuilder.interactiveMeshes, true);

    let nextHoveredEntity: InteractiveEntity | null = null;

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      let target: THREE.Object3D | null = hit;
      while (target && !target.userData.entityId) {
        target = target.parent;
      }
      if (target && target.userData.entityId) {
        nextHoveredEntity = this.worldBuilder.entities.get(target.userData.entityId) || null;
      }
    }

    if (nextHoveredEntity !== this.hoveredEntity) {
      if (this.hoveredEntity) this.hoveredEntity.isHovered = false;
      if (nextHoveredEntity) nextHoveredEntity.isHovered = true;
      this.hoveredEntity = nextHoveredEntity;

      this.canvas.style.cursor = nextHoveredEntity ? 'pointer' : 'default';
      this.callbacks.onEntityHover?.(nextHoveredEntity, { clientX, clientY });
    }
  }

  private onPointerUp = (e: PointerEvent): void => {
    this.isPointerDown = false;
    const deltaX = Math.abs(e.clientX - this.pointerDownPos.x);
    const deltaY = Math.abs(e.clientY - this.pointerDownPos.y);

    // If movement exceeded threshold, user was dragging/panning camera
    if (deltaX > this.dragThreshold || deltaY > this.dragThreshold) {
      return;
    }

    // Process genuine click/tap on interactive entity
    if (this.hoveredEntity) {
      // Toggle individual paused status on click!
      const isNowPaused = this.hoveredEntity.togglePause();
      this.callbacks.onEntitySelect?.(this.hoveredEntity);
      console.log(`Entity [${this.hoveredEntity.name}] paused: ${isNowPaused}`);
    }
  };

  private onPointerLeave = (): void => {
    this.mouse.set(-1000, -1000);
    if (this.hoveredEntity) {
      this.hoveredEntity.isHovered = false;
      this.hoveredEntity = null;
      this.callbacks.onEntityHover?.(null);
    }
    this.canvas.style.cursor = 'default';
  };

  public getEntities(): InteractiveEntity[] {
    return this.worldBuilder ? Array.from(this.worldBuilder.entities.values()) : [];
  }

  public getEntity(id: string): InteractiveEntity | undefined {
    return this.worldBuilder?.entities.get(id);
  }

  public toggleEntityPause(id: string): boolean {
    const entity = this.getEntity(id);
    if (entity) {
      return entity.togglePause();
    }
    return false;
  }

  public toggleGlobalPause(): boolean {
    this.isGlobalPaused = !this.isGlobalPaused;
    this.callbacks.onGlobalPauseChange?.(this.isGlobalPaused);
    return this.isGlobalPaused;
  }

  public isPaused(): boolean {
    return this.isGlobalPaused;
  }

  public setCameraPreset(preset: 'isometric' | 'frontal' | 'top'): void {
    if (preset === 'isometric') {
      this.defaultCameraPos.set(16, 14, 22);
    } else if (preset === 'frontal') {
      this.defaultCameraPos.set(0, 10, 26);
    } else if (preset === 'top') {
      this.defaultCameraPos.set(0, 24, 6);
    }
  }

  private animate = (): void => {
    if (!this.isRunning) return;

    const delta = Math.min(this.clock.getDelta(), 0.1);
    const elapsed = this.clock.getElapsedTime();

    // Smooth camera lerp
    this.camera.position.lerp(this.defaultCameraPos, 0.04);
    this.camera.lookAt(this.cameraLookTarget);

    // Update entities if global motion not frozen
    if (!this.isGlobalPaused && this.worldBuilder) {
      this.worldBuilder.entities.forEach((entity) => {
        entity.update(delta, elapsed);
      });

      // Ambient particle motion
      this.scene.children.forEach((child) => {
        if (child.userData?.update) {
          child.userData.update(delta, elapsed);
        }
      });
    }

    this.renderer.render(this.scene, this.camera);
    this.animationFrameId = requestAnimationFrame(this.animate);
  };

  public dispose(): void {
    this.isRunning = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    window.removeEventListener('resize', this.onResize);
    this.renderer?.dispose();
    this.canvas.remove();
  }
}
