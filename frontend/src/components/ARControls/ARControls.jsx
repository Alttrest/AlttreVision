import './ARControls.css';

/**
 * Custom AR controls to trigger WebXR/QuickLook on the model-viewer element.
 */
export default function ARControls({ viewerRef }) {
  const handleARClick = () => {
    if (viewerRef.current) {
      viewerRef.current.activateAR();
    }
  };

  return (
    <div className="ar-controls">
      <button 
        className="btn btn-primary ar-button" 
        onClick={handleARClick}
        aria-label="Odanda Gör"
      >
        <span className="ar-icon">📱</span>
        <span>Odanda Gör (AR)</span>
      </button>
      <p className="ar-hint">Mobil cihazınızla AR deneyimini başlatın</p>
    </div>
  );
}
