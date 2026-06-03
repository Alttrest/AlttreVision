import { useState, useCallback } from 'react';
import { useProducts, useCategories } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Sofa, LayoutGrid, Lightbulb, Package, BedDouble, Tag } from 'lucide-react';
import './Home.css';

// Map category slugs to corporate Lucide icons
const categoryIconMap = {
  'koltuklar': Sofa,
  'masalar': LayoutGrid,
  'aydinlatma': Lightbulb,
  'dekorasyon': Package,
  'yatak-odasi': BedDouble,
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(null);
  const { products, loading: productsLoading, error: productsError } = useProducts(activeCategory);
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();

  // Handle active category tracking
  const handleCategoryClick = useCallback((slug) => {
    setActiveCategory(prev => prev === slug ? null : slug);
  }, []);

  return (
    <div className="home container">
      {/* Hero Section */}
      <section className="hero">
        <h1 className="hero-title">
          Yaşam Alanınızı <span className="gradient-text">Yeniden Keşfedin</span>
        </h1>
        <p className="hero-subtitle">
          Kurumsal AR teknolojimiz ile ürünleri satın almadan önce kendi mekanınızda deneyimleyin.
        </p>
      </section>

      {/* Categories Horizontal Scroll */}
      <section className="categories">
        {categoriesError && <div className="error-message">Kategoriler yüklenemedi.</div>}
        
        {!categoriesLoading && categories.length > 0 && (
          <div className="category-scroll hide-scrollbar">
            <button 
              className={`category-btn ${activeCategory === null ? 'active' : ''}`}
              onClick={() => handleCategoryClick(null)}
            >
              <Tag size={18} />
              Tümü
            </button>
            
            {categories.map(category => {
              const Icon = categoryIconMap[category.slug] || Tag;
              return (
                <button
                  key={category.id}
                  className={`category-btn ${activeCategory === category.slug ? 'active' : ''}`}
                  onClick={() => handleCategoryClick(category.slug)}
                >
                  <Icon size={18} />
                  {category.name}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Product Grid */}
      <section className="products container">
        {productsError && (
          <div className="error-message glass">
            <p>⚠️ {productsError}</p>
          </div>
        )}
        
        {productsLoading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Ürünler yükleniyor...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="product-grid stagger-children">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-state glass">
            <p>Bu kategoride henüz ürün bulunmuyor.</p>
          </div>
        )}
      </section>
    </div>
  );
}
