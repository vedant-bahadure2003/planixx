import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [{ name: "Events", href: "#events" }],
    company: [{ name: "About Us", href: "#about" }],
    support: [
      { name: "Contact Us", href: "#enquiry" },
      { name: "Privacy Policy", href: "#privacy" },
    ],
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-900 to-black overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-6">
              <div className="relative">
                <img
                  src="/images/plannix-logo.png"
                  className="h-10 w-10"
                  alt="plannix Logo"
                />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 bg-clip-text text-transparent">
                lannix
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Transform your events into unforgettable experiences. plannix
              makes event planning seamless, collaborative, and stress-free for
              everyone.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-green-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-green-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 text-sm hover:text-green-400 transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} plannix. All rights reserved.
            </p>
              <a
                        href="https://microintegrated.in/web/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#F59E0B]/50 hover:bg-white/10 transition-all duration-300 group"
                    >
                        <span className="text-white/50 text-xs uppercase tracking-wider">Technology Partner</span>
                        <div className="w-px h-4 bg-white/20"></div>
                        <div className="flex items-center gap-2">
                            <img
                                src="/images/mtss_logo_2.png"
                                alt="Micro Integrated Logo"
                                className="h-6 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                            />
                            <span className="text-white font-semibold text-sm group-hover:text-[#F59E0B] transition-colors">
                                Micro Integrated Semiconductor Systems
                            </span>
                        </div>
                    </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
