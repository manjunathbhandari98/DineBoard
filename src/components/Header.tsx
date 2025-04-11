import { useState } from "react";
import Logo from "../assets/Logo";
import NavLinks from "./NavLinks";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";
import { IconLanguage, IconMenuDeep } from "@tabler/icons-react"; // Hamburger Icon

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md relative z-50">
      <img src="/logo.png" alt="" width={200}/>

      {/* Desktop Nav */}
      <NavLinks isLoggedIn={isLoggedIn} />


      {/* Desktop Login/Register */}
      {!isLoggedIn && (
        <div className="hidden md:flex space-x-4">
          <Link to="/login">
            <Button radius="xl">Login</Button>
          </Link>
          <Link to="/register">
            <Button radius="xl">Register</Button>
          </Link>
        </div>
      )}

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
