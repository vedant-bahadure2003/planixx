import { useState, useEffect, useRef } from "react";
import BusinessEnquiryModal from "../common/BusinessEnquiryModal";
import MeetTheTeam from "./MeetTheTeam";

// Stats data with icons
const stats = [
  {
    number: "10K+",
    label: "Events Planned",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    number: "50K+",
    label: "Happy Customers",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    number: "200+",
    label: "Vendor Partners",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
  {
    number: "15+",
    label: "Cities Covered",
    icon: (
      <svg
        className="w-6 h-6"
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
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

// Values data
const values = [
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),
    title: "Passion",
    description:
      "We pour our hearts into every event, treating each celebration as our own.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
        />
      </svg>
    ),
    title: "Innovation",
    description:
      "Leveraging cutting-edge technology to revolutionize event planning.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
    ),
    title: "Community",
    description:
      "Building lasting relationships with clients, vendors, and partners.",
    gradient: "from-teal-500 to-green-500",
  },
  {
    icon: (
      <svg
        className="w-7 h-7"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    title: "Excellence",
    description: "Committed to delivering exceptional quality in every detail.",
    gradient: "from-green-500 to-emerald-500",
  },
];

// Animated counter hook
const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const numericEnd = parseInt(end.replace(/\D/g, ""));

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCount(Math.floor(progress * numericEnd));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return { count, ref };
};

// Pre-generated particle positions to avoid Math.random on every render
const particlePositions = Array.from({ length: 20 }, (_, i) => ({
  left: `${(i * 5 + 7) % 100}%`,
  top: `${(i * 7 + 3) % 100}%`,
  duration: `${5 + (i % 10)}s`,
  delay: `${(i * 0.5) % 5}s`,
}));

// Floating particles component
const FloatingParticles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {particlePositions.map((particle, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 opacity-20"
        style={{
          left: particle.left,
          top: particle.top,
          animation: `float ${particle.duration} ease-in-out infinite`,
          animationDelay: particle.delay,
        }}
      />
    ))}
  </div>
);

