import { Camera } from 'lucide-react';
import { useScreenshot } from '../../hooks/useScreenshot';
import './ScreenshotButton.css';

/**
 * Floating button to capture screenshots of the 3D model.
 */
export default function ScreenshotButton({ viewerRef }) {
  const { takeScreenshot } = useScreenshot();

  return (
    <button 
      className="screenshot-button neumorphic-btn"
      onClick={() => takeScreenshot(viewerRef)}
      title="Fotoğraf Çek"
      aria-label="Fotoğraf Çek"
    >
      <Camera size={24} color="var(--color-primary)" />
    </button>
  );
}
