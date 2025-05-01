import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Custom hook to block navigation on /menu/:id route
const useMenuRouteBlocker = () => {
  const location = useLocation();

  useEffect(() => {
    // Only block navigation if the current path is /menu/:id
    if (location.pathname.startsWith("/menu")) {
      // Block navigation using window.onbeforeunload
      const handleBeforeUnload = (
        event: BeforeUnloadEvent
      ) => {
        event.preventDefault();
        event.returnValue = ""; // Chrome requires this for the confirmation prompt
      };

      window.addEventListener(
        "beforeunload",
        handleBeforeUnload
      );

      // Clean up the event listener when the component is unmounted or path changes
      return () => {
        window.removeEventListener(
          "beforeunload",
          handleBeforeUnload
        );
      };
    }
  }, [location.pathname]);
};

export default useMenuRouteBlocker;
