import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import toast from "react-hot-toast";
import type { Movie } from "../../types/movie";
import fetchMovies from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { Toaster } from "react-hot-toast";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  const handleSearch = async (query: string) => {
    try {
      setIsLoading(true);
      setHasError(false);
      setMovies([]);

      const { results } = await fetchMovies(query);

      if (!results.length) {
        toast.error("No movies found for your request.");
        return;
      }

      setMovies(results);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      {isLoading && <Loader />}

      {hasError && <ErrorMessage />}

      {!!movies.length && <MovieGrid movies={movies} onSelect={openModal} />}

      <Toaster position="top-center" reverseOrder={false} />

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}

export default App;
