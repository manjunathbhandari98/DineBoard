import ThemeProvider from "./app/ThemeProvider";
import "@mantine/core/styles.css";
import { BrowserRouter } from "react-router-dom";
import "@mantine/notifications/styles.css";
import AppContent from "./routes/AppContext";
import "./App.css";
import { AuthChecker } from "./context/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthChecker />
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
