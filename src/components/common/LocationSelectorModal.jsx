import { useState, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { popularCities, otherCities, searchCities } from "../../data/citiesData";

const LocationSelectorModal = ({ isOpen, onClose, onSelectCity, currentCity }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllCities, setShowAllCities] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectionError, setDetectionError] = useState("");
  const searchInputRef = useRef(null);

  // Filter cities based on search
  const filteredCities = useMemo(() => {
    return searchCities(searchQuery);
  }, [searchQuery]);

  // Focus search input when modal opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

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

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchQuery("");
      setShowAllCities(false);
      setDetectionError("");
    }
  }, [isOpen]);

  // Detect user location
  const handleDetectLocation = async () => {
    setIsDetecting(true);
    setDetectionError("");

    if (!("geolocation" in navigator)) {
      setDetectionError("Geolocation not supported");
      setIsDetecting(false);
      return;
    }

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        });
      });

      const { latitude, longitude } = position.coords;
      
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
        );
        const data = await response.json();
        
        const cityName = data.address?.city || 
                        data.address?.town || 
                        data.address?.village || 
                        data.address?.state_district ||
                        data.address?.state;
        
        if (cityName) {
          const matchedPopular = popularCities.find(c => 
            c.name.toLowerCase().includes(cityName.toLowerCase()) ||
            cityName.toLowerCase().includes(c.name.toLowerCase())
          );
          
          if (matchedPopular) {
            handleCitySelect(matchedPopular);
          } else {
            const matchedOther = otherCities.find(c => 
              c.toLowerCase().includes(cityName.toLowerCase()) ||
              cityName.toLowerCase().includes(c.toLowerCase())
            );
            
            if (matchedOther) {
              handleCitySelect({
                id: matchedOther.toLowerCase().replace(/\s+/g, '-'),
                name: matchedOther,
                icon: '📍',
                color: 'from-green-500 to-emerald-500'
              });
            } else {
              handleCitySelect({
                id: cityName.toLowerCase().replace(/\s+/g, '-'),
                name: cityName,
                icon: '📍',
                color: 'from-green-500 to-emerald-500'
              });
            }
          }
        } else {
          setDetectionError("Couldn't determine your city");
        }
      } catch {
        setDetectionError("Couldn't fetch location details");
      }
    } catch (error) {
      if (error.code === 1) {
        setDetectionError("Location access denied");
      } else {
        setDetectionError("Location unavailable");
      }
    }
    
    setIsDetecting(false);
  };

  const handleCitySelect = (city) => {
    onSelectCity(city);
    onClose();
  };

  const handleOtherCitySelect = (cityName) => {
    handleCitySelect({
      id: cityName.toLowerCase().replace(/\s+/g, '-'),
      name: cityName,
      icon: '📍',
      color: 'from-gray-500 to-gray-600'
    });
  };

  if (!isOpen) return null;

  const displayedOtherCities = showAllCities 
    ? filteredCities.others 
    : filteredCities.others.slice(0, 20);

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-fadeIn"
        onClick={onClose}
      />

      {/* Modal - Compact Size */}
      <div className="relative w-full max-w-2xl max-h-[85vh] bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 rounded-2xl border border-white/10 shadow-2xl animate-scaleIn overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Decorative gradient orbs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-4 sm:p-5 overflow-y-auto max-h-[85vh]">
          {/* Header - Compact */}
          <div className="text-center mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Select Your{" "}
              <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-green-500 bg-clip-text text-transparent">
                City
              </span>
            </h2>
          </div>

          {/* Search Bar - Compact */}
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for your city"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 hover:border-green-500/50 focus:border-green-500 rounded-xl pl-10 pr-10 py-2.5 text-white placeholder-gray-500 text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Detect Location Button - Compact */}
          <button
            onClick={handleDetectLocation}
            disabled={isDetecting}
            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors mb-4 text-sm disabled:opacity-50"
          >
            {isDetecting ? (
              <div className="w-4 h-4 border-2 border-rose-400/30 border-t-rose-400 rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <circle cx="12" cy="11" r="3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
              </svg>
            )}
            <span className="font-medium">
              {isDetecting ? "Detecting..." : "Detect my location"}
            </span>
          </button>

          {/* Detection Error */}
          {detectionError && (
            <div className="mb-3 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs flex items-center gap-2">
              <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {detectionError}
            </div>
          )}

          {/* Popular Cities - Compact */}
          {filteredCities.popular.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 text-center">
                Popular Cities
              </h3>
              <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                {filteredCities.popular.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => handleCitySelect(city)}
                    className={`group flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-300 hover:bg-white/5 ${
                      currentCity?.id === city.id ? 'bg-green-500/10 ring-1 ring-green-500/50' : ''
                    }`}
                  >
                    <div className={`relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${city.color} p-0.5 group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-gray-900 rounded-xl flex items-center justify-center text-lg sm:text-xl">
                        {city.icon}
                      </div>
                      {currentCity?.id === city.id && (
                        <div className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <span className="text-white text-xs font-medium group-hover:text-green-400 transition-colors">
                      {city.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Other Cities - Compact */}
          {displayedOtherCities.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 text-center">
                Other Cities
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-1">
                {displayedOtherCities.map((cityName) => (
                  <button
                    key={cityName}
                    onClick={() => handleOtherCitySelect(cityName)}
                    className={`px-2 py-1.5 text-xs rounded-md transition-all duration-200 truncate ${
                      currentCity?.name === cityName
                        ? 'bg-green-500/20 text-green-400 font-medium'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {cityName}
                  </button>
                ))}
              </div>

              {/* Show/Hide Toggle */}
              {filteredCities.others.length > 20 && (
                <button
                  onClick={() => setShowAllCities(!showAllCities)}
                  className="w-full mt-3 py-2 text-center text-rose-400 hover:text-rose-300 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                >
                  {showAllCities ? (
                    <>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                      Hide cities
                    </>
                  ) : (
                    <>
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      Show more ({filteredCities.others.length - 20})
                    </>
                  )}
                </button>
              )}
            </div>
          )}

          {/* No Results */}
          {filteredCities.popular.length === 0 && filteredCities.others.length === 0 && (
            <div className="text-center py-8">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h4 className="text-white text-sm font-medium mb-1">No cities found</h4>
              <p className="text-gray-500 text-xs">Try a different search</p>
            </div>
          )}
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
          animation: fadeIn 0.2s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>,
    document.body
  );
};

export default LocationSelectorModal;
