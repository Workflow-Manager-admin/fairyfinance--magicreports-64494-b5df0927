import React from 'react';
import FairyQuickChart from './FairyQuickChart';

// Draw a simple SVG line chart for earnings over timeline
function FairyCharts({ records, reportData }) {
  if (!records || records.length === 0 || !reportData) {
    return (
      <div className="fairy-card fairy-charts-empty">
        <span role="img" aria-label="chart">📈</span> Charts appear as you add lost teeth!
      </div>
    );
  }

  // Chart: Earnings timeline
  const chartWidth = 390, chartHeight = 120;
  const data = reportData.earningsTimeline;
  const maxEarn = Math.max(...data.map(d => d.earnings), 1);
  const minEarn = Math.min(...data.map(d => d.earnings), 0);
  const scaleX = chartWidth / Math.max(data.length - 1, 1);
  const scaleY = maxEarn - minEarn
    ? (chartHeight - 20) / (maxEarn - minEarn)
    : 1;

  const points = data.map((d, i) => [
    i * scaleX + 10,
    chartHeight - 10 - (d.earnings - minEarn) * scaleY
  ]);
  const polyline = points.map(p => p.join(',')).join(' ');

  return (
    <div className="fairy-card fairy-charts">
      <h2>Magical Charts & Trends</h2>
      <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
        <div>
          <div className="fairy-charts-label">Earnings Timeline</div>
          <svg width={chartWidth} height={chartHeight}>
            {/* X axis */}
            <line
              x1="10"
              y1={chartHeight - 10}
              x2={chartWidth - 10}
              y2={chartHeight - 10}
              stroke="#8a2be2"
              strokeWidth={2}
            />
            {/* Y axis */}
            <line
              x1="10"
              y1="10"
              x2="10"
              y2={chartHeight - 10}
              stroke="#ff69b4"
              strokeWidth={2}
            />
            {/* Polyline for earnings */}
            <polyline
              fill="none"
              stroke="#ffd700"
              strokeWidth="3"
              points={polyline}
              strokeLinejoin="round"
            />
            {/* Dots */}
            {points.map(([x, y], i) => (
              <circle fill="#ff69b4" stroke="#fff" cx={x} cy={y} r={4} key={i} />
            ))}
          </svg>
        </div>
        <div>
          <div className="fairy-charts-label">Teeth Lost Over Time</div>
          <svg width={chartWidth} height={chartHeight}>
            {/* Bar chart: Bars */}
            {data.map((d, i) => (
              <rect
                key={i}
                x={i * scaleX + 18}
                y={chartHeight - 10 - ((i + 1) / data.length) * (chartHeight - 20)}
                width={scaleX - 10}
                height={((i + 1) / data.length) * (chartHeight - 20)}
                fill="#ffc4fa"
                stroke="#8a2be2"
                rx={8}
              />
            ))}
          </svg>
        </div>
      </div>
      {/* QuickChart.io - Live Updating FairyChart */}
      {reportData && reportData.earningsTimeline && reportData.earningsTimeline.length > 0 && (
        <FairyQuickChart earningsTimeline={reportData.earningsTimeline} />
      )}
    </div>
  );
}

export default FairyCharts;
