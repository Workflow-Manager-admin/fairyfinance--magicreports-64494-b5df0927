import React from 'react';

// PUBLIC_INTERFACE
function FairyStats({ reportData }) {
  if (!reportData)
    return (
      <div className="fairy-card fairy-stats-empty">
        <span role="img" aria-label="star">🌟</span> Add some teeth for magical stats!
      </div>
    );
  return (
    <div className="fairy-card fairy-stats">
      <h2>Fairy Bonus Stats</h2>
      <ul className="fairy-stats-list">
        <li>
          <strong className="fairy-stats-heading" style={{ color: '#ffd700' }}>Total Earnings:</strong>
          <span> ${reportData.totalEarnings.toFixed(2)} </span>
        </li>
        <li>
          <strong className="fairy-stats-heading" style={{ color: '#8a2be2' }}>Total Teeth Lost:</strong>
          <span> {reportData.totalTeeth} </span>
        </li>
        <li>
          <strong className="fairy-stats-heading" style={{ color: '#ff69b4' }}>Fairy Generosity:</strong>
          <span> ${reportData.generosity.toFixed(2)} / tooth </span>
        </li>
        <li>
          <strong className="fairy-stats-heading" style={{ color: '#48cde7' }}>Legendary Teeth Percentile:</strong>
          <span>
            {' '}
            {reportData.legendaryPercentile.toFixed(1)}%
            {' '}
            <span role="img" aria-label="legendary">🦷✨</span>
          </span>
        </li>
        <li>
          <strong className="fairy-stats-heading" style={{ color: '#ff9ffd' }}>Teeth Timeline:</strong>
          <span>
            {reportData.earliest
              ? `${new Date(reportData.earliest).toLocaleDateString()} → ${new Date(reportData.latest).toLocaleDateString()}`
              : 'N/A'}
          </span>
        </li>
      </ul>
    </div>
  );
}

export default FairyStats;
