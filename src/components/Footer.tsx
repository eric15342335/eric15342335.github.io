'use client';

import { useEffect, useState } from 'react';

declare global {
  interface Window {
    goatcounter?: unknown;
  }
}

export default function Footer() {
  const [lastUpdated, setLastUpdated] = useState('');

  useEffect(() => {
    // Set the last updated time to current build time
    setLastUpdated(new Date().toISOString());

    // GoatCounter stats functionality
    const showStats = () => {
      const statsDiv = document.getElementById('goatcounter-stats');
      const statsNumber = document.getElementById('goatcounter-stats-number');
      
      // This would normally be populated by the GoatCounter script
      if (statsDiv && statsNumber && window.goatcounter) {
        statsDiv.style.display = 'block';
        // You can implement GoatCounter integration here
      }
    };

    // Check for GoatCounter after a delay
    setTimeout(showStats, 1000);
  }, []);

  return (
    <footer>
      <div className="separation-bar footer-container">
        <span className="left-align">
          <a href="https://github.com/eric15342335/eric15342335.github.io/">Website</a>
          {' '}by{' '}
          <a href="mailto:eric310@connect.hku.hk">eric15342335</a>
          <br />
          <a href="https://icp.gov.moe/?keyword=20250310" target="_blank" rel="noopener noreferrer">
            萌ICP备20250310号
          </a>
        </span>
        <span className="right-align">
          Last updated: {lastUpdated ? new Date(lastUpdated).toUTCString() : 'Loading...'}
        </span>
      </div>

      {/* GoatCounter counter */}
      <div id="goatcounter-stats" style={{ display: 'none' }}>
        <br />
        <small>visitor <span id="goatcounter-stats-number"></span></small>
      </div>
    </footer>
  );
}