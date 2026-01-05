import { useState, useEffect, useRef, useCallback } from "react";

// Upcoming events data
const upcomingEventsData = [
  {
    id: 1,
    title: "Khajuraho Dance Festival 2026",
    date: "Feb 20-26, 2026",
    location: "UNESCO World Heritage Site, Khajuraho, MP",
    description:
      "India's premier classical dance festival celebrating 52 years of heritage. Experience mesmerizing performances from India's finest classical dancers at the magnificent Khajuraho Temples.",
    attendees: 5000,
    category: "Cultural",
    image: "https://khajuraho.staffhandler.com/images/banner-image2.webp",
    color: "from-orange-500 to-red-600",
  },

  {
    id: 2,
    title: "Tech Summit 2026",
    date: "Jan 22, 2026",
    location: "Bangalore Convention Center",
    description:
      "The biggest tech conference of the year featuring keynotes from industry leaders, workshops, networking sessions, and cutting-edge product launches.",
    attendees: 2000,
    category: "Corporate",
    image:
      "https://in.nau.edu/wp-content/uploads/sites/162/2025/09/Tech-Summit-2026-Header-600x267.jpg",
    color: "from-blue-500 to-indigo-600",
  },
  {
    id: 3,
    title: "Milestone Birthday Bash",
    date: "Feb 5, 2026",
    location: "Sky Lounge, Delhi",
    description:
      "A spectacular 50th birthday celebration with live entertainment, themed decorations, gourmet cuisine, and an unforgettable party atmosphere.",
    attendees: 150,
    category: "Birthday",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&h=400&fit=crop",
    color: "from-amber-500 to-orange-600",
  },
  {
    id: 4,
    title: "Golden Anniversary Gala",
    date: "Feb 14, 2026",
    location: "Heritage Resort, Jaipur",
    description:
      "Celebrating 50 years of love and togetherness. An elegant evening of memories, family, friends, and the renewal of vows in a stunning heritage setting.",
    attendees: 200,
    category: "Anniversary",
    image: "https://www.oyorooms.com/blog/wp-content/uploads/2018/03/fe-15.jpg",
    color: "from-yellow-500 to-amber-600",
  },
  {
    id: 5,
    title: "Holi Festival Party",
    date: "Mar 14, 2026",
    location: "Garden Estate, Pune",
    description:
      "Experience the festival of colors like never before! DJ music, organic colors, traditional sweets, thandai bar, and non-stop dancing.",
    attendees: 800,
    category: "Festive",
    image:
      "https://media.istockphoto.com/id/1381030718/photo/barsana-holi-one-of-the-most-joyful-festival-of-india-this-is-birth-place-of-radha-lord.jpg?s=612x612&w=0&k=20&c=c0kcjHpSFJXg7F4D6s8Ez-7RWY3MjoIrwsiRQKScank=",
    color: "from-purple-500 to-pink-600",
  },
  {
    id: 6,
    title: "Sangeet Night Extravaganza",
    date: "Mar 20, 2026",
    location: "Royal Ballroom, Udaipur",
    description:
      "A night of dance, music, and celebration! Professional choreography, live band, stunning stage setup, and memories to last a lifetime.",
    attendees: 300,
    category: "Sangeet",
    image:
      "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&h=400&fit=crop",
    color: "from-fuchsia-500 to-purple-600",
  },
];

