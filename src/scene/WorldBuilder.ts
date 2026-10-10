import * as THREE from 'three';

export interface InteractiveEntity {
  id: string;
  name: string;
  category: string;
  description: string;
  actionLabel: string;
  actionTarget: string; // anchor id to scroll to or trigger
  mesh: THREE.Object3D;
  isPaused: boolean;
  isHovered: boolean;
  update: (delta: number, elapsed: number) => void;
  togglePause: () => boolean;
}

export class WorldBuilder {
  public entities: Map<string, InteractiveEntity> = new Map();
  public interactiveMeshes: THREE.Object3D[] = [];

  // Curve path for the autonomous cruiser car
  public roadCurve!: THREE.CatmullRomCurve3;

  constructor(private scene: THREE.Scene) {}

  public buildWorld(): void {
    this.createFloatingIsland();
    this.createDataParticles();
    this.createRoadway();
    this.createCyberCar();
    this.createRetroCRT();
    this.createReactToken();
    this.createMongoVault();
    this.createNeuralSatellite();
    this.createSkyBirds();
  }

  private registerEntity(entity: InteractiveEntity): void {
    this.entities.set(entity.id, entity);
    entity.mesh.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.userData.entityId = entity.id;
        this.interactiveMeshes.push(child);
      }
    });
  }

  private createFloatingIsland(): void {
    const islandGroup = new THREE.Group();

    // Central floating tech platform
    const platformGeo = new THREE.CylinderGeometry(14, 11, 1.2, 32);
    const platformMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.4,
      metalness: 0.8
    });
    const platform = new THREE.Mesh(platformGeo, platformMat);
    platform.position.y = -0.6;
    islandGroup.add(platform);

    // Glowing cyan cyber rim
    const rimGeo = new THREE.TorusGeometry(14, 0.15, 16, 64);
    const rimMat = new THREE.MeshBasicMaterial({ color: 0x00f2fe });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = 0.05;
    islandGroup.add(rim);

    // Inner grid plane
    const gridHelper = new THREE.GridHelper(24, 24, 0x38bdf8, 0x1e293b);
    gridHelper.position.y = 0.08;
    islandGroup.add(gridHelper);

    // Under-platform energy core
    const coreGeo = new THREE.ConeGeometry(8, 6, 16);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      roughness: 0.6,
      metalness: 0.9,
      emissive: 0x4338ca,
      emissiveIntensity: 0.4
    });
    const bottomCone = new THREE.Mesh(coreGeo, coreMat);
    bottomCone.rotation.x = Math.PI;
    bottomCone.position.y = -4.2;
    islandGroup.add(bottomCone);

    this.scene.add(islandGroup);
  }

  private createDataParticles(): void {
    const particleCount = 280;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0x38bdf8);
    const color2 = new THREE.Color(0x818cf8);
    const color3 = new THREE.Color(0x34d399);

    for (let i = 0; i < particleCount; i++) {
      const radius = 8 + Math.random() * 22;
      const theta = Math.random() * Math.PI * 2;
      const y = -6 + Math.random() * 24;

      positions[i * 3] = Math.cos(theta) * radius;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = Math.sin(theta) * radius;

      const pickColor = Math.random() > 0.6 ? color1 : Math.random() > 0.5 ? color2 : color3;
      colors[i * 3] = pickColor.r;
      colors[i * 3 + 1] = pickColor.g;
      colors[i * 3 + 2] = pickColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.85
    });

    const particles = new THREE.Points(geometry, material);
    particles.userData = {
      isAmbientParticles: true,
      update: (_delta: number, elapsed: number) => {
        particles.rotation.y = elapsed * 0.03;
      }
    };
    this.scene.add(particles);
  }

  private createRoadway(): void {
    // Generate curved closed loop around the island
    const points = [
      new THREE.Vector3(10, 0.15, 0),
      new THREE.Vector3(7, 0.15, 7.5),
      new THREE.Vector3(0, 0.15, 9.8),
      new THREE.Vector3(-7.5, 0.15, 7),
      new THREE.Vector3(-10.5, 0.15, 0),
      new THREE.Vector3(-7, 0.15, -7.5),
      new THREE.Vector3(0, 0.15, -9.5),
      new THREE.Vector3(7.5, 0.15, -7)
    ];

    this.roadCurve = new THREE.CatmullRomCurve3(points, true);

    // Glowing track line
    const tubeGeo = new THREE.TubeGeometry(this.roadCurve, 128, 0.08, 8, true);
    const tubeMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 });
    const trackMesh = new THREE.Mesh(tubeGeo, tubeMat);
    this.scene.add(trackMesh);
  }

  private createCyberCar(): void {
    const carGroup = new THREE.Group();

    // Body
    const bodyGeo = new THREE.BoxGeometry(1.4, 0.4, 0.7);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.3,
      metalness: 0.9,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.25
    });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 0.3;
    carGroup.add(body);

    // Cabin
    const cabinGeo = new THREE.BoxGeometry(0.7, 0.35, 0.55);
    const cabinMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.1,
      metalness: 0.5,
      transparent: true,
      opacity: 0.9
    });
    const cabin = new THREE.Mesh(cabinGeo, cabinMat);
    cabin.position.set(-0.1, 0.6, 0);
    carGroup.add(cabin);

    // Headlights (beaming forward +X)
    const lightGeo = new THREE.SphereGeometry(0.09, 8, 8);
    const lightMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const leftLight = new THREE.Mesh(lightGeo, lightMat);
    leftLight.position.set(0.7, 0.3, 0.22);
    const rightLight = new THREE.Mesh(lightGeo, lightMat);
    rightLight.position.set(0.7, 0.3, -0.22);
    carGroup.add(leftLight, rightLight);

    // Brake strip
    const brakeGeo = new THREE.BoxGeometry(0.05, 0.1, 0.5);
    const brakeMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
    const brake = new THREE.Mesh(brakeGeo, brakeMat);
    brake.position.set(-0.7, 0.3, 0);
    carGroup.add(brake);

    // 4 Wheels
    const wheelGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 12);
    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.8 });
    const wheelPositions = [
      [0.45, 0.18, 0.35],
      [0.45, 0.18, -0.35],
      [-0.45, 0.18, 0.35],
      [-0.45, 0.18, -0.35]
    ];
    wheelPositions.forEach(([x, y, z]) => {
      const wheel = new THREE.Mesh(wheelGeo, wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(x, y, z);
      carGroup.add(wheel);
    });

    let progress = 0;
    const speed = 0.05;

    const entity: InteractiveEntity = {
      id: 'cyber_car',
      name: 'Autonomous Cyber Cruiser',
      category: 'Miniature Vehicle',
      description: 'Procedural vehicle traversing closed spline loops. Represents continuous event loop dispatch and automated testing pipelines.',
      actionLabel: 'Inspect Projects',
      actionTarget: '#projects',
      mesh: carGroup,
      isPaused: false,
      isHovered: false,
      togglePause() {
        this.isPaused = !this.isPaused;
        return this.isPaused;
      },
      update: (delta: number) => {
        if (!entity.isPaused) {
          progress = (progress + speed * delta) % 1;
        }

        const point = this.roadCurve.getPointAt(progress);
        const tangent = this.roadCurve.getTangentAt(progress);

        carGroup.position.copy(point);
        const lookTarget = point.clone().add(tangent);
        carGroup.lookAt(lookTarget);

        if (entity.isHovered) {
          bodyMat.emissiveIntensity = 0.7;
        } else {
          bodyMat.emissiveIntensity = 0.25;
        }
      }
    };

    this.scene.add(carGroup);
    this.registerEntity(entity);
  }

  private createRetroCRT(): void {
    const crtGroup = new THREE.Group();
    crtGroup.position.set(0, 0, 0);

    // Monitor casing
    const caseGeo = new THREE.BoxGeometry(3.2, 2.5, 2.2);
    const caseMat = new THREE.MeshStandardMaterial({
      color: 0x1e2230,
      roughness: 0.5,
      metalness: 0.3
    });
    const casing = new THREE.Mesh(caseGeo, caseMat);
    casing.position.y = 2.4;
    crtGroup.add(casing);

    // Monitor bezel
    const bezelGeo = new THREE.BoxGeometry(2.8, 2.0, 0.2);
    const bezelMat = new THREE.MeshStandardMaterial({ color: 0x0b0f19, roughness: 0.7 });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    bezel.position.set(0, 2.4, 1.05);
    crtGroup.add(bezel);

    // Screen with dynamic canvas texture
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 384;
    const ctx = screenCanvas.getContext('2d')!;

    const drawScreen = (time: number) => {
      ctx.fillStyle = '#06131c';
      ctx.fillRect(0, 0, 512, 384);

      // Header bar
      ctx.fillStyle = '#0f3147';
      ctx.fillRect(0, 0, 512, 40);
      ctx.fillStyle = '#38bdf8';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('ZUN_OS v2026 // WORKSTATION', 20, 28);

      // Terminal lines
      ctx.fillStyle = '#4ade80';
      ctx.font = '18px monospace';
      ctx.fillText('> SYSTEM: INITIALIZED', 24, 80);
      ctx.fillText('> DEVELOPER: SK ZUNIAD AHAMMAD', 24, 115);
      ctx.fillText('> STATUS: RGUKT CSE (CGPA 8.5)', 24, 150);
      ctx.fillText('> STACK: REACT • NODE • DJANGO • ML', 24, 185);
      ctx.fillText('> RUNNING EVENT LOOPS... OK', 24, 220);

      // Blinking cursor
      if (Math.floor(time * 2) % 2 === 0) {
        ctx.fillStyle = '#38bdf8';
        ctx.fillRect(24, 250, 14, 22);
      }

      // Scanlines on canvas
      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      for (let y = 0; y < 384; y += 4) {
        ctx.fillRect(0, y, 512, 2);
      }
    };

    drawScreen(0);
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screenGeo = new THREE.PlaneGeometry(2.5, 1.8);
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 2.4, 1.16);
    crtGroup.add(screenMesh);

    // Pedestal stand
    const standGeo = new THREE.CylinderGeometry(0.8, 1.1, 0.8, 16);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x161c2e, roughness: 0.6 });
    const stand = new THREE.Mesh(standGeo, standMat);
    stand.position.y = 0.7;
    crtGroup.add(stand);

    // Keyboard deck
    const keyGeo = new THREE.BoxGeometry(2.6, 0.15, 1.2);
    const keyMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 });
    const keyboard = new THREE.Mesh(keyGeo, keyMat);
    keyboard.position.set(0, 0.15, 2.0);
    keyboard.rotation.x = 0.1;
    crtGroup.add(keyboard);

    let lastDraw = 0;

    const entity: InteractiveEntity = {
      id: 'crt_terminal',
      name: 'Retro CRT Workstation',
      category: 'Developer Console',
      description: 'Vintage 1980s computer monitor running ZUN_OS. Shows live developer stats and launches the interactive terminal emulator.',
      actionLabel: 'Open Interactive Terminal',
      actionTarget: '#terminal-section',
      mesh: crtGroup,
      isPaused: false,
      isHovered: false,
      togglePause() {
        this.isPaused = !this.isPaused;
        return this.isPaused;
      },
      update: (_delta: number, elapsed: number) => {
        if (!entity.isPaused) {
          crtGroup.position.y = Math.sin(elapsed * 1.5) * 0.1;
          crtGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.08;
        }

        if (elapsed - lastDraw > 0.4) {
          drawScreen(elapsed);
          screenTexture.needsUpdate = true;
          lastDraw = elapsed;
        }

        if (entity.isHovered) {
          casing.scale.set(1.03, 1.03, 1.03);
        } else {
          casing.scale.set(1, 1, 1);
        }
      }
    };

    this.scene.add(crtGroup);
    this.registerEntity(entity);
  }

  private createReactToken(): void {
    const tokenGroup = new THREE.Group();
    tokenGroup.position.set(-6, 3.5, 3.5);

    // Center nucleus
    const coreGeo = new THREE.SphereGeometry(0.65, 24, 24);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f2fe,
      emissive: 0x00f2fe,
      emissiveIntensity: 0.6,
      roughness: 0.2
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    tokenGroup.add(core);

    // 3 Orbiting rings
    const ringGeo = new THREE.TorusGeometry(1.6, 0.05, 12, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4
    });

    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    const ring2 = new THREE.Mesh(ringGeo, ringMat);
    ring2.rotation.x = Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    const ring3 = new THREE.Mesh(ringGeo, ringMat);
    ring3.rotation.x = -Math.PI / 3;
    ring3.rotation.y = -Math.PI / 6;

    tokenGroup.add(ring1, ring2, ring3);

    const entity: InteractiveEntity = {
      id: 'react_token',
      name: 'React Ecosystem Orb',
      category: 'Frontend Core',
      description: 'Atomic component runtime with reactive state loops. Powered Medical Management & Web Chat client interfaces.',
      actionLabel: 'View Frontend Skills',
      actionTarget: '#skills',
      mesh: tokenGroup,
      isPaused: false,
      isHovered: false,
      togglePause() {
        this.isPaused = !this.isPaused;
        return this.isPaused;
      },
      update: (delta: number, elapsed: number) => {
        if (!entity.isPaused) {
          tokenGroup.position.y = 3.5 + Math.sin(elapsed * 2) * 0.25;
          ring1.rotation.z += delta * 1.5;
          ring2.rotation.z += delta * 1.2;
          ring3.rotation.z += delta * 0.9;
        }

        if (entity.isHovered) {
          coreMat.emissiveIntensity = 1.0;
        } else {
          coreMat.emissiveIntensity = 0.6;
        }
      }
    };

    this.scene.add(tokenGroup);
    this.registerEntity(entity);
  }

  private createMongoVault(): void {
    const mongoGroup = new THREE.Group();
    mongoGroup.position.set(6.5, 3.2, -3.5);

    // Cylinder stack
    const diskCount = 3;
    const disks: THREE.Mesh[] = [];
    const diskGeo = new THREE.CylinderGeometry(0.9, 0.9, 0.35, 24);
    const diskMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.3
    });

    for (let i = 0; i < diskCount; i++) {
      const disk = new THREE.Mesh(diskGeo, diskMat);
      disk.position.y = (i - 1) * 0.48;
      mongoGroup.add(disk);
      disks.push(disk);

      // Glowing green data ring
      const ringGeo = new THREE.TorusGeometry(0.92, 0.04, 8, 32);
      const ringMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2;
      ring.position.y = (i - 1) * 0.48;
      mongoGroup.add(ring);
    }

    const entity: InteractiveEntity = {
      id: 'mongo_vault',
      name: 'MongoDB Document Vault',
      category: 'Data Persistence',
      description: 'Distributed NoSQL cluster modeling appointments, chat message threads, and user authentication sessions.',
      actionLabel: 'Inspect Database Architecture',
      actionTarget: '#skills',
      mesh: mongoGroup,
      isPaused: false,
      isHovered: false,
      togglePause() {
        this.isPaused = !this.isPaused;
        return this.isPaused;
      },
      update: (delta: number, elapsed: number) => {
        if (!entity.isPaused) {
          mongoGroup.rotation.y += delta * 0.8;
          mongoGroup.position.y = 3.2 + Math.cos(elapsed * 1.8) * 0.2;
        }

        if (entity.isHovered) {
          mongoGroup.scale.set(1.08, 1.08, 1.08);
        } else {
          mongoGroup.scale.set(1, 1, 1);
        }
      }
    };

    this.scene.add(mongoGroup);
    this.registerEntity(entity);
  }

  private createNeuralSatellite(): void {
    const satGroup = new THREE.Group();
    satGroup.position.set(-4.5, 6.5, -5.5);

    // Main octagonal bus
    const busGeo = new THREE.CylinderGeometry(0.6, 0.6, 0.9, 8);
    const busMat = new THREE.MeshStandardMaterial({
      color: 0x1e1b4b,
      metalness: 0.9,
      roughness: 0.2,
      emissive: 0x6366f1,
      emissiveIntensity: 0.3
    });
    const bus = new THREE.Mesh(busGeo, busMat);
    satGroup.add(bus);

    // Solar panels
    const panelGeo = new THREE.BoxGeometry(1.6, 0.04, 0.6);
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0369a1,
      emissiveIntensity: 0.2
    });
    const leftPanel = new THREE.Mesh(panelGeo, panelMat);
    leftPanel.position.set(-1.1, 0, 0);
    const rightPanel = new THREE.Mesh(panelGeo, panelMat);
    rightPanel.position.set(1.1, 0, 0);
    satGroup.add(leftPanel, rightPanel);

    // Antenna dish
    const dishGeo = new THREE.ConeGeometry(0.35, 0.25, 12, 1, true);
    const dishMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 });
    const dish = new THREE.Mesh(dishGeo, dishMat);
    dish.rotation.x = Math.PI;
    dish.position.y = 0.6;
    satGroup.add(dish);

    const entity: InteractiveEntity = {
      id: 'ai_satellite',
      name: 'Neural AI Satellite',
      category: 'Machine Learning',
      description: 'Autonomous predictive node running scikit-learn, XGBoost, and TensorFlow deep learning (MLPs/LSTMs) for health risk forecasting.',
      actionLabel: 'View Health Risk AI Project',
      actionTarget: '#projects',
      mesh: satGroup,
      isPaused: false,
      isHovered: false,
      togglePause() {
        this.isPaused = !this.isPaused;
        return this.isPaused;
      },
      update: (delta: number, elapsed: number) => {
        if (!entity.isPaused) {
          satGroup.rotation.y += delta * 0.6;
          satGroup.rotation.z = Math.sin(elapsed * 0.8) * 0.15;
          satGroup.position.y = 6.5 + Math.sin(elapsed * 1.4) * 0.3;
        }

        if (entity.isHovered) {
          busMat.emissiveIntensity = 0.8;
        } else {
          busMat.emissiveIntensity = 0.3;
        }
      }
    };

    this.scene.add(satGroup);
    this.registerEntity(entity);
  }

  private createSkyBirds(): void {
    const makeBird = (id: string, initialAngle: number, radius: number, baseHeight: number, speed: number) => {
      const birdGroup = new THREE.Group();

      // Fuselage / body
      const bodyGeo = new THREE.ConeGeometry(0.18, 0.7, 6);
      const bodyMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.3 });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.rotation.x = Math.PI / 2;
      birdGroup.add(body);

      // Wings
      const wingShape = new THREE.Shape();
      wingShape.moveTo(0, 0);
      wingShape.lineTo(0.7, 0.2);
      wingShape.lineTo(0.3, 0.5);
      wingShape.closePath();

      const wingGeo = new THREE.ShapeGeometry(wingShape);
      const wingMat = new THREE.MeshStandardMaterial({ color: 0x818cf8, side: THREE.DoubleSide });

      const leftWing = new THREE.Mesh(wingGeo, wingMat);
      leftWing.position.set(0.1, 0, 0);
      const rightWing = new THREE.Mesh(wingGeo, wingMat);
      rightWing.rotation.y = Math.PI;
      rightWing.position.set(-0.1, 0, 0);

      birdGroup.add(leftWing, rightWing);

      let angle = initialAngle;

      const entity: InteractiveEntity = {
        id,
        name: id === 'sky_bird_1' ? 'Digital Swift Scout (Alpha)' : 'Digital Swift Scout (Beta)',
        category: 'Telemetry Scout',
        description: 'Aerodynamic low-poly observer monitoring cloud metrics, network latency, and continuous integration health.',
        actionLabel: 'View Experience Timeline',
        actionTarget: '#experience',
        mesh: birdGroup,
        isPaused: false,
        isHovered: false,
        togglePause() {
          this.isPaused = !this.isPaused;
          return this.isPaused;
        },
        update: (delta: number, elapsed: number) => {
          if (!entity.isPaused) {
            angle += speed * delta;
          }

          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const y = baseHeight + Math.sin(angle * 2) * 1.2;

          birdGroup.position.set(x, y, z);

          // Bank and orient along tangential velocity
          const nextAngle = angle + 0.05;
          const lookX = Math.cos(nextAngle) * radius;
          const lookZ = Math.sin(nextAngle) * radius;
          birdGroup.lookAt(lookX, y, lookZ);

          // Wing flapping
          const flap = Math.sin(elapsed * 12) * 0.45;
          leftWing.rotation.z = flap;
          rightWing.rotation.z = -flap;

          if (entity.isHovered) {
            bodyMat.color.setHex(0x00f2fe);
          } else {
            bodyMat.color.setHex(0x38bdf8);
          }
        }
      };

      this.scene.add(birdGroup);
      this.registerEntity(entity);
    };

    makeBird('sky_bird_1', 0, 11, 7.5, 0.4);
    makeBird('sky_bird_2', Math.PI, 13, 8.8, 0.32);
  }
}
