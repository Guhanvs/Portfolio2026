# Guhan Vijayakumar — Personal Portfolio

A modern, responsive developer portfolio built with **React**, **Vite**, and **Vanilla CSS**, featuring smooth scroll navigation, glassmorphism design, interactive particle hero, project showcases, certificate displays, and Zoho Catalyst hosting.

## 🚀 Live Demo
- [Live Portfolio on Zoho Catalyst](https://guhan-portfolio-60043079318.development.catalystserverless.in/app/)

---

## 🛠️ Tech Stack
- **Frontend**: React 19, Vite
- **Styling**: Vanilla CSS (Custom Design System, Glassmorphism, Micro-animations)
- **Deployment**: Zoho Catalyst (Serverless Web Client Hosting)
- **Icons & Fonts**: Font Awesome, Google Fonts (Inter, JetBrains Mono)

---

## 📁 Project Structure
```text
PortFolio/
├── catalyst.json            # Zoho Catalyst configuration
├── .catalystrc              # Catalyst project mapping
├── client/
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite configuration
│   ├── package.json         # Dependencies & scripts
│   ├── public/
│   │   ├── client-package.json
│   │   ├── Guhan - Resume.pdf
│   │   └── assets/          # Images, project screenshots & certificates
│   └── src/
│       ├── App.jsx          # Portfolio components & sections
│       ├── App.css          # Design system & styles
│       └── main.jsx         # React application entry
└── README.md
```

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation & Run
1. Clone the repository:
   ```bash
   git clone https://github.com/Guhanvs/Portfolio2026.git
   ```
2. Navigate to the client directory:
   ```bash
   cd Portfolio2026/client
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start development server:
   ```bash
   npm run dev
   ```

### Production Build
```bash
npm run build
```

---

## ☁️ Deployment (Zoho Catalyst)
From the project root:
```bash
catalyst deploy --only client
```
