import React from 'react';

// PUBLIC_INTERFACE
function FairyLedger({ records }) {
  if (!records || records.length === 0)
    return (
      <div className="fairy-card fairy-ledger-empty">
        <span role="img" aria-label="empty">🦷</span> No teeth lost... yet. The magic awaits!
      </div>
    );
  return (
    <div className="fairy-card fairy-ledger">
      <h2>Ledger of Lost Teeth</h2>
      <div className="fairy-ledger-scroll">
        <table className="fairy-ledger-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Age</th>
              <th>Tooth</th>
              <th>Earnings ($)</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, ix) => (
              <tr key={ix}>
                <td>{ix + 1}</td>
                <td>{record.date}</td>
                <td>{record.age}</td>
                <td>{record.tooth}</td>
                <td>${Number(record.earnings).toFixed(2)}</td>
                <td>{record.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default FairyLedger;
