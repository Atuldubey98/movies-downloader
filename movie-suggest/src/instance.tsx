import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
  },
});
export const baseURL = import.meta.env.VITE_TORRENT_URL;
export const torrentInstance = axios.create({
  baseURL,
});
export default instance;
export const imageUrl = import.meta.env.VITE_IMAGE_URL;
export const searchUrl = "/search/multi?include_adult=false";
export const torrentSearchUrl = "/api/v1/all/search";
export const fetchFiles = "/api/v1/torrent/files";
export const streamMedia = "/api/v1/torrent/video"