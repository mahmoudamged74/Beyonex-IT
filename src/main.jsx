import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { setupListeners } from "@reduxjs/toolkit/query";
import { store } from "./redux/store";
import { settingsApi } from "./redux/api/settingsApi";
import { homeApi } from "./redux/api/homeApi";
import { aboutApi } from "./redux/api/aboutApi";
import { servicesApi } from "./redux/api/servicesApi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./i18n";
import i18n from "./i18n";
import App from "./App.jsx";
import "./Styles/index.css";
import { fetchPublicFavicon } from "./utils/siteFavicon";

fetchPublicFavicon();

const initialLang = i18n.language || "ar";
store.dispatch(settingsApi.endpoints.getSettings.initiate(initialLang));
store.dispatch(homeApi.endpoints.getHomeData.initiate(initialLang));
store.dispatch(aboutApi.endpoints.getAbout.initiate(initialLang));

if (typeof window !== "undefined" && "requestIdleCallback" in window) {
  window.requestIdleCallback(() => {
    store.dispatch(servicesApi.endpoints.getServices.initiate(initialLang));
  });
}

setupListeners(store.dispatch);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);

const appShell = document.getElementById("app-shell");

function hideAppShell() {
  if (!appShell) return;
  appShell.classList.add("fade-out");
  window.setTimeout(() => appShell.remove(), 480);
}

if (appShell) {
  const root = document.getElementById("root");
  const revealWhenReady = () => {
    if (root?.childElementCount > 0) {
      requestAnimationFrame(() => {
        requestAnimationFrame(hideAppShell);
      });
      return true;
    }
    return false;
  };

  if (!revealWhenReady()) {
    const observer = new MutationObserver(() => {
      if (revealWhenReady()) observer.disconnect();
    });
    observer.observe(root, { childList: true });
    window.setTimeout(() => {
      observer.disconnect();
      hideAppShell();
    }, 4000);
  }
}
