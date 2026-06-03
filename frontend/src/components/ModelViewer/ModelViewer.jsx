import { useEffect } from 'react';
import '@google/model-viewer';
import './ModelViewer.css';

/**
 * Wrapper component for Google's <model-viewer> web component.
 * Configured specifically for AR furniture viewing.
 */
export default function ModelViewer({ product, viewerRef }) {
  // Ensure the web component is loaded and configured
  useEffect(() => {
    if (viewerRef.current) {
      // Optional: Add event listeners here if needed
      const handleLoad = () => console.log('Model loaded');
      viewerRef.current.addEventListener('load', handleLoad);
      return () => {
        if (viewerRef.current) {
          viewerRef.current.removeEventListener('load', handleLoad);
        }
      };
    }
  }, [viewerRef]);

  if (!product) return null;

  return (
    <div className="model-viewer-container glass">
      {/* 
        model-viewer attributes:
        - ar: Enables WebXR/QuickLook/SceneViewer AR modes
        - ar-modes: Specifies priority of AR implementations
        - camera-controls: Enables mouse/touch interaction
        - touch-action="pan-y": Better mobile scrolling behavior
        - ar-scale: Auto-scales model to fit real world or keeps fixed size
        - shadow-intensity: Adds realistic grounding shadows
        - environment-image: Adds reflections (using neutral preset)
      */}
      <model-viewer
        ref={viewerRef}
        src={product.modelUrl}
        ios-src={product.iosModelUrl || undefined}
        alt={`${product.name} 3D Modeli`}
        ar
        ar-modes="webxr scene-viewer quick-look"
        ar-scale={product.arScale || 'auto'}
        camera-controls
        touch-action="pan-y"
        shadow-intensity="1"
        environment-image="neutral"
        exposure="1"
        class="furniture-viewer"
      >
        <div slot="progress-bar" className="model-progress-bar"></div>
        <div slot="poster" className="model-poster">
          <div className="spinner"></div>
          <p>3D Model Yükleniyor...</p>
        </div>
      </model-viewer>
    </div>
  );
}
