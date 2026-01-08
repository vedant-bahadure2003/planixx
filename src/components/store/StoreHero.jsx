import { useState, useEffect } from "react";

const highlights = [
  { text: "Decorations", icon: "✨" },
  { text: "Lighting", icon: "💡" },
  { text: "Furniture", icon: "🪑" },
  { text: "Backdrops", icon: "🎨" },
  { text: "Florals", icon: "🌸" },
];

const StoreHero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % highlights.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* 360 degree rotating ring */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[500px] h-[500px] md:w-[700px] md:h-[700px]">
          <div className="absolute inset-0 border-2 border-dashed border-green-500/20 rounded-full animate-spin-slow" />
          <div className="absolute inset-8 border border-emerald-500/30 rounded-full animate-spin-reverse" />
          <div className="absolute inset-16 border-2 border-green-400/20 rounded-full animate-spin-slow" />

          {/* Orbiting elements */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-lg shadow-green-500/50"
              style={{
                top: "50%",
                left: "50%",
                transform: `rotate(${
                  i * 45
                }deg) translateX(250px) translateY(-50%)`,
                animation: `orbit 20s linear infinite`,
                animationDelay: `${i * -2.5}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-sm text-white/80">360° Event Solutions</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
          <span className="text-white">plannix</span>
          <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
            {" "}
            Store
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Everything you need for your perfect event, all in one place. From
          stunning decorations to professional equipment - we've got you covered
          from every angle.
        </p>

        {/* Rotating highlights */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <span className="text-gray-400">We provide:</span>
          <div className="relative h-10 w-40 overflow-hidden">
            {highlights.map((item, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex items-center gap-2 transition-all duration-500 ${
                  index === activeIndex
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <span className="text-2xl">{item.icon}</span>
                <span className="text-lg font-semibold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#categories"
            className="group px-8 py-4 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white font-semibold shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            Explore Products
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#features"
            className="px-8 py-4 rounded-full border-2 border-white/20 text-white font-semibold hover:bg-white/10 hover:border-white/40 transition-all duration-300"
          >
            Why Choose Us
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { value: "500+", label: "Products" },
            { value: "50+", label: "Categories" },
            { value: "24/7", label: "Support" },
            { value: "100%", label: "Quality" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-green-400 rounded-full animate-pulse" />
        </div>
      </div>

      <style jsx>{`
        @keyframes orbit {
          from {
            transform: rotate(0deg) translateX(250px) translateY(-50%);
          }
          to {
            transform: rotate(360deg) translateX(250px) translateY(-50%);
          }
        }
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin 25s linear infinite reverse;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default StoreHero;
