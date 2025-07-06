'use client';

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
const uuidv4 = () => crypto.randomUUID();
import { toast } from 'sonner';
import { CartItem, Product, Additional } from '@/lib/types';

type CartContextType = {
  cartItems: CartItem[];
  addItem: (product: Product, quantity: number, additionals?: Additional[]) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'rei-do-acai-cart';

// Mock UUID function since crypto.randomUUID() may not be supported in all browsers
const mockUuid = () => {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse saved cart:', error);
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [cartItems]);

  const addItem = (product: Product, quantity: number, additionals: Additional[] = []) => {
    setCartItems(prevItems => {
      const newItem: CartItem = {
        id: mockUuid(),
        productId: product.id,
        name: product.name,
        price: product.price + additionals.reduce((sum, item) => sum + item.price, 0),
        quantity,
        additionals: additionals.length > 0 ? additionals : undefined,
      };

      toast.success(`${product.name} adicionado ao carrinho!`);
      return [...prevItems, newItem];
    });
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        toast.info(`${itemToRemove.name} removido do carrinho`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast.info('Carrinho foi esvaziado');
  };

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
