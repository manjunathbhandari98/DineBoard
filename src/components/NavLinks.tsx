import {
  IconChevronDown,
  IconChevronUp,
  IconLayoutDashboard,
  IconQrcode,
  IconCheck,
  IconSettings,
} from "@tabler/icons-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "@mantine/core";

const NavLinks = ({
  isLoggedIn,
  mobile = false,
  onClose,
}: {
  isLoggedIn: boolean;
  mobile?: boolean;
  onClose?: () => void;
}) => {
  const [featureMenuOpen, setFeatureMenuOpen] =
    useState(false);
  const [
    mobileFeatureOpen,
    setMobileFeatureOpen,
  ] = useState(false);

  const commonClasses = mobile
    ? "block text-lg py-2"
    : "text-gray-700 hover:text-gray-900";

  return (
    <div className="flex gap-20">
      <div
        className={
          mobile
            ? "flex flex-col"
            : "hidden md:flex space-x-4"
        }
      >
        {!isLoggedIn ? (
          <>
            {/* Features Section */}
            {mobile ? (
              <>
                <div
                  className="flex items-center justify-between cursor-pointer text-lg py-2"
                  onClick={() =>
                    setMobileFeatureOpen(
                      !mobileFeatureOpen
                    )
                  }
                >
                  Features{" "}
                  {mobileFeatureOpen ? (
                    <IconChevronUp size={18} />
                  ) : (
                    <IconChevronDown size={18} />
                  )}
                </div>

                {mobileFeatureOpen && (
                  <div className="ml-4 flex flex-col gap-3 mb-4">
                    <NavLink
                      to="/features/custom-dashboard"
                      className="text-gray-700"
                      onClick={onClose}
                    >
                      Customizable Dashboard
                    </NavLink>
                    <NavLink
                      to="/features/qr-menus"
                      className="text-gray-700"
                      onClick={onClose}
                    >
                      Instant QR Menu Generator
                    </NavLink>
                    <NavLink
                      to="/features/order-tracking"
                      className="text-gray-700"
                      onClick={onClose}
                    >
                      Real-time Order Tracking
                    </NavLink>
                    <NavLink
                      to="/features/menu-management"
                      className="text-gray-700"
                      onClick={onClose}
                    >
                      Easy Menu Management
                    </NavLink>
                  </div>
                )}
              </>
            ) : (
              <Menu
                width={240}
                shadow="md"
                opened={featureMenuOpen}
                onOpen={() =>
                  setFeatureMenuOpen(true)
                }
                onClose={() =>
                  setFeatureMenuOpen(false)
                }
              >
                <Menu.Target>
                  <div
                    className={`${commonClasses} flex items-center gap-1 cursor-pointer`}
                  >
                    Features{" "}
                    {featureMenuOpen ? (
                      <IconChevronUp size={18} />
                    ) : (
                      <IconChevronDown
                        size={18}
                      />
                    )}
                  </div>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={
                      <IconLayoutDashboard
                        size={16}
                      />
                    }
                    component={NavLink}
                    to="/features/custom-dashboard"
                  >
                    Customizable Dashboard
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconQrcode size={16} />
                    }
                    component={NavLink}
                    to="/features/qr-menus"
                  >
                    Instant QR Menu Generator
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconCheck size={16} />
                    }
                    component={NavLink}
                    to="/features/order-tracking"
                  >
                    Real-time Order Tracking
                  </Menu.Item>
                  <Menu.Item
                    leftSection={
                      <IconSettings size={16} />
                    }
                    component={NavLink}
                    to="/features/menu-management"
                  >
                    Easy Menu Management
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}

            <NavLink
              to="/pricing"
              className={commonClasses}
              onClick={onClose}
            >
              Pricing
            </NavLink>
            <NavLink
              to="/support"
              className={commonClasses}
              onClick={onClose}
            >
              Support
            </NavLink>
            <NavLink
              to="/about"
              className={commonClasses}
              onClick={onClose}
            >
              About
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/dashboard"
              className={commonClasses}
              onClick={onClose}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/menus"
              className={commonClasses}
              onClick={onClose}
            >
              Menu
            </NavLink>
            <NavLink
              to="/qrcodes-setting"
              className={commonClasses}
              onClick={onClose}
            >
              QR Codes
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default NavLinks;
