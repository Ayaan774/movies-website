import axios from "axios";

const API_KEY = import.meta.env.VITE_MOVIES_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

//Fetch movies on search query

export const fetchMovies = async (query) => {
  const response = await axios.get(`${BASE_URL}/search/movie`, {
    params: { api_key: API_KEY, query },
  });

  return response.data.results;
};

//Fetch movie info i.e credits(actors,staff) , videos(trailers) , genres

export const fetchMoviesDetails = async (movieId) => {
  const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
    params: { api_key: API_KEY, append_to_response: "credits,videos,genres" }, //append_to_reponse will bring credits,videos and genres data in one call combined without having to call it seperately 3 times
  });
  return response.data;
};

//Fetch Available Genres for Filtering

export const fetchGenres = async () => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
    params: { api_key: API_KEY },
  });
  return response.data.genres;
};

//Fetch Trending Movies

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/trending/movie/day`, {
    params: { api_key: API_KEY },
  });
  return response.data.results;
};

//Fetch Upcoming Movies

export const fetchUpcomingMovies = async () => {
  const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
    params: { api_key: API_KEY },
  });
  return response.data.results;
};
