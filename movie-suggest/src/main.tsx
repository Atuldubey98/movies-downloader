import ReactDOM from "react-dom/client";
import ReactModal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import SearchContextProvider from "./SearchContext";
import "./index.css";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <SearchContextProvider>
      <App />
    </SearchContextProvider>
  </BrowserRouter>
);

ReactModal.setAppElement("#root");
