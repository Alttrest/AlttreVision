import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/constants';
import './ProductCard.css';

export default function ProductCard({ product }) {
  // Use category icon or a default box icon
  const icon = product.category?.icon || '📦';

  return (
    <Link to={`/product/${product.slug}`} className="product-card glass">
      <div className="product-image-container">
        {/* We don't have real images, so we show a stylized placeholder with the category icon */}
        <div className="product-placeholder">
          <span className="placeholder-icon">{icon}</span>
          <span className="placeholder-text">3D Model</span>
        </div>
        <div className="product-category-badge glass">
          {product.category?.name}
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price price">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </Link>
  );
}
