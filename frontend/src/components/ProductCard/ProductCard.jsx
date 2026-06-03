import { Link } from 'react-router-dom';
import { Box } from 'lucide-react';
import { formatPrice } from '../../utils/constants';
import './ProductCard.css';

export default function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.slug}`} className="product-card glass">
      <div className="product-image-container">
        <div className="product-placeholder">
          <Box size={48} className="placeholder-icon" />
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
