const db = require('../config/database');

/**
 * Get all products, optionally filtered by category.
 * Supports pagination via `page` and `limit` query params.
 */
exports.getAll = (req, res) => {
  try {
    const { category, page = 1, limit = 20 } = req.query;

    const result = db.getProducts({
      category,
      page: parseInt(page),
      limit: parseInt(limit),
    });

    const formattedProducts = result.items.map((p) => formatProduct(p, db));

    res.json({
      data: formattedProducts,
      pagination: {
        page: result.page,
        limit: result.limit,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Ürünler yüklenirken hata oluştu.' });
  }
};

/**
 * Get a single product by slug.
 */
exports.getBySlug = (req, res) => {
  try {
    const { slug } = req.params;
    const product = db.getProductBySlug(slug);

    if (!product) {
      return res.status(404).json({ error: 'Ürün bulunamadı.' });
    }

    res.json(formatProduct(product, db));
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Ürün yüklenirken hata oluştu.' });
  }
};

/**
 * Format product for API response.
 */
function formatProduct(product, db) {
  const category = db.getCategoryById(product.category_id);

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: product.price,
    currency: product.currency,
    category: category
      ? { id: category.id, name: category.name, slug: category.slug, icon: category.icon }
      : null,
    modelUrl: product.model_url,
    iosModelUrl: product.ios_model_url || null,
    posterUrl: product.poster_url || null,
    dimensions: typeof product.dimensions === 'string'
      ? JSON.parse(product.dimensions)
      : product.dimensions,
    color: product.color,
    material: product.material,
    arScale: product.ar_scale,
    createdAt: product.created_at,
  };
}
