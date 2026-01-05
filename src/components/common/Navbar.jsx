import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Events", href: "#events" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#enquiry" },
    { name: "Privacy", href: "#privacy" },
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
              <img src="/images/planix-logo.png" className="h-10 w-10" />

              {/* <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" /> */}
            </div>
            <span
              className={`text-2xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 bg-clip-text text-transparent ${
                isScrolled ? "" : "drop-shadow-lg"
              }`}
            >
              lanix
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:bg-white/20 ${
                  isScrolled
                    ? "text-white/90 hover:text-green-500"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button className="px-6 py-2.5 rounded-full text-sm font-semibold bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300">
              Start Free Trial
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
            isMobileMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          }`}
        >
          <div className="flex flex-col gap-2 pt-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:bg-green-50 hover:text-green-600"
                    : "text-white/90 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.name}
              </a>
            ))}
            <div className="flex flex-col gap-2 mt-4 pt-4 border-t border-white/10">
              <button
                className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                  isScrolled
                    ? "text-gray-700 hover:bg-green-50"
                    : "text-white/90 hover:bg-white/10"
                }`}
              >
                Log in
              </button>
              <button className="px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white">
                Start Free Trial
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
