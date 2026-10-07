// ============================================
// COMPONENT: Navbar
// ============================================
// 🎓 CONCEPTS: useState (scroll), useEffect (scroll listener),
//              React Router (NavLink, useNavigate)
// ============================================

import { useState, useEffect } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';

function Navbar() {
  // Track if user has scrolled (to change navbar background)
  const [scrolled, setScrolled]     = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const { watchlistCount } = useWatchlist();
  const navigate = useNavigate();

  // Add scroll listener when component mounts
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup: remove listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <header>
      <nav
        id="main-navbar"
        className={`navbar ${scrolled ? 'scrolled' : 'navbar-gradient'}`}
        role="navigation"
        aria-label="Main navigation"
      >
        {/* LEFT: Logo + Links */}
        <div className="navbar-left">
          <Link to="/" className="navbar-logo" id="navbar-logo">
            FLIXREACT
          </Link>

          <ul className="navbar-links">
            <li><NavLink to="/" end id="nav-home">Home</NavLink></li>
            <li><NavLink to="/search" id="nav-movies">Movies</NavLink></li>
            <li><NavLink to="/watchlist" id="nav-watchlist">My List</NavLink></li>
            <li><NavLink to="/login" id="nav-signin">Sign In</NavLink></li>
          </ul>
        </div>

        {/* RIGHT: Search + Icons */}
        <div className="navbar-right">
          {/* Inline search bar */}
          {showSearch ? (
            <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                id="navbar-search-input"
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search movies, shows..."
                style={{
                  background: 'rgba(0,0,0,0.8)',
                  border: '1px solid white',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  fontFamily: 'inherit',
                  fontSize: '0.85rem',
                  outline: 'none',
                  width: '220px',
                }}
              />
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="navbar-icon-btn"
                aria-label="Close search"
              >
                ✕
              </button>
            </form>
          ) : (
            <button
              id="navbar-search-btn"
              className="navbar-search-btn"
              onClick={() => setShowSearch(true)}
              aria-label="Open search"
            >
              🔍
            </button>
          )}

          {/* Watchlist icon with count badge */}
          <Link
            to="/watchlist"
            id="navbar-watchlist-btn"
            className="navbar-icon-btn"
            aria-label={`My watchlist, ${watchlistCount} items`}
            style={{ position: 'relative' }}
          >
            🎬
            {watchlistCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '-4px',
                  background: 'var(--netflix-red)',
                  color: 'white',
                  fontSize: '0.6rem',
                  fontWeight: '700',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {watchlistCount > 9 ? '9+' : watchlistCount}
              </span>
            )}
          </Link>

          {/* User Avatar — links to Login page */}
          <Link
            to="/login"
            id="navbar-avatar"
            className="navbar-avatar"
            aria-label="Sign in or create account"
            title="Sign In"
            style={{ textDecoration: 'none' }}
          >
            U
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
