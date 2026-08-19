import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "../types";

interface QuoteCartItem {
  product: Product;
  quantity: number;
}

interface QuoteCartContextValue {
  items: QuoteCartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  count: number;
}

const STORAGE_KEY = "tecport-quote-cart";

const QuoteCartContext = createContext<QuoteCartContextValue | undefined>(undefined);

function readStoredItems(): QuoteCartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as QuoteCartItem[]) : [];
  } catch {
    return [];
  }
}

export function QuoteCartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<QuoteCartItem[]>(() => readStoredItems());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) => (i.product.id === productId ? { ...i, quantity: Math.max(1, quantity) } : i)),
    );
  };

  const clear = () => setItems([]);

  const count = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  return (
    <QuoteCartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clear, count }}>
      {children}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart() {
  const ctx = useContext(QuoteCartContext);
  if (!ctx) throw new Error("useQuoteCart must be used within a QuoteCartProvider");
  return ctx;
}
