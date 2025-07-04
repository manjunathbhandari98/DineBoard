
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./app/store.ts";
import ThemeProvider from "./app/ThemeProvider.tsx";
import "./index.css";

createRoot(
  document.getElementById("root")!
).render(
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
);
