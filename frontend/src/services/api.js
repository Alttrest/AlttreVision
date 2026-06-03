// API base URL — uses Vite proxy in development, or env variable in production (Netlify)
const API_BASE = import.meta.env.VITE_API_URL || '/api';

/**
 * Fetch all products with optional category filter and pagination.
 */
export async function fetchProducts({ category, page = 1, limit = 20 } = {}) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  params.set('page', String(page));
  params.set('limit', String(limit));

  const res = await fetch(`${API_BASE}/products?${params}`);
  if (!res.ok) throw new Error('Ürünler yüklenemedi');
  return res.json();
}

/**
 * Fetch a single product by slug.
 */
export async function fetchProductBySlug(slug) {
  const res = await fetch(`${API_BASE}/products/${slug}`);
  if (!res.ok) {
    if (res.status === 404) throw new Error('Ürün bulunamadı');
    throw new Error('Ürün yüklenemedi');
  }
  return res.json();
}

/**
 * Fetch all categories.
 */
export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories`);
  if (!res.ok) throw new Error('Kategoriler yüklenemedi');
  return res.json();
}
