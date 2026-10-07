// ============================================
// COMPONENT: MovieRow
// ============================================
// 🎓 CONCEPTS: .map() rendering, custom hook usage,
//              conditional rendering (loading/error states)
//
// A horizontal scrollable row of MovieCards.
// Used on the Home page for each category.
// ============================================

import useFetch from '../hooks/useFetch';
import MovieCard from './MovieCard';

function MovieRow({ title, url, highlight }) {
  // 🎓 Custom Hook: useFetch handles all the async fetching
  // We just destructure what we need!
  const { data, loading, error } = useFetch(url);

  // 🎓 Conditional rendering: different UI for different states
  if (error) {
    return (
      <div className="movie-section">
        <h2 className="section-title">{title}</h2>
        <p style={{ padding: '0 4%', color: 'var(--text-muted)' }}>
          Couldn't load movies. Check your API key.
        </p>
      </div>
    );
  }

  return (
    <section className="movie-section" aria-labelledby={`section-${title}`}>
      {/* Section Title */}
      <h2 className="section-title" id={`section-${title}`}>
        {highlight ? (
          // 🎓 JSX expressions: render different markup based on a condition
          <>
            <span style={{ color: 'var(--netflix-red)' }}>{highlight}</span>{' '}
            {title}
          </>
        ) : (
          title
        )}
      </h2>

      {/* Movie Cards Row */}
      <div className="movies-row" role="list">
        {loading ? (
          // Skeleton loading cards
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="movie-card skeleton"
              style={{ flex: '0 0 185px', aspectRatio: '2/3' }}
              role="listitem"
              aria-label="Loading..."
            />
          ))
        ) : (
          // 🎓 .map(): iterate over movies array and render a card for each
          // Each element in .map() needs a unique "key" prop for React to track them
          data?.results?.map((movie) => (
            <div key={movie.id} role="listitem">
              <MovieCard movie={movie} />
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default MovieRow;
