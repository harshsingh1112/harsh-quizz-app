# Harsh Frontend Intern Assignment

## Project Overview
This project is a React-based interactive quiz application built as part of the Frontend Intern Application. It features a modern, pastel-themed UI with glassmorphism effects, animated score counters, and a responsive design.

## 🚀 Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd harsh-frontend
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173` (or the port shown in your terminal).

4.  **Build for Production**
    ```bash
    npm run build
    ```

## 🛠️ Tech Stack Used

-   **Frontend Framework**: React 18
-   **Language**: TypeScript
-   **Styling**: Tailwind CSS
-   **Build Tool**: Vite
-   **Icons**: Lucide React
-   **Animations**: Custom CSS transitions & `requestAnimationFrame` for score counting.

## ✨ Key Features Implemented

1.  **Double-Layer Glassmorphism UI**:
    -   Implemented a translucent, backdrop-blurred outer card with a clean white inner card.
    -   Ensured the "box" layout is prominent and robust.

2.  **Interactive Quiz Logic**:
    -   4 logic-based questions.
    -   State management for tracking current question, selected answers, and scoring.
    -   Navigation (Previous/Next) with validation (cannot proceed without answering).

3.  **Custom Progress Bar**:
    -   4-segment thin progress bar with specific filled/empty state colors (`#0A385C` / `#D8D8D8`).

4.  **Animated Score Counter**:
    -   Rolling number animation (0% to Final%) with a duration of 2000ms.
    -   **Gradient Text**: Applied a deep navy-to-blue gradient (`from-[#0A3D62] to-[#2E8BC0]`) to the score text.

5.  **Mascot Integration**:
    -   Integrated `paw.gif` and `bestofluck.png` assets.
    -   Positioned the mascot to "pop out" from the bottom-left inside the white card on the first question.

## 📋 Assumptions Made

-   The application is targeted at modern browsers that support backdrop-filter (for glassmorphism) and CSS gradients.
-   The design is optimized for desktop and tablet viewports but is responsive for mobile.
-   Assets (`paw.gif`, `bestofluck.png`) are expected to be present in the `public/` directory.

## ⏱️ Time Spent on Assignment
[Approx. 5 Hours] - Including initial setup, UI refactoring, iterative design adjustments, and final polish.
