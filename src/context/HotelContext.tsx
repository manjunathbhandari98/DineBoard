// context/HotelContext.tsx
import { createContext, ReactNode, useContext, useState } from "react";

interface HotelContextProps {
  logoUrl: string | null;
  setLogoUrl: (url: string | null) => void;
}

const HotelContext = createContext<HotelContextProps>({
  logoUrl: null,
  setLogoUrl: () => {},
});

export const useHotel = () => useContext(HotelContext);

export const HotelProvider = ({ children }: { children: ReactNode }) => {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  return (
    <HotelContext.Provider value={{ logoUrl, setLogoUrl }}>
      {children}
    </HotelContext.Provider>
  );
};
