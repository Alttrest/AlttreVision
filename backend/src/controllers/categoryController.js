const db = require('../config/database');

/**
 * Get all categories with product counts.
 */
exports.getAll = (req, res) => {
  try {
    const categories = db.getCategories();
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Kategoriler yüklenirken hata oluştu.' });
  }
};
