import { useState, useRef } from "react";

// Team members data as flat array
const teamMembers = [
  {
    id: 1,
    name: "Ayush Saxena",
    role: "Visionary & Chief Architect",
    title: "The mastermind behind Plannix's core concept and architecture",
    gradient: "from-amber-400 via-yellow-500 to-orange-500",
    accentColor: "#f59e0b",
    icon: "👑",
    image: "/team-images/ayush-saxena.jpeg",
  },
  {
    id: 2,
    name: "Komal Preet Kaur",
    role: "Managing Lead",
    title: "Orchestrating teams & driving project excellence",
    gradient: "from-purple-400 via-violet-500 to-indigo-500",
    accentColor: "#8b5cf6",
    icon: "🎯",
    image: "/team-images/komal-kaur.jpeg",
  },
  {
    id: 3,
    name: "Namrata Sharma",
    role: "Backend Developer",
    title: "Engineering powerful server-side solutions",
    gradient: "from-emerald-400 via-green-500 to-lime-500",
    accentColor: "#10b981",
    icon: "💻",
    image: "/team-images/namrata-sharma.jpeg",
  },
  {
    id: 8,
    name: "Shubham Singh Rajput",
    role: "Network & Server Handler",
    title: "Managing network infrastructure & server operations",
    gradient: "from-sky-400 via-blue-500 to-indigo-600",
    accentColor: "#3b82f6",
    icon: "🌐",
    image: "/team-images/shubham.jpg",
  },
  {
    id: 4,
    name: "Vedant Bahadure",
    role: "Full Stack Developer",
    title: "Crafting Plannix's stunning visual experience",
    gradient: "from-cyan-400 via-teal-500 to-emerald-500",
    accentColor: "#14b8a6",
    icon: "🎨",
    image: "/team-images/vedant-bahadure.jpeg",
  },
  {
    id: 5,
    name: "Mahesh Datir",
    role: "Backend Developer",
    title: "Building robust backend infrastructure",
    gradient: "from-green-400 via-emerald-500 to-teal-500",
    accentColor: "#22c55e",
    icon: "⚙️",
    image: "/team-images/mahesh-datir.jpeg",
  },
  {
    id: 6,
    name: "Sangram",
    role: "Full Stack Developer",
    title: "Bridging frontend & backend seamlessly",
    gradient: "from-blue-400 via-indigo-500 to-purple-500",
    accentColor: "#6366f1",
    icon: "🚀",
    image: "/team-images/sangram.jpeg",
  },
  {
    id: 7,
    name: "Dipali Bava",
    role: "Android Developer",
    title: "Leading with precision & fostering collaboration",
    gradient: "from-pink-400 via-rose-500 to-red-500",
    accentColor: "#f43f5e",
    icon: "⚡",
    image: "/team-images/dipali-bava.jpeg",
  },
];

