import { useScreenshot } from '../../hooks/useScreenshot';
import './ScreenshotButton.css';

/**
 * Floating button to capture screenshots of the 3D model.
 */
export default function ScreenshotButton({ viewerRef }) {
  const { takeScreenshot } = useScreenshot();

  return (
    <button 
      className="screenshot-button glass"
      onClick={() => takeScreenshot(viewerRef)}
      title="Fotoğraf Çek"
      aria-label="Fotoğraf Çek"
    >
      📸
    </button>
  );
}
