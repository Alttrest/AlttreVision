import { Link } from 'react-router-dom';
import { APP_NAME } from '../../utils/constants';
import './Header.css';

export default function Header() {
  return (
    <header className="header glass">
      <div className="container header-content">
        <Link to="/" className="brand">
          <span className="brand-icon">✨</span>
          <span className="brand-text gradient-text">{APP_NAME}</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Ürünler</Link>
        </nav>
      </div>
    </header>
  );
}
