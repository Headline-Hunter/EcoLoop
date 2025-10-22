import React, { createContext, useState, useEffect, useCallback } from 'react';

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(new Set());

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      try {
        const items = JSON.parse(stored);
        setWishlist(new Set(items));
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify([...wishlist]));
  }, [wishlist]);

  const toggleWishlist = useCallback((itemId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(itemId)) {
        newWishlist.delete(itemId);
      } else {
        newWishlist.add(itemId);
      }
      return newWishlist;
    });
  }, []);

  const isWishlisted = useCallback((itemId) => {
    return wishlist.has(itemId);
  }, [wishlist]);

  const removeFromWishlist = useCallback((itemId) => {
    setWishlist(prev => {
      const newWishlist = new Set(prev);
      newWishlist.delete(itemId);
      return newWishlist;
    });
  }, []);

  const value = {
    wishlist,
    toggleWishlist,
    isWishlisted,
    removeFromWishlist,
    wishlistCount: wishlist.size
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}
