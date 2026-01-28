import { useState, useEffect, useCallback } from 'react';

const API_URL = 'https://Plannix.in/web/public/api/v1/web/get_all_events';

// Haversine formula to calculate distance between two GPS coordinates
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity;
  
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Color gradients for dynamic city colors
const cityColors = [
  'from-orange-500 to-red-500',
  'from-blue-500 to-indigo-500',
  'from-purple-500 to-violet-500',
  'from-pink-500 to-rose-500',
  'from-teal-500 to-cyan-500',
  'from-amber-500 to-yellow-500',
  'from-green-500 to-lime-500',
  'from-red-500 to-orange-500',
  'from-cyan-500 to-blue-500',
  'from-violet-500 to-purple-500',
];

// City icons based on keywords
const getCityIcon = (cityName) => {
  const name = cityName.toLowerCase();
  if (name.includes('mumbai') || name.includes('beach')) return '🌊';
  if (name.includes('delhi') || name.includes('new delhi')) return '🏛️';
  if (name.includes('bangalore') || name.includes('bengaluru') || name.includes('tech') || name.includes('cyber')) return '💻';
  if (name.includes('jaipur') || name.includes('heritage')) return '🏰';
  if (name.includes('pune') || name.includes('baner')) return '🎭';
  if (name.includes('khajuraho') || name.includes('temple')) return '🛕';
  if (name.includes('rishikesh') || name.includes('yoga')) return '🧘';
  if (name.includes('kolkata') || name.includes('salt lake')) return '🎨';
  if (name.includes('hyderabad') || name.includes('hitech')) return '🔬';
  if (name.includes('gurgaon') || name.includes('noida')) return '🏢';
  if (name.includes('chandigarh')) return '🌳';
  if (name.includes('navi mumbai') || name.includes('vashi')) return '🌆';
  return '📍';
};

// Event color gradients based on category/type
const eventColors = [
  'from-orange-500 to-red-600',
  'from-blue-500 to-indigo-600',
  'from-purple-500 to-pink-600',
  'from-teal-500 to-green-600',
  'from-yellow-500 to-amber-600',
  'from-cyan-500 to-blue-600',
  'from-red-500 to-orange-600',
];

// Format date range for display
const formatDateRange = (fromDate, tillDate) => {
  const from = new Date(fromDate);
  const till = new Date(tillDate);
  
  const options = { month: 'short', day: 'numeric' };
  const yearOptions = { year: 'numeric' };
  
  if (fromDate === tillDate) {
    return `${from.toLocaleDateString('en-US', options)}, ${from.toLocaleDateString('en-US', yearOptions)}`;
  }
  
  if (from.getMonth() === till.getMonth() && from.getFullYear() === till.getFullYear()) {
    return `${from.toLocaleDateString('en-US', { month: 'short' })} ${from.getDate()}-${till.getDate()}, ${from.getFullYear()}`;
  }
  
  return `${from.toLocaleDateString('en-US', options)} - ${till.toLocaleDateString('en-US', options)}, ${till.getFullYear()}`;
};

// Extract city name from location string
const extractCity = (location) => {
  if (!location) return 'Unknown';
  const parts = location.split(',');
  return parts[parts.length - 1]?.trim() || parts[0]?.trim() || location;
};

// Transform API event to component format
const transformEvent = (event, index) => {
  const coords = event.event_gps_coordinates?.split(',').map(c => parseFloat(c.trim())) || [];
  const city = extractCity(event.event_location);
  
  return {
    id: event.event_id,
    title: event.event_name,
    date: formatDateRange(event.event_from, event.event_till),
    dateValue: event.event_from,
    dateTill: event.event_till,
    cityId: city.toLowerCase().replace(/\s+/g, '-'),
    cityName: city,
    location: event.event_location || 'Location TBA',
    description: event.event_description || 'Event details coming soon.',
    attendees: event.total_capacity || 0,
    bookedGuests: event.booked_guests || 0,
    category: event.event_type === 1 ? 'Corporate' : 'Cultural',
    image: event.event_banner || `https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop&seed=${event.event_id}`,
    color: eventColors[index % eventColors.length],
    coordinates: coords.length === 2 ? { lat: coords[0], lon: coords[1] } : null,
    isMultiple: event.is_multiple === 1,
    totalPrograms: event.total_programs || 0,
    totalCategories: event.total_categories || 0,
  };
};

export const useEvents = () => {
  const [events, setEvents] = useState({ live: [], upcoming: [], completed: [], all: [] });
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationDenied, setLocationDenied] = useState(false);

  // Get user's current location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          });
        },
        (err) => {
          console.warn('Geolocation error:', err.message);
          setLocationDenied(true);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 }
      );
    } else {
      setLocationDenied(true);
    }
  }, []);

  // Fetch events from API
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error_code !== 200) {
        throw new Error(data.message || 'Failed to fetch events');
      }
      
      const { live_events = [], upcoming_events = [], completed_events = [] } = data.data;
      
      // Transform all events
      const liveTransformed = live_events.map((e, i) => transformEvent(e, i));
      const upcomingTransformed = upcoming_events.map((e, i) => transformEvent(e, i + live_events.length));
      const completedTransformed = completed_events.map((e, i) => transformEvent(e, i + live_events.length + upcoming_events.length));
      
      // Combine live and upcoming for display (exclude completed)
      const allActiveEvents = [...liveTransformed, ...upcomingTransformed];
      
      // Extract unique cities
      const uniqueCities = new Map();
      allActiveEvents.forEach((event) => {
        if (!uniqueCities.has(event.cityId)) {
          uniqueCities.set(event.cityId, {
            id: event.cityId,
            name: event.cityName,
            icon: getCityIcon(event.cityName),
            color: cityColors[uniqueCities.size % cityColors.length],
          });
        }
      });
      
      // Build cities array with "All Cities" first
      const citiesArray = [
        { id: 'all', name: 'All Cities', icon: '🌍', color: 'from-emerald-500 to-green-500' },
        ...Array.from(uniqueCities.values()),
      ];
      
      setEvents({
        live: liveTransformed,
        upcoming: upcomingTransformed,
        completed: completedTransformed,
        all: allActiveEvents,
      });
      setCities(citiesArray);
      
    } catch (err) {
      console.error('Error fetching events:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Get nearby events (sorted by distance)
  const getNearbyEvents = useCallback((eventList, maxCount = 6, maxDistance = 500) => {
    if (!userLocation || eventList.length === 0) {
      return eventList.slice(0, maxCount);
    }
    
    const eventsWithDistance = eventList.map(event => ({
      ...event,
      distance: event.coordinates
        ? calculateDistance(userLocation.lat, userLocation.lon, event.coordinates.lat, event.coordinates.lon)
        : Infinity,
    }));
    
    const sorted = eventsWithDistance
      .filter(e => e.distance <= maxDistance || e.distance === Infinity)
      .sort((a, b) => a.distance - b.distance);
    
    return sorted.slice(0, maxCount);
  }, [userLocation]);

  return {
    events,
    cities,
    loading,
    error,
    refetch: fetchEvents,
    userLocation,
    locationDenied,
    getNearbyEvents,
  };
};

export default useEvents;
