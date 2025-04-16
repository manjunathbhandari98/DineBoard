import { useState } from "react";
import NavLinks from "./NavLinks";
import Sidebar from "./Sidebar";
import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Button, Menu } from "@mantine/core";
import {
  IconCircleDottedLetterH,
  IconLogout,
  IconMenuDeep,
  IconSettings,
} from "@tabler/icons-react"; // Hamburger Icon
import ProfileMenu from "./ProfileMenu";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] =
    useState(true); // You can replace this with actual auth state
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md relative z-50">
      {/* Logo and Home Link */}
      <Link to="/">
        <img
          src="/logo.png"
          alt="Logo"
          width={200}
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-8">
        <NavLinks isLoggedIn={isLoggedIn} />
        {isLoggedIn && (
          <Menu withArrow>
            <Menu.Target>
              <ProfileMenu
                image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                name="Harriette Spoonlicker"
              />
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
                leftSection={<IconSettings />}
                onClick={() =>
                  navigate("/settings")
                }
              >
                Settings
              </Menu.Item>
              <Menu.Divider />
              <Menu.Item
                leftSection={<IconLogout />}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}

        {/* Desktop Login/Register */}
        {!isLoggedIn && (
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
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
};

export default Header;
