import React, { useMemo } from 'react';

/**
 * PUBLIC_INTERFACE
 * FairyQuickChart - displays a dynamic chart via QuickChart.io based on app's earnings/timeline data.
 * - Props:
 *   - earningsTimeline: [{date: "...", earnings: number}], chronological order
 *   - theme: (optional) string for styling, not required (uses pastel fairy theme)
 *
 * The chart image updates whenever data changes. Magic pastel theming applied.
 */
function formatTimelineLabels(earningsTimeline) {
  // Format dates (e.g. MM/DD or "1st Jan") for X-axis
  return earningsTimeline.map(e =>
    new Date(e.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  );
}

function getLineData(earningsTimeline) {
  // Returns Y-values for chart
  return earningsTimeline.map(e => Number(e.earnings) || 0);
}

// PUBLIC_INTERFACE
function FairyQuickChart({ earningsTimeline }) {
  const labels = useMemo(
    () => formatTimelineLabels(earningsTimeline || []),
    [earningsTimeline]
  );
  const data = useMemo(
    () => getLineData(earningsTimeline || []),
    [earningsTimeline]
  );

  // Fairy pastel theming for chart
  const chartConfig = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Fairy Earnings',
          data,
          borderColor: '#ffd700',
          backgroundColor: 'rgba(255, 215, 0, 0.16)',
          fill: true,
          pointBackgroundColor: '#ff69b4',
          pointBorderColor: "#8a2be2",
          pointRadius: 5,
          tension: 0.39
        }
      ]
    },
    options: {
      plugins: {
        legend: {
          labels: {
            color: '#8a2be2',
            font: { family: "'Comic Sans MS', cursive", size: 15 }
          }
        },
      },
      scales: {
        x: {
          ticks: { color: '#8a2be2', font: { family: "'Comic Sans MS', cursive", size: 13 } },
          grid: { color: "#ffbcfe30" }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#ff69b4',
            font: { family: "'Comic Sans MS', cursive", size: 13 },
            callback: v => `$${v}`
          },
          grid: { color: "#ffbcfe30" }
        }
      },
      backgroundColor: "#fffaf6",
      responsive: true,
      animation: false,
    }
  };

  // Encode config as URL parameter, style for 2x higher resolution image
  const chartUrl = useMemo(() => {
    const base = "https://quickchart.io/chart";
    const params = new URLSearchParams({
      c: JSON.stringify(chartConfig),
      width: 540,
      height: 260,
      backgroundColor: "fffaf6"
    });
    return `${base}?${params.toString()}`;
    // eslint-disable-next-line
  }, [JSON.stringify(chartConfig)]);

  if (!earningsTimeline || earningsTimeline.length === 0) {
    return null;
  }

  return (
    <div style={{
      background: "linear-gradient(106deg, #fff0fa 70%, #f8f2ff 100%)",
      padding: "14px 0",
      borderRadius: 17,
      maxWidth: 560,
      margin: "16px auto",
      boxShadow: "0 1px 12px #ff69b418, 0 2px 16px #ffd70022",
      border: "2px solid #ffbcfe33"
    }}>
      <div style={{
        color: "#8a2be2",
        fontWeight: 600,
        fontFamily: "'Comic Sans MS', cursive",
        fontSize: "1.18rem",
        marginBottom: 7,
        textShadow: "0 2px 11px #ffd70044"
      }}>
        <span role="img" aria-label="chart">📊</span> Magical QuickChart.io Chart
      </div>
      <img
        src={chartUrl}
        alt="Fairy Earnings Chart"
        width={420}
        height={230}
        style={{
          borderRadius: 12,
          boxShadow: "0 4px 13px #ffb9f455, 0 1px 8px #ffd70022",
          background: "#fffbe7",
          display: "block",
          margin: "auto"
        }}
        loading="lazy"
      />
      <div style={{
        fontSize: "0.98rem",
        color: "#ff69b4",
        marginTop: 5
      }}>
        Magic chart updates live with your tooth fairy entries!
      </div>
    </div>
  );
}

export default FairyQuickChart;
