import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainLayout from "../layout/MainLayout";
import HotelMenuPreview from "../components/customer/HotelMenuPreview";

const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMenuPage = location.pathname.startsWith(
    "/customer-menu"
  );

  // Force redirect back to customer-menu if trying to leave it
  useEffect(() => {
    if (isMenuPage) {
      const currentPath = location.pathname;

      const handlePopState = () => {
        if (
          window.location.pathname !== currentPath
        ) {
          navigate(currentPath, {
            replace: true,
          });
        }
      };

      window.history.pushState(
        null,
        "",
        currentPath
      );
      window.addEventListener(
        "popstate",
        handlePopState
      );

      return () => {
        window.removeEventListener(
          "popstate",
          handlePopState
        );
      };
    }
  }, [isMenuPage, location.pathname, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      {!isMenuPage ? (
        <div>
          <Header />
          <main className="flex-grow">
            <MainLayout />
          </main>
          <Footer />
        </div>
      ) : (
        <div>
          <main className="flex-grow">
            <HotelMenuPreview />
          </main>
        </div>
      )}
    </div>
  );
};

export default AppContent;
