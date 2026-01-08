import { useEffect } from "react";
import { createPortal } from "react-dom";

const AppComingSoonModal = ({ isOpen, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Use Portal to render modal at document body level
  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 rounded-3xl border border-white/10 shadow-2xl animate-scaleIn overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-green-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-8 pt-12 text-center">
          {/* Animated phone icons */}
          <div className="flex justify-center gap-6 mb-8">
            {/* Play Store Icon */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500" />
              <div className="relative w-20 h-20 bg-gray-800/80 backdrop-blur rounded-2xl border border-white/10 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z"/>
                </svg>
              </div>
            </div>

            {/* App Store Icon */}
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl blur opacity-40 group-hover:opacity-60 transition duration-500" />
              <div className="relative w-20 h-20 bg-gray-800/80 backdrop-blur rounded-2xl border border-white/10 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                <svg className="w-10 h-10 text-green-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M11.624 7.222c-.876 0-2.232-.996-3.66-.96-1.884.024-3.612 1.092-4.584 2.784-1.956 3.396-.504 8.412 1.404 11.172.936 1.344 2.04 2.856 3.504 2.808 1.404-.06 1.932-.912 3.636-.912 1.692 0 2.172.912 3.66.876 1.512-.024 2.472-1.368 3.396-2.724 1.068-1.56 1.512-3.072 1.536-3.156-.036-.012-2.94-1.128-2.976-4.488-.024-2.808 2.292-4.152 2.4-4.212-1.32-1.932-3.348-2.148-4.056-2.196-1.848-.144-3.396 1.008-4.26 1.008zm3.12-2.832c.78-.936 1.296-2.244 1.152-3.54-1.116.048-2.46.744-3.264 1.68-.72.828-1.344 2.16-1.176 3.432 1.236.096 2.508-.636 3.288-1.572z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-green-400 text-sm font-medium">
              Coming Soon
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Our App is
            <span className="block mt-1 bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
              Almost Here!
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
            We're putting the finishing touches on our mobile app. Get ready to plan your perfect events on the go!
          </p>

          {/* Store buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            {/* Google Play Button */}
            <button className="group flex items-center justify-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:scale-105">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">Coming to</div>
                <div className="text-white font-semibold text-sm">Google Play</div>
              </div>
            </button>

            {/* App Store Button */}
            <button className="group flex items-center justify-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 hover:scale-105">
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.624 7.222c-.876 0-2.232-.996-3.66-.96-1.884.024-3.612 1.092-4.584 2.784-1.956 3.396-.504 8.412 1.404 11.172.936 1.344 2.04 2.856 3.504 2.808 1.404-.06 1.932-.912 3.636-.912 1.692 0 2.172.912 3.66.876 1.512-.024 2.472-1.368 3.396-2.724 1.068-1.56 1.512-3.072 1.536-3.156-.036-.012-2.94-1.128-2.976-4.488-.024-2.808 2.292-4.152 2.4-4.212-1.32-1.932-3.348-2.148-4.056-2.196-1.848-.144-3.396 1.008-4.26 1.008zm3.12-2.832c.78-.936 1.296-2.244 1.152-3.54-1.116.048-2.46.744-3.264 1.68-.72.828-1.344 2.16-1.176 3.432 1.236.096 2.508-.636 3.288-1.572z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-gray-400 uppercase tracking-wider">Coming to</div>
                <div className="text-white font-semibold text-sm">App Store</div>
              </div>
            </button>
          </div>

          {/* Stay Updated section */}
          <div className="pt-6 border-t border-white/10">
            <p className="text-gray-500 text-xs">
              Stay tuned for updates! Follow us on social media.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { 
            opacity: 0;
            transform: scale(0.95);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>,
    document.body
  );
};

export default AppComingSoonModal;
