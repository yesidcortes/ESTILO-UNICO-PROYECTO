/**
 * AppContext.tsx — Global state
 *
 * Manages auth state and cart. Session is persisted in localStorage so the
 * user stays logged in across page refreshes.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SafeUser } from '../services/db';
import { Product } from '../data/products';

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserProfile = SafeUser;

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface AppContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (profile: UserProfile) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  cartTotal: number;
  cartItemsCount: number;
}

// ─── Storage helpers ──────────────────────────────────────────────────────────

const SESSION_KEY = 'estilounico:session';

function readSession(): UserProfile | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? (JSON.parse(raw) as UserProfile) : null;
  } catch {
    return null;
  }
}

function saveSession(profile: UserProfile): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
}

function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Restore session on first render
  const [user, setUser] = useState<UserProfile | null>(readSession);
  const [isAuthenticated, setIsAuthenticated] = useState(() => readSession() !== null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Sync auth flag whenever user changes
  useEffect(() => {
    setIsAuthenticated(user !== null);
  }, [user]);

  const login = (profile: UserProfile) => {
    saveSession(profile);
    setUser(profile);
  };

  const logout = () => {
    clearSession();
    setUser(null);
    setCart([]);
  };

  const addToCart = (product: Product, size: string, color: string) => {
    setCart(prev => {
      const existing = prev.find(
        item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      if (existing) {
        return prev.map(item =>
          item === existing ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartItemsCount,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextType {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside <AppProvider>');
  return ctx;
}
