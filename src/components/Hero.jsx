// ============================================
// COMPONENT: Hero
// ============================================
// 🎓 CONCEPTS: useState (auto-rotate), useEffect (timer),
//              Props, conditional rendering
//
// Shows a large cinematic banner with the featured movie.
// Auto-rotates through top trending movies every 8 seconds.
// ============================================

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { endpoints, IMG_SIZES } from '../api/tmdb';
import { useWatchlist } from '../context/WatchlistContext';

function Hero() {
  const { data, loading } = useFetch(endpoints.trendingMovies());
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const { toggleWatchlist, isInWatchlist } = useWatchlist();

  // Pick only top 5 movies for the hero rotation
  const featuredMovies = data?.results?.slice(0, 5) || [];
  const movie = featuredMovies[currentIndex];

  // 🎓 useEffect with setInterval: auto-rotate hero every 8 seconds
  useEffect(() => {
    if (featuredMovies.length === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === featuredMovies.length - 1 ? 0 : prev + 1
      );
    }, 8000);

    // Cleanup: clear the timer when component unmounts
    return () => clearInterval(timer);
  }, [featuredMovies.length]); // Re-run when movies load

  if (loading || !movie) {
    return (
      <div
        className="hero skeleton"
        style={{ height: '90vh' }}
        aria-label="Loading featured movie..."
      />
    );
  }

  const isTV       = !!movie.first_air_date;
  const title      = movie.title || movie.name;
  const overview   = movie.overview;
  const rating     = movie.vote_average?.toFixed(1);
  const year       = (movie.release_date || movie.first_air_date || '').substring(0, 4);
  const inList     = isInWatchlist(movie.id);

  const backdropUrl = movie.backdrop_path
    ? `${IMG_SIZES.backdrop.lg}${movie.backdrop_path}`
    : null;

  const handlePlayClick = () => {
    navigate(`/${isTV ? 'tv' : 'movie'}/${movie.id}`);
  };

  return (
    <section
      className="hero"
      aria-label={`Featured: ${title}`}
      id="hero-section"
    >
      {/* Background Image */}
      {backdropUrl && (
        <div
          className="hero-backdrop"
          style={{ backgroundImage: `url(${backdropUrl})` }}
          role="img"
          aria-label={`${title} backdrop`}
        />
      )}

      {/* Content */}
      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge">
          🔥 {isTV ? 'Top TV Show' : 'Trending Now'}
        </div>

        {/* Title */}
        <h1 id="hero-title" className="hero-title">{title}</h1>

        {/* Meta Info */}
        <div className="hero-meta">
          <span className="hero-rating">⭐ {rating}</span>
          <span className="hero-dot" />
          <span className="hero-year">{year}</span>
          {isTV && (
            <>
              <span className="hero-dot" />
              <span className="hero-runtime">TV Series</span>
            </>
          )}
        </div>

        {/* Overview */}
        <p className="hero-overview">{overview}</p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <button
            id="hero-play-btn"
            className="btn btn-primary"
            onClick={handlePlayClick}
            aria-label={`Play ${title}`}
          >
            ▶ Play
          </button>
          <button
            id="hero-info-btn"
            className="btn btn-secondary"
            onClick={handlePlayClick}
            aria-label={`More info about ${title}`}
          >
            ℹ More Info
          </button>
          <button
            id="hero-watchlist-btn"
            className="btn btn-outline"
            onClick={() => toggleWatchlist(movie)}
            aria-label={inList ? `Remove ${title} from my list` : `Add ${title} to my list`}
          >
            {inList ? '✓ In My List' : '+ My List'}
          </button>
        </div>

        {/* Dot indicators for rotation */}
        <div style={{ display: 'flex', gap: '6px', marginTop: '1.5rem' }}>
          {featuredMovies.map((_, i) => (
            <button
              key={i}
              id={`hero-dot-${i}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Show movie ${i + 1}`}
              style={{
                width: i === currentIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '4px',
                background: i === currentIndex ? 'var(--netflix-red)' : 'rgba(255,255,255,0.3)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
