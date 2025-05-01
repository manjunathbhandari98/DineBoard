import { useState, useEffect } from "react";
import {
  Container,
  Title,
  Switch,
  Paper,
  Divider,
} from "@mantine/core";
import { useThemeContext } from "../app/ThemeProvider";
import {
  getSettings,
  saveSettings,
} from "../service/settingService";
import { getHotelByUser } from "../service/hotelService";
import { getProfileInfo } from "../service/userService";
import { useDispatch } from "react-redux";
import { addHotel } from "../slice/hotelSlice";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";

const SettingsPage = () => {
  const { colorScheme, toggleColorScheme } =
    useThemeContext();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [settings, setSettings] = useState({
    enableNotification: true,
    darkModeEnabled: false,
    borderAroundQR: true,
    showHotelName: true,
    showDineBoardBranding: true,
  });
  const navigate = useNavigate();

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
      dispatch(addHotel(hotelData));
      setHotel(hotelData);
    };
    fetchHotel();
  }, [user?.id]);

  // 3. Fetch settings after hotel is loaded
  useEffect(() => {
    if (!hotel?.id) return;
    const fetchSettings = async () => {
      const settingsData = await getSettings(
        hotel.id
      );
      setSettings((prev) => ({
        ...prev,
        ...settingsData, // merge defaults + server settings
        darkModeEnabled: colorScheme === "dark", // also sync dark mode here
      }));
      setLoading(false);
    };
    fetchSettings();
  }, [hotel?.id, colorScheme]);

  // 4. Sync dark mode separately if toggled manually
  // useEffect(() => {
  //   if (!hotel?.id) return;
  //   const fetchSettings = async () => {
  //     const settingsData = await getSettings(
  //       hotel.id
  //     );

  //     if (
  //       settingsData.darkModeEnabled &&
  //       colorScheme !== "dark"
  //     ) {
  //       toggleColorScheme("dark");
  //     }
  //     if (
  //       !settingsData.darkModeEnabled &&
  //       colorScheme !== "light"
  //     ) {
  //       toggleColorScheme("light");
  //     }

  //     setSettings((prev) => ({
  //       ...prev,
  //       ...settingsData,
  //     }));
  //   };
  //   fetchSettings();
  // }, [hotel?.id]);

  const handleChange = async (
    field: string,
    value: boolean
  ) => {
    if (
      (field === "showHotelName" ||
        field === "showDineBoardBranding") &&
      user?.planId !== 3
    ) {
      navigate("/pricing");
      return; // stop here
    }

    const updatedSettings = {
      ...settings,
      [field]: value,
    };

    setSettings(updatedSettings);

    if (field === "darkModeEnabled") {
      toggleColorScheme(value ? "dark" : "light");
    }

    if (hotel?.id) {
      await saveSettings({
        hotelId: hotel.id,
        ...updatedSettings,
      });
    }
  };

  if (loading) {
    return (
      <Container
        size="sm"
        py="xl"
      >
        <div className="flex flex-col gap-5 items-center justify-center min-h-[60vh]">
          <Loader size={32} />
          <Title size='xs'>Loading.... </Title>
        </div>
      </Container>
    );
  }

  return (
    <Container
      size="sm"
      py="xl"
    >
      <Title
        order={2}
        className="mb-6 text-center font-semibold"
      >
        Settings
      </Title>

      <Paper
        shadow="md"
        radius="lg"
        p="xl"
        withBorder
        className="space-y-6"
      >
        <Switch
          label="Enable Notifications"
          checked={settings.enableNotification}
          onChange={(e) =>
            handleChange(
              "enableNotification",
              e.currentTarget.checked
            )
          }
        />

        <Switch
          label="Dark Mode"
          checked={settings.darkModeEnabled}
          onChange={(e) =>
            handleChange(
              "darkModeEnabled",
              e.currentTarget.checked
            )
          }
        />

        <Divider
          label="QR Code Preferences"
          labelPosition="center"
          my="md"
        />

        <Switch
          label="Border Around QR Code"
          checked={settings.borderAroundQR}
          onChange={(e) =>
            handleChange(
              "borderAroundQR",
              e.currentTarget.checked
            )
          }
        />

        <Divider
          label="Hotel Branding Preferences"
          labelPosition="center"
          my="md"
        />

        <Switch
          label="Show Hotel Name on Menu"
          checked={settings.showHotelName}
          onChange={(e) =>
            handleChange(
              "showHotelName",
              e.currentTarget.checked
            )
          }
        />

        <Switch
          label="Show DineBoard Branding"
          checked={settings.showDineBoardBranding}
          onChange={(e) =>
            handleChange(
              "showDineBoardBranding",
              e.currentTarget.checked
            )
          }
        />
      </Paper>
    </Container>
  );
};

export default SettingsPage;
