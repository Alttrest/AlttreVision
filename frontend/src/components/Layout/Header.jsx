import { Link } from 'react-router-dom';
import { Hexagon } from 'lucide-react';
import { APP_NAME } from '../../utils/constants';
import './Header.css';
import './dummy.css';

export default function Header() {
  return (
    <header className="header glass">
      <div className="container header-content">
        <Link to="/" className="brand">
          <Hexagon className="brand-icon" size={28} strokeWidth={2.5} color="var(--color-accent)" />
          <span className="brand-text gradient-text">{APP_NAME}</span>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Ürünler</Link>
        </nav>
      </div>
    </header>
  );
}
