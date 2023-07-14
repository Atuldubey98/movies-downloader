import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

const FavouritePage = React.lazy(() => import("./pages/FavouritePage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));
const SearchPage = React.lazy(() => import("./pages/SearchPage"));
const TorrentPage = React.lazy(() => import("./pages/TorrentPage"));
const StreamPage = React.lazy(() => import("./pages/StreamPage"));
const SingleMovie = React.lazy(() => import("./pages/SingleMovie"));
const SingleTv = React.lazy(() => import("./pages/SingleTv"));
import LoadingIndi from "./components/LoadingIndi";

export default function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingIndi loading={true} />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favourite" element={<FavouritePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/torrents" element={<TorrentPage />} />
          <Route path="/stream" element={<StreamPage />} />
          <Route path="/movie/:id" element={<SingleMovie />} />
          <Route path="/tv/:id" element={<SingleTv />} />
        </Routes>
      </Suspense>
    </>
  );
}
