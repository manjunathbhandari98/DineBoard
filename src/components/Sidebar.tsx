import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { IconX } from "@tabler/icons-react";
import ProfileMenu from "./ProfileMenu";
import Button from "./ui/Button";

const Sidebar = ({
  isOpen,
  onClose,
  isLoggedIn,
}: {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (
      event: MouseEvent
    ) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(
          event.target as Node
        )
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener(
        "mousedown",
        handleClickOutside
      );
    }

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 md:hidden" />
      )}

      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen
            ? "translate-x-0"
            : "translate-x-full"
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold">
            Menu
          </h2>
          <button onClick={onClose}>
            <IconX size={24} />
          </button>
        </div>

        <div className="flex flex-col h-[90%] justify-between p-4">
          <div className="flex flex-col space-y-5">
            <NavLinks
              isLoggedIn={isLoggedIn}
              mobile
              onClose={onClose}
            />
          </div>

          <div className="flex flex-col space-y-4">
            {!isLoggedIn ? (
              <>
                <Link to="/auth?mode=login">
                  <Button
                    onClick={onClose}
                    fullWidth
                    className="py-2 rounded"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/auth?mode=register">
                  <Button
                    onClick={onClose}
                    fullWidth
                    className="py-2 rounded"
                  >
                    Register
                  </Button>
                </Link>
              </>
            ) : (
              <Link
                to="/hotel-settings"
                onClick={onClose}
              >
                <ProfileMenu
                  name={"Hotel Star"}
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
