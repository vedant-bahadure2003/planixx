import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// Cities data with gradient colors
const citiesData = [
  { id: "all", name: "All Cities", icon: "🌍", color: "from-emerald-500 to-green-500" },
  { id: "delhi", name: "New Delhi", icon: "🏛️", color: "from-orange-500 to-red-500" },
  { id: "mumbai", name: "Mumbai", icon: "🌊", color: "from-blue-500 to-indigo-500" },
  { id: "bangalore", name: "Bangalore", icon: "💻", color: "from-purple-500 to-violet-500" },
  { id: "jaipur", name: "Jaipur", icon: "🏰", color: "from-pink-500 to-rose-500" },
  { id: "pune", name: "Pune", icon: "🎭", color: "from-teal-500 to-cyan-500" },
  { id: "khajuraho", name: "Khajuraho", icon: "🛕", color: "from-amber-500 to-yellow-500" },
  { id: "rishikesh", name: "Rishikesh", icon: "🧘", color: "from-green-500 to-lime-500" },
];

// Categories data with icons and colors
const categoriesData = [
  { id: "all", name: "All Categories", icon: "✨", color: "from-emerald-500 to-green-500" },
  { id: "Cultural", name: "Cultural", icon: "🎭", color: "from-orange-500 to-red-500" },
  { id: "Corporate", name: "Corporate", icon: "💼", color: "from-blue-500 to-indigo-500" },
  { id: "Expo", name: "Expo", icon: "🎪", color: "from-cyan-500 to-blue-500" },
  { id: "Anniversary", name: "Anniversary", icon: "💍", color: "from-yellow-500 to-amber-500" },
  { id: "Festive", name: "Festive", icon: "🎉", color: "from-purple-500 to-pink-500" },
  { id: "Wellness", name: "Wellness", icon: "🧘", color: "from-teal-500 to-green-500" },
  { id: "Concert", name: "Concert", icon: "🎵", color: "from-red-500 to-orange-500" },
];

// Enhanced upcoming events data with city IDs
const upcomingEventsData = [
  {
    id: 1,
    title: "Khajuraho Dance Festival 2026",
    date: "Feb 20-26, 2026",
    dateValue: "2026-02-20",
    cityId: "khajuraho",
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
    dateValue: "2026-01-22",
    cityId: "bangalore",
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
    title: "Business Expo 2026",
    date: "Feb 5-8, 2026",
    dateValue: "2026-02-05",
    cityId: "delhi",
    location: "Pragati Maidan, New Delhi",
    description:
      "India's largest business and technology exposition featuring 500+ exhibitors, networking opportunities, and keynote sessions from industry leaders across multiple sectors.",
    attendees: 25000,
    category: "Expo",
    image:
      "https://img2.chinadaily.com.cn/images/202305/26/64704543a310b60580cdbf02.jpeg",
    color: "from-blue-600 to-cyan-500",
  },
  {
    id: 4,
    title: "Golden Anniversary Gala",
    date: "Feb 14, 2026",
    dateValue: "2026-02-14",
    cityId: "jaipur",
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
    dateValue: "2026-03-14",
    cityId: "pune",
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
    title: "International Yoga Day Retreat",
    date: "Jun 21, 2026",
    dateValue: "2026-06-21",
    cityId: "rishikesh",
    location: "Rishikesh Yoga Valley, Uttarakhand",
    description:
      "Celebrate International Yoga Day with sunrise sessions by the Ganges, Ayurvedic wellness programs, and teachings from renowned yoga masters in the yoga capital of the world.",
    attendees: 1500,
    category: "Wellness",
    image:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600&h=400&fit=crop",
    color: "from-teal-500 to-green-600",
  },
  {
    id: 7,
    title: "Bollywood Music Night",
    date: "Apr 10, 2026",
    dateValue: "2026-04-10",
    cityId: "mumbai",
    location: "Juhu Beach Arena, Mumbai",
    description:
      "A star-studded night featuring live performances from Bollywood's biggest music icons. Dance to chart-topping hits under the stars.",
    attendees: 10000,
    category: "Concert",
    image:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop",
    color: "from-red-500 to-orange-600",
  },
];

