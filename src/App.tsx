
import ThemeProvider from "./app/ThemeProvider";
import Header from "./components/Header"
import "@mantine/core/styles.css";
import MainLayout from "./layout/MainLayout";
import Footer from "./components/Footer";
import { BrowserRouter } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        {/* Full height flex container */}
        <div className="min-h-screen flex flex-col">
          <Header />

          {/* This grows to fill space and pushes Footer down */}
          <main className="flex-grow">
            <MainLayout />
          </main>

          {/* Footer always sticks to bottom */}
          <Footer />
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}


export default App
