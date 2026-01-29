import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BusinessEnquiryModal from "./BusinessEnquiryModal";
import AppComingSoonModal from "./AppComingSoonModal";
import LocationSelectorModal from "./LocationSelectorModal";
import { useLocation as useLocationContext } from "../../context/LocationContext";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBusinessModalOpen, setIsBusinessModalOpen] = useState(false);
  const [isAppComingSoonOpen, setIsAppComingSoonOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Location context for city selection
  const { selectedCity, isModalOpen, openModal, closeModal, selectCity } = useLocationContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle navigation for both home and section links
  const handleNavClick = (e, link) => {
    if (link.isRoute && link.href === "/") {
      // Home link - if already on homepage, scroll to top
      if (location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      // Otherwise, let the Link handle navigation normally
    } else if (!link.isRoute && link.href.startsWith("#")) {
      // Section link (e.g., #events, #about)
      e.preventDefault();
      const sectionId = link.href.substring(1);

      if (location.pathname === "/") {
        // On homepage, scroll to section
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        // On different route, navigate to homepage with hash
        navigate("/" + link.href);
      }
    }
  };

  const navLinks = [
    { name: "Home", href: "/", isRoute: true },
    { name: "Events", href: "#events" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#enquiry" },
    { name: "Privacy", href: "#privacy" },
    { name: "Store", href: "/store", isRoute: true, isStore: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? " backdrop-blur-xl shadow-lg shadow-black/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="relative">
              <img src="/images/plannix-logo.png" className="h-10 w-10" />

              {/* <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" /> */}
            </div>
            <span
              className={`text-2xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 bg-clip-text text-transparent ${
                isScrolled ? "" : "drop-shadow-lg"
              }`}
            >
              lannix
            </span>
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex items-center gap-1 absolute left-1/2 transform -translate-x-1/2">
            {navLinks.map((link) =>
              link.isStore ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-orange-500/30 hover:shadow-lg hover:shadow-orange-500/40 hover:scale-105`}
                >
                  {link.name}
                </Link>
              ) : link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/20 ${
                    isScrolled
                      ? "text-white/90 hover:text-green-500"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/20 cursor-pointer ${
                    isScrolled
                      ? "text-white/90 hover:text-green-500"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              )
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
          
            {/* <button
              onClick={() => setIsBusinessModalOpen(true)}
              className={`px-3 py-2 rounded-full text-sm font-semibold border-2 transition-all duration-300 hover:scale-105 ${
                isScrolled
                  ? "border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                  : "border-white/70 text-white hover:bg-white/10"
              }`}
            >
              Business Inquiry
            </button> */}
          <a href="https://plannix.in/platform/login">
            <button
              className="px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300"
            >
Sign Up            </button>
          </a>
            {/* Location Selector Button */}
            <button
              onClick={openModal}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 group ${
                isScrolled
                  ? "bg-white/5 hover:bg-white/10 border border-white/10 text-white"
                  : "bg-white/10 hover:bg-white/20 border border-white/20 text-white/90"
              }`}
            >
              <svg
                className="w-4 h-4 text-rose-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <circle cx="12" cy="11" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              <span className="max-w-[80px] truncate">
                {selectedCity ? selectedCity.name : "City"}
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-10 h-10 flex items-center justify-center"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isScrolled ? "bg-gray-800" : "bg-white"
                } ${isMobileMenuOpen ? "rotate-45 translate-y-2" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isScrolled ? "bg-gray-800" : "bg-white"
                } ${isMobileMenuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block w-6 h-0.5 transition-all duration-300 ${
                  isScrolled ? "bg-gray-800" : "bg-white"
                } ${isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? "max-h-[500px] pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2 pt-4">
            {/* Mobile Location Selector */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openModal();
              }}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                isScrolled
                  ? "bg-rose-50 text-rose-600"
                  : "bg-rose-500/20 text-rose-300"
              }`}>
                
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <circle cx="12" cy="11" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
              <span className="font-medium">
                {selectedCity ? selectedCity.name : "Select City"}
              </span>
              <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {navLinks.map((link) =>
              link.isStore ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md"
                >
                  🛒 {link.name}
                </Link>
              ) : link.isRoute ? (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isScrolled
                      ? "text-gray-700 hover:bg-green-50 hover:text-green-600"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, link);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 cursor-pointer ${
                    isScrolled
                      ? "text-gray-700 hover:bg-green-50 hover:text-green-600"
                      : "text-white/90 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.name}
                </a>
              )
            )}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsBusinessModalOpen(true);
                }}
                className={`px-4 py-3 rounded-xl text-sm font-semibold border-2 transition-all duration-300 ${
                  isScrolled
                    ? "border-green-500 text-green-600 hover:bg-green-50"
                    : "border-white/50 text-white/90 hover:bg-white/10"
                }`}
              >
                Business Inquiry
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAppComingSoonOpen(true);
                }}
                className="px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white"
              >
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Business Enquiry Modal */}
      <BusinessEnquiryModal
        isOpen={isBusinessModalOpen}
        onClose={() => setIsBusinessModalOpen(false)}
      />

      {/* App Coming Soon Modal */}
      <AppComingSoonModal
        isOpen={isAppComingSoonOpen}
        onClose={() => setIsAppComingSoonOpen(false)}
      />

      {/* Location Selector Modal */}
      <LocationSelectorModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSelectCity={selectCity}
        currentCity={selectedCity}
      />
    </nav>
  );
};

export default Navbar;
