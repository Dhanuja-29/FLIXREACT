// ============================================
// PAGE: Search
// ============================================
// 🎓 CONCEPTS: useSearchParams (read URL query string),
//              useState (controlled input), useEffect (debounce),
//              Controlled vs Uncontrolled inputs
// ============================================

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { endpoints } from '../api/tmdb';
import MovieCard from '../components/MovieCard';

function Search() {
  // 🎓 useSearchParams: read/write the URL query string (?q=...)
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  // 🎓 Controlled input: the input value is controlled by React state
  const [query, setQuery]     = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(!!initialQuery);

  // 🎓 useEffect with debounce: wait 500ms after user stops typing before searching
  // This avoids making an API call for every single keystroke!
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      return;
    }

    const debounceTimer = setTimeout(async () => {
      setLoading(true);
      setSearched(true);
      try {
        const response = await axios.get(endpoints.searchMulti(query));
        // Filter out people, only show movies and TV
        const filtered = response.data.results.filter(
          (item) => item.media_type === 'movie' || item.media_type === 'tv'
        );
        setResults(filtered);
        // Update URL to reflect current search (shareable link!)
        setSearchParams({ q: query });
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce delay

    // Cleanup: cancel the timer if user types again before it fires
    return () => clearTimeout(debounceTimer);
  }, [query]); // Re-run whenever query changes

  return (
    <main className="search-page" id="search-page">
      <div className="search-header">
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
          }}
          id="search-heading"
        >
          🔍 Search
        </h1>

        {/* 🎓 Controlled Input: value comes from state, onChange updates state */}
        <div className="search-bar-wrapper">
          <span className="search-icon">🔍</span>
          <input
            id="search-input"
            type="search"
            className="search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for movies, TV shows..."
            aria-label="Search movies and TV shows"
            autoFocus
          />
        </div>
      </div>

      {/* Results count */}
      {searched && !loading && (
        <p className="search-result-count" id="search-result-count">
          {results.length > 0
            ? <>Found <span>{results.length}</span> results for "<em>{query}</em>"</>
            : <>No results found for "<em>{query}</em>". Try another term.</>
          }
        </p>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="search-results-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="skeleton"
              style={{ aspectRatio: '2/3', borderRadius: '8px' }}
              aria-label="Loading..."
            />
          ))}
        </div>
      )}

      {/* Results grid */}
      {!loading && results.length > 0 && (
        <div className="search-results-grid" role="list" aria-label="Search results">
          {results.map((movie) => (
            <div key={movie.id} role="listitem">
              <MovieCard movie={movie} size="100%" />
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !searched && (
        <div
          style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            color: 'var(--text-muted)',
          }}
        >
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎬</div>
          <h2 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
            Find Your Next Watch
          </h2>
          <p>Search for any movie or TV show above</p>
        </div>
      )}
    </main>
  );
}

export default Search;
