# PlateStudio 

> An elegant web app for designers and marketing coordinators to visualize product packaging and hardware concepts across multiple physical and digital mediums — with strict visual, color, and thematic cohesion.

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" alt="React 18" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white" alt="Express" />
  <img src="https://img.shields.io/badge/Gemini-2.5_Flash-4285F4?logo=google&logoColor=white" alt="Gemini 2.5" />
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License" />
</p>

Built with **React (Vite)**, **Tailwind CSS**, and **Express**, with real-time prompt calibration powered by the **Google Gen AI SDK** (`gemini-2.5-flash-image`, a.k.a. Nano-Banana).

---

## 📑 Table of Contents

- [Demo](#-demo)
- [Core Features](#-core-features)
- [Architecture Highlights](#-architecture-highlights)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Troubleshooting](#-troubleshooting)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🎬 Demo

> _Add a GIF or screenshot here once available._
>
> ```
> ./docs/preview.gif
> ```

---

## ⚡ Core Features

### Multi-Medium Visual Alignment
Generates synchronized mockups across three standard channels simultaneously, so a single concept is rendered consistently across every surface a marketing team needs:

| Channel | Aspect Ratio | Use Case |
| :--- | :--- | :--- |
| 🪧 Roadside Billboard Display | 16:9 Landscape | Out-of-home advertising |
| 📱 Social Media Feed Post | 1:1 Square | Instagram, LinkedIn, Facebook |
| 📰 Print Newspaper Feature | 4:3 Classic Plate | Editorial and print spreads |

### Two Input Modes
- **Guided Form Mode** — A multi-step configurator covering product dimensions, industry vertical, and physical surface descriptions. Great for structured briefs.
- **Freeform Open-Ended Mode** — Unlimited conceptual typing. Describe devices (advanced gamepads, wearables, audio equipment, anything) with complete artistic freedom.

### Dynamic Diagnostics & Fallbacks
A highly interactive SVG controller and vector blueprint render engine displays exact conceptual alignments when API quota limits or safety filters are triggered — the app never shows a broken state.

### Interactive Technical Inspector
Clickable overlays reveal raw JSON API error logs, prompt variables, and runtime configuration — useful during prompt engineering and debugging.

---

## 🏗️ Architecture Highlights

1. **Zero-Flicker Full-Stack Proxy** — All API requests are routed through the Node/Express backend (`server.ts`), keeping your `GEMINI_API_KEY` safe and invisible to browser inspection.
2. **Safe Fallback Vector Engine** — When running without an active key or when quotas are hit, the app renders clean, themed SVGs (custom **Gamepad with OLED cute-eye loops**, **AR Glasses**, **Audio Headphones**, and more) so the UI stays demoable offline.
3. **Single-Command Dev Loop** — `npm run dev` boots both the Express backend and the Vite frontend concurrently, with hot reload on both sides.

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- Lucide Icons
- Framer Motion

**Backend**
- Node.js + Express
- TSX (TypeScript execution)

**Generative AI**
- Official `@google/genai` TypeScript SDK
- Model: `gemini-2.5-flash-image` (Nano-Banana)

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) **v18 or higher**
- A [Gemini API key](https://aistudio.google.com/)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/platestudio.git
cd platestudio
```

### 2. Configure the environment

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

> ⚠️ Never commit `.env` to version control. It is already listed in `.gitignore`.

### 3. Install dependencies

```bash
npm install
```

### 4. Start the dev server

```bash
npm run dev
```

This launches the Express backend and the Vite frontend together. Open **http://localhost:3000** to access the interface.

### Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Start backend + frontend in development mode |
| `npm run build` | Production build of the frontend |
| `npm start` | Run the production server |
| `npm run lint` | Lint the codebase |

---

## 📁 Project Structure

```
platestudio/
├── src/                 # React frontend (components, hooks, styles)
├── server.ts            # Express API proxy
├── public/              # Static assets
├── docs/                # Screenshots, GIFs, design notes
├── .env                 # Local secrets (not committed)
└── package.json
```

---

## 🧯 Troubleshooting

**`GEMINI_API_KEY is undefined`**
Make sure `.env` exists in the project root and that you've restarted `npm run dev` after creating it.

**Port 3000 already in use**
Either stop the conflicting process or set a new port via `PORT=3001 npm run dev`.

**API quota or safety-filter errors**
This is expected behavior under heavy use. The Safe Fallback Vector Engine will take over and render themed SVGs so you can keep demoing the UI.

**Windows-specific install issues**
Run your terminal as Administrator and ensure your Node version is 18+. The TSX runtime requires modern Node internals.

---

## 🗺️ Roadmap

- [ ] Export mockups as a single PDF brief
- [ ] User-uploadable reference images
- [ ] Brand-kit presets (color palette + typography lock)
- [ ] Additional channels (mobile app screen, packaging die-line, OOH bus-stop)
- [ ] Persisted history of generated concepts

---

## 🤝 Contributing

Contributions, bug reports, and feature requests are welcome. To contribute:

1. Fork the repo and create a feature branch (`git checkout -b feat/your-feature`)
2. Commit your changes (`git commit -m "feat: add your feature"`)
3. Push to your fork (`git push origin feat/your-feature`)
4. Open a Pull Request

Please follow the existing code style and include a clear description of what your change does.

---

## 📄 License

Released under the [MIT License](LICENSE).
