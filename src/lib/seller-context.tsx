"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Seller, Listing } from "./types";
import { listings as allListings } from "./mock-data";

interface SellerContextType {
  seller: Seller | null;
  sellerListings: Listing[];
  isLoggedIn: boolean;
  login: (seller: Seller) => void;
  logout: () => void;
  addListing: (listing: Omit<Listing, "id" | "sellerId" | "createdAt">) => void;
  updateListing: (id: string, listing: Partial<Listing>) => void;
  deleteListing: (id: string) => void;
}

const SellerContext = createContext<SellerContextType | null>(null);

export function SellerProvider({ children }: { children: ReactNode }) {
  const [seller, setSeller] = useState<Seller | null>(null);
  const [extraListings, setExtraListings] = useState<Listing[]>([]);

  const isLoggedIn = seller !== null;

  const sellerListings = seller
    ? [
        ...allListings.filter((l) => l.sellerId === seller.id),
        ...extraListings.filter((l) => l.sellerId === seller.id),
      ]
    : [];

  const login = useCallback((s: Seller) => setSeller(s), []);
  const logout = useCallback(() => setSeller(null), []);

  const addListing = useCallback(
    (data: Omit<Listing, "id" | "sellerId" | "createdAt">) => {
      if (!seller) return;
      const newListing: Listing = {
        ...data,
        id: `new-${Date.now()}`,
        sellerId: seller.id,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setExtraListings((prev) => [...prev, newListing]);
    },
    [seller]
  );

  const updateListing = useCallback((id: string, data: Partial<Listing>) => {
    setExtraListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...data } : l))
    );
  }, []);

  const deleteListing = useCallback((id: string) => {
    setExtraListings((prev) => prev.filter((l) => l.id !== id));
  }, []);

  return (
    <SellerContext.Provider
      value={{
        seller,
        sellerListings,
        isLoggedIn,
        login,
        logout,
        addListing,
        updateListing,
        deleteListing,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
}

export function useSeller() {
  const context = useContext(SellerContext);
  if (!context) throw new Error("useSeller must be used within SellerProvider");
  return context;
}
