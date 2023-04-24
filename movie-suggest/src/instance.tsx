import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "747e4d8790bd111419e88605ca28440c",
  },
});

export const torrentInstance = axios.create({
  baseURL: import.meta.env.DEV ? "http//localhost:8080" : "/",
});
export default instance;
export const imageUrl = "https://image.tmdb.org/t/p/original/";
export const searchUrl = "/search/multi?include_adult=false";
export const torrentSearchUrl = "/api/v1/all/search";
