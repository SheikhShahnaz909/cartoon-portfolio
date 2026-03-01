export const EPISODES = {
  hero: {
    num: "EP.01",
    label: "Morning",
    pose: "excited",
    anim: "wave",
    lines: [
      "Hi there! 👋 Welcome to my portfolio!",
      "I just woke up and I'm ready to code! ☕",
      "Scroll down to see my daily adventure! 🌸",
    ],
  },
  about: {
    num: "EP.02",
    label: "Meet Me",
    pose: "calm",
    anim: "bounce",
    lines: [
      "Let me introduce myself! 🌸",
      "I love pink, coffee & clean code ☕",
      "Fun fact: I debug with vibes ✨",
    ],
  },
  skills: {
    num: "EP.03",
    label: "Training Arc",
    pose: "thinking",
    anim: "bounce",
    lines: [
      "Time for my training arc! 💪",
      "I've been levelling up every day 📈",
      "React is my special power ⚛️✨",
    ],
  },
  projects: {
    num: "EP.04",
    label: "Shipping Day",
    pose: "working",
    anim: "bounce",
    lines: [
      "Shipping time — my fave! 🚀",
      "Every project here was made with love 💗",
      "Click around — I'm proud of these! 🌸",
    ],
  },
  contact: {
    num: "EP.05",
    label: "Connect",
    pose: "excited",
    anim: "wave",
    lines: [
      "Season finale! 🎉 Let's talk!",
      "I promise I respond fast 💌",
      "Don't be shy — say hi! 🌸",
    ],
  },
};

export const SKILLS = [
  { icon: "⚛️", name: "React.js",       pct: 80, tags: ["Hooks", "Context API", "Router"] },
  { icon: "💛", name: "JavaScript",     pct: 75, tags: ["ES6+", "Async/Await", "DOM"] },
  { icon: "🎨", name: "CSS / Tailwind", pct: 85, tags: ["Flexbox", "Grid", "Animations"] },
  { icon: "✨", name: "Framer Motion",  pct: 70, tags: ["Variants", "Scroll", "Gestures"] },
  { icon: "🌐", name: "HTML5",          pct: 90, tags: ["Semantic", "A11y", "SEO"] },
  { icon: "🛠️", name: "Git & Vite",    pct: 65, tags: ["GitHub", "Vite", "npm"] },
];

export const PROJECTS = [
  {
    emoji: "🌸",
    bg: "linear-gradient(135deg,#fce7f3,#f3e8ff)",
    title: "Cartoon Portfolio",
    desc: "This very site — soft, animated, story-driven layout with a cute character companion.",
    stack: ["React", "Tailwind", "Framer Motion"],
    demo: "#",
    repo: "https://github.com/SheikhShahnaz909/cartoon-portfolio",
  },
  {
    emoji: "📊",
    bg: "linear-gradient(135deg,#fdf4ff,#ede9fe)",
    title: "React Dashboard",
    desc: "Clean admin dashboard with charts, data tables, and fully responsive layout.",
    stack: ["React", "Chart.js", "CSS Grid"],
    demo: "#",
    repo: "#",
  },
  {
    emoji: "🎨",
    bg: "linear-gradient(135deg,#fff0f7,#fce7f3)",
    title: "UI Component Library",
    desc: "Reusable, accessible components with a consistent dreamy design system.",
    stack: ["React", "Tailwind", "Storybook"],
    demo: "#",
    repo: "#",
  },
  {
    emoji: "🌿",
    bg: "linear-gradient(135deg,#f0fdf4,#dcfce7)",
    title: "Landing Page Design",
    desc: "Responsive animated landing page with smooth scroll and polished CTA flow.",
    stack: ["HTML5", "CSS3", "JavaScript"],
    demo: "#",
    repo: "#",
  },
  {
    emoji: "⭐",
    bg: "linear-gradient(135deg,#fef9c3,#fef3c7)",
    title: "Todo App (Animated)",
    desc: "Drag-and-drop todo app with local storage and Framer Motion list animations.",
    stack: ["React", "Framer Motion", "Hooks"],
    demo: "#",
    repo: "#",
  },
];

export const CONTACT_LINKS = [
  { icon: "📧", label: "Email",      value: "shahnaz@email.com",  href: "mailto:shahnaz@email.com" },
  { icon: "🐱", label: "GitHub",     value: "SheikhShahnaz909",   href: "https://github.com/SheikhShahnaz909" },
  { icon: "💼", label: "LinkedIn",   value: "Shahnaz Sheikh",     href: "#" },
  { icon: "🐦", label: "Twitter / X",value: "@shahnazdev",        href: "#" },
];
