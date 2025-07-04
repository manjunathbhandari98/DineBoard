import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import ThemeProvider from "./app/ThemeProvider.tsx";

createRoot(
  document.getElementById("root")!
).render(
    <ThemeProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
);
