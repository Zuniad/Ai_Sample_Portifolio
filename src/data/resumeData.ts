export interface Project {
  id: string;
  title: string;
  category: string;
  badge: string;
  tagline: string;
  summary: string;
  technologies: string[];
  features: string[];
  architecture: string[];
  impact: string;
  demoAvailable: boolean;
  githubAvailable: boolean;
  themeColor: string;
}

export interface SkillItem {
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend' | 'Databases' | 'Tools & Platforms' | 'AI / Machine Learning';
  level: string;
  description: string;
  projectAssociation?: string;
  iconType: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  highlights?: string[];
}

export interface CertificationItem {
  title: string;
  issuer: string;
  issueDate: string;
  badgeCode: string;
}

export interface ExperienceItem {
  role: string;
  organization: string;
  period: string;
  type: string;
  location: string;
  responsibilities: string[];
}

export const RESUME_DATA = {
  personal: {
    name: 'SK Zuniad Ahammad',
    headline: 'Full-Stack Developer & AI Explorer',
    tagline: 'Building Scalable Web Applications & Intelligent Systems',
    email: 'zuniadahammadshaik31@gmail.com',
    phone: '+91 6305473963',
    location: 'Eluru, Andhra Pradesh, India',
    status: 'Available for Opportunities',
    social: {
      github: 'https://github.com/zuniadahammad',
      linkedin: 'https://linkedin.com/in/zuniad-ahammad',
      twitter: 'https://x.com/zuniad_ahammad'
    },
    summary:
      'Motivated and detail-oriented Full-Stack Developer with hands-on experience in building scalable web applications using React.js, Node.js, and MongoDB. Strong foundation in data structures, RESTful APIs, and performance optimization. Skilled in delivering clean, maintainable code and collaborating in agile environments. Passionate about learning new technologies and solving real-world problems.'
  },

  skills: [
    // Languages
    { name: 'Java', category: 'Languages', level: 'Core', description: 'Object-oriented programming, data structures, and algorithmic foundations.', iconType: 'java' },
    { name: 'Python', category: 'Languages', level: 'Advanced', description: 'Django development, REST APIs, ML/DL pipelines with scikit-learn & TensorFlow.', projectAssociation: 'Smart Health Risk Analyzer & Django Internship', iconType: 'python' },
    { name: 'C', category: 'Languages', level: 'Academic', description: 'Low-level systems programming, memory allocation, and OS principles.', iconType: 'c' },
    { name: 'JavaScript', category: 'Languages', level: 'Proficient', description: 'ES6+ modern asynchronous patterns, event loop mechanics, and DOM orchestration.', iconType: 'javascript' },
    { name: 'TypeScript', category: 'Languages', level: 'Proficient', description: 'Strict type safety, generic interfaces, and enterprise full-stack reliability.', iconType: 'typescript' },
    { name: 'HTML5', category: 'Languages', level: 'Core', description: 'Semantic markup, accessibility landmarks, and SEO best practices.', iconType: 'html5' },
    { name: 'CSS3', category: 'Languages', level: 'Core', description: 'Modern flexbox, grid, keyframe choreographies, and responsive layouts.', iconType: 'css3' },

    // Frontend
    { name: 'React.js', category: 'Frontend', level: 'Advanced', description: 'Component architecture, custom hooks, virtual DOM optimization, and state design.', projectAssociation: 'Medical Management System & Web Chat', iconType: 'react' },
    { name: 'Next.js', category: 'Frontend', level: 'Proficient', description: 'Server-side rendering, static site generation, and file-based routing.', iconType: 'nextjs' },
    { name: 'Tailwind CSS', category: 'Frontend', level: 'Advanced', description: 'Utility-first styling, responsive tokens, fluid typography, and dark mode.', iconType: 'tailwind' },
    { name: 'Bootstrap', category: 'Frontend', level: 'Proficient', description: 'Responsive grid systems, utility components, and rapid UI prototyping.', iconType: 'bootstrap' },

    // Backend
    { name: 'Node.js', category: 'Backend', level: 'Advanced', description: 'Asynchronous event-driven runtime, streams, and performant backend services.', projectAssociation: 'Medical Management & Web Chat Application', iconType: 'nodejs' },
    { name: 'Express.js', category: 'Backend', level: 'Advanced', description: 'Middleware architectures, route controllers, and robust error handlers.', iconType: 'express' },
    { name: 'Django', category: 'Backend', level: 'Proficient', description: 'Python web framework, ORM models, template rendering, and REST endpoints.', projectAssociation: 'AP Skill Development Corporation Internship', iconType: 'django' },
    { name: 'RESTful APIs', category: 'Backend', level: 'Advanced', description: 'Contract-first API design, JWT authentication, and HTTP status handling.', iconType: 'rest' },
    { name: 'Socket.IO', category: 'Backend', level: 'Proficient', description: 'Bidirectional low-latency WebSocket communication and event rooms.', projectAssociation: 'Web Chat Application', iconType: 'socketio' },

    // Databases
    { name: 'MongoDB', category: 'Databases', level: 'Advanced', description: 'NoSQL document schemas, aggregation pipelines, and Mongoose modeling.', projectAssociation: 'Medical Management & Web Chat', iconType: 'mongodb' },
    { name: 'MySQL', category: 'Databases', level: 'Proficient', description: 'Relational database schema normalization, indexing, and complex joins.', iconType: 'mysql' },
    { name: 'PostgreSQL', category: 'Databases', level: 'Proficient', description: 'Advanced relational modeling, ACID transactions, and JSONB queries.', iconType: 'postgresql' },

    // Tools & Platforms
    { name: 'Git', category: 'Tools & Platforms', level: 'Advanced', description: 'Version control branching strategies, rebasing, and clean commit history.', iconType: 'git' },
    { name: 'GitHub', category: 'Tools & Platforms', level: 'Advanced', description: 'Collaboration workflows, pull requests, issue tracking, and actions.', iconType: 'github' },
    { name: 'Zustand', category: 'Tools & Platforms', level: 'Proficient', description: 'Lightweight atomic state management with zero boilerplate.', projectAssociation: 'Web Chat Application', iconType: 'zustand' },
    { name: 'Redux Toolkit', category: 'Tools & Platforms', level: 'Proficient', description: 'Predictable global state container with slices and RTK Query.', iconType: 'redux' },

    // AI & Machine Learning
    { name: 'TensorFlow', category: 'AI / Machine Learning', level: 'Proficient', description: 'Deep learning neural networks (MLPs, LSTMs) for sequence & risk analysis.', projectAssociation: 'Smart Health Risk Analyzer', iconType: 'tensorflow' },
    { name: 'scikit-learn', category: 'AI / Machine Learning', level: 'Advanced', description: 'Supervised classification, regression, model pipelines, and evaluation metrics.', projectAssociation: 'Smart Health Risk Analyzer', iconType: 'scikit' },
    { name: 'XGBoost & LightGBM', category: 'AI / Machine Learning', level: 'Proficient', description: 'Gradient boosted decision trees optimized with Optuna hyperparameter tuning.', projectAssociation: 'Smart Health Risk Analyzer', iconType: 'xgboost' },
    { name: 'SHAP & LIME', category: 'AI / Machine Learning', level: 'Proficient', description: 'Explainable AI (XAI) feature attribution and patient risk interpretability.', projectAssociation: 'Smart Health Risk Analyzer', iconType: 'shap' },
    { name: 'pandas & NumPy', category: 'AI / Machine Learning', level: 'Advanced', description: 'High-performance vector operations, tabular cleaning, and data manipulation.', projectAssociation: 'Smart Health Risk Analyzer', iconType: 'pandas' },
    { name: 'Streamlit & Plotly', category: 'AI / Machine Learning', level: 'Proficient', description: 'Interactive clinical data dashboards and multi-dimensional visualizations.', projectAssociation: 'Smart Health Risk Analyzer', iconType: 'plotly' }
  ] as SkillItem[],

  coursework: [
    'Data Structures & Algorithms',
    'Operating Systems',
    'Database Management Systems (DBMS)',
    'Computer Networks'
  ],

  experience: [
    {
      role: 'Summer Intern - Python & Django Development',
      organization: 'AP Skill Development Corporation',
      period: '05/2025 – 07/2025',
      type: 'Internship',
      location: 'Andhra Pradesh, India',
      responsibilities: [
        'Developed robust backend modules using Django for web-based enterprise applications.',
        'Implemented RESTful APIs and ORM-based data models with optimized query performance.',
        'Collaborated actively in agile sprints and contributed directly to real-world project delivery.',
        'Gained hands-on experience in secure user authentication, session handling, and template rendering.'
      ]
    }
  ] as ExperienceItem[],

  education: [
    {
      degree: 'B.Tech in Computer Science',
      institution: 'Rajiv Gandhi University of Knowledge Technologies, Srikakulam',
      period: '10/2022 – Present',
      cgpa: '8.5 / 10.0',
      highlights: ['Specialized in Computer Science & Engineering', 'Key Coursework: DSA, DBMS, OS, Computer Networks']
    },
    {
      degree: 'Pre-University Course',
      institution: 'Nagarjuna E.M High School',
      period: '01/2021 – 09/2022',
      cgpa: '9.65 / 10.0',
      highlights: ['Mathematics, Physics, Chemistry academic focus', 'Excellence in analytical foundations']
    },
    {
      degree: 'Class X Secondary Education',
      institution: 'Nagarjuna E.M High School',
      period: '06/2019 – 03/2020',
      cgpa: '9.81 / 10.0',
      highlights: ['Top percentile academic achievement', 'Distinction in Science and Mathematics']
    }
  ] as EducationItem[],

  certifications: [
    {
      title: 'Web Development',
      issuer: 'Udemy',
      issueDate: 'Issued Jan 2023',
      badgeCode: 'UDEMY-WEB-2023'
    },
    {
      title: 'Front-End GitHub Foundations',
      issuer: 'GitHub',
      issueDate: 'Issued Mar 2023',
      badgeCode: 'GH-FOUND-2023'
    },
    {
      title: 'Python Programming',
      issuer: 'Udemy',
      issueDate: 'Issued Feb 2023',
      badgeCode: 'UDEMY-PY-2023'
    },
    {
      title: 'Develop Interpersonal Skills',
      issuer: 'IBM',
      issueDate: 'Issued Apr 2023',
      badgeCode: 'IBM-SOFT-2023'
    }
  ] as CertificationItem[],

  projects: [
    {
      id: 'medical-management-system',
      title: 'Medical Management System',
      category: 'Full-Stack Healthcare Web App',
      badge: 'Full-Stack',
      tagline: 'Secure clinical management system with role-based access & patient messaging',
      summary:
        'Developed a full-stack medical management system with secure authentication, built an admin dashboard for doctor management and patient messages, and implemented role-based access control with a responsive UI.',
      technologies: [
        'React.js',
        'React Router',
        'Context API',
        'Axios',
        'Tailwind CSS',
        'Node.js',
        'Express.js',
        'MongoDB',
        'JWT'
      ],
      features: [
        'Secure JWT-based authentication with bcrypt password hashing',
        'Comprehensive admin dashboard for medical staff & doctor schedule oversight',
        'Real-time patient message dispatch and inquiry tracking',
        'Role-based access control (Admin, Doctor, Patient) with route protection',
        'Responsive layout designed for clinical tablets and desktop monitors'
      ],
      architecture: [
        'React SPA with Context API state container and Axios interceptors',
        'Node.js/Express REST server following MVC separation of concerns',
        'MongoDB Mongoose schema with normalized relations for appointments & records',
        'Stateless JWT session authorization with token verification middleware'
      ],
      impact:
        'Streamlines clinical workflow by unifying appointment handling, patient communications, and doctor administration into a single secure portal.',
      demoAvailable: false,
      githubAvailable: false,
      themeColor: '#00f2fe'
    },
    {
      id: 'web-chat-application',
      title: 'Web Chat Application',
      category: 'Real-Time Communication',
      badge: 'Real-Time',
      tagline: 'High-speed messaging with Zustand auth state & Socket.IO bidirectional channels',
      summary:
        'Built secure JWT-based authentication and real-time messaging, managed auth state using Zustand for seamless UX, and enabled live chat functionality across multiple users simultaneously.',
      technologies: [
        'React.js',
        'Tailwind CSS',
        'Zustand',
        'Axios',
        'Node.js',
        'Express.js',
        'MongoDB',
        'Socket.IO'
      ],
      features: [
        'Instant multi-user chat broadcasting via persistent WebSocket rooms',
        'Zustand reactive store for lightning-fast client auth & active user updates',
        'Secure JWT credentials handling with encrypted session tokens',
        'Online presence tracking, typing indicators, and message history storage',
        'Modern dark interface with optimized touch and keyboard message sending'
      ],
      architecture: [
        'Socket.IO client/server event mesh with automatic reconnection fallback',
        'Zustand lightweight atomic state eliminating unnecessary component re-renders',
        'MongoDB message persistence indexed by room and timestamp',
        'Express authentication endpoints protecting message socket handshakes'
      ],
      impact:
        'Delivers responsive, zero-delay communication with frictionless user authentication and persistent conversation logs across sessions.',
      demoAvailable: false,
      githubAvailable: false,
      themeColor: '#818cf8'
    },
    {
      id: 'job-finder-application',
      title: 'Job Finder Application',
      category: 'Full-Stack Talent Matching',
      badge: 'Algorithm',
      tagline: 'Dynamic resume parsing & skill-matching engine with 30% improved relevance',
      summary:
        'Parsed resumes to extract skills and match jobs dynamically, integrated skill-based filtering and responsive job listings, and improved job relevance accuracy by 30% through custom logic.',
      technologies: [
        'Full-Stack Architecture',
        'Resume Parsing Engine',
        'Skill Matching Logic',
        'Responsive UI',
        'REST APIs',
        'Dynamic Filtering'
      ],
      features: [
        'Dynamic resume text parsing to extract technical skills and proficiencies',
        'Custom scoring logic boosting job match relevance by +30% over baseline keyword search',
        'Multi-attribute filtering by technical stack, experience bracket, and job category',
        'Interactive job listing cards with match compatibility breakdown',
        'Real-time search debounce and responsive layout for mobile and desktop'
      ],
      architecture: [
        'Heuristic text extraction tokenizer and normalized taxonomy map',
        'Weighted similarity matching algorithm scoring candidate profiles against openings',
        'Responsive client interface with instantaneous facet filtering',
        'Modular REST API endpoints for candidate ingestion and job catalog indexing'
      ],
      impact:
        'Elevated hiring precision by 30% through semantic skill matching, eliminating generic resume spam and accelerating candidate discovery.',
      demoAvailable: false,
      githubAvailable: false,
      themeColor: '#4ade80'
    },
    {
      id: 'smart-health-risk-analyzer',
      title: 'Smart Health Risk Analyzer & Predictor',
      category: 'Machine Learning & Healthcare AI',
      badge: 'ML & Deep Learning',
      tagline: 'Simultaneous multi-disease screening (heart, diabetes, stroke) via MLPs & LSTMs',
      summary:
        'Multi-disease risk prediction: Simultaneously estimate heart disease, diabetes, and stroke risk using optimized ML/DL models, enabling unified screening and prioritization across conditions. Deep learning integration: MLPs and LSTMs capture complex temporal and non-linear health patterns, complementing classical models for robust performance across diverse patient profiles.',
      technologies: [
        'scikit-learn',
        'XGBoost',
        'LightGBM',
        'TensorFlow',
        'SHAP',
        'LIME',
        'Optuna',
        'pandas',
        'NumPy',
        'Streamlit',
        'Plotly',
        'seaborn',
        'imbalanced-learn',
        'UMAP',
        'joblib'
      ],
      features: [
        'Unified tri-disease estimation engine: Heart disease, Type-2 diabetes, and stroke risk',
        'Ensemble pipeline: Gradient Boosted Trees (XGBoost, LightGBM) + Deep Neural Networks',
        'MLP and LSTM architectures capturing non-linear biological markers and temporal trends',
        'Optuna automated Bayesian hyperparameter search for hyper-tuned decision boundaries',
        'Explainable AI via SHAP values & LIME for transparent clinical risk factor reasoning',
        'Imbalanced-learn SMOTE sampling guaranteeing robust sensitivity on minority risk classes'
      ],
      architecture: [
        'Data preprocessing pipeline using pandas, NumPy, and imbalanced-learn sampling',
        'Model training zoo with cross-validated XGBoost, LightGBM, and TensorFlow MLPs/LSTMs',
        'SHAP TreeExplainer & DeepExplainer producing individualized risk contribution waterfall plots',
        'Streamlit & Plotly interactive diagnostic dashboard with real-time risk sliders'
      ],
      impact:
        'Enables proactive preventative clinical triage by screening multiple chronic risks simultaneously with transparent explainable AI attribution.',
      demoAvailable: false,
      githubAvailable: false,
      themeColor: '#38bdf8'
    }
  ] as Project[]
};
