import { useState } from "react";

// Team hierarchy data structured by rows
const teamHierarchy = {
  apex: {
    id: 1,
    name: "Ayush Saxena",
    role: "Visionary & Chief Architect",
    title: "The mastermind behind Plannix's core concept and architecture",
    gradient: "from-amber-400 via-yellow-500 to-orange-500",
    icon: "👑",
    image: "/team-images/ayush-saxena.jpeg",
  },
  managers: [
    {
      id: 2,
      name: "Komal Preet Kaur",
      role: "Managing Lead",
      title: "Orchestrating teams & driving project excellence",
      gradient: "from-purple-400 via-violet-500 to-indigo-500",
      icon: "🎯",
      image: "/team-images/komal-kaur.jpeg",
    },
    {
      id: 3,
      name: "Namrata Sharma",
      role: "Backend Developer",
      title: "Engineering powerful server-side solutions",
      gradient: "from-emerald-400 via-green-500 to-lime-500",
      icon: "💻",
      image: "/team-images/namrata-sharma.jpeg",
    },
  ],
  developers: [
    {
      id: 4,
      name: "Vedant Bahadure",
      role: "Full Stack Developer",
      title: "Crafting Plannix's stunning visual experience",
      gradient: "from-cyan-400 via-teal-500 to-emerald-500",
      icon: "🎨",
      image: "/team-images/vedant-bahadure.jpeg",
    },
    {
      id: 5,
      name: "Mahesh Datir",
      role: "Backend Developer",
      title: "Building robust backend infrastructure",
      gradient: "from-green-400 via-emerald-500 to-teal-500",
      icon: "⚙️",
      image: "/team-images/mahesh-datir.jpeg",
    },
    {
      id: 6,
      name: "Sangram",
      role: "Full Stack Developer",
      title: "Bridging frontend & backend seamlessly",
      gradient: "from-blue-400 via-indigo-500 to-purple-500",
      icon: "🚀",
      image: "/team-images/sangram.jpeg",
    },
    {
      id: 7,
      name: "Dipali Bava",
      role: "Android Developer",
      title: "Leading with precision & fostering collaboration",
      gradient: "from-pink-400 via-rose-500 to-red-500",
      icon: "⚡",
      image: "/team-images/dipali-bava.jpeg",
    },
  ],
};

