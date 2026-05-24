# PlateStudio / ConsistCraft

An elegant web application for designers and marketing coordinators to visualize product packaging and hardware concepts across multiple physical and digital mediums with strict visual, color, and thematic cohesion.

Built using **React (Vite)**, **Tailwind CSS**, and **Express**, with real-time prompt calibration powered by the **Google Gen AI SDK (Gemini 2.5)**.

---

## ⚡ Core Features

- **Multi-Medium Visual Alignment**: Generates synchronized mockups across three standard channels simultaneously:
  - **Roadside Billboard Display** (16:9 Landscape)
  - **Social Media Feed Post** (1:1 Square)
  - **Print Newspaper Feature** (4:3 Classic Plate)
- **Innovative Input Modes**:
  - **Guided Form Mode**: Multi-step configuration covering product dimensions, industry vertical, and physical surface descriptions.
  - **Freeform Open-Ended Mode**: Unlimited conceptual typing allowing users to describe devices (such as advanced gamepads, wearables, or audio equipment) with complete artistic freedom.
- **Dynamic Diagnostics & Fallbacks**: Features a highly interactive SVGA controller and vector blueprint render engine to display exact conceptual alignments if API quota limits or safety filters are activated.
- **Interactive Technical Inspector**: Clickable overlays reveal exact raw JSON API error logs, prompt variables, and secret configurations.

---

## 🛠️ Stack & Technologies

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide Icons, and Framer Motion.
- **Backend**: Node.js, Express, and TSX.
- **Generative AI**: Official `@google/genai` TypeScript SDK utilizing the `gemini-2.5-flash-image` (Nano-Banana) model.

---

## 🚀 Running Locally on Windows

### Prerequisites
- [Node.js](https://nodejs.org/) (Version 18 or higher)
- A [Gemini API Key](https://aistudio.google.com/)

### 1. Configure the Environment
Create a `.env` file in the root directory and add your secret key:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