const UpcomingEvents = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationY, setRotationY] = useState(0); // Horizontal rotation (left-right)
  const [rotationX, setRotationX] = useState(-15); // Vertical rotation (up-down tilt)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentRotationY, setCurrentRotationY] = useState(0);
  const [currentRotationX, setCurrentRotationX] = useState(-15);
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const autoPlayTimerRef = useRef(null);

  const totalItems = upcomingEventsData.length;
  const anglePerItem = 360 / totalItems;

  // Simple auto-rotation: move to next card every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying || isDragging) {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return;
    }

    autoPlayTimerRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const nextIndex = (prev + 1) % totalItems;
        setRotationY(-nextIndex * anglePerItem);
        return nextIndex;
      });
    }, 2000); // Change card every 4 seconds

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
  }, [isAutoPlaying, isDragging, totalItems, anglePerItem]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setIsAutoPlaying(false);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setCurrentRotationY(rotationY);
    setCurrentRotationX(rotationX);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const rotationSpeed = 0.5; // Adjust sensitivity

      // Horizontal drag controls Y-axis rotation (spin left/right)
      setRotationY(currentRotationY + deltaX * rotationSpeed);

      // Vertical drag controls X-axis rotation (tilt up/down)
      // Clamp between -60 and 30 degrees for reasonable viewing angles
      const newRotationX = Math.max(
        -60,
        Math.min(30, currentRotationX - deltaY * rotationSpeed)
      );
      setRotationX(newRotationX);
    },
    [isDragging, startX, startY, currentRotationY, currentRotationX]
  );

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Snap to nearest card (only for Y rotation)
      const normalizedRotation = ((-rotationY % 360) + 360) % 360;
      const nearestIndex =
        Math.round(normalizedRotation / anglePerItem) % totalItems;
      const snappedRotation = -nearestIndex * anglePerItem;
      setRotationY(snappedRotation);
      setActiveIndex(nearestIndex);
      // Resume auto-play after 3 seconds of inactivity
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  // Touch handlers for mobile
  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setIsAutoPlaying(false);
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setCurrentRotationY(rotationY);
    setCurrentRotationX(rotationX);
  };

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDragging) return;
      e.preventDefault();

      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - startY;
      const rotationSpeed = 0.5;

      setRotationY(currentRotationY + deltaX * rotationSpeed);
      const newRotationX = Math.max(
        -60,
        Math.min(30, currentRotationX - deltaY * rotationSpeed)
      );
      setRotationX(newRotationX);
    },
    [isDragging, startX, startY, currentRotationY, currentRotationX]
  );

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const goToSlide = (index) => {
    const snappedRotation = -index * anglePerItem;
    setRotationY(snappedRotation);
    setActiveIndex(index);
    // Pause auto-play briefly when manually selecting
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const activeEvent = upcomingEventsData[activeIndex];

  return (
    <section
      id="events"
      className="relative min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 py-20 overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 text-green-300 text-sm font-medium mb-4">
            ✨ Coming Soon
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Upcoming{" "}
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
              Events
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover and explore the most anticipated events.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Side - Event Content */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Event Details Card */}
              <div
                key={activeEvent.id}
                className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl transition-all duration-700 ease-out"
              >
                {/* Category Badge */}
                <div className="flex items-center gap-3 mb-6">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${activeEvent.color} text-white shadow-lg`}
                  >
                    {activeEvent.category}
                  </span>
                  <span className="text-gray-400 text-sm flex items-center gap-2">
                    <svg
                      className="w-4 h-4"
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
                    {activeEvent.date}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {activeEvent.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-300 mb-6">
                  <svg
                    className="w-5 h-5 text-green-400"
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
                  <span>{activeEvent.location}</span>
                </div>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed mb-8">
                  {activeEvent.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {activeEvent.attendees.toLocaleString()}+
                      </p>
                      <p className="text-gray-500 text-xs">Expected Guests</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <button
                    className={`px-8 py-3 rounded-full font-semibold text-white bg-gradient-to-r ${activeEvent.color} shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300`}
                  >
                    Book Now
                  </button>
                  <button className="px-8 py-3 rounded-full font-semibold text-white border border-white/20 hover:bg-white/10 transition-all duration-300">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {upcomingEventsData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - 3D Carousel */}
          <div
            ref={containerRef}
            className={`order-1 lg:order-2 h-[400px] md:h-[450px] relative select-none ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            }`}
            style={{
              userSelect: "none",
              WebkitUserSelect: "none",
              touchAction: "none",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 3D Carousel Container */}
            <div
              ref={carouselRef}
              className="absolute inset-0 flex items-center justify-center"
              style={{
                perspective: "800px",
                perspectiveOrigin: "50% 50%",
              }}
            >
              <div
                className="relative w-56 h-36 md:w-64 md:h-40"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                  transition: isDragging
                    ? "  none"
                    : "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                {upcomingEventsData.map((event, index) => {
                  const angle = index * anglePerItem;
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={event.id}
                      className="absolute inset-0 cursor-pointer"
                      style={{
                        transformStyle: "preserve-3d",
                        transform: `rotateY(${angle}deg) translateZ(250px)`,
                      }}
                      onClick={() => goToSlide(index)}
                    >
                      {/* Card */}
                      <div
                        className={`w-full h-full rounded-lg overflow-hidden shadow-2xl transition-all duration-500 ${
                          isActive
                            ? "shadow-md shadow-green-400 border border-green-700 "
                            : "opacity-90"
                        }`}
                        style={{
                          backfaceVisibility: "visible",
                        }}
                      >
                        {/* Image */}
                        <div className="relative w-full h-full">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover pointer-events-none"
                            draggable="false"
                            loading="lazy"
                          />
                          {/* Gradient Overlay */}
                          <div
                            className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent`}
                          />
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-30 mix-blend-overlay`}
                          />

                          {/* Card Content */}
                          <div className="absolute bottom-0 left-0 right-0 p-3">
                            <span
                              className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold bg-white/20 backdrop-blur-sm text-white mb-1`}
                            >
                              {event.category}
                            </span>
                            <h4 className="text-white font-bold text-xs leading-tight">
                              {event.title}
                            </h4>
                          </div>

                          {/* Glow Effect for Active */}
                          {isActive && (
                            <div className="absolute inset-0 rounded-lg ring-2 ring-green-400/60" />
                          )}
                        </div>
                      </div>

                      {/* Mirror Reflection - below card, fades at bottom */}
                      <div
                        className="absolute left-0 w-full pointer-events-none"
                        style={{
                          top: "105%",
                          height: "70%",
                        }}
                      >
                        <img
                          src={event.image}
                          alt=""
                          className="w-full h-full object-cover object-top rounded-lg"
                          draggable="false"
                          loading="lazy"
                          style={{
                            transform: "scaleY(1)",
                            opacity: 0.35,
                            filter: "blur(1px)",
                            maskImage:
                              "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 80%)",
                            WebkitMaskImage:
                              "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 80%)",
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Floor reflection gradient */}
            <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-20 rounded-full bg-green-500/10 blur-2xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />
    </section>
  );
};

export default UpcomingEvents;
