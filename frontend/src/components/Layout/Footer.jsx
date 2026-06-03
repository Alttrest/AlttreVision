import { APP_NAME } from '../../utils/constants';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-content">
        <p className="copyright">
          © {year} {APP_NAME}. Tüm hakları saklıdır.
        </p>
        <p className="footer-note">
          AR ile odanızı yeniden tasarlayın.
        </p>
      </div>
    </footer>
  );
}
