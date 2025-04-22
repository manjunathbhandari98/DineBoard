import { useState } from "react";
import NavLinks from "./NavLinks";
import Sidebar from "./Sidebar";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import Text from "./ui/Text";
import {
  Menu,
  Modal,
  Card,
  Group,
} from "@mantine/core";
import {
  IconCircleDottedLetterH,
  IconLogout,
  IconMenuDeep,
  IconPlanet,
  IconSettings,
} from "@tabler/icons-react";
import ProfileMenu from "./ProfileMenu";
import {
  useSelector,
  useDispatch,
} from "react-redux";
import { removeUser } from "../slice/userSlice";
import Button from "./ui/Button";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(
    (state: any) => state.user.token
  );
  const profile = useSelector(
    (state: any) => state.user.profile
  );
  // const [user, setUser] = useState(false);
  const [sidebarOpen, setSidebarOpen] =
    useState(false);
  const [modalOpen, setModalOpen] =
    useState(false);

  const handleLogout = () => {
    dispatch(removeUser());
    setModalOpen(false);
    navigate("/");
  };

  return (
    <div className="h-full w-full">
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
          <NavLinks isLoggedIn={user} />
          {user && (
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
