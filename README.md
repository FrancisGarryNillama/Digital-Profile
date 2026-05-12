# Digital Profile | Francis Garry Nillama

An immersive 3D portfolio built with React and Three.js, showcasing expertise in AI Systems, Full-Stack development, and enterprise automation.

## 🚀 Overview

This project is a high-performance personal portfolio designed to demonstrate technical depth through interactive 3D elements and a systematic UI/UX approach. It features real-time 3D model rendering, orbital animations, and a clean, responsive layout built with Tailwind CSS.

## ✨ Features

- **Interactive 3D Environments**: 3D hero section featuring a custom Avatar surrounded by orbiting technical models (Neural Networks, Microchips, Server Stacks) representing key competencies.
- **AI & Automation Showcase**: Specialized sections highlighting expertise in OCR pipelines, LLM-powered agents, and intelligent document parsing.
- **Engineering Showcase**: A tiered project portfolio detailing core challenges, technical stacks, and performance metrics.
- **Integrated Communications**: Functional contact form powered by EmailJS with real-time feedback and interactive character animations (Fox model).
- **Dynamic Branding**: Automatic SVG favicon generation based on user initials.

## 🛠️ Tech Stack

- **Core**: React.js, Vite
- **3D Graphics**: Three.js, React Three Fiber, React Three Drei
- **Animations**: React Spring
- **Styling**: Tailwind CSS
- **Timeline**: React Vertical Timeline
- **Services**: EmailJS

## 📦 Getting Started

### Prerequisites

- Node.js (v18.x or higher)
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Configuration**:
   Create a `.env` file in the root directory and add your EmailJS credentials:
   ```env
   VITE_APP_EMAILJS_SERVICE_ID=...
   VITE_APP_EMAILJS_TEMPLATE_ID=...
   VITE_APP_EMAILJS_PUBLIC_KEY=...
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

## 📂 Project Structure

- `/src/models/`: React components for GLB/GLTF 3D models.
- `/src/pages/`: Main application views including the 3D-heavy Home page.
- `/src/assets/3d models/`: Binary 3D assets (.glb files).