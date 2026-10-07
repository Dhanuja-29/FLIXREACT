// ============================================
// COMPONENT: MovieCard
// ============================================
// 🎓 CONCEPTS: Props, conditional rendering, event handlers
//
// Props received:
//   - movie: the movie object from TMDB API
//   - size: optional override for card width
// ============================================

import { useNavigate } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import { IMG_SIZES } from '../api/tmdb';

function MovieCard({ movie, size }) {
  // 🎓 Props: movie data is passed FROM parent TO this component
  const navigate = useNavigate();
  const { toggleWatchlist, isInWatchlist } = useWatchlist();

  if (!movie) return null;

  // Determine if it's a movie or TV show (TMDB returns both)
  const isTV    = movie.media_type === 'tv' || !!movie.first_air_date;
  const title   = movie.title || movie.name || 'Unknown Title';
  const year    = (movie.release_date || movie.first_air_date || '').substring(0, 4);
  const rating  = movie.vote_average?.toFixed(1) || 'N/A';
  const inList  = isInWatchlist(movie.id);

  const posterUrl = movie.poster_path
    ? `${IMG_SIZES.poster.md}${movie.poster_path}`
    : null;

  const handleClick = () => {
    // Navigate to the detail page with the correct type
    navigate(`/${isTV ? 'tv' : 'movie'}/${movie.id}`);
  };

  const handleWatchlistToggle = (e) => {
    e.stopPropagation(); // Prevent card click from firing
    toggleWatchlist(movie);
  };

  return (
    // 🎓 JSX: className instead of class, onClick instead of onclick
    <div
      className="movie-card"
      style={size ? { flex: `0 0 ${size}` } : {}}
      onClick={handleClick}
      role="article"
      aria-label={`${title}, ${year}`}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      id={`movie-card-${movie.id}`}
    >
      <div className="movie-card-inner">
        {/* Poster Image */}
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={`${title} poster`}
            className="movie-card-poster"
            loading="lazy"
          />
        ) : (
          // 🎓 Conditional rendering: show placeholder if no poster
          <div className="movie-card-no-poster">
            <span style={{ fontSize: '2rem' }}>🎬</span>
            <span>{title}</span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="movie-card-overlay">
          <div className="movie-card-title">{title}</div>
          <div className="movie-card-meta">
            <span className="movie-card-rating">⭐ {rating}</span>
            {year && <span className="movie-card-year">{year}</span>}
            {isTV && (
              <span style={{ color: '#e50914', fontSize: '0.65rem', fontWeight: 700 }}>
                TV
              </span>
            )}
          </div>
          <div className="movie-card-actions">
            <button
              className="card-btn card-btn-play"
              onClick={(e) => { e.stopPropagation(); handleClick(); }}
              aria-label={`Play ${title}`}
              id={`play-btn-${movie.id}`}
            >
              ▶ Play
            </button>
            <button
              className="card-btn card-btn-info"
              onClick={handleWatchlistToggle}
              aria-label={inList ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`}
              id={`watchlist-btn-${movie.id}`}
              style={inList ? { borderColor: '#46d369', color: '#46d369' } : {}}
            >
              {inList ? '✓ Saved' : '+ List'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
