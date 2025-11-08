import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./App.css";
import ThemeProvider from "./app/ThemeProvider";
import { AuthChecker } from "./context/AuthContext";
import { HotelProvider } from "./context/HotelContext";
import AppContent from "./routes/AppContext";

const App = () => {
  return (
    <ThemeProvider>
      <HotelProvider>
        <AuthChecker />
        <AppContent />
      </HotelProvider>
    </ThemeProvider>
  );
};

export default App;
