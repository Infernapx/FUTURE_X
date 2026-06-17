# 🧭 FutureX (CareerGuide) — AI-Powered Career Guidance Platform

[![Vite](https://img.shields.io/badge/Vite-5.x-blueviolet?style=flat-glass&logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-18.x-blue?style=flat-glass&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-glass&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38bdf8?style=flat-glass&logo=tailwind-css)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey?style=flat-glass&logo=express)](https://expressjs.com/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.39.x-orange?style=flat-glass)](https://orm.drizzle.team/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini_AI-2.5-orange?style=flat-glass&logo=google-gemini)](https://aistudio.google.com/)

FutureX is a modern, full-stack career assessment and guidance application. By combining a tailored career assessment quiz with Google's Gemini AI, it delivers personalized career recommendations, specific job profile analytics, nearby colleges, available scholarships, and real-time interactive counseling chat to empower students and professionals on their educational journeys.

---

## ✨ Features

- **🧠 Smart Career Assessment**: A comprehensive quiz mapping your academic profile, strengths, and interests to ideal career pathways.
- **💬 AI Career Assistant**: Real-time, contextual chat powered by Google Gemini AI to answer questions about careers, skills, and industry trends.
- **🏫 College & Scholarship Finder**: Search, filter, and discover colleges (with local/regional matching) and scholarship opportunities in India.
- **🔒 Google Authentication**: Secure sign-in with your Google account via OAuth2.0.
- **📊 Interactive Dashboard**: Save your results, track recommended roadmaps, and view matching career fields.
- **🎨 Premium UI**: Beautiful dark mode theme with glassmorphism layout elements and smooth transitions powered by Framer Motion.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Radix UI primitives (`shadcn/ui`), Framer Motion
- **Backend**: Node.js, Express.js (REST API, Serverless-ready)
- **Database**: PostgreSQL (Neon Database) with Drizzle ORM
- **AI Engine**: Google Gemini API (`gemini-2.5-flash` model)

---

## 🚀 Getting Started

### 1. Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18+) and Git installed.

Clone this repository:
```bash
git clone https://github.com/Infernapx/FUTURE_X.git
cd FUTURE_X
```

### 2. Set Up Environment Variables

Create a `.env` file in the root directory:
```bash
# Gemini AI Key (Get from: https://aistudio.google.com/app/apikey)
GOOGLE_API_KEY=your_gemini_api_key

# Google OAuth Client ID (Get from: https://console.cloud.google.com/apis/credentials)
GOOGLE_CLIENT_ID=your_google_oauth_client_id
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id

# Database Connection (PostgreSQL connection string)
DATABASE_URL=your_postgresql_database_url

# Express session secret (Any random string)
SESSION_SECRET=your_random_secret_key
```

### 3. Install Dependencies & Database Setup

```bash
# Install package dependencies
npm install

# Push the database schema to your PostgreSQL database
npm run db:push
```

### 4. Running the Dev Server

```bash
npm run dev
```
The app will start running at **`http://localhost:5000`**.

---

## 📁 Project Structure

```
├── api/             # Serverless handlers for serverless deployment platforms
├── client/          # React frontend application
│   ├── src/
│   │   ├── components/  # Shared UI & layout components
│   │   ├── hooks/       # Custom React hooks (auth, toast, etc.)
│   │   ├── pages/       # Home, Quiz, Dashboard, Chat, Colleges, etc.
│   │   └── lib/         # Utility logic & mock/static data
├── server/          # Express.js REST API
│   ├── lib/         # Gemini Integration
│   └── routes.ts    # Main API endpoints definition
├── shared/          # Shared database schema & TypeScript types
├── tailwind.config.ts # Custom UI style theme configurations
└── vite.config.ts   # Client build pipeline configurations
```

---

## ☁️ Deployment

### Serverless Vercel Deployment

1. Make sure you have the [Vercel CLI](https://vercel.com/cli) installed:
   ```bash
   npm i -g vercel
   ```
2. Link your project to Vercel:
   ```bash
   vercel login
   vercel link
   ```
3. Set your environment variables (`GOOGLE_API_KEY`, `GOOGLE_CLIENT_ID`, `DATABASE_URL`, `SESSION_SECRET`) in your Vercel Dashboard.
4. Deploy:
   ```bash
   vercel --prod
   ```

---

## 📄 License

This project is licensed under the MIT License.