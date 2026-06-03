const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', '..', 'data');
const DB_FILE = path.join(DATA_DIR, 'furniture.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

/**
 * Simple JSON file-based database.
 * No native compilation needed — works on any system.
 * For production, migrate to PostgreSQL or MongoDB.
 */
class JsonDatabase {
  constructor(filePath) {
    this.filePath = filePath;
    this.data = this._load();
  }

  _load() {
    try {
      if (fs.existsSync(this.filePath)) {
        const raw = fs.readFileSync(this.filePath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (err) {
      console.warn('DB load warning:', err.message);
    }
    return { categories: [], products: [] };
  }

  _save() {
    fs.writeFileSync(this.filePath, JSON.stringify(this.data, null, 2), 'utf-8');
  }

  // --- Categories ---
  getCategories() {
    return this.data.categories.map((cat) => ({
      ...cat,
      product_count: this.data.products.filter((p) => p.category_id === cat.id).length,
    }));
  }

  getCategoryById(id) {
    return this.data.categories.find((c) => c.id === id) || null;
  }

  addCategory(category) {
    const id = (this.data.categories.length > 0)
      ? Math.max(...this.data.categories.map((c) => c.id)) + 1
      : 1;
    const entry = { id, ...category };
    this.data.categories.push(entry);
    this._save();
    return entry;
  }

  // --- Products ---
  getProducts({ category, page = 1, limit = 20 } = {}) {
    let filtered = [...this.data.products];

    if (category) {
      const cat = this.data.categories.find((c) => c.slug === category);
      if (cat) {
        filtered = filtered.filter((p) => p.category_id === cat.id);
      } else {
        filtered = [];
      }
    }

    const total = filtered.length;
    const offset = (page - 1) * limit;
    const paginated = filtered.slice(offset, offset + limit);

    return {
      items: paginated,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  getProductBySlug(slug) {
    return this.data.products.find((p) => p.slug === slug) || null;
  }

  addProduct(product) {
    const id = (this.data.products.length > 0)
      ? Math.max(...this.data.products.map((p) => p.id)) + 1
      : 1;
    const entry = {
      id,
      ...product,
      created_at: new Date().toISOString(),
    };
    this.data.products.push(entry);
    this._save();
    return entry;
  }

  // --- Bulk operations (for seeding) ---
  clear() {
    this.data = { categories: [], products: [] };
    this._save();
  }

  bulkInsert(categories, products) {
    this.data.categories = categories;
    this.data.products = products;
    this._save();
  }
}

const db = new JsonDatabase(DB_FILE);

module.exports = db;
