import { useState } from 'react';
import { Smartphone, Glasses, Camera, X } from 'lucide-react';
import './ARControls.css';

/**
 * Custom AR controls to trigger WebXR/QuickLook on the model-viewer element.
 */
export default function ARControls({ viewerRef }) {
  const [showModal, setShowModal] = useState(false);

  const getSceneViewerIntent = () => {
    if (!viewerRef.current) return '#';
    const location = window.location.toString();
    const modelUrl = new URL(viewerRef.current.src, location);
    if (modelUrl.hash) modelUrl.hash = '';
    
    const params = new URLSearchParams(modelUrl.search);
    params.set('mode', 'ar_preferred');
    params.set('disable_occlusion', 'true');
    // We assume default placement is floor or wall based on the model; we can just pass true.
    params.set('enable_vertical_placement', 'true');

    const locationUrl = new URL(location);
    locationUrl.hash = '#model-viewer-no-ar-fallback';

    return `intent://arvr.google.com/scene-viewer/1.2?${params.toString()}&file=${encodeURIComponent(modelUrl.toString())}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=${encodeURIComponent(locationUrl.toString())};end;`;
  };

  const launchAR = async (mode) => {
    if (!viewerRef.current) return;
    
    setShowModal(false);
    
    if (mode === 'webxr') {
      // ModelViewer.jsx now hardcodes ar-modes="webxr".
      // This guarantees model-viewer will NEVER silently fallback to Scene Viewer.
      const onArStatus = (event) => {
        if (event.detail.status === 'failed') {
          alert("WebXR başlatılamadı. Tarayıcınız desteklemiyor veya yerel ağdaki HTTPS güvenlik kısıtlamalarına takılmış olabilirsiniz. Lütfen 'Cihaz Kamerası' seçeneğini kullanın.");
        }
        viewerRef.current.removeEventListener('ar-status', onArStatus);
      };
      
      viewerRef.current.addEventListener('ar-status', onArStatus);

      try {
        await viewerRef.current.activateAR();
      } catch (error) {
        console.error("AR başlatılamadı:", error);
      }
    } else {
      // Scene Viewer (Cihaz Kamerası) Mode
      // Bypass model-viewer's buggy fallback completely and manually open the Android AR app.
      window.location.href = getSceneViewerIntent();
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
                onClick={() => launchAR('scene-viewer')}
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
