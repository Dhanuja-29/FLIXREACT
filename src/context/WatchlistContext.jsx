// ============================================
// CONTEXT: WatchlistContext
// ============================================
// 🎓 LEARNING CONCEPT: Context API
//
// Problem Context solves:
//   Imagine you have a movie card deep inside several components.
//   The card needs to know "is this movie in my watchlist?".
//   Without Context, you'd have to pass data through EVERY
//   parent component — this is called "prop drilling" ❌
//
// With Context:
//   You create a "global store", wrap your app in it,
//   and ANY component can read/update it directly ✅
//
// Think of it like a TV broadcast — anyone with a TV
// can watch, without the signal going through each house!
// ============================================

import { createContext, useContext, useState, useEffect } from 'react';

// Step 1: Create the Context object
const WatchlistContext = createContext();

// Step 2: Create a Provider component
// This wraps our app and provides the data to all children
export function WatchlistProvider({ children }) {
  // Load watchlist from localStorage so it persists on refresh
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('netflix-watchlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save to localStorage whenever watchlist changes
  useEffect(() => {
    localStorage.setItem('netflix-watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Add a movie to the watchlist
  const addToWatchlist = (movie) => {
    setWatchlist((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev; // avoid duplicates
      return [...prev, movie];
    });
  };

  // Remove a movie from the watchlist
  const removeFromWatchlist = (movieId) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== movieId));
  };

  // Toggle: if in list → remove; if not → add
  const toggleWatchlist = (movie) => {
    if (isInWatchlist(movie.id)) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  };

  // Check if a movie is already in the list
  const isInWatchlist = (movieId) => {
    return watchlist.some((m) => m.id === movieId);
  };

  // The value we share with all components
  const value = {
    watchlist,
    addToWatchlist,
    removeFromWatchlist,
    toggleWatchlist,
    isInWatchlist,
    watchlistCount: watchlist.length,
  };

  return (
    <WatchlistContext.Provider value={value}>
      {children}
    </WatchlistContext.Provider>
  );
}

// Step 3: Custom hook to consume the context easily
// Usage: const { watchlist, toggleWatchlist } = useWatchlist();
export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (!context) {
    throw new Error('useWatchlist must be used inside <WatchlistProvider>');
  }
  return context;
}

export default WatchlistContext;
