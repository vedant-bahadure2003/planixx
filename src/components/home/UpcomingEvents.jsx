import { useState, useEffect, useRef, useCallback, useMemo, memo } from "react";
import { useEvents } from "../../hooks/useEvents";
import { useLocation as useLocationContext } from "../../context/LocationContext";

// Categories data with icons and colors (kept static as per requirements)
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

// Maximum events for 3D carousel mode
const MAX_CAROUSEL_EVENTS = 6;
const DEFAULT_DISPLAY_COUNT = 6;

// Fisher-Yates shuffle algorithm - memoized outside component
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Memoized Event Card for carousel
const CarouselEventCard = memo(({ event, index, anglePerItem, translateZ, isActive, onSelect }) => {
  const angle = index * anglePerItem;
  return (
    <div
      className="absolute inset-0 cursor-pointer"
      style={{ transformStyle: "preserve-3d", transform: `rotateY(${angle}deg) translateZ(${translateZ}px)` }}
      onClick={() => onSelect(index)}
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
});
CarouselEventCard.displayName = 'CarouselEventCard';

// Memoized Event Card for slider
const SliderEventCard = memo(({ event, index, isActive, onSelect }) => (
  <div 
    onClick={() => onSelect(index)} 
    className={`flex-shrink-0 w-72 h-48 md:w-80 md:h-52 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 snap-center ${isActive ? "ring-2 ring-green-400 shadow-lg shadow-green-500/25 scale-105 mt-2 mb-2" : "opacity-80 hover:opacity-100"}`}
  > 
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
));
SliderEventCard.displayName = 'SliderEventCard';

const UpcomingEvents = () => {
  // API data from hook
  const { events, cities: dynamicCities, loading, error, refetch, getNearbyEvents, userLocation, locationDenied } = useEvents();
  
  // Global location context
  const { selectedCity: globalSelectedCity } = useLocationContext();
  
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotationY, setRotationY] = useState(0);
  const [rotationX, setRotationX] = useState(-15);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [currentRotationY, setCurrentRotationY] = useState(0);
  const [currentRotationX, setCurrentRotationX] = useState(-15);
  const [sliderScrollPosition, setSliderScrollPosition] = useState(0);
  const [defaultNearbyEvents, setDefaultNearbyEvents] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const autoPlayTimerRef = useRef(null);

  // Use dynamic cities from API - memoized
  const citiesData = useMemo(() => 
    dynamicCities.length > 0 ? dynamicCities : [
      { id: "all", name: "All Cities", icon: "🌍", color: "from-emerald-500 to-green-500" }
    ], [dynamicCities]);

  // Initialize default nearby events when data loads - consolidated effect
  useEffect(() => {
    if (events.all.length > 0 && !isInitialized) {
      let eventsToShow;
      if (userLocation && !locationDenied) {
        eventsToShow = getNearbyEvents(events.all, DEFAULT_DISPLAY_COUNT);
      } else {
        eventsToShow = shuffleArray(events.all).slice(0, DEFAULT_DISPLAY_COUNT);
      }
      setDefaultNearbyEvents(eventsToShow);
      setIsInitialized(true);
    }
  }, [events.all, userLocation, locationDenied, getNearbyEvents, isInitialized]);

  // Update nearby events when location becomes available after initialization
  useEffect(() => {
    if (userLocation && events.all.length > 0 && isInitialized) {
      const nearby = getNearbyEvents(events.all, DEFAULT_DISPLAY_COUNT);
      setDefaultNearbyEvents(nearby);
    }
  }, [userLocation, events.all, getNearbyEvents, isInitialized]);

  // Sync with global city selection from Navbar/Modal
  useEffect(() => {
    if (globalSelectedCity) {
      setSelectedCity(globalSelectedCity.id);
    }
  }, [globalSelectedCity]);

  // Check if any filter is active
  const hasActiveFilters = useMemo(() => 
    (selectedCity !== "" && selectedCity !== "all") || 
    (selectedCategory !== "" && selectedCategory !== "all") || 
    selectedDate !== ""
  , [selectedCity, selectedCategory, selectedDate]);
  
  // Check if user has made any selection from dropdowns
  const hasUserSelectedFilters = useMemo(() => 
    selectedCity !== "" || selectedCategory !== ""
  , [selectedCity, selectedCategory]);

  // Compute selected city data - memoized
  const selectedCityData = useMemo(() => {
    const fromDynamic = citiesData.find((c) => c.id === selectedCity);
    if (fromDynamic) return fromDynamic;
    if (globalSelectedCity && globalSelectedCity.id === selectedCity) return globalSelectedCity;
    return null;
  }, [citiesData, selectedCity, globalSelectedCity]);

  // Helper function for fuzzy city matching - memoized
  const isCityMatch = useCallback((eventCityName, selectedCityName) => {
    if (!selectedCityName || !eventCityName) return false;
    const eventCity = eventCityName.toLowerCase();
    const filterCity = selectedCityName.toLowerCase();
    return eventCity.includes(filterCity) || filterCity.includes(eventCity);
  }, []);

  // Filter events based on selected city, date, and category - optimized
  const filteredEvents = useMemo(() => {
    // If user hasn't made any selection, show nearby/default events
    if (!hasUserSelectedFilters && !selectedDate) {
      return defaultNearbyEvents;
    }
    
    const selectedCityName = selectedCityData?.name;
    
    return events.all.filter((event) => {
      // City match
      let cityMatch = selectedCity === "all" || selectedCity === "";
      if (!cityMatch && selectedCityName) {
        cityMatch = isCityMatch(event.cityName, selectedCityName);
      }
      
      // Category match
      const categoryMatch = selectedCategory === "all" || selectedCategory === "" || event.category === selectedCategory;
      
      // Date filter
      let dateMatch = true;
      if (selectedDate) {
        const selected = new Date(selectedDate);
        const eventStart = new Date(event.dateValue);
        const eventEnd = new Date(event.dateTill || event.dateValue);
        dateMatch = selected >= eventStart && selected <= eventEnd;
      }
      
      return cityMatch && categoryMatch && dateMatch;
    });
  }, [selectedCity, selectedCategory, selectedDate, hasUserSelectedFilters, defaultNearbyEvents, events.all, selectedCityData, isCityMatch]);

  // Determine if we should use 3D carousel or horizontal slider
  const useCarousel = filteredEvents.length <= MAX_CAROUSEL_EVENTS;

  // Calculate dynamic carousel properties - memoized
  const carouselProps = useMemo(() => {
    const totalItems = filteredEvents.length;
    const anglePerItem = totalItems > 0 ? 360 / totalItems : 0;
    const translateZ = totalItems <= 3 ? 180 : totalItems <= 5 ? 220 : 250;
    return { totalItems, anglePerItem, translateZ };
  }, [filteredEvents.length]);

  const { totalItems, anglePerItem, translateZ } = carouselProps;

  // Reset active index when filters change
  useEffect(() => {
    setActiveIndex(0);
    setRotationY(0);
    setSliderScrollPosition(0);
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = 0;
    }
  }, [selectedCity, selectedCategory, selectedDate]);

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

  // Carousel drag handlers - memoized
  const handleMouseDown = useCallback((e) => {
    if (!useCarousel) return;
    e.preventDefault();
    setIsDragging(true);
    setIsAutoPlaying(false);
    setStartX(e.clientX);
    setStartY(e.clientY);
    setCurrentRotationY(rotationY);
    setCurrentRotationX(rotationX);
  }, [useCarousel, rotationY, rotationX]);

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

  const handleMouseLeave = useCallback(() => {
    if (isDragging) handleMouseUp();
  }, [isDragging, handleMouseUp]);

  // Touch handlers - memoized
  const handleTouchStart = useCallback((e) => {
    if (!useCarousel) return;
    e.preventDefault();
    setIsDragging(true);
    setIsAutoPlaying(false);
    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
    setCurrentRotationY(rotationY);
    setCurrentRotationX(rotationX);
  }, [useCarousel, rotationY, rotationX]);

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

  const handleTouchEnd = useCallback(() => handleMouseUp(), [handleMouseUp]);

  const goToSlide = useCallback((index) => {
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
  }, [useCarousel, anglePerItem]);

  const scrollSlider = useCallback((direction) => {
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
  }, [sliderScrollPosition]);

  const handleSliderScroll = useCallback(() => {
    if (sliderRef.current) {
      const scrollLeft = sliderRef.current.scrollLeft;
      setSliderScrollPosition(scrollLeft);
      const newIndex = Math.round(scrollLeft / 320);
      if (newIndex !== activeIndex && newIndex < totalItems) {
        setActiveIndex(newIndex);
      }
    }
  }, [activeIndex, totalItems]);

  const clearAllFilters = useCallback(() => {
    setSelectedCity("");
    setSelectedDate("");
    setSelectedCategory("");
  }, []);

  const activeEvent = filteredEvents[activeIndex] || null;
  const selectedCategoryData = useMemo(() => 
    categoriesData.find((c) => c.id === selectedCategory)
  , [selectedCategory]);

  // Loading state
  if (loading) {
    return (
      <section
        id="events"
        className="relative min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 py-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
          </div>
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mb-6" />
            <p className="text-gray-400">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section
        id="events"
        className="relative min-h-screen bg-gradient-to-br from-gray-950 via-slate-900 to-gray-950 py-20 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-red-300 text-sm font-medium mb-4">
              ⚠️ Error
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Upcoming{" "}
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                Events
              </span>
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-800 to-red-900 flex items-center justify-center mb-6 border border-red-500/30">
              <svg className="w-12 h-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Failed to Load Events</h3>
            <p className="text-gray-400 text-center max-w-md mb-6">{error}</p>
            <button 
              onClick={refetch}
              className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg shadow-green-500/25"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

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
            {userLocation && !locationDenied 
              ? "Discover events near you and across the country."
              : "Discover and explore the most anticipated events in your city."}
          </p>
        </div>

        {/* Filter Controls - Optimized Glass Design */}
        <div className="mb-12 relative z-30">
          <div className="max-w-4xl mx-auto">
            {/* Background Card - decorative only */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-emerald-500/20 to-transparent rounded-br-2xl" />
            </div>
            
            {/* Filter Content */}
            <div className="relative p-6">
              {/* Filter Row - 3 Column Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                
                {/* City Dropdown */}
                <div className="relative z-40">
                  <label className="block text-xs font-semibold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    Select City
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-gray-900/80 hover:bg-gray-800/90 border border-white/10 hover:border-green-500/50 rounded-xl px-4 py-3 text-white font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/40 appearance-none cursor-pointer"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" className="bg-gray-900 text-gray-400 py-2">
                        🌍 Select City...
                      </option>
                      {citiesData.map((city) => (
                        <option key={city.id} value={city.id} className="bg-gray-900 text-white py-2">
                          {city.icon?.startsWith('/') ? '' : city.icon} {city.name} 
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Category Dropdown */}
                <div className="relative z-40">
                  <label className="block text-xs font-semibold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    Select Category
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full bg-gray-900/80 hover:bg-gray-800/90 border border-white/10 hover:border-green-500/50 rounded-xl px-4 py-3 text-white font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/40 appearance-none cursor-pointer"
                      style={{ colorScheme: 'dark' }}
                    >
                      <option value="" className="bg-gray-900 text-gray-400 py-2">
                        ✨ Select Category...
                      </option>
                      {categoriesData.map((category) => (
                        <option key={category.id} value={category.id} className="bg-gray-900 text-white py-2">
                          {category.icon} {category.name} 
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Date Filter */}
                <div className="relative z-40">
                  <label className="block text-xs font-semibold text-green-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Select Date
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="flex-1 bg-gray-900/80 border border-white/10 hover:border-green-500/50 rounded-xl px-4 py-3 text-white text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/40 [color-scheme:dark]"
                    />
                    {selectedDate && (
                      <button
                        onClick={() => setSelectedDate("")}
                        className="px-3 py-2 bg-gray-800/60 text-gray-400 hover:text-white rounded-xl text-sm transition-all duration-200 border border-white/10 hover:border-green-500/30"
                        title="Clear Date"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Results Counter & Clear Filters */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-lg shadow-green-500/50" />
                  <span className="text-gray-400">
                    Showing <span className="text-white font-bold">{filteredEvents.length}</span>
                    {!hasActiveFilters && userLocation && <span className="text-gray-500"> nearby</span>}
                    {!hasActiveFilters && !userLocation && <span className="text-gray-500"> random</span>} events
                    {selectedCity !== "" && selectedCity !== "all" && <> in <span className="text-green-400 font-medium">{selectedCityData?.name}</span></>}
                    {selectedCategory !== "" && selectedCategory !== "all" && <> • <span className="text-green-400 font-medium">{selectedCategoryData?.name}</span></>}
                    {selectedDate && <> • <span className="text-green-400 font-medium">{new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span></>}
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
                    className="relative w-56 h-36 md:w-64 md:h-40 "
                    style={{
                      transformStyle: "preserve-3d",
                      transform: `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`,
                      transition: isDragging ? "none" : "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    {filteredEvents.map((event, index) => (
                      <CarouselEventCard
                        key={event.id}
                        event={event}
                        index={index}
                        anglePerItem={anglePerItem}
                        translateZ={translateZ}
                        isActive={index === activeIndex}
                        onSelect={goToSlide}
                      />
                    ))}
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
                  {filteredEvents.map((event, index) => (
                    <SliderEventCard
                      key={event.id}
                      event={event}
                      index={index}
                      isActive={index === activeIndex}
                      onSelect={goToSlide}
                    />
                  ))}
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
