import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
  },
});
export const baseURL = import.meta.env.DEV
  ? `http://${window.location.hostname}:${import.meta.env.VITE_API_PORT}`
  : window.location.origin;
export const torrentInstance = axios.create({
  baseURL,
});
export default instance;
export const imageUrl = import.meta.env.VITE_IMAGE_URL;
export const searchUrl = "/search/multi?include_adult=false";
export const torrentSearchUrl = "/api/v1/all/search";
export const fetchFiles = "/api/v1/torrent/files";
export const streamMedia = "/api/v1/torrent/video";
export const allSearch = "/api/v1/all/search";
export const x1337 = "/api/v1/all/search/x1337";
export const yts = "/api/v1/all/search/yts";
export const pirateBay = "/api/v1/all/search/pirateBay";
export const movie = "/movie";
