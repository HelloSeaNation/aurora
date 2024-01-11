import React from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type shoppingCartProviderProps = {
  children: React.ReactNode;
};

type CartItem = {
  id: number;
  quantity: number;
  size: string;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number, size: string) => number;
  increaseCartQuantity: (id: number, size: string) => void;
  decreaseCartQuantity: (id: number, size: string) => void;
  removeFromCart: (id: number, size: string) => void;
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  clearCart: () => void;
};

const ShoppingCartContext = React.createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return React.useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: shoppingCartProviderProps) {
  const [, setIsOpen] = React.useState(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const cartQuantity = cartItems.reduce(
    (quantity: number, item: CartItem) => item.quantity + quantity,
    0
  );
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number, size: string	) {
    return cartItems.find((item: CartItem) => item.id === id && item.size === size)?.quantity || 0;
  }

  function increaseCartQuantity(id: number, size: string) {
    setCartItems((currItems: CartItem[]) => {
      const existingItem = currItems.find((item) => item.id === id && item.size === size);
      if (!existingItem) {
        return [...currItems, { id, quantity: 1, size}];
      } else {
        return currItems.map((item) => {
          if (item.id === id && item.size === size) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number , size: string) {
    setCartItems((currItems: CartItem[]) => {
      const currentItem = currItems.find((item) => item.id === id && item.size === size);
      if (currentItem && currentItem.quantity === 1) {
        // If quantity is 1, remove only the selected size
        return currItems.filter((item) => !(item.id === id && item.size === size));
      } else {
        return currItems.map((item) => {
          if (item.id === id && item.size === size) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number, size: string) {
    setCartItems((currItems: CartItem[]) => {
      return currItems.filter((item) => item.id !== id && item.size !== item.size);
    });
  }

  function clearCart() {
    setCartItems([]);
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        clearCart,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}