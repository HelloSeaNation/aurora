import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
  hoverImage: string;
}

// Defining the structure of the Wishlist context properties
interface WishlistContextProps {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (item: WishlistItem) => void;
  isInWishlist: (item: WishlistItem) => boolean;
}

// Creating the Wishlist context
const WishlistContext = createContext<WishlistContextProps | undefined>(undefined);

// Defining the properties for the WishlistProvider component
interface WishlistProviderProps {
  children: ReactNode;
}

// Creating the WishlistProvider component
export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
      // State to manage the Wishlist items
    const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  
        // Function to add an item to the Wishlist
    const addToWishlist = (item: WishlistItem) => {
      setWishlistItems((prevItems) => [...prevItems, item]);
    };
  
        // Function to remove an item from the Wishlist
    const removeFromWishlist = (item: WishlistItem) => {
      setWishlistItems((prevItems) => prevItems.filter((i) => i.id !== item.id));
    };
  
        // Function to check if an item is in the Wishlist
    const isInWishlist = (item: WishlistItem) => {
      return wishlistItems.some((i) => i.id === item.id);
    };
  
        // Providing the Wishlist context to its children components
    return (
      <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist }}>
        {children}
      </WishlistContext.Provider>
    );
  };

  // Custom hook to access the Wishlist context
export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) {
      throw new Error('useWishlist must be used within a WishlistProvider');
    }
    return context;
};