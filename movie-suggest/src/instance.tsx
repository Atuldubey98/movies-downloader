import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
  },
});

export const torrentInstance = axios.create({
  baseURL: import.meta.env.DEV ? "http//localhost:8080" : "/",
});
export default instance;
export const imageUrl = import.meta.env.VITE_IMAGE_URL;
export const searchUrl = "/search/multi?include_adult=false";
export const torrentSearchUrl = "/api/v1/all/search";
