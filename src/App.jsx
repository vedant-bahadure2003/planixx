import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Landing, Store } from "./pages";
import { Navbar, Footer } from "./components";
import { LocationProvider } from "./context/LocationContext";

// Component to scroll to top on route change, or to section if hash is present
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // If there's a hash, scroll to that section after a short delay
      // to ensure the DOM elements are rendered
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      // No hash, scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [pathname, hash]);

  return null;
}

function App() {
  return (
    <LocationProvider>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/store" element={<Store />} />
      </Routes>
      <Footer />
    </LocationProvider>
  );
}

export default App;

