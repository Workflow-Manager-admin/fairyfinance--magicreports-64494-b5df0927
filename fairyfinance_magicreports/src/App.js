import React, { useState } from 'react';
import './App.css';
import FairyInputForm from './components/FairyInputForm';
import FairyLedger from './components/FairyLedger';
import FairyCharts from './components/FairyCharts';
import FairyStats from './components/FairyStats';
import FairyTimeline from './components/FairyTimeline';
import FairyMagicMessage from './components/FairyMagicMessage';
import FairyCatMessage from './components/FairyCatMessage';

// PUBLIC_INTERFACE
function App() {
  const [records, setRecords] = useState([]);
  const [reportData, setReportData] = useState(null);

  // PUBLIC_INTERFACE
  function handleAddRecord(record) {
    const newRecords = [...records, record].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );
    setRecords(newRecords);
    setReportData(generateReports(newRecords));
  }

  // PUBLIC_INTERFACE
  function generateReports(records) {
    // Calculate totals and stats
    const totalEarnings = records.reduce((sum, r) => sum + Number(r.earnings || 0), 0);
    const dateList = records.map((r) => new Date(r.date));
    const totalTeeth = records.length;
    const earliest = dateList.length ? new Date(Math.min(...dateList)) : null;
    const latest = dateList.length ? new Date(Math.max(...dateList)) : null;
    // Example generosity (earnings per tooth benchmarked)
    const generosity = totalTeeth ? totalEarnings / totalTeeth : 0;
    // Legendary teeth: higher earning (top 15%)
    const sorted = [...records].sort((a, b) => b.earnings - a.earnings);
    const cutoff = Math.ceil(sorted.length * 0.15) || 1;
    const legendaryThreshold = sorted[cutoff - 1] ? sorted[cutoff - 1].earnings : 0;
    const legendaryCount = sorted.filter(r => r.earnings >= legendaryThreshold).length;
    return {
      totalEarnings,
      totalTeeth,
      generosity,
      earliest,
      latest,
      legendaryPercentile: totalTeeth ? (legendaryCount / totalTeeth) * 100 : 0,
      earningsTimeline: records.map(r => ({
        date: r.date,
        earnings: Number(r.earnings || 0)
      })),
    };
  }

  return (
    <div className="fairy-app fairy-bg">
      <nav className="fairy-navbar">
        <span className="fairy-logo">
          <span className="star" role="img" aria-label="magic">🪄</span> FairyFinance & MagicReports
        </span>
      </nav>
      <main className="fairy-main">
        <section className="fairy-section" style={{paddingTop: 8}}>
          <FairyMagicMessage />
        </section>
        <section className="fairy-section" style={{paddingTop: 2}}>
          <FairyCatMessage />
        </section>
        <section className="fairy-section">
          <h1 className="fairy-title">
            Welcome to the Tooth Fairy's Ledger!
          </h1>
          <p className="fairy-description">
            Discover a magical way to track teeth lost, fairy earnings, and legendary stats. Enter your fairy-history to reveal whimsical reports!
          </p>
          <FairyInputForm onAddRecord={handleAddRecord} />
        </section>
        <section className="fairy-section">
          <FairyTimeline records={records} />
        </section>
        <section className="fairy-section">
          <FairyLedger records={records} />
        </section>
        <section className="fairy-section">
          <FairyCharts records={records} reportData={reportData} />
        </section>
        <section className="fairy-section">
          <FairyStats reportData={reportData} />
        </section>
      </main>
      <footer className="fairy-footer">
        <span>✨ Powered by Magic and Imagination</span>
      </footer>
    </div>
  );
}

export default App;
