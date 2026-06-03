import { useState } from 'react';
import { Smartphone, Glasses, Camera, X } from 'lucide-react';
import './ARControls.css';

/**
 * Custom AR controls to trigger WebXR/QuickLook on the model-viewer element.
 */
export default function ARControls({ viewerRef }) {
  const [showModal, setShowModal] = useState(false);

  const launchAR = async (modes) => {
    if (viewerRef.current) {
      viewerRef.current.arModes = modes;
      viewerRef.current.setAttribute('ar-modes', modes);
      setShowModal(false);
      
      // Listen to the ar-status event to know if AR actually failed
      const onArStatus = (event) => {
        if (event.detail.status === 'failed') {
          if (modes === 'webxr') {
            alert("WebXR başlatılamadı. Tarayıcınız desteklemiyor veya yerel ağdaki HTTPS güvenlik kısıtlamalarına takılmış olabilirsiniz. Lütfen 'Cihaz Kamerası' seçeneğini kullanın.");
          } else {
            alert("AR başlatılamadı. Cihazınız AR desteklemiyor olabilir.");
          }
        }
        viewerRef.current.removeEventListener('ar-status', onArStatus);
      };
      
      viewerRef.current.addEventListener('ar-status', onArStatus);

      // LitElement updates are asynchronous. We must wait for the property change
      if (viewerRef.current.updateComplete) {
        await viewerRef.current.updateComplete;
      }

      // Call activateAR synchronously so the browser doesn't block it
      try {
        await viewerRef.current.activateAR();
      } catch (error) {
        console.error("AR başlatılamadı:", error);
      }
    }
  };

  return (
    <>
      <div className="ar-controls">
        <button 
          className="btn btn-primary ar-button neumorphic-btn" 
          onClick={() => setShowModal(true)}
          aria-label="Odanda Gör"
        >
          <Smartphone className="ar-icon" size={20} />
          <span>Odanda Gör (AR)</span>
        </button>
        <p className="ar-hint">Mobil cihazınızla AR deneyimini başlatın</p>
      </div>

      {showModal && (
        <div className="ar-modal-overlay">
          <div className="ar-modal neumorphic-card">
            <button className="ar-modal-close" onClick={() => setShowModal(false)}>
              <X size={24} />
            </button>
            <h3 className="ar-modal-title">AR Altyapısı Seçin</h3>
            <p className="ar-modal-desc">
              Tasarımı nasıl görüntülemek istersiniz?
            </p>
            
            <div className="ar-options">
              <button 
                className="ar-option-btn neumorphic-btn"
                onClick={() => launchAR('webxr')}
              >
                <div className="ar-option-icon">
                  <Glasses size={32} />
                </div>
                <div className="ar-option-text">
                  <h4>1. Tarayıcı İçi (WebXR)</h4>
                  <p>Hızlı açılır. Ancak tarayıcı gizliliği nedeniyle fotoğraf çekiminde arkaplan (odanız) siyah çıkabilir.</p>
                </div>
              </button>

              <button 
                className="ar-option-btn neumorphic-btn primary"
                onClick={() => launchAR('scene-viewer quick-look')}
              >
                <div className="ar-option-icon">
                  <Camera size={32} />
                </div>
                <div className="ar-option-text">
                  <h4>2. Cihaz Kamerası (Önerilen)</h4>
                  <p>Telefonunuzun yerleşik 3D motorunu kullanır. Odanızla birlikte kusursuz fotoğraflar çekebilirsiniz.</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
