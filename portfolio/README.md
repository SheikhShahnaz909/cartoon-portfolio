<div align="center">

# 🌸 Shahnaz — Portfolio

### *A cartoon anime-style developer portfolio built like a TV show*

![React](https://img.shields.io/badge/React-18-61dafb?style=flat-square&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38bdf8?style=flat-square&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-ff69b4?style=flat-square&logo=framer)
![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat-square&logo=vite)
![EmailJS](https://img.shields.io/badge/EmailJS-integrated-f59e0b?style=flat-square)

> *Every evening she opens her laptop, sips her tea, and transforms into a Frontend Developer on a mission to build beautiful digital worlds.* ☕✨

</div>

---

## 📺 About

This is not your average portfolio. It's structured like an **anime TV series** — each section is an episode, complete with episode headers, a live companion character (Shahnaz herself), a draggable interactive cat named **Oreo**, and a cinematic splash screen intro.

Built with love, chai, and way too many late nights. 🌙

---

## ✨ Features

- 🎬 **Anime Splash Screen** — Episode-style intro with loading bar, floating particles, and a zoom-into-site exit animation
- 📺 **Episode Structure** — Every section is framed as a TV episode with title cards
- 🕐 **Live Clock & Time-aware Greetings** — Hero section greets you differently based on morning / afternoon / evening / night
- 📅 **Dynamic Schedule Card** — Today's tasks change based on time of day
- 🐱 **Oreo the Cat** — Fully draggable, zone-aware interactive cat who reacts to where she's placed on the page
- 👩‍💻 **Companion Character** — Shahnaz's anime character lives in the bottom-right corner with section-aware dialogue, frosted glass speech bubble, and a minimize button
- 💌 **Working Contact Form** — Powered by EmailJS, with validation and a success state
- 🌸 **Floating Emoji Particles** — Ambient 💗 ✨ 🌸 particles floating across the background
- 📱 **Fully Responsive** — Mobile-first layouts, responsive Oreo sizing, hamburger menu
- 🎞️ **Scroll Reveal Animations** — Elements animate in as you scroll through each episode

---

## 📁 Project Structure

```
src/
├── assets/
│   └── cat/                  # Oreo & character pose images
├── components/
│   ├── About.jsx             # EP.02 — Meet the Developer
│   ├── CompanionSimple.jsx   # Fixed anime character with speech bubble
│   ├── Contact.jsx           # EP.05 — Let's Connect (EmailJS form)
│   ├── EpisodeHeader.jsx     # Reusable episode title card
│   ├── Footer.jsx            # Credits / season finale footer
│   ├── Hero.jsx              # EP.01 — The Daily Boot-Up
│   ├── Navbar.jsx            # Sticky nav with episode pill + mobile menu
│   ├── Particles.jsx         # Floating emoji particle system
│   ├── PastelCat.jsx         # 🐱 Oreo — draggable interactive cat
│   ├── Projects.jsx          # EP.04 — Shipping Day
│   ├── Skills.jsx            # EP.03 — The Training Arc
│   └── SplashScreen.jsx      # Anime intro splash with loading bar
├── data/
│   ├── episodes.js           # Episode lines, nav config, projects, skills, contact links
│   └── poses.js              # Character pose image map
├── hooks/
│   ├── useGreeting.js        # Time-of-day greeting hook
│   ├── useReveal.js          # Scroll-triggered reveal animation hook
│   ├── useScrollSection.js   # Active section tracker for navbar
│   └── useSkillBars.js       # Skill bar fill animation hook
├── App.jsx                   # Root — assembles all sections + splash
├── App.css                   # Global styles
├── index.css                 # Base styles / CSS variables
└── main.jsx                  # Vite entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/SheikhShahnaz909/portfolio-cartoon.git
cd portfolio-cartoon

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 🐱 Oreo — The Interactive Cat

Oreo is a white cat with ginger spots who lives on the portfolio. She is fully interactive:

| Interaction | What happens |
|---|---|
| **Drag & drop** | Pick her up and drop her anywhere on the page |
| **Drop on navbar** | She gets curious and comments on the navigation |
| **Drop on Skills** | Star eyes — "So many skills! 🤩" |
| **Drop on Projects** | Excited tail wag — "She shipped all of these!" |
| **Drop on Contact** | Waves paw — "Send her a message! 💌" |
| **Drop near Shahnaz** | Floating hearts — Shahnaz replies with her own bubble |
| **Click / pet** | Purring responses, every 4th pet triggers a wave |
| **Leave idle 30s** | She falls asleep with animated Zzz |
| **Click sleeping Oreo** | She wakes up grumpy 😾 |

---

## 💌 Contact Form Setup

The contact form uses [EmailJS](https://emailjs.com). To configure it with your own account:

1. Create a free account at [emailjs.com](https://emailjs.com)
2. Create an **Email Service** and note the `service_id`
3. Create an **Email Template** and note the `template_id`
4. Get your **Public Key** from Account settings
5. Replace the values in `Contact.jsx`:

```js
await emailjs.send(
  "your_service_id",     // ← replace
  "your_template_id",    // ← replace
  { from_name, from_email, subject, message },
  "your_public_key"      // ← replace
);
```

---

## 🎨 Tech Stack

| Technology | Usage |
|---|---|
| **React 18** | UI framework |
| **Framer Motion** | All animations — splash, reveals, Oreo, particles |
| **Tailwind CSS** | Utility styling |
| **Vite** | Build tool & dev server |
| **EmailJS** | Contact form email delivery |
| **CSS Custom Properties** | Theme variables & global styles |

---

## 📺 Episodes

| Episode | Section | Theme |
|---|---|---|
| EP.01 | Hero | The Daily Boot-Up 🌅 |
| EP.02 | About | Meet the Developer ☕ |
| EP.03 | Skills | The Training Arc ⚡ |
| EP.04 | Projects | Shipping Day 🚀 |
| EP.05 | Contact | Season Finale · Let's Connect 💌 |

---

## 🌸 Author

**Shahnaz** — Frontend Developer & UI Enthusiast

- GitHub: [@SheikhShahnaz909](https://github.com/SheikhShahnaz909)
- LinkedIn: [Sheikh Shahnaz](https://linkedin.com/in/sheikh-shahnaz)
- Email: sheikhshahnaz909@email.com

---

<div align="center">

Designed & built with 💗 by **Shahnaz** · React · Tailwind CSS · Framer Motion · 2026

*Thanks for watching! See you in Season 2.* 📺✨

</div>
