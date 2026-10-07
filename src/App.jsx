// ============================================
// APP.JSX — Root Component & Router Setup
// ============================================
// 🎓 LEARNING CONCEPT: React Router v6
//
// React Router lets us build a "Single Page Application" (SPA).
// This means:
//   - The page NEVER fully reloads
//   - Different URLs show different components
//   - Navigation feels instant (no white flash)
//
// Key components:
//   <Routes>  → The container for all routes
//   <Route>   → Maps a URL path to a component
//   <Outlet>  → Where child routes render (in layouts)
// ============================================

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout components (always visible)
import Navbar from './components/Navbar';

// Pages
import Home        from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Search      from './pages/Search';
import Watchlist   from './pages/Watchlist';
import Login       from './pages/Login';

// Context Provider
import { WatchlistProvider } from './context/WatchlistContext';

// Layout component that wraps pages WITH navbar
function AppLayout({ children }) {
  return (
    <>
      <Navbar />
      <div style={{ paddingTop: '68px' }}>
        {children}
      </div>
    </>
  );
}

function App() {
  return (
    // 🎓 WatchlistProvider: wraps everything so ALL components can access watchlist
    <WatchlistProvider>
      {/* BrowserRouter: enables URL-based routing */}
      <BrowserRouter>
        <Routes>
          {/* Login has no Navbar (standalone page) */}
          <Route path="/login" element={<Login />} />

          {/* All other pages have the Navbar */}
          <Route
            path="/"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <AppLayout>
                <MovieDetail />
              </AppLayout>
            }
          />
          <Route
            path="/tv/:id"
            element={
              <AppLayout>
                <MovieDetail />
              </AppLayout>
            }
          />
          <Route
            path="/search"
            element={
              <AppLayout>
                <Search />
              </AppLayout>
            }
          />
          <Route
            path="/watchlist"
            element={
              <AppLayout>
                <Watchlist />
              </AppLayout>
            }
          />

          {/* 404 catch-all */}
          <Route
            path="*"
            element={
              <AppLayout>
                <main className="not-found" id="not-found-page">
                  <h1>404</h1>
                  <h2>Page Not Found</h2>
                  <p>Looks like this scene was cut from the final edit.</p>
                  <a href="/" className="btn btn-red">Go Home</a>
                </main>
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </WatchlistProvider>
  );
}

export default App;
