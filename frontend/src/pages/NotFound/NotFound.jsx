import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container fade-in-up" style={{ textAlign: 'center', padding: '10vh 0' }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--color-accent)' }}>404</h1>
      <h2 style={{ marginBottom: 'var(--space-6)' }}>Sayfa Bulunamadı</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)' }}>
        Aradığınız sayfaya ulaşılamıyor veya silinmiş olabilir.
      </p>
      <Link to="/" className="btn btn-primary">
        Ana Sayfaya Dön
      </Link>
    </div>
  );
}
