import axios from "axios";
import type { Movie } from "../types/movie";

export interface GetMovieResponse {
  results: Movie[];
}

const movieKey = import.meta.env.VITE_TMDB_TOKEN;
const url = `https://api.themoviedb.org/3/search/movie`;

export default async function fetchMovies(
  query: string,
): Promise<GetMovieResponse> {
  const { data } = await axios.get<GetMovieResponse>(url, {
    params: { query },
    headers: {
      Authorization: `Bearer ${movieKey}`,
    },
  });
  return data;
}
