/* eslint-disable react-refresh/only-export-components */
// ThemeProvider.tsx
import {
  ColorSchemeScript,
  createTheme,
  MantineProvider,
} from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { getHotelByUser } from "../service/hotelService";
import { getSettings } from "../service/settingService";
import { getProfileInfo } from "../service/userService";
// Define the context type
type ThemeContextType = {
  colorScheme: "light" | "dark";
  toggleColorScheme: (
    value?: "light" | "dark"
  ) => void;
};
// Create the context
const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

// Export a hook to use the context
export const useThemeContext = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx)
    throw new Error(
      "useThemeContext must be used within ThemeProvider"
    );
  return ctx;
};

const ThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [colorScheme, setColorScheme] = useState<
    "light" | "dark"
  >("light");

  const toggleColorScheme = (
    value?: "light" | "dark"
  ) =>
    setColorScheme(
      value ||
        (colorScheme === "light"
          ? "dark"
          : "light")
    );

  const [hotel, setHotel] = useState<any>(null);
  const [user, setUser] = useState<any>(null);

  // 1. Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getProfileInfo();
      setUser(userData);
    };
    fetchUser();
  }, []);

  // 2. Fetch hotel after user is loaded
  useEffect(() => {
    if (!user?.id) return;
    const fetchHotel = async () => {
      const hotelData = await getHotelByUser(
        user.id
      );
      setHotel(hotelData);
    };
    fetchHotel();
  }, [user?.id]);

  // 👇 Automatically fetch settings and apply theme
  useEffect(() => {
    const fetchSettingsAndApplyTheme =
      async () => {
        try {
          // or however you store hotel/user id

          if (!hotel?.id) return;

          const settings = await getSettings(
            hotel?.id
          );

          if (settings.darkModeEnabled) {
            setColorScheme("dark");
          } else {
            setColorScheme("light");
          }
        } catch (error) {
          console.error(
            "Error fetching settings for theme:",
            error
          );
        }
      };

    fetchSettingsAndApplyTheme();
  }, [hotel?.id]); // Run only once on app load

  const customTheme = createTheme({
    primaryColor: "redTheme",
    primaryShade: 5,
    colors: {
      redTheme: [
        "#fff1f2",
        "#ffe4e6",
        "#fecdd3",
        "#fda4af",
        "#fb7185",
        "#f43f5e",
        "#e11d48",
        "#be123c",
        "#9f1239",
        "#881337",
      ],
    },
    fontFamily: "Poppins, sans-serif",
    defaultRadius: "md",
    white: "#ffffff",
    black: "#1f1f1f",
    headings: {
      fontFamily: "Poppins, sans-serif",
      fontWeight: "600",
    },
  });

  return (
    <ThemeContext.Provider
      value={{ colorScheme, toggleColorScheme }}
    >
      <ColorSchemeScript defaultColorScheme="light" />
      <MantineProvider
        theme={customTheme}
        forceColorScheme={colorScheme}
      >
        <Notifications />
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
