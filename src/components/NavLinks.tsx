import { Menu } from "@mantine/core";
import { IconLanguage } from "@tabler/icons-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import LanguageMenu from "./LanguageMenu";

const NavLinks = ({
  isLoggedIn,
  mobile = false,
}: {
  isLoggedIn: boolean;
  mobile?: boolean;
}) => {
  const commonClasses = mobile
    ? "block text-lg py-2"
    : "text-gray-700 hover:text-gray-900";

     const [opened, setOpened] = useState(false);

  return (
    <div className="flex gap-20">
      <div
        className={`${
          mobile
            ? "flex flex-col"
            : "hidden md:flex space-x-4"
        }`}
      >
        {isLoggedIn ? (
          <>
            <NavLink
              to="/features"
              className={commonClasses}
            >
              Features
            </NavLink>
            <NavLink
              to="/pricing"
              className={commonClasses}
            >
              Pricing
            </NavLink>
            <NavLink
              to="/support"
              className={commonClasses}
            >
              Support
            </NavLink>
            <NavLink
              to="/about"
              className={commonClasses}
            >
              About
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/dashboard"
              className={commonClasses}
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/menu"
              className={commonClasses}
            >
              Menu
            </NavLink>
            <NavLink
              to="/qr"
              className={commonClasses}
            >
              QR Codes
            </NavLink>
            <NavLink
              to="/orders"
              className={commonClasses}
            >
              Orders
            </NavLink>
          </>
        )}
      </div>
      <Menu
        opened={opened}
        onChange={setOpened}
      >
        <LanguageMenu/>
      </Menu>
    </div>
  );
};

export default NavLinks;
