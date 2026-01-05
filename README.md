# Khajuraho Dance Festival

Welcome to the official repository for the **Khajuraho Dance Festival** website. This project is a modern, responsive web application designed to showcase the grandeur of India's premier classical dance festival held at the UNESCO World Heritage Site in Khajuraho.

## 🌟 Overview

The website serves as a comprehensive guide for the festival, providing visitors with information about the schedule, artists, venue, and cultural significance of the event. It features a rich, interactive user interface with support for dark/light modes and smooth animations.

## ✨ Features

- **Immersive UI/UX:** A visually stunning design reflecting the cultural heritage of Khajuraho.
- **Dark/Light Mode:** Built-in theme switcher for optimal viewing comfort.
- **Interactive Gallery:** A dedicated gallery section to showcase high-quality images and videos from the festival.
- **Event Schedule:** Detailed timeline of performances and events.
- **Artist Profiles:** Information about the renowned classical dancers performing at the festival.
- **Interactive Map:** Integrated Leaflet map to help visitors navigate the venue and local attractions.
- **Responsive Design:** Fully optimized for desktops, tablets, and mobile devices.
- **Accessibility:** Includes features like reduced motion preferences.

## 🛠️ Tech Stack

This project is built using the following technologies:

- **Frontend Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Maps:** [Leaflet](https://leafletjs.com/) & [React Leaflet](https://react-leaflet.js.org/)
- **Icons & Assets:** Custom SVG icons and optimized assets.

## 🚀 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/vedant-bahadure2003/khajuraho.git
    cd khajuraho
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Development Server

Start the local development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

### Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be generated in the `dist` directory.

### Previewing the Build

To preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```
khajuraho/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and other source assets
│   ├── components/      # Reusable UI components (Navbar, Footer, Sections)
│   ├── data/            # JSON data files (festivalData.json)
│   ├── hooks/           # Custom React hooks (useTheme, useScrollParallax)
│   ├── pages/           # Page components (Home, Gallery)
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles and Tailwind directives
├── index.html           # HTML entry point
├── package.json         # Project dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
└── vite.config.js       # Vite configuration
```

## 🤝 Contributing

Contributions are welcome! If you'd like to improve this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

_Designed and developed for the Khajuraho Dance Festival._
