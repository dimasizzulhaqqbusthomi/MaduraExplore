import React, { createContext, useState, useEffect } from 'react';
import { destinations as initialDestinations, msmes as initialMsmes, events as initialEvents, culinaries as initialCulinaries, accommodations as initialAccommodations } from '../data';

export const AppContext = createContext();

export function AppProvider({ children }) {
  // Load initial states from localStorage or default data
  const [destinations, setDestinations] = useState(() => {
    const saved = localStorage.getItem('me_destinations');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map(item => {
          const original = initialDestinations.find(d => d.id === item.id);
          return original ? { ...original, ...item } : item;
        });
      } catch (e) {
        return initialDestinations;
      }
    }
    return initialDestinations;
  });

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('me_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [itinerary, setItinerary] = useState(() => {
    const saved = localStorage.getItem('me_itinerary');
    return saved ? JSON.parse(saved) : { day1: [], day2: [], day3: [] };
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('me_destinations', JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem('me_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('me_itinerary', JSON.stringify(itinerary));
  }, [itinerary]);

  const toggleFavorite = (id, type) => {
    const exists = favorites.some(fav => fav.id === id && fav.type === type);
    if (exists) {
      setFavorites(favorites.filter(fav => !(fav.id === id && fav.type === type)));
    } else {
      setFavorites([...favorites, { id, type }]);
    }
  };

  const isFavorite = (id, type) => {
    return favorites.some(fav => fav.id === id && fav.type === type);
  };

  const addToItinerary = (day, dest) => {
    const dayKey = `day${day}`;
    // Check if already in this day
    if (itinerary[dayKey].some(item => item.id === dest.id)) {
      return { success: false, message: 'Destinasi sudah ada di hari ini!' };
    }
    const newItem = {
      ...dest,
      time: itinerary[dayKey].length === 0 ? '08:00 WIB' : 
            itinerary[dayKey].length === 1 ? '12:00 WIB' : '16:00 WIB'
    };
    setItinerary({
      ...itinerary,
      [dayKey]: [...itinerary[dayKey], newItem]
    });
    return { success: true, message: 'Berhasil ditambahkan ke rencana perjalanan!' };
  };

  const removeFromItinerary = (day, destId) => {
    const dayKey = `day${day}`;
    setItinerary({
      ...itinerary,
      [dayKey]: itinerary[dayKey].filter(item => item.id !== destId)
    });
  };

  const updateItineraryTime = (day, destId, newTime) => {
    const dayKey = `day${day}`;
    setItinerary({
      ...itinerary,
      [dayKey]: itinerary[dayKey].map(item => item.id === destId ? { ...item, time: newTime } : item)
    });
  };

  const clearItinerary = () => {
    setItinerary({ day1: [], day2: [], day3: [] });
  };

  const resetAllData = () => {
    setDestinations(initialDestinations);
    setFavorites([]);
    setItinerary({ day1: [], day2: [], day3: [] });
    localStorage.removeItem('me_destinations');
    localStorage.removeItem('me_favorites');
    localStorage.removeItem('me_itinerary');
  };

  return (
    <AppContext.Provider value={{
      destinations,
      msmes: initialMsmes,
      events: initialEvents,
      culinaries: initialCulinaries,
      accommodations: initialAccommodations,
      favorites,
      itinerary,
      toggleFavorite,
      isFavorite,
      addToItinerary,
      removeFromItinerary,
      updateItineraryTime,
      clearItinerary,
      resetAllData
    }}>
      {children}
    </AppContext.Provider>
  );
}
