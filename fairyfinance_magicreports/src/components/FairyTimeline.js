import React, { useState } from 'react';

// List of playful fairy quotes
const FAIRY_QUOTES = [
  "Even one lost tooth can bring a spark of magic.",
  "A gap-toothed smile is a badge of bravery!",
  "Dreams (and fairies) are made of wishes and wobbly teeth.",
  "Every tooth beneath a pillow calls forth a fairy celebration!",
  "Believe in glitter, surprises, and magical mornings.",
  "Remember: fairies always leave a sprinkle of cheer behind.",
  "Lost a tooth? Gained a tale for bedtime forever.",
];

// Choose quote: use record, or random if not present
function getFairyQuote(record) {
  if (record && record.fairyQuote) return record.fairyQuote;
  // Optionally, we could assign a persistent quote if none present.
  const ix = record
    ? (record.date
        ? record.date.split('-').reduce((acc, n) => acc + parseInt(n, 10), 0) % FAIRY_QUOTES.length
        : Math.floor(Math.random() * FAIRY_QUOTES.length))
    : Math.floor(Math.random() * FAIRY_QUOTES.length);
  return FAIRY_QUOTES[ix];
}

// PUBLIC_INTERFACE
function FairyTimeline({ records, onUpdateRecord }) {
  const [openIndex, setOpenIndex] = useState(-1);

  if (!records || records.length === 0)
    return (
      <div className="fairy-card fairy-timeline-empty">
        <span role="img" aria-label="timeline">✨</span> No fairy visits... yet!
      </div>
    );

  // Oldest to newest for timeline
  const sorted = [...records].sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="fairy-card fairy-timeline">
      <h2>
        <span role="img" aria-label="tales">🦷✨</span> Fairy Tale Stories Timeline
      </h2>
      <div className="fairy-timeline-bar">
        {sorted.map((rec, ix) => (
          <div
            key={ix}
            className={`fairy-timeline-entry${openIndex === ix ? ' open' : ''}`}
            tabIndex={0}
            onClick={() => setOpenIndex(openIndex === ix ? -1 : ix)}
            onKeyPress={e => { if (e.key === "Enter" || e.key === " ") setOpenIndex(openIndex === ix ? -1 : ix); }}
            title="Reveal the fairy's story"
          >
            <div className="fairy-timeline-icon">
              <span role="img" aria-label="tooth">🦷</span>
              <span className="sparkle" role="img" aria-label="sparkle">✨</span>
            </div>
            <div className="fairy-timeline-dot" />
            <div className="fairy-timeline-date">{rec.date}</div>

            {openIndex === ix &&
              <div className="fairy-timeline-modal">
                <div className="fairy-timeline-modal-content">
                  <div className="fairy-timeline-modal-header">
                    <span role="img" aria-label="star">🌟</span> Fairy's Visit #{ix + 1}
                  </div>
                  <div className="fairy-timeline-modal-body">
                    <div>
                      <span className="timeline-label">Tooth: </span>
                      <b>{rec.tooth}</b> | <span className="timeline-label">Age:</span> <b>{rec.age}</b>
                    </div>
                    <div>
                      <span className="timeline-label">Notes:</span> <span>{rec.notes ? rec.notes : <i>None</i>}</span>
                    </div>
                    <div>
                      <span className="timeline-label">Earnings:</span> ${Number(rec.earnings).toFixed(2)}
                    </div>
                    <div className="timeline-label">Fairy's Message:</div>
                    <div className="fairy-quote">
                      <span role="img" aria-label="fairy">🧚‍♀️</span>
                      {getFairyQuote(rec)}
                    </div>
                  </div>
                  <button
                    className="fairy-btn fairy-timeline-close"
                    onClick={e => { e.stopPropagation(); setOpenIndex(-1); }}
                  >
                    Close
                  </button>
                </div>
              </div>
            }
          </div>
        ))}
        {/* Line under/through icons */}
        <div className="fairy-timeline-line" />
      </div>
    </div>
  );
}

export default FairyTimeline;