const AboutSection = () => {
  const [setHoveredValue] = useState(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  // Counter refs for each stat
  const stat1 = useCountUp("10000", 2000);
  const stat2 = useCountUp("50000", 2000);
  const stat3 = useCountUp("200", 2000);
  const stat4 = useCountUp("15", 2000);
  const statCounters = [stat1, stat2, stat3, stat4];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Main Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950" />

      {/* Mesh Gradient Overlay */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_rgba(57,200,57,0.4)_0%,_transparent_50%)]" />
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(102,187,106,0.3)_0%,_transparent_50%)]" />
        <div className="absolute bottom-0 left-1/2 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_rgba(46,125,50,0.3)_0%,_transparent_50%)]" />
      </div>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-600/30 to-emerald-600/30 border border-green-400/30 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 animate-pulse" />
            <span className="text-green-200 text-sm font-medium tracking-wide">
              About plannix
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="text-white">Creating </span>
            <span className="relative">
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                Magical
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
              >
                <path
                  d="M2 10C50 4 150 4 198 10"
                  stroke="url(#underline-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient
                    id="underline-gradient"
                    x1="0"
                    y1="0"
                    x2="200"
                    y2="0"
                  >
                    <stop stopColor="#66BB6A" />
                    <stop offset="0.5" stopColor="#39C839" />
                    <stop offset="1" stopColor="#2E7D32" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <br />
            <span className="text-white">Moments </span>
            <span className="bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent">
              Together
            </span>
          </h2>
          <p className="max-w-3xl mx-auto text-xl text-green-200/70 leading-relaxed">
            plannix is your all-in-one event planning platform that transforms
            the way you organize, manage, and experience events. From intimate
            gatherings to grand celebrations.
          </p>
        </div>

        {/* Our Story - Creative Layout */}
        <div className="relative mb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image Stack */}
            <div className="relative h-[500px]">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/30 to-emerald-600/30 rounded-3xl blur-3xl transform -rotate-6" />

              {/* Main Image */}
              <div className="absolute top-0 left-0 w-4/5 h-4/5 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-green-500/20 transform hover:scale-105 transition-transform duration-500 z-20">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop"
                  alt="Event celebration"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/60 via-transparent to-transparent" />
              </div>

              {/* Secondary Image */}
              <div className="absolute bottom-0 right-0 w-3/5 h-3/5 rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl shadow-emerald-500/20 transform hover:scale-105 transition-transform duration-500 z-30">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&h=400&fit=crop"
                  alt="Team planning"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-transparent" />
              </div>

             
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border-2 border-green-500/30 rounded-2xl transform rotate-12" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 border-2 border-emerald-500/30 rounded-full" />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                <span className="text-green-400 text-sm font-medium">
                  Est. 2020
                </span>
              </div>

              <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                <span className="text-white">Our Journey Started with a </span>
                <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                  Simple Vision
                </span>
              </h3>

              <p className="text-lg text-green-200/60 leading-relaxed">
                Founded in 2020, plannix emerged from a shared frustration with
                the complexity of event planning. Our founders, having organized
                countless events themselves, envisioned a platform that would
                simplify the entire process while elevating the experience.
              </p>

              <p className="text-lg text-green-200/60 leading-relaxed">
                Today, we&apos;re proud to have helped thousands create
                unforgettable memories. From weddings and corporate events to
                birthday parties and festivals.
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-3 pt-4">
                {[
                  "AI-Powered",
                  "Real-time Collaboration",
                  "Smart Budgeting",
                  "Vendor Network",
                ].map((feature, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-green-200 text-sm hover:bg-white/10 hover:border-green-500/30 transition-all cursor-default"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-6">
                <button 
                  onClick={() => setIsEnquiryModalOpen(true)}
                  className="group relative px-8 py-4 rounded-2xl overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 transition-transform group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                  <span className="relative text-white font-semibold flex items-center gap-2">
                    Start Your Journey
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
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

       

        {/* Our Values - Enhanced */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-white">Our Core </span>
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                Values
              </span>
            </h3>
            <p className="text-green-200/60 max-w-2xl mx-auto text-lg">
              The principles that guide everything we do at plannix.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredValue(index)}
                onMouseLeave={() => setHoveredValue(null)}
              >
                {/* Card Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${value.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}
                />

                {/* Card Border */}
                <div className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/20 via-white/5 to-transparent group-hover:from-green-500/50 group-hover:via-emerald-500/30 group-hover:to-transparent transition-all duration-500">
                  <div className="relative p-8 rounded-3xl bg-[#0a2e1a]/80 backdrop-blur-xl h-full overflow-hidden">
                    {/* Animated Background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />

                    {/* Icon */}
                    <div
                      className={`relative w-16 h-16 rounded-2xl bg-gradient-to-r ${value.gradient} p-[1px] mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <div className="w-full h-full rounded-2xl bg-[#0a2e1a] flex items-center justify-center">
                        <span
                          className={` bg-clip-text text-white `}
                        >
                          {value.icon}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-400 group-hover:to-emerald-400 group-hover:bg-clip-text transition-all duration-300">
                      {value.title}
                    </h4>
                    <p className="text-green-200/50 text-sm leading-relaxed group-hover:text-green-200/70 transition-colors duration-300">
                      {value.description}
                    </p>

                    {/* Corner Decoration */}
                    <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section - Enhanced */}
        <MeetTheTeam />

        {/* On-Ground Experts Section */}
        <div className="mb-32 relative">
          {/* Animated Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-green-600/20 to-emerald-600/20 rounded-[3rem] blur-3xl opacity-50" />
          
          {/* Main Card */}
          <div className="relative p-[2px] rounded-[3rem] bg-gradient-to-r from-emerald-500/40 via-green-400/40 to-emerald-500/40 overflow-hidden">
            <div className="relative p-10 md:p-16 rounded-[2.9rem] bg-gradient-to-br from-[#0f3322] via-[#0a2618] to-[#0f3322] overflow-hidden">
              {/* Animated Orbs */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-teal-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Subtle Grid Pattern */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: '40px 40px',
                }}
              />
              
              <div className="relative grid lg:grid-cols-2 gap-12 items-center">
                {/* Content Side */}
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-600/30 to-green-600/30 border border-emerald-400/30 backdrop-blur-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-emerald-200 text-sm font-medium">On-Ground Excellence</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                    <span className="text-white">Need an </span>
                    <span className="bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">Expert Team</span>
                    <br />
                    <span className="text-white">for Your Event?</span>
                  </h3>
                  
                  {/* Feature highlights with icons */}
                  <div className="space-y-4 pt-4">
                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-400/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <p className="text-green-200/70 text-lg leading-relaxed">
                        From the <span className="text-white font-medium">first guest arrival</span> to the <span className="text-white font-medium">final applause</span> - our on-ground experts have your event covered.
                      </p>
                    </div>
                    
                    <div className="flex items-start gap-4 group">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-400/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                      <p className="text-green-200/70 text-lg leading-relaxed">
                        <span className="text-white font-medium">Your event. Our experts.</span> Zero stress, <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent font-semibold">only results</span>.
                      </p>
                    </div>
                  </div>
                  
                  {/* CTA Button */}
                  <div className="pt-6">
                    <button 
                      onClick={() => setIsEnquiryModalOpen(true)}
                      className="group relative px-8 py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105"
                    >
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 bg-[length:200%_100%] animate-shimmer" />
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-600 blur-xl opacity-50 group-hover:opacity-70 transition-opacity" />
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                      
                      <span className="relative text-white font-bold text-lg flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                        </svg>
                        Let's Make It Happen
                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
                
                {/* Visual Side - Creative Card Stack */}
                <div className="relative hidden lg:block">
                  <div className="relative h-[400px]">
                    {/* Background Cards */}
                    <div className="absolute top-8 left-8 w-full h-full rounded-3xl bg-gradient-to-br from-green-600/10 to-emerald-600/10 border border-green-400/10 transform rotate-6" />
                    <div className="absolute top-4 left-4 w-full h-full rounded-3xl bg-gradient-to-br from-emerald-600/15 to-green-600/15 border border-emerald-400/15 transform rotate-3" />
                    
                    {/* Main Card */}
                    <div className="relative w-full h-full rounded-3xl bg-gradient-to-br from-[#143d28] to-[#0d2a1c] border border-green-400/20 p-8 flex flex-col justify-center overflow-hidden">
                      {/* Inner glow */}
                      <div className="absolute top-0 right-0 w-48 h-48 bg-green-500/10 rounded-full blur-3xl" />
                      
                      {/* Stats or trust indicators */}
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-3xl font-bold text-white">100+</p>
                            <p className="text-green-200/60 text-sm">Experienced Crew Members</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center">
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-3xl font-bold text-white">500+</p>
                            <p className="text-green-200/60 text-sm">Events Executed Flawlessly</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <div>
                            <p className="text-3xl font-bold text-white">98%</p>
                            <p className="text-green-200/60 text-sm">Client Satisfaction Rate</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section - Enhanced */}
        <div className="relative">
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/30 via-emerald-600/30 to-green-600/30 rounded-[3rem] blur-3xl" />

          {/* Card */}
          <div className="relative p-[2px] rounded-[3rem] bg-gradient-to-r from-green-500/50 via-emerald-500/50 to-green-500/50">
            <div className="relative p-12 md:p-20 rounded-[2.9rem] bg-gradient-to-br from-[#1b4e2d] via-[#0a2e1a] to-[#1b4e2d] overflow-hidden">
              {/* Animated Gradient Orbs */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-green-600/30 rounded-full blur-3xl animate-pulse" />
              <div
                className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/30 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "1s" }}
              />
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-600/20 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />

              {/* Grid Pattern */}
              <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                  backgroundSize: "30px 30px",
                }}
              />

              <div className="relative text-center max-w-3xl mx-auto">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-green-600/30 to-emerald-600/30 border border-green-400/30 backdrop-blur-sm mb-5">
                  <svg
                    className="w-5 h-5 text-green-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-green-200 text-sm font-medium">
                    Start for free
                  </span>
                </div>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  <span className="text-white">Ready to Create Something </span>
                  <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                    Amazing?
                  </span>
                </h3>

                <p className="text-green-200/60 text-lg md:text-xl mb-10 leading-relaxed">
                  Join thousands of event planners who trust plannix to bring
                  their visions to life. Start planning your next unforgettable
                  event today.
                </p>

              

                {/* Trust Badges */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-green-200/40 text-sm mb-6">
                    Trusted by teams at
                  </p>
                  <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
                    {["Google", "Microsoft", "Amazon", "Meta", "Apple"].map(
                      (company, i) => (
                        <span
                          key={i}
                          className="text-white/60 font-bold text-lg tracking-wider"
                        >
                          {company}
                        </span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for floating animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>

      {/* Business Enquiry Modal */}
      <BusinessEnquiryModal 
        isOpen={isEnquiryModalOpen} 
        onClose={() => setIsEnquiryModalOpen(false)} 
      />
    </section>
  );
};

export default AboutSection;
