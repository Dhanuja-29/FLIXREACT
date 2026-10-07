// ============================================
// PAGE: Watchlist
// ============================================
// 🎓 CONCEPTS: useContext (via custom hook), conditional rendering,
//              Empty states, .map() over context data
// ============================================

import { Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import MovieCard from '../components/MovieCard';

function Watchlist() {
  // 🎓 Context: accessing global watchlist without prop drilling!
  const { watchlist, watchlistCount } = useWatchlist();

  return (
    <main className="watchlist-page" id="watchlist-page">
      <div className="watchlist-header">
        <h1 className="watchlist-title" id="watchlist-heading">
          My List
        </h1>
        <p className="watchlist-count">
          {watchlistCount} {watchlistCount === 1 ? 'title' : 'titles'} saved
        </p>
      </div>

      {/* 🎓 Conditional rendering: show different UI based on watchlist state */}
      {watchlistCount === 0 ? (
        <div className="watchlist-empty" id="watchlist-empty">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎬</div>
          <h2>Your list is empty</h2>
          <p>Add movies and shows to watch later</p>
          <Link to="/" className="btn btn-red">
            Browse Movies
          </Link>
        </div>
      ) : (
        <div className="watchlist-grid" role="list" aria-label="My watchlist">
          {watchlist.map((movie) => (
            <div key={movie.id} role="listitem">
              <MovieCard movie={movie} size="100%" />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Watchlist;
