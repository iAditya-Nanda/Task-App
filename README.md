# TaskFlow

Hey! Welcome to **TaskFlow**. We built this to make task management actually feel *good*. It's a full-stack setup with a super premium Web Dashboard and a matching Flutter Mobile App. 

Everything is synced up, looks beautiful, and just works.

---

## Project Preview

### Web Dashboard (Next.js)
A clean, desktop-first workspace with glassmorphism and real-time updates.

<div align="center">
  <img src="Project%20ScreenShots/NextJS%20web-app/Screenshot%20from%202026-02-28%2008-12-24.png" width="45%" border="1" /> 
  <img src="Project%20ScreenShots/NextJS%20web-app/Screenshot%20from%202026-02-28%2008-13-24.png" width="45%" border="1" />
  <br>
  <img src="Project%20ScreenShots/NextJS%20web-app/Screenshot%20from%202026-02-28%2008-13-38.png" width="45%" border="1" />
  <img src="Project%20ScreenShots/NextJS%20web-app/Screenshot%20from%202026-02-28%2008-13-46.png" width="45%" border="1" />
  <br>
  <img src="Project%20ScreenShots/NextJS%20web-app/Screenshot%20from%202026-02-28%2008-14-33.png" width="91%" border="1" />
</div>

### Mobile Experience (Flutter)
Premium mobile app with smooth transitions and offline-first mindset.

<div align="center">
  <img src="Project%20ScreenShots/Flutter%20mobile-app/Screenshot_2026-02-28-08-15-59-430_com.taskapp.task_app_mobile.jpg.jpeg" width="31%" />
  <img src="Project%20ScreenShots/Flutter%20mobile-app/Screenshot_2026-02-28-08-16-02-226_com.taskapp.task_app_mobile.jpg.jpeg" width="31%" />
  <img src="Project%20ScreenShots/Flutter%20mobile-app/Screenshot_2026-02-28-08-16-05-252_com.taskapp.task_app_mobile.jpg.jpeg" width="31%" />
  <br>
  <img src="Project%20ScreenShots/Flutter%20mobile-app/Screenshot_2026-02-28-08-16-17-492_com.taskapp.task_app_mobile.jpg.jpeg" width="45%" />
  <img src="Project%20ScreenShots/Flutter%20mobile-app/Screenshot_2026-02-28-08-16-21-990_com.taskapp.task_app_mobile.jpg.jpeg" width="45%" />
</div>

---

## Quick Start Guide

### 1. The Engine (Backend)
First, we need to get the server up and running so the apps have someone to talk to.

*   **Setup:**
    ```bash
    cd backend
    npm install
    npx prisma generate
    npx prisma db push
    ```
*   **Run it:**
    ```bash
    npm run dev
    ```
    *Server will be live on: `http://localhost:3000`*

---

### 2. The Dashboard (Web)
This is the high-end workspace for your browser.

*   **Setup:**
    ```bash
    cd web
    npm install
    ```
*   **Run it:**
    ```bash
    npm run dev
    ```
    *Open `http://localhost:3001` to see the magic.*

---

### 3. The App (Mobile)
A premium Flutter app with glassmorphism, smooth animations, and a clean UI.

*   **Setup:**
    ```bash
    cd mobile
    flutter pub get
    ```
*   **Running on a Physical Phone (Crucial Step):**
    If you're using a real phone via USB, you **must** run this command so the phone can "see" your backend:
    ```bash
    adb reverse tcp:3000 tcp:3000
    ```
*   **Run it:**
    ```bash
    flutter run
    ```

---

## ✨ Features

*   **Web Dashboard:** Built with Next.js, Framer Motion for those smooth transitions, and a clean "Glass" aesthetic.
*   **Mobile App:** Flutter + Riverpod for rock-solid state management. We used custom SVGs and premium micro-animations to make it feel high-end.
*   **Auth:** Secure Login/Register on both platforms with automatic token refreshing.
*   **CRUD:** Add, Edit, Delete, and Toggle tasks anywhere—everything stays in sync.

---

## 🛠 Tech Stack
*   **Frontend:** Next.js, Tailwind CSS, Lucide Icons
*   **Mobile:** Flutter, Riverpod, Flutter Animate
*   **Backend:** Express.js, Prisma, PostgreSQL
*   **State:** TanStack Query (Web) & Riverpod (Mobile)

Enjoy the clean workspace! If you run into any connection issues on the phone, just remember the `adb reverse` trick!

