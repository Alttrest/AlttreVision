import { useCallback } from 'react';

/**
 * Hook that captures a screenshot from a model-viewer element.
 * Uses the model-viewer's built-in toBlob API and Web Share API for mobile.
 */
export function useScreenshot() {
  const takeScreenshot = useCallback(async (modelViewerRef) => {
    const el = modelViewerRef?.current;
    if (!el) {
      console.warn('model-viewer element not found');
      return;
    }

    try {
      const blob = await el.toBlob({ mimeType: 'image/png', idealAspect: true });
      const filename = `mobilya-ar-${Date.now()}.png`;
      const file = new File([blob], filename, { type: 'image/png' });

      // If Web Share API is supported (Mobile/Safari), use it for direct "Save to Gallery"
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: '3D Mobilya',
          text: 'Bu mobilyayı AR ile inceliyorum!',
          files: [file],
        });
        return;
      }

      // Fallback: Trigger standard download (Desktop)
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setTimeout(() => URL.revokeObjectURL(url), 5000);
      return url;
    } catch (err) {
      console.error('Screenshot error:', err);
    }
  }, []);

  return { takeScreenshot };
}
