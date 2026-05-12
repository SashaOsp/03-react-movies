import css from "./MovieModal.module.css";
import type { Movie } from "../../types/movie";
import { createPortal } from "react-dom";
import { useEffect } from "react";

interface MovieModalProps {
  onClose: () => void;
  movie: Movie;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleEscape = ({ key }: KeyboardEvent) => {
      if (key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = ({
    target,
    currentTarget,
  }: React.MouseEvent<HTMLDivElement>) => {
    if (target === currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>

        <img
          className={css.image}
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />

        <div className={css.content}>
          <h2>{movie.title}</h2>

          <p>{movie.overview}</p>

          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>

          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
        </div>
      </div>
    </div>,
    document.body,
  );
}
