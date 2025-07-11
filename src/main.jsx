import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { ErrorBoundary } from "react-error-boundary";

TimeAgo.addDefaultLocale(en);

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <App />
      </ErrorBoundary>
    </Provider>
  </BrowserRouter>
);