// 3D Tilt Card Component with enhanced visuals
const TeamCard = ({ member, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const cardRef = useRef(null);

  const hasImage = member.image && !imageError;

  // 3D Tilt effect handler
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 12;
    const rotateY = (centerX - x) / 12;
    
    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`,
      transition: 'transform 0.1s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s ease-out',
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      className="relative group w-72 h-[420px]"
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        ...tiltStyle,
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Ambient Glow Effect */}
      <div
        className={`absolute -inset-4 bg-gradient-to-r ${member.gradient} rounded-[2rem] blur-2xl transition-all duration-700`}
        style={{
          opacity: isHovered ? 0.4 : 0.1,
          transform: 'translateZ(-50px)',
        }}
      />

      {/* Main Card Container */}
      <div
        className={`relative h-full rounded-[1.50rem] overflow-hidden transition-all duration-500 py-4 mx-1`}
        style={{
          background: 'linear-gradient(145deg, rgba(15, 35, 25, 0.98) 0%, rgba(8, 25, 18, 0.99) 100%)',
          boxShadow: isHovered 
            ? `0 30px 60px -15px rgba(0, 0, 0, 0.5), 0 0 40px -10px ${member.accentColor}40`
            : '0 20px 40px -15px rgba(0, 0, 0, 0.3)',
          border: `1px solid ${isHovered ? member.accentColor + '60' : 'rgba(255, 255, 255, 0.08)'}`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Floating Particles Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${member.gradient}`}
              style={{
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
                opacity: isHovered ? 0.6 : 0,
                transform: `translateZ(20px) scale(${isHovered ? 1 : 0})`,
                transition: `all 0.5s ease-out ${i * 0.1}s`,
                animation: isHovered ? `float-particle ${3 + i * 0.5}s ease-in-out infinite` : 'none',
              }}
            />
          ))}
        </div>

        {/* Gradient Mesh Overlay */}
        <div
          className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
          style={{
            background: `radial-gradient(ellipse at 30% 20%, ${member.accentColor}15 0%, transparent 50%),
                         radial-gradient(ellipse at 70% 80%, ${member.accentColor}10 0%, transparent 50%)`,
            transform: 'translateZ(5px)',
          }}
        />

        {/* Top Decorative Arc */}
        <div 
          className="absolute top-0 left-0 right-0 h-32 overflow-hidden"
          style={{ transform: 'translateZ(10px)' }}
        >
          <div
            className={`absolute -top-24 left-1/2 -translate-x-1/2 w-[200%] h-48 rounded-[50%] bg-gradient-to-b ${member.gradient} opacity-10 group-hover:opacity-25 transition-opacity duration-500`}
          />
        </div>

        {/* Profile Image Section */}
        <div 
          className="relative pt-10 px-6"
          style={{ transform: 'translateZ(30px)' }}
        >
          {/* Avatar Container */}
          <div className="relative w-36 h-36 mx-auto">
            {/* Orbiting Ring */}
            <div
              className={`absolute -inset-3 rounded-full border-2 border-dashed opacity-30 group-hover:opacity-60 transition-opacity duration-500`}
              style={{
                borderColor: member.accentColor,
                animation: 'orbit 20s linear infinite',
              }}
            />

            {/* Glowing Border Ring */}
            <div
              className={`absolute -inset-1.5 bg-gradient-to-br ${member.gradient} rounded-full opacity-80 group-hover:opacity-100 transition-all duration-500`}
              style={{
                animation: 'pulse-glow 3s ease-in-out infinite',
              }}
            />

            {/* Inner Shadow Ring */}
            <div className="absolute inset-0 rounded-full bg-[#0a1f14] p-1">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                {hasImage ? (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0d2818] to-[#0a1f14]">
                    <span className="text-5xl">{member.icon}</span>
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${member.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                />
              </div>
            </div>

            {/* Status Badge */}
            <div
              className={`absolute -bottom-1 right-2 w-8 h-8 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center shadow-lg`}
              style={{
                transform: 'translateZ(40px)',
                boxShadow: `0 4px 15px ${member.accentColor}50`,
              }}
            >
              <span className="text-sm">{member.icon}</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div 
          className="relative px-6 pt-6 pb-8 text-center"
          style={{ transform: 'translateZ(25px)' }}
        >
          {/* Name */}
          <h4
            className="text-xl font-bold text-white mb-2 transition-all duration-500"
            style={{
              textShadow: isHovered ? `0 0 20px ${member.accentColor}50` : 'none',
            }}
          >
            {member.name}
          </h4>

          {/* Role Badge */}
          <div className="inline-block mb-4">
            <span
              className={`px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${member.gradient}`}
              style={{
                background: isHovered ? `linear-gradient(135deg, ${member.accentColor}20 0%, transparent 100%)` : 'transparent',
                border: `1px solid ${member.accentColor}30`,
              }}
            >
              {member.role}
            </span>
          </div>

          {/* Title/Description */}
          <p className="text-green-200/60 text-sm leading-relaxed line-clamp-2">
            {member.title}
          </p>

          {/* Social/Action Hints */}
          <div
            className={`mt-5 flex justify-center gap-3 transition-all duration-500`}
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0) translateZ(30px)' : 'translateY(10px) translateZ(30px)',
            }}
          >
            {['●', '●', '●'].map((dot, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${member.gradient} opacity-60`}
                style={{
                  animation: isHovered ? `dot-pulse 1.5s ease-in-out ${i * 0.2}s infinite` : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${member.gradient} transition-all duration-500`}
          style={{
            opacity: isHovered ? 1 : 0.3,
            transform: `scaleX(${isHovered ? 1 : 0.3}) translateZ(10px)`,
          }}
        />

        {/* Corner Accents */}
        <div
          className={`absolute top-4 right-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500`}
          style={{
            borderTop: `2px solid ${member.accentColor}40`,
            borderRight: `2px solid ${member.accentColor}40`,
            borderRadius: '0 8px 0 0',
            transform: 'translateZ(20px)',
          }}
        />
        <div
          className={`absolute bottom-4 left-4 w-8 h-8 opacity-0 group-hover:opacity-100 transition-all duration-500`}
          style={{
            borderBottom: `2px solid ${member.accentColor}40`,
            borderLeft: `2px solid ${member.accentColor}40`,
            borderRadius: '0 0 0 8px',
            transform: 'translateZ(20px)',
          }}
        />
      </div>
    </div>
  );
};

const MeetTheTeam = () => {
  return (
    <div className="mb-32 relative overflow-visible">
      {/* Ambient Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header Section */}
      <div className="text-center mb-20 relative">
        {/* Decorative Top Element */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 flex items-center justify-center backdrop-blur-sm border border-green-500/20">
              <span className="text-3xl">👥</span>
            </div>
            <div className="absolute -inset-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-xl -z-10" />
          </div>
        </div>

        {/* Main Title */}
        <h3 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          <span className="text-white">Meet the </span>
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Architects
            </span>
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-full opacity-50" />
          </span>
        </h3>

        {/* Subtitle */}
        <p className="text-green-200/60 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
          The brilliant minds behind Plannix working to revolutionize event planning.
        </p>

        {/* Decorative Divider */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
          <div className="flex gap-1.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                style={{
                  animation: `dot-pulse 2s ease-in-out ${i * 0.3}s infinite`,
                }}
              />
            ))}
          </div>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent" />
        </div>
      </div>

      {/* Team Grid */}
      <div className="relative max-w-7xl mx-auto px-4 md:px-8 pt-8 pb-28">
        {/* Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20 justify-items-center">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-20 text-center">
        <div className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500/10 via-emerald-500/5 to-green-500/10 border border-green-500/20 backdrop-blur-sm">
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse" />
          <span className="text-green-200/80 text-base font-medium tracking-wide">
            United by passion, driven by innovation
          </span>
          <div className="w-3 h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateZ(20px); }
          50% { transform: translateY(-10px) translateZ(20px); }
        }
        
        @keyframes dot-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.3); opacity: 1; }
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
