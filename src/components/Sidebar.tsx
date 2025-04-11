import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { IconX } from "@tabler/icons-react";
import { Button } from "@mantine/core";

const Sidebar = ({
  isOpen,
  onClose,
  isLoggedIn,
}: {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen
          ? "translate-x-0"
          : "translate-x-full"
      } md:hidden`}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">
          Menu
        </h2>
        <button onClick={onClose}>
          <IconX size={24} />
        </button>
      </div>

      <div className="flex flex-col h-[90%] justify-between p-4">
        <div className="flex flex-col space-y-4">
            <NavLinks
          isLoggedIn={isLoggedIn}
          mobile
        />
        </div>
        
        <div className="flex flex-col space-y-4">
            {!isLoggedIn && (
          <>
            <Link to="/login">
              <Button
                onClick={onClose}
                fullWidth
                className="w-full  py-2 rounded"
              >
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button
                onClick={onClose}
                fullWidth
                className="w-full py-2 rounded"
              >
                Register
              </Button>
            </Link>
          </>
        )}
        </div>
        
      </div>
    </div>
  );
};

export default Sidebar;
