// src/routes/AppContent.tsx
import Header from "../components/Header";
import Footer from "../components/Footer";
import MainLayout from "../layout/MainLayout";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useThemeContext } from "../app/ThemeProvider";

const AppContent = () => {
  const location = useLocation();
  const { colorScheme } = useThemeContext();
  const [hideLayout, setHideLayout] =
    useState(false);

  useEffect(() => {
    // Only hide layout on /menu or /menu/:id routes
    const shouldHide =
      location.pathname.startsWith(
        "/customer-menu"
      );
    setHideLayout(shouldHide);
  }, [location.pathname]);

  return (
    <div
      className={`min-h-screen flex flex-col ${
        colorScheme === "dark"
          ? "bg-[#040611] text-white"
          : "bg-white text-black"
      }`}
    >
      {!hideLayout && <Header />}
      <main className="flex-grow">
        <MainLayout />
      </main>
      {!hideLayout && <Footer />}
    </div>
  );
};

export default AppContent;