// Compact Card Component with Profile Images
const TeamCard = ({ member, isApex = false, size = "normal" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    apex: "w-64 h-auto",
    normal: "w-52 h-auto",
    small: "w-48 h-auto",
  };

  // Avatar sizes - significantly larger for better visibility
  const avatarSizes = {
    apex: "w-32 h-32",
    normal: "w-24 h-24",
    small: "w-20 h-20",
  };

  const hasImage = member.image && !imageError;

  return (
    <div
      className={`relative group ${sizeClasses[size]}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effect */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${member.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-60 transition-all duration-500`}
      />

      {/* Card Border */}
      <div
        className={`relative p-[3px] rounded-3xl bg-gradient-to-b ${
          isHovered
            ? member.gradient
            : "from-white/30 via-white/10 to-transparent"
        } transition-all duration-500`}
      >
        <div className="relative rounded-3xl bg-[#0a1f14]/95 backdrop-blur-xl overflow-hidden p-5">
          {/* Background Glow */}
          <div
            className={`absolute -top-16 -right-16 w-40 h-40 bg-gradient-to-r ${member.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`}
          />

          {/* Profile Image Container */}
          <div className={`relative ${avatarSizes[size]} mx-auto mb-4`}>
            {/* Rotating gradient ring - larger and more prominent */}
            <div
              className={`absolute -inset-1 bg-gradient-to-r ${member.gradient} rounded-full animate-spin-slow`}
              style={{ animationDuration: "8s" }}
            />

            {/* Image container with gradient border */}
            <div className="absolute inset-[1px] rounded-full overflow-hidden bg-[#0a1f14]">
              {hasImage ? (
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a1f14] to-[#0d2818]">
                  <span
                    className={`${
                      isApex
                        ? "text-5xl"
                        : size === "normal"
                        ? "text-4xl"
                        : "text-3xl"
                    }`}
                  >
                    {member.icon}
                  </span>
                </div>
              )}
            </div>

            {/* Hover overlay with gradient */}
            <div
              className={`absolute inset-[4px] rounded-full bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none`}
            />

            {/* Status indicator - larger */}
            <div
              className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r ${member.gradient} border-[3px] border-[#0a1f14] flex items-center justify-center shadow-lg`}
            >
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            </div>
          </div>

          {/* Content */}
          <div className="relative text-center">
            <h4
              className={`${
                isApex ? "text-xl" : "text-base"
              } font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:${
                member.gradient
              } group-hover:bg-clip-text transition-all`}
            >
              {member.name}
            </h4>
            <p
              className={`bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent text-sm font-semibold mb-2`}
            >
              {member.role}
            </p>
            <p className="text-green-200/60 text-xs leading-relaxed line-clamp-2">
              {member.title}
            </p>
          </div>

          {/* Decorative Line */}
          <div
            className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${member.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
          />
        </div>
      </div>
    </div>
  );
};

// Connecting Lines Component
const ConnectionLines = () => (
  <svg
    className="absolute inset-0 w-full h-full pointer-events-none z-0"
    style={{ top: "-20px" }}
  >
    <defs>
      <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(34, 197, 94, 0.6)" />
        <stop offset="100%" stopColor="rgba(16, 185, 129, 0.2)" />
      </linearGradient>
    </defs>
    {/* Lines will be handled by CSS pseudo-elements for responsiveness */}
  </svg>
);

const MeetTheTeam = () => {
  return (
    <div className="mb-32 relative">
      {/* Header */}
      <div className="text-center mb-16">
        <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          <span className="text-white">Meet the </span>
          <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
            Architects
          </span>
        </h3>
        <p className="text-green-200/60 max-w-2xl mx-auto text-lg mb-2">
          The brilliant minds behind Plannix working to revolutionize event
          planning.
        </p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="w-12 h-[2px] bg-gradient-to-r from-transparent to-green-500" />
          <span className="text-green-400 text-sm font-medium">
            Our Leadership Pyramid
          </span>
          <div className="w-12 h-[2px] bg-gradient-to-l from-transparent to-green-500" />
        </div>
      </div>

      {/* Hierarchy Triangle Structure */}
      <div className="relative max-w-5xl mx-auto">
        {/* Background Triangle Decoration */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
          <div className="w-0 h-0 border-l-[300px] border-r-[300px] border-b-[450px] border-l-transparent border-r-transparent border-b-green-500/30" />
        </div>

        {/* Row 1 - Apex (1 person) */}
        <div className="flex justify-center mb-8 relative">
          {/* Connecting lines down */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[2px] h-8 bg-gradient-to-b from-amber-500/60 to-transparent" />
          <TeamCard member={teamHierarchy.apex} isApex={true} size="apex" />
        </div>

        {/* Connecting line splitter */}
        <div className="relative h-8 flex items-end justify-center mb-4 ">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[200px] md:w-[300px] h-[2px] bg-gradient-to-r from-transparent via-green-500/60 to-transparent" />
          <div className="absolute top-0 left-[calc(50%-100px)] md:left-[calc(50%-150px)] w-[2px] h-8 bg-gradient-to-b from-green-500/60 to-transparent" />
          <div className="absolute top-0 right-[calc(50%-100px)] md:right-[calc(50%-150px)] w-[2px] h-8 bg-gradient-to-b from-green-500/60 to-transparent" />
        </div>

        {/* Row 2 - Managers (2 people) */}
        <div className="flex justify-center gap-8 md:gap-24 mb-8 relative">
          {teamHierarchy.managers.map((member) => (
            <div key={member.id} className="relative">
              {/* Connecting line down */}
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-[2px] h-6 bg-gradient-to-b from-purple-500/40 to-transparent" />
              <TeamCard member={member} size="normal" />
            </div>
          ))}
        </div>

        {/* Connecting line for developers */}
        <div className="relative h-6 flex items-end justify-center mb-4">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[700px] h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
        </div>

        {/* Row 3 - Developers (4 people) */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {teamHierarchy.developers.map((member) => (
            <TeamCard key={member.id} member={member} size="small" />
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute -left-4 top-1/3 w-24 h-24 bg-green-500/10 rounded-full blur-3xl" />
        <div className="absolute -right-4 top-2/3 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      {/* Bottom Decoration */}
      <div className="mt-16 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-500/20">
          <span className="text-green-400">✨</span>
          <span className="text-green-200/80 text-sm font-medium">
            United by passion, driven by innovation
          </span>
          <span className="text-green-400">✨</span>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MeetTheTeam;
