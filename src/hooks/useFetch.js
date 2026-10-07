// ============================================
// CUSTOM HOOK: useFetch
// ============================================
// 🎓 LEARNING CONCEPT: Custom Hooks
//
// A Custom Hook is just a regular JavaScript function that:
//   1. Starts with "use" (convention)
//   2. Uses other React hooks internally (useState, useEffect)
//
// WHY? Instead of writing the same fetch + loading + error
// logic in every component, we write it ONCE here and reuse it.
//
// Usage:
//   const { data, loading, error } = useFetch(someUrl);
// ============================================

import { useState, useEffect } from 'react';
import axios from 'axios';

function useFetch(url) {
  // 🎓 useState: managing three pieces of state
  const [data, setData]       = useState(null);    // the actual API result
  const [loading, setLoading] = useState(true);    // is request in progress?
  const [error, setError]     = useState(null);    // any error that occurred?

  // 🎓 useEffect: runs after the component renders
  // The [url] at the end is the "dependency array" — this effect
  // re-runs whenever the `url` value changes
  useEffect(() => {
    // Don't run if no URL is provided
    if (!url) {
      setLoading(false);
      return;
    }

    let cancelled = false; // prevents state updates if component unmounts

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(url);
        if (!cancelled) {
          setData(response.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || 'Something went wrong');
          console.error('useFetch error:', err);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup function: runs when component unmounts or url changes
    return () => {
      cancelled = true;
    };
  }, [url]);

  // Return all three values so components can use what they need
  return { data, loading, error };
}

export default useFetch;
