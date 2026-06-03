import { useState } from 'react';
import { useProducts, useCategories } from '../../hooks/useProducts';
import ProductCard from '../../components/ProductCard/ProductCard';
import { APP_TAGLINE } from '../../utils/constants';
import './Home.css';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(null);
  
  const { categories, loading: categoriesLoading } = useCategories();
  const { products, loading: productsLoading, error } = useProducts(activeCategory);

  return (
    <div className="home fade-in-up">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            <span className="gradient-text">MobilyAR</span> ile
            <br />{APP_TAGLINE}
          </h1>
          <p className="hero-subtitle">
            Beğendiğiniz mobilyaları Artırılmış Gerçeklik (AR) teknolojisiyle 
            kendi evinizde test edin.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="categories container">
        {categoriesLoading ? (
          <div className="categories-skeleton"></div>
        ) : (
          <div className="category-scroll">
            <button 
              className={`category-btn ${activeCategory === null ? 'active' : ''}`}
              onClick={() => setActiveCategory(null)}
            >
              Tümü
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`category-btn ${activeCategory === cat.slug ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.slug)}
              >
                <span className="category-icon">{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Product Grid */}
      <section className="products container">
        {error && (
          <div className="error-message glass">
            <p>⚠️ {error}</p>
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
