import {
  Avatar,
  Card,
  Group,
  Menu,
  Modal,
} from "@mantine/core";
import {
  IconBuildingSkyscraper,
  IconCircleDottedLetterH,
  IconLogout,
  IconMenuDeep,
  IconPlanet,
  IconSettings,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useThemeContext } from "../app/ThemeProvider";
import { useHotel } from "../context/HotelContext";
import { getHotelByUser } from "../service/hotelService";
import { getProfileInfo } from "../service/userService";
import {
  removeUser
} from "../slice/userSlice";
import NavLinks from "./NavLinks";
import Sidebar from "./Sidebar";
import Button from "./ui/Button";
import Text from "./ui/Text";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(
    (state: any) => state.user.token
  );
  const { colorScheme } = useThemeContext();
  // const [user, setUser] = useState(false);
  const [sidebarOpen, setSidebarOpen] =
    useState(false);
  const [modalOpen, setModalOpen] =
    useState(false);
  const [hotelData, setHotelData] =
    useState<any>();
  const [profile, setProfile] = useState<any>();

  const { logoUrl, setLogoUrl } = useHotel();

  const handleLogout = () => {
    dispatch(removeUser());
    setModalOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await getProfileInfo();
      setProfile(response);
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    if (!profile?.id) return; // wait until profile is loaded

    const fetchHotelByUser = async (userId: string) => {
      try {
        const response = await getHotelByUser(userId);
        if (response) {
          setHotelData(response);
          if (response.logoUrl) {
            setLogoUrl(response.logoUrl); // ✅ update context on page load
          }
        }
      } catch (error) {
        console.error("Error fetching hotel:", error);
      }
    };
    

    fetchHotelByUser(profile?.id);
  }, [profile?.id]);

  return (
    <div className="h-full w-full">
      <header
        className={`flex items-center justify-between p-4 ${
          colorScheme === "dark"
            ? "bg-[#040611] text-gray-200"
            : "bg-white text-black"
        } shadow-md relative z-50`}
      >
        {/* Logo and Home Link */}

        <Link to="/">
          <img
            src={
              colorScheme === "dark"
                ? "/logo-light.png"
                : "/logo.png"
            }
            alt="Logo"
            width={200}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <NavLinks isLoggedIn={user} />
          {user && (
            <Menu withArrow>
              <Menu.Target>
                {logoUrl ? (
                  <Avatar
                    src={logoUrl}
                    alt={hotelData.name}
                    size={45}
                    radius="xl"
                    className="border-2 border-red-500 hover:border-gray-400 transition duration-300 cursor-pointer"
                  />
                ) : (
                  <IconBuildingSkyscraper
                    size={40}
                    className="border-2 rounded-full p-1 border-red-500 hover:border-gray-400 transition duration-300 cursor-pointer"
                  />
                )}
              </Menu.Target>
              <Menu.Dropdown w={150}>
                <Menu.Item
                  onClick={() =>
                    navigate("/hotel-profile")
                  }
                  leftSection={
                    <IconCircleDottedLetterH />
                  }
                >
                  Profile
                </Menu.Item>
                <Menu.Item
                  onClick={() =>
                    navigate("/pricing")
                  }
                  leftSection={<IconPlanet />}
                >
                  Plans
                </Menu.Item>
                <Menu.Item
                  onClick={() =>
                    navigate("/settings")
                  }
                  leftSection={<IconSettings />}
                >
                  Settings
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  leftSection={<IconLogout />}
                  onClick={() =>
                    setModalOpen(true)
                  }
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}

          {/* Desktop Login/Register */}
          {!user && (
            <div className="space-x-4">
              <Link to="/auth?mode=login">
                <Button radius="xl">Login</Button>
              </Link>
              <Link to="/auth?mode=register">
                <Button radius="xl">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button
          className="md:hidden"
          onClick={() =>
            setSidebarOpen(!sidebarOpen)
          }
        >
          <IconMenuDeep size={28} />
        </button>

        {/* Sidebar for Mobile */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          isLoggedIn={user}
        />
      </header>

      {/* Logout Confirmation Modal */}
      <Modal
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        centered
        withCloseButton={false}
        overlayProps={{
          opacity: 0.55,
          blur: 3,
        }}
        size="sm"
        radius="lg"
        className="w-full h-full bg-black/20"
      >
        <Card
          shadow="md"
          padding="xl"
          radius="lg"
          className="text-center"
        >
          <Text
            size="lg"
            weight="semibold"
          >
            Are you sure you want to logout?
          </Text>
          <Text
            size="sm"
            className="mt-2 mb-4"
          >
            You will be returned to the homepage.
          </Text>

          <Group
            grow
            className="mt-5"
          >
            <Button
              variant="outline"
              color="gray"
              onClick={() => setModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              color="red"
              variant="filled"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Group>
        </Card>
      </Modal>
    </div>
  );
};

export default Header;