// Maximum events for 3D carousel mode
const MAX_CAROUSEL_EVENTS = 6;
const DEFAULT_DISPLAY_COUNT = 6;

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const UpcomingEvents = () => {
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(-15);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentRotationY, setCurrentRotationY] = useState(0);
  const [currentRotationX, setCurrentRotationX] = useState(-15);
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [sliderScrollPosition, setSliderScrollPosition] = useState(0);
  const [randomizedEvents, setRandomizedEvents] = useState([]);
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const autoPlayTimerRef = useRef(null);
  const cityDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);

  // Initialize with 6 random events on mount
  useEffect(() => {
    const shuffled = shuffleArray(upcomingEventsData);
    setRandomizedEvents(shuffled.slice(0, DEFAULT_DISPLAY_COUNT));
  }, []);

  // Months for filtering
  const months = useMemo(() => [
    { id: "all", name: "All Months", short: "All" },
    { id: "01", name: "January", short: "Jan" },
    { id: "02", name: "February", short: "Feb" },
    { id: "03", name: "March", short: "Mar" },
    { id: "04", name: "April", short: "Apr" },
    { id: "05", name: "May", short: "May" },
    { id: "06", name: "June", short: "Jun" },
    { id: "07", name: "July", short: "Jul" },
    { id: "08", name: "August", short: "Aug" },
    { id: "09", name: "September", short: "Sep" },
    { id: "10", name: "October", short: "Oct" },
    { id: "11", name: "November", short: "Nov" },
    { id: "12", name: "December", short: "Dec" },
  ], []);

  // Check if any filter is active
  const hasActiveFilters = selectedCity !== "all" || selectedMonth !== "all" || selectedCategory !== "all";

  // Filter events based on selected city, month, and category
  const filteredEvents = useMemo(() => {
    // If no filters are active, show randomized events
    if (!hasActiveFilters) {
      return randomizedEvents;
    }
    
    // Otherwise, filter from all events
    return upcomingEventsData.filter((event) => {
      const cityMatch = selectedCity === "all" || event.cityId === selectedCity;
      const monthMatch = selectedMonth === "all" || event.dateValue.split("-")[1] === selectedMonth;
      const categoryMatch = selectedCategory === "all" || event.category === selectedCategory;
      return cityMatch && monthMatch && categoryMatch;
    });
  }, [selectedCity, selectedMonth, selectedCategory, hasActiveFilters, randomizedEvents]);

  // Determine if we should use 3D carousel or horizontal slider
  const useCarousel = filteredEvents.length <= MAX_CAROUSEL_EVENTS;

  // Calculate dynamic carousel properties
  const totalItems = filteredEvents.length;
  const anglePerItem = totalItems > 0 ? 360 / totalItems : 0;
  const translateZ = totalItems <= 3 ? 180 : totalItems <= 5 ? 220 : 250;

  // Reset active index when filters change
  useEffect(() => {
    setActiveIndex(0);
    setRotationY(0);
    setSliderScrollPosition(0);
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  }, [selectedCity, selectedMonth, selectedCategory]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityDropdownRef.current && !cityDropdownRef.current.contains(event.target)) {
        setIsCityDropdownOpen(false);
      }
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setIsCategoryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Auto-rotation for carousel mode
  useEffect(() => {
    if (!useCarousel || !isAutoPlaying || isDragging || totalItems === 0) {
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
    }, 2500);

    return () => {
      if (autoPlayTimerRef.current) {
        clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
    };
  }, [useCarousel, isAutoPlaying, isDragging, totalItems, anglePerItem]);

  // Auto-scroll for slider mode
  useEffect(() => {
    if (useCarousel || !isAutoPlaying || totalItems === 0) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const scrollInterval = setInterval(() => {
      const maxScroll = slider.scrollWidth - slider.clientWidth;
      const newPosition = sliderScrollPosition + 320;
      
      if (newPosition >= maxScroll) {
        slider.scrollTo({ left: 0, behavior: 'smooth' });
        setSliderScrollPosition(0);
        setActiveIndex(0);
      } else {
        slider.scrollTo({ left: newPosition, behavior: 'smooth' });
        setSliderScrollPosition(newPosition);
        setActiveIndex(Math.min(Math.floor(newPosition / 320), totalItems - 1));
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, [useCarousel, isAutoPlaying, sliderScrollPosition, totalItems]);

  // Carousel drag handlers
  const handleMouseDown = (e) => {
    if (!useCarousel) return;
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
      if (!isDragging || !useCarousel) return;
      e.preventDefault();
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      const rotationSpeed = 0.5;
      setRotationY(currentRotationY + deltaX * rotationSpeed);
      setRotationX(Math.max(-60, Math.min(30, currentRotationX - deltaY * rotationSpeed)));
    },
    [isDragging, useCarousel, startX, startY, currentRotationY, currentRotationX]
  );

  const handleMouseUp = useCallback(() => {
    if (isDragging && totalItems > 0 && useCarousel) {
      setIsDragging(false);
      const normalizedRotation = ((-rotationY % 360) + 360) % 360;
      const nearestIndex = Math.round(normalizedRotation / anglePerItem) % totalItems;
      setRotationY(-nearestIndex * anglePerItem);
      setActiveIndex(nearestIndex);
      setTimeout(() => setIsAutoPlaying(true), 3000);
    }
  }, [isDragging, totalItems, useCarousel, rotationY, anglePerItem]);

  const handleMouseLeave = () => {
    if (isDragging) handleMouseUp();
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    if (!useCarousel) return;
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
      if (!isDragging || !useCarousel) return;
      e.preventDefault();
      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - startY;
      const rotationSpeed = 0.5;
      setRotationY(currentRotationY + deltaX * rotationSpeed);
      setRotationX(Math.max(-60, Math.min(30, currentRotationX - deltaY * rotationSpeed)));
    },
    [isDragging, useCarousel, startX, startY, currentRotationY, currentRotationX]
  );

  const handleTouchEnd = () => handleMouseUp();

  const goToSlide = (index) => {
    if (useCarousel) {
      setRotationY(-index * anglePerItem);
    } else if (sliderRef.current) {
      const scrollPosition = index * 320;
      sliderRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
      setSliderScrollPosition(scrollPosition);
    }
    setActiveIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const scrollSlider = (direction) => {
    if (!sliderRef.current) return;
    const slider = sliderRef.current;
    const scrollAmount = 320;
    const newPosition = direction === 'left' 
      ? Math.max(0, sliderScrollPosition - scrollAmount)
      : Math.min(slider.scrollWidth - slider.clientWidth, sliderScrollPosition + scrollAmount);
    
    slider.scrollTo({ left: newPosition, behavior: 'smooth' });
    setSliderScrollPosition(newPosition);
    setActiveIndex(Math.floor(newPosition / scrollAmount));
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handleSliderScroll = () => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      setSliderScrollPosition(scrollLeft);
      const newIndex = Math.round(scrollLeft / 320);
      if (newIndex !== activeIndex && newIndex < totalItems) {
        setActiveIndex(newIndex);
      }
    }
  };

  const clearAllFilters = () => {
    setSelectedCity("all");
    setSelectedMonth("all");
    setSelectedCategory("all");
  };

  const activeEvent = filteredEvents[activeIndex] || null;
  const selectedCityData = citiesData.find((c) => c.id === selectedCity);
  const selectedCategoryData = categoriesData.find((c) => c.id === selectedCategory);

  // Get event counts for filters
  const getCityEventCount = useCallback((cityId) => {
    if (cityId === "all") return upcomingEventsData.length;
    return upcomingEventsData.filter(e => e.cityId === cityId).length;
  }, []);

  const getCategoryEventCount = useCallback((categoryId) => {
    if (categoryId === "all") return upcomingEventsData.length;
    return upcomingEventsData.filter(e => e.category === categoryId).length;
  }, []);

  const getMonthEventCount = useCallback((monthId) => {
    if (monthId === "all") return filteredEvents.length;
    return upcomingEventsData.filter(e => 
      (selectedCity === "all" || e.cityId === selectedCity) &&
      (selectedCategory === "all" || e.category === selectedCategory) &&
      e.dateValue.split("-")[1] === monthId
    ).length;
  }, [selectedCity, selectedCategory, filteredEvents.length]);

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
        <div className="text-center mb-12">
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
            Discover and explore the most anticipated events in your city.
          </p>
        </div>

        {/* Filter Controls - Optimized Glass Design */}
        <div className="mb-12 relative z-30">
          <div className="max-w-5xl mx-auto">
            {/* Background Card - decorative only */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-emerald-500/20 to-transparent rounded-br-2xl" />
            </div>
            
            {/* Filter Content - with overflow visible for dropdowns */}
            <div className="relative p-6">
              {/* Filter Row */}
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 items-start">
                
                {/* City Dropdown */}
                <div ref={cityDropdownRef} className="relative w-full lg:w-56 z-40">
                  <label className="block text-xs font-semibold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Select City
                  </label>
                  <button
                    onClick={() => {
                      setIsCityDropdownOpen(!isCityDropdownOpen);
                      setIsCategoryDropdownOpen(false);
                    }}
                    className="w-full bg-gray-900/80 hover:bg-gray-800/90 border border-white/10 hover:border-green-500/50 rounded-xl px-4 py-3 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{selectedCityData?.icon}</span>
                        <span className="text-white font-medium">{selectedCityData?.name}</span>
                      </div>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isCityDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {isCityDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-2 bg-gray-900 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl animate-fadeIn" style={{zIndex: 9999}}>
                      <div className="max-h-72 overflow-y-auto custom-scrollbar p-2">
                        {citiesData.map((city) => (
                          <button
                            key={city.id}
                            onClick={() => {
                              setSelectedCity(city.id);
                              setIsCityDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                              selectedCity === city.id
                                ? `bg-gradient-to-r ${city.color} text-white shadow-lg`
                                : "hover:bg-white/10 text-gray-300 hover:text-white"
                            }`}
                          >
                            <span className="text-xl">{city.icon}</span>
                            <span className="font-medium flex-1 text-left">{city.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${selectedCity === city.id ? "bg-white/20" : "bg-gray-700/80 text-gray-300"}`}>
                              {getCityEventCount(city.id)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Category Dropdown */}
                <div ref={categoryDropdownRef} className="relative w-full lg:w-56 z-40">
                  <label className="block text-xs font-semibold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Select Category
                  </label>
                  <button
                    onClick={() => {
                      setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                      setIsCityDropdownOpen(false);
                    }}
                    className="w-full bg-gray-900/80 hover:bg-gray-800/90 border border-white/10 hover:border-green-500/50 rounded-xl px-4 py-3 text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/40"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{selectedCategoryData?.icon}</span>
                        <span className="text-white font-medium">{selectedCategoryData?.name}</span>
                      </div>
                      <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  
                  {isCategoryDropdownOpen && (
                    <div className="absolute left-0 right-0 mt-2 bg-gray-900 backdrop-blur-xl border border-white/20 rounded-xl shadow-2xl animate-fadeIn" style={{zIndex: 9999}}>
                      <div className="max-h-72 overflow-y-auto custom-scrollbar p-2">
                        {categoriesData.map((category) => (
                          <button
                            key={category.id}
                            onClick={() => {
                              setSelectedCategory(category.id);
                              setIsCategoryDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                              selectedCategory === category.id
                                ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                                : "hover:bg-white/10 text-gray-300 hover:text-white"
                            }`}
                          >
                            <span className="text-xl">{category.icon}</span>
                            <span className="font-medium flex-1 text-left">{category.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${selectedCategory === category.id ? "bg-white/20" : "bg-gray-700/80 text-gray-300"}`}>
                              {getCategoryEventCount(category.id)}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Month Pills */}
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Select Month
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {months.slice(0, 7).map((month) => {
                      const count = getMonthEventCount(month.id);
                      return (
                        <button
                          key={month.id}
                          onClick={() => setSelectedMonth(month.id)}
                          disabled={count === 0 && month.id !== "all"}
                          className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                            selectedMonth === month.id
                              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30"
                              : count > 0
                                ? "bg-gray-800/60 text-gray-300 hover:bg-gray-700/70 hover:text-white border border-white/10"
                                : "bg-gray-900/40 text-gray-600 cursor-not-allowed border border-white/5"
                          }`}
                        >
                          {month.short}
                          {count > 0 && selectedMonth !== month.id && month.id !== "all" && (
                            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-green-500 rounded-full text-[9px] flex items-center justify-center text-white font-bold shadow-lg">
                              {count}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Results Counter & Clear Filters */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                  <span className="text-gray-400">
                    Showing <span className="text-white font-bold">{filteredEvents.length}</span>
                    {!hasActiveFilters && <span className="text-gray-500"> random</span>} events
                    {selectedCity !== "all" && <> in <span className="text-green-400 font-medium">{selectedCityData?.name}</span></>}
                    {selectedCategory !== "all" && <> • <span className="text-green-400 font-medium">{selectedCategoryData?.name}</span></>}
                    {selectedMonth !== "all" && <> • <span className="text-green-400 font-medium">{months.find(m => m.id === selectedMonth)?.name}</span></>}
                  </span>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-gray-500 hover:text-green-400 transition-colors flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/5"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Clear filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        {filteredEvents.length > 0 ? (
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Side - Event Content */}
            <div className="order-2 lg:order-1">
              <div className="relative">
                {activeEvent && (
                  <div
                    key={activeEvent.id}
                    className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 shadow-2xl transition-all duration-700 ease-out"
                  >
                    {/* Category Badge */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${activeEvent.color} text-white shadow-lg`}>
                        {activeEvent.category}
                      </span>
                      <span className="text-gray-400 text-sm flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {activeEvent.date}
                      </span>
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                      {activeEvent.title}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-300 mb-6">
                      <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{activeEvent.location}</span>
                    </div>

                    <p className="text-gray-400 leading-relaxed mb-8">{activeEvent.description}</p>

                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-white font-semibold">{activeEvent.attendees.toLocaleString()}+</p>
                        <p className="text-gray-500 text-xs">Expected Guests</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Dots */}
                <div className="flex justify-center gap-2 mt-8">
                  {filteredEvents.map((_, index) => (
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

            {/* Right Side - Carousel/Slider */}
            {useCarousel ? (
              <div
                ref={containerRef}
                className={`order-1 lg:order-2 h-[400px] md:h-[450px] relative select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
                style={{ userSelect: "none", WebkitUserSelect: "none", touchAction: "none" }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <div
                  ref={carouselRef}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ perspective: "800px", perspectiveOrigin: "50% 50%" }}
                >
                  <div
                    className="relative w-56 h-36 md:w-64 md:h-40"
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                      transition: isDragging ? "none" : "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {filteredEvents.map((event, index) => {
                      const angle = index * anglePerItem;
                      const isActive = index === activeIndex;
                      return (
                        <div
                          key={event.id}
                          className="absolute inset-0 cursor-pointer"
                          style={{ transformStyle: "preserve-3d", transform: `rotateY(${angle}deg) translateZ(${translateZ}px)` }}
                          onClick={() => goToSlide(index)}
                        >
                          <div className={`w-full h-full rounded-lg overflow-hidden shadow-2xl transition-all duration-500 ${isActive ? "shadow-md shadow-green-300 border border-green-700" : "opacity-90"}`} style={{ backfaceVisibility: "visible" }}>
                            <div className="relative w-full h-full">
                              <img src={event.image} alt={event.title} className="w-full h-full object-cover pointer-events-none" draggable="false" loading="lazy" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                              <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-30 mix-blend-overlay`} />
                              <div className="absolute bottom-0 left-0 right-0 p-3">
                                <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold bg-white/20 backdrop-blur-sm text-white mb-1">{event.category}</span>
                                <h4 className="text-white font-bold text-xs leading-tight">{event.title}</h4>
                              </div>
                              {isActive && <div className="absolute inset-0 rounded-lg ring-2 ring-green-400/60" />}
                            </div>
                          </div>
                          <div className="absolute left-0 w-full pointer-events-none" style={{ top: "105%", height: "70%" }}>
                            <img src={event.image} alt="" className="w-full h-full object-cover object-top rounded-lg" draggable="false" loading="lazy" style={{ opacity: 0.35, filter: "blur(1px)", maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 80%)", WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 80%)" }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-20 rounded-full bg-green-500/10 blur-2xl pointer-events-none" />
              </div>
            ) : (
              <div className="order-1 lg:order-2 relative">
                <button onClick={() => scrollSlider('left')} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gray-900/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 -ml-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={() => scrollSlider('right')} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-gray-900/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white hover:bg-green-500/20 hover:border-green-500/50 transition-all duration-300 -mr-4">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
                <div ref={sliderRef} onScroll={handleSliderScroll} className="flex gap-6 overflow-x-auto pb-4 px-2 snap-x snap-mandatory slider-hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                  {filteredEvents.map((event, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <div key={event.id} onClick={() => goToSlide(index)} className={`flex-shrink-0 w-72 h-48 md:w-80 md:h-52 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 snap-center ${isActive ? "ring-2 ring-green-400 shadow-lg shadow-green-500/25 scale-105" : "opacity-80 hover:opacity-100"}`}>
                        <div className="relative w-full h-full group">
                          <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                          <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-20 mix-blend-overlay`} />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-sm text-white mb-2">{event.category}</span>
                            <h4 className="text-white font-bold text-sm md:text-base leading-tight mb-1">{event.title}</h4>
                            <div className="flex items-center gap-2 text-gray-300 text-xs">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                              {event.date}
                            </div>
                          </div>
                          {isActive && <div className="absolute top-3 right-3 w-3 h-3 rounded-full bg-green-400 animate-pulse" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-center">
                  <div className="w-32 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-300" style={{ width: `${totalItems > 1 ? (activeIndex / (totalItems - 1)) * 100 : 100}%` }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center mb-6 border border-white/10">
              <svg className="w-12 h-12 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No Events Found</h3>
            <p className="text-gray-400 text-center max-w-md mb-6">We couldn't find any events matching your selected filters.</p>
            <button onClick={clearAllFilters} className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-green-500/25">
              View All Events
            </button>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent pointer-events-none" />

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255, 255, 255, 0.05); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(34, 197, 94, 0.5); border-radius: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(34, 197, 94, 0.7); }
        .slider-hide-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
    </section>
  );
};

export default UpcomingEvents;
