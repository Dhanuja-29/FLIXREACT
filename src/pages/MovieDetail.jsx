// ============================================
// PAGE: MovieDetail
// ============================================
// 🎓 CONCEPTS: useParams (get URL params), useState (modal open),
//              conditional rendering, array destructuring
// ============================================

import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { endpoints, IMG_SIZES } from '../api/tmdb';
import { useWatchlist } from '../context/WatchlistContext';
import TrailerModal from '../components/TrailerModal';
import MovieRow from '../components/MovieRow';

function MovieDetail() {
  // 🎓 useParams: read URL parameters — /movie/:id gives us { id }
  const { id, type } = useParams(); // type = 'movie' or 'tv'
  const isTV = type === 'tv';

  const [trailerOpen, setTrailerOpen] = useState(false);
  const { toggleWatchlist, isInWatchlist } = useWatchlist();

  // 🎓 Ternary: pick the right endpoint based on type
  const url = isTV ? endpoints.tvDetail(id) : endpoints.movieDetail(id);
  const { data: movie, loading, error } = useFetch(url);

  // Loading state
  if (loading) {
    return (
      <div className="spinner-container" id="detail-loading">
        <div className="spinner" aria-label="Loading movie details..." />
      </div>
    );
  }

  // Error state
  if (error || !movie) {
    return (
      <main className="not-found">
        <h1>Oops!</h1>
        <h2>Movie not found</h2>
        <p>We couldn't find that one. Maybe it doesn't exist?</p>
        <Link to="/" className="btn btn-red">Go Home</Link>
      </main>
    );
  }

  // Extract data from the movie object
  const title       = movie.title || movie.name;
  const overview    = movie.overview;
  const rating      = movie.vote_average?.toFixed(1);
  const year        = (movie.release_date || movie.first_air_date || '').substring(0, 4);
  const runtime     = movie.runtime ? `${movie.runtime}m` : movie.episode_run_time?.[0] ? `${movie.episode_run_time[0]}m/ep` : null;
  const genres      = movie.genres || [];
  const cast        = movie.credits?.cast?.slice(0, 12) || [];
  const inList      = isInWatchlist(movie.id);

  // Find the official trailer from videos
  const trailer = movie.videos?.results?.find(
    (v) => v.type === 'Trailer' && v.site === 'YouTube'
  ) || movie.videos?.results?.[0];

  const backdropUrl = movie.backdrop_path
    ? `${IMG_SIZES.backdrop.orig}${movie.backdrop_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `${IMG_SIZES.poster.xl}${movie.poster_path}`
    : null;

  // Get similar movies endpoint
  const similarUrl = isTV
    ? `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${movie.id}`
    : null;

  return (
    <main className="movie-detail" id="movie-detail-page">
      {/* Backdrop */}
      {backdropUrl && (
        <div
          className="movie-detail-hero"
          role="img"
          aria-label={`${title} backdrop`}
        >
          <div
            className="movie-detail-backdrop"
            style={{ backgroundImage: `url(${backdropUrl})` }}
          />
        </div>
      )}

      {/* Main Content */}
      <div className="movie-detail-content">
        {/* Poster */}
        <aside className="detail-poster">
          {posterUrl ? (
            <img src={posterUrl} alt={`${title} poster`} />
          ) : (
            <div
              style={{
                background: 'var(--bg-card)',
                height: '420px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
              }}
            >
              🎬
            </div>
          )}
        </aside>

        {/* Info */}
        <div className="detail-info">
          {/* Back Button */}
          <Link
            to="/"
            id="detail-back-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              marginBottom: '1.5rem',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.target.style.color = 'white')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
          >
            ← Back to Browse
          </Link>

          {/* Title */}
          <h1 className="detail-title" id="detail-title">{title}</h1>

          {/* Meta Row */}
          <div className="detail-meta-row">
            <span className="detail-badge">{isTV ? 'TV Series' : 'Movie'}</span>
            <span className="detail-rating">⭐ {rating} / 10</span>
            <span className="detail-stat">{year}</span>
            {runtime && <span className="detail-stat">{runtime}</span>}
          </div>

          {/* Genres */}
          <div className="detail-genres">
            {genres.map((g) => (
              <span key={g.id} className="genre-tag">{g.name}</span>
            ))}
          </div>

          {/* Overview */}
          <p className="detail-overview">{overview}</p>

          {/* Action Buttons */}
          <div className="detail-actions">
            {trailer && (
              <button
                id="detail-trailer-btn"
                className="btn btn-red"
                onClick={() => setTrailerOpen(true)}
                aria-label={`Watch ${title} trailer`}
              >
                ▶ Watch Trailer
              </button>
            )}
            <button
              id="detail-watchlist-btn"
              className="btn btn-outline"
              onClick={() => toggleWatchlist(movie)}
              aria-label={inList ? `Remove ${title} from watchlist` : `Add ${title} to watchlist`}
            >
              {inList ? '✓ In My List' : '+ Add to My List'}
            </button>
          </div>

          {/* Cast */}
          {cast.length > 0 && (
            <div className="detail-cast">
              <h3>CAST</h3>
              <div className="cast-grid">
                {cast.map((actor) => (
                  <div key={actor.id} className="cast-card" id={`cast-${actor.id}`}>
                    <img
                      src={
                        actor.profile_path
                          ? `${IMG_SIZES.profile.md}${actor.profile_path}`
                          : 'https://via.placeholder.com/80x80/1f1f1f/666?text=?'
                      }
                      alt={actor.name}
                      className="cast-avatar"
                    />
                    <div className="cast-name">{actor.name}</div>
                    <div className="cast-character">{actor.character}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Similar Movies */}
      {movie.similar?.results?.length > 0 && (
        <div style={{ marginTop: '3rem' }}>
          <MovieRow
            title="More Like This"
            url={null}
            // Pass data directly — a workaround since we have it already
          />
        </div>
      )}

      {/* Trailer Modal */}
      <TrailerModal
        isOpen={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        videoKey={trailer?.key}
        title={title}
      />
    </main>
  );
}

export default MovieDetail;
