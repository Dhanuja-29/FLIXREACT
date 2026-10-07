// ============================================
// COMPONENT: TrailerModal
// ============================================
// 🎓 CONCEPTS: Props (isOpen, onClose, videoKey),
//              useEffect (disable body scroll),
//              Event handling (ESC key, backdrop click)
// ============================================

import { useEffect } from 'react';

function TrailerModal({ isOpen, onClose, videoKey, title }) {
  // 🎓 useEffect: prevent page scrolling while modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // 🎓 Conditional rendering: only mount/render when isOpen is true
  if (!isOpen || !videoKey) return null;

  return (
    // Backdrop click closes modal
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Trailer for ${title}`}
      id="trailer-modal"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
      >
        {/* Close Button */}
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Close trailer"
          id="modal-close-btn"
        >
          ✕
        </button>

        {/* YouTube Embed */}
        <div className="modal-video-wrapper">
          <iframe
            id="trailer-iframe"
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
            title={`${title} Trailer`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;
