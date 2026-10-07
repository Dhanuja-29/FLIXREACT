// ============================================
// PAGE: Login
// ============================================
// 🎓 CONCEPTS: useState for forms, form validation,
//              controlled inputs, conditional error rendering,
//              useNavigate for programmatic navigation
// ============================================

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  // 🎓 Form state: one state object to manage all form fields
  const [mode, setMode]     = useState('login'); // 'login' | 'signup'
  const [form, setForm]     = useState({ email: '', password: '', name: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // 🎓 Single handler for all inputs (using the input's name attribute)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form before submit
  const validate = () => {
    const newErrors = {};
    if (!form.email)    newErrors.email    = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email address';
    if (!form.password) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (mode === 'signup' && !form.name) newErrors.name = 'Name is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent browser default form submit

    // Validate
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Simulate a login (no real backend — just a demo!)
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // 🎓 useNavigate: programmatically go to another route
      navigate('/');
    }, 1200);
  };

  return (
    <main className="login-page" id="login-page">
      {/* Background — dark cinematic gradient + optional image */}
      <div
        className="login-bg"
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 40%, #0d0d1a 100%)',
          backgroundImage: 'url(https://image.tmdb.org/t/p/w1280/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Login Card */}
      <div className="login-card" role="main">

        {/* Back to Home link */}
        <Link
          to="/"
          id="login-back-link"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: 'var(--text-muted)',
            fontSize: '0.82rem',
            marginBottom: '1.5rem',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
        >
          ← Back to Browse
        </Link>

        {/* Logo */}
        <div className="login-logo" id="login-logo">FLIXREACT</div>
        <p className="login-subtitle">Your personal cinema experience</p>

        {/* Title */}
        <h1 className="login-title" id="login-title">
          {mode === 'login' ? 'Sign In' : 'Create Account'}
        </h1>

        <form onSubmit={handleSubmit} noValidate id="login-form">
          {/* Name field (signup only) */}
          {mode === 'signup' && (
            <div className="form-group">
              <label className="form-label" htmlFor="name-input">Full Name</label>
              <input
                id="name-input"
                type="text"
                name="name"
                className={`form-input ${errors.name ? 'error' : ''}`}
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
              />
              {errors.name && <p className="form-error" role="alert">{errors.name}</p>}
            </div>
          )}

          {/* Email */}
          <div className="form-group">
            <label className="form-label" htmlFor="email-input">Email Address</label>
            <input
              id="email-input"
              type="email"
              name="email"
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <p className="form-error" role="alert">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="form-group">
            <label className="form-label" htmlFor="password-input">Password</label>
            <input
              id="password-input"
              type="password"
              name="password"
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder={mode === 'login' ? 'Your password' : 'Min. 6 characters'}
              value={form.password}
              onChange={handleChange}
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
            />
            {errors.password && <p className="form-error" role="alert">{errors.password}</p>}
          </div>

          {/* Submit */}
          <button
            id="login-submit-btn"
            type="submit"
            className="btn-login"
            disabled={loading}
          >
            {loading
              ? (mode === 'login' ? 'Signing in...' : 'Creating account...')
              : (mode === 'login' ? 'Sign In' : 'Create Account')
            }
          </button>
        </form>

        {/* Divider */}
        <div className="login-divider">or</div>

        {/* Demo mode button */}
        <button
          id="demo-btn"
          className="btn btn-outline"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => navigate('/')}
        >
          🎬 Continue as Guest
        </button>

        {/* Switch mode */}
        <div className="login-switch">
          {mode === 'login' ? (
            <>New to FlixReact?{' '}
              <a id="switch-to-signup" onClick={() => setMode('signup')} role="button" tabIndex={0}>
                Sign up now
              </a>
            </>
          ) : (
            <>Already have an account?{' '}
              <a id="switch-to-login" onClick={() => setMode('login')} role="button" tabIndex={0}>
                Sign in
              </a>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

export default Login;
