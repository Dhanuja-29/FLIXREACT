// ============================================
// TMDB API CONFIGURATION
// ============================================
// Sign up at https://www.themoviedb.org/ to get your free API key
// Then replace the value below with your key

export const TMDB_API_KEY = '13227b665ae746eb7857ed8add59ef8c'; // 🔑 Replace this!
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

// Image sizes available from TMDB
export const IMG_SIZES = {
  poster: {
    sm:   `${TMDB_IMAGE_BASE}/w185`,
    md:   `${TMDB_IMAGE_BASE}/w342`,
    lg:   `${TMDB_IMAGE_BASE}/w500`,
    xl:   `${TMDB_IMAGE_BASE}/w780`,
    orig: `${TMDB_IMAGE_BASE}/original`,
  },
  backdrop: {
    sm:   `${TMDB_IMAGE_BASE}/w300`,
    md:   `${TMDB_IMAGE_BASE}/w780`,
    lg:   `${TMDB_IMAGE_BASE}/w1280`,
    orig: `${TMDB_IMAGE_BASE}/original`,
  },
  profile: {
    sm:   `${TMDB_IMAGE_BASE}/w45`,
    md:   `${TMDB_IMAGE_BASE}/w185`,
    lg:   `${TMDB_IMAGE_BASE}/h632`,
  },
};

// ============================================
// API ENDPOINTS (functions that return URLs)
// ============================================

export const endpoints = {
  // Movie lists
  trendingMovies:   () => `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`,
  popularMovies:    () => `${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}`,
  topRatedMovies:   () => `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}`,
  nowPlaying:       () => `${TMDB_BASE_URL}/movie/now_playing?api_key=${TMDB_API_KEY}`,
  upcomingMovies:   () => `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}`,

  // TV Shows
  trendingTV:       () => `${TMDB_BASE_URL}/trending/tv/week?api_key=${TMDB_API_KEY}`,
  popularTV:        () => `${TMDB_BASE_URL}/tv/popular?api_key=${TMDB_API_KEY}`,
  topRatedTV:       () => `${TMDB_BASE_URL}/tv/top_rated?api_key=${TMDB_API_KEY}`,

  // Movie details
  movieDetail:      (id) => `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,similar`,
  tvDetail:         (id) => `${TMDB_BASE_URL}/tv/${id}?api_key=${TMDB_API_KEY}&append_to_response=credits,videos,similar`,

  // Search
  searchMulti:      (query, page = 1) =>
    `${TMDB_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`,

  // Genres
  movieGenres:      () => `${TMDB_BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`,
};
