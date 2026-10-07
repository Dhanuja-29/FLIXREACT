// ============================================
// PAGE: Home
// ============================================
// 🎓 CONCEPTS: Component composition, passing endpoints as props
//
// The Home page assembles Hero + multiple MovieRows.
// Each MovieRow independently fetches its own data!
// ============================================

import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import { endpoints } from '../api/tmdb';

function Home() {
  return (
    <main id="home-page">
      {/* 🎓 Component composition: plugging components together like LEGO */}
      <Hero />

      <div style={{ marginTop: '-6rem', position: 'relative', zIndex: 2 }}>
        <MovieRow
          title="Trending This Week"
          url={endpoints.trendingMovies()}
          highlight="🔥"
        />
        <MovieRow
          title="Now Playing in Cinemas"
          url={endpoints.nowPlaying()}
        />
        <MovieRow
          title="Popular Movies"
          url={endpoints.popularMovies()}
        />
        <MovieRow
          title="Top Rated of All Time"
          url={endpoints.topRatedMovies()}
        />
        <MovieRow
          title="Popular TV Shows"
          url={endpoints.popularTV()}
        />
        <MovieRow
          title="Top Rated TV"
          url={endpoints.topRatedTV()}
        />
        <MovieRow
          title="Coming Soon"
          url={endpoints.upcomingMovies()}
        />
      </div>
    </main>
  );
}

export default Home;
