
import ThemeProvider from "./app/ThemeProvider";
import "@mantine/core/styles.css";
import { BrowserRouter } from "react-router-dom";
import AppContent from './routes/AppContext'
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
       <AppContent/>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App
