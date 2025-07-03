import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AuthChecker } from "./context/AuthContext";
import { HotelProvider } from "./context/HotelContext";
import AppContent from "./routes/AppContext";

const App = () => {
  return (
    <BrowserRouter>
    <HotelProvider>
       <AuthChecker />
      <AppContent />
    </HotelProvider>
     
    </BrowserRouter>
  );
};

export default App;
