import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductBySlug } from '../../services/api';
import ModelViewer from '../../components/ModelViewer/ModelViewer';
import ARControls from '../../components/ARControls/ARControls';
import ScreenshotButton from '../../components/ScreenshotButton/ScreenshotButton';
import { formatPrice, formatDimensions } from '../../utils/constants';
import { Lightbulb } from 'lucide-react';
import './ProductDetail.css';

export default function ProductDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const viewerRef = useRef(null);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    
    fetchProductBySlug(slug)
      .then((data) => {
        if (!cancelled) setProduct(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="loading-container fade-in-up">
        <div className="spinner"></div>
        <p>Ürün yükleniyor...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container error-container fade-in-up">
        <div className="glass empty-state">
          <h2>Ürün Bulunamadı</h2>
          <p>{error || 'Aradığınız ürün mevcut değil.'}</p>
          <button className="btn btn-secondary mt-4" onClick={() => navigate('/')}>
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail fade-in-up">
      <div className="container">
        
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Geri Dön
        </button>

        <div className="detail-grid">
          {/* 3D Viewer Section */}
          <div className="viewer-section">
            <div className="viewer-wrapper">
              <ModelViewer product={product} viewerRef={viewerRef} />
              <ScreenshotButton viewerRef={viewerRef} />
            </div>
            
            {/* AR Control Button */}
            <ARControls viewerRef={viewerRef} />
          </div>

          {/* Info Section */}
          <div className="info-section">
            <div className="info-header">
              <div className="badge badge-accent">
                {product.category?.name}
              </div>
              <h1 className="product-title">{product.name}</h1>
              <p className="product-price price">
                {formatPrice(product.price, product.currency)}
              </p>
            </div>

            <div className="info-body">
              <div className="info-block">
                <h3>Açıklama</h3>
                <p>{product.description}</p>
              </div>

              <div className="specs-grid">
                {product.dimensions && (
                  <div className="spec-item glass">
                    <span className="spec-label">Boyutlar</span>
                    <span className="spec-value">{formatDimensions(product.dimensions)}</span>
                  </div>
                )}
                {product.color && (
                  <div className="spec-item glass">
                    <span className="spec-label">Renk</span>
                    <span className="spec-value">{product.color}</span>
                  </div>
                )}
                {product.material && (
                  <div className="spec-item glass">
                    <span className="spec-label">Materyal</span>
                    <span className="spec-value">{product.material}</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Desktop hint since AR is mainly for mobile */}
            <div className="desktop-hint glass">
              <Lightbulb className="hint-icon" size={20} />
              <p>Gerçek boyutlu AR deneyimi için bu sayfayı mobil cihazınızda açın.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
