export const TMDB_CONFIG = {
  baseUrl: "https://api.themoviedb.org/3",
  apiKey: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};
