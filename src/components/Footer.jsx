import React from 'react';
import { ArrowUp } from 'lucide-react';

export function Footer({ onScrollToTop }) {
  return (
    <footer className="temple-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-namam">
            <span className="namam-t-left"></span>
            <span className="namam-t-center"></span>
            <span className="namam-t-right"></span>
          </div>
          <h2 className="footer-title">SREERANGANADHA</h2>
          <p className="footer-sanskrit">ॐ नमो नारायणाय • सर्व मङ्गल माङ्गल्ये</p>
          <p className="footer-tagline">
            Sri Ranganathaswamy Temple • Srirangam, Tiruchirappalli, Tamil Nadu
          </p>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            An immersive 3D architectural journey celebrating Dravidian heritage and sacred devotion.
          </p>

          <button
            className="back-to-top-btn"
            onClick={onScrollToTop}
            title="Return to Exterior Gopuram"
          >
            <span>Return to Temple Entrance</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}

