import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./app/store.js";
import { UIProvider } from "./context/UIContext.jsx";
import "./styles/global.css";
import App from "./App.jsx";
import "./styles/Responsive.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <UIProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UIProvider>
    </Provider>
  </React.StrictMode>
);