import { Route, Routes } from "react-router-dom";
import "./App.css";
import FavouritePage from "./pages/FavouritePage";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import TorrentPage from "./pages/TorrentPage";
import StreamPage from "./pages/StreamPage";
import SingleMovie from "./pages/SingleMovie";
import SingleTv from "./pages/SingleTv";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favourite" element={<FavouritePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/torrents" element={<TorrentPage />} />
        <Route path="/stream" element={<StreamPage />} />
        <Route path="/movie/:id" element={<SingleMovie />} />
        <Route path="/tv/:id" element={<SingleTv />} />
      </Routes>
    </>
  );
}
