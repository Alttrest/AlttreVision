import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../services/api';

/**
 * Hook to fetch products with optional category filtering and pagination.
 */
export function useProducts(category = null) {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchProducts({ category })
      .then((res) => {
        if (!cancelled) {
          setProducts(res.data);
          setPagination(res.pagination);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [category]);

  return { products, pagination, loading, error };
}

/**
 * Hook to fetch categories.
 */
export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { categories, loading };
}
