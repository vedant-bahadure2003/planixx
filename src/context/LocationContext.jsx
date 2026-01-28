import { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load saved city from localStorage on mount
  useEffect(() => {
    const savedCity = localStorage.getItem('plannix_selected_city');
    if (savedCity) {
      try {
        setSelectedCity(JSON.parse(savedCity));
      } catch {
        localStorage.removeItem('plannix_selected_city');
      }
    }
  }, []);

  // Save selected city to localStorage
  useEffect(() => {
    if (selectedCity) {
      localStorage.setItem('plannix_selected_city', JSON.stringify(selectedCity));
    }
  }, [selectedCity]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  
  const selectCity = (city) => {
    setSelectedCity(city);
    closeModal();
  };

  const clearCity = () => {
    setSelectedCity(null);
    localStorage.removeItem('plannix_selected_city');
  };

  return (
    <LocationContext.Provider
      value={{
        selectedCity,
        isModalOpen,
        openModal,
        closeModal,
        selectCity,
        clearCity,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;
