// context/HotelContext.tsx
import { createContext, ReactNode, useContext, useMemo, useState } from "react";

interface HotelContextProps {
  logoUrl: string | null;
  setLogoUrl: (url: string | null) => void;
}

// Create the context with `undefined` to allow safety check
const HotelContext = createContext<HotelContextProps | undefined>(undefined);

export const useHotel = (): HotelContextProps => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotel must be used within a HotelProvider");
  }
  return context;
};

export const HotelProvider = ({ children }: { children: ReactNode }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  // Use useMemo to avoid unnecessary re-renders of consumers
  const value = useMemo(() => ({ logoUrl, setLogoUrl }), [logoUrl]);

  return (
    <HotelContext.Provider value={value}>{children}</HotelContext.Provider>
  );
};
