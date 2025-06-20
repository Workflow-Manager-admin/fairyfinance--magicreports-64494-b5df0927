import React, { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * A whimsical component that fetches a random quote from the Quotable API
 * and displays it as a "Magic Message" with fairy-tale pastel styling.
 * Includes loading/error states and a button to fetch a new magic message.
 */
function FairyMagicMessage() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // PUBLIC_INTERFACE
  const fetchMagic = async () => {
    setLoading(true);
    setError('');
    try {
      // Use Quotable API for random quote
      const resp = await fetch('https://api.quotable.io/random');
      if (!resp.ok) throw new Error('Magical winds failed to fetch...');
      const data = await resp.json();
      setQuote(data.content);
      setAuthor(data.author);
    } catch (err) {
      setError('✨ Oops, the fairy lost connection! Try again...');
      setQuote('');
      setAuthor('');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMagic();
    // Only once on mount
    // eslint-disable-next-line
  }, []);

  return (
    <div
      style={{
        background: 'linear-gradient(130deg, #fff0fa 75%, #f8f2ff 100%)',
        borderRadius: 20,
        boxShadow: '0 1px 13px #ffd70033, 0 1px 23px #8a2be233',
        padding: '22px 28px',
        marginBottom: '28px',
        marginTop: '8px',
        fontFamily: "'Comic Sans MS', cursive",
        textAlign: 'center',
        position: 'relative',
        border: '2.2px solid #ffbcfe57',
        maxWidth: 520,
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
      className="fairy-card"
    >
      <div
        style={{
          color: '#ff69b4',
          fontSize: '1.37rem',
          fontWeight: 600,
          marginBottom: 12,
          textShadow: '0 2px 7px #ffd70055',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span role="img" aria-label="sparkle">✨</span>
        Magic Message
        <span role="img" aria-label="wand">🪄</span>
      </div>
      {loading ? (
        <div style={{ color: '#8a2be2', fontSize: '1.09rem', margin: '17px 0' }}>
          Calling the fairies...
        </div>
      ) : error ? (
        <div style={{ color: '#c23c5a', fontWeight: 500, margin: '15px 0' }}>
          {error}
        </div>
      ) : (
        <div>
          <div
            style={{
              color: '#8a2be2',
              background: '#fff8fc',
              borderRadius: 13,
              padding: '11px 14px',
              boxShadow: '0 1px 9px #b375c211',
              margin: '3px 0 9px 0',
              fontSize: '1.12rem',
              fontWeight: 500,
              minHeight: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 7,
            }}
            className="fairy-quote"
          >
            <span role="img" aria-label="fairy">🧚‍♀️</span>
            {quote}
          </div>
          {author && (
            <div style={{ fontStyle: 'italic', color: '#ff69b4cc', fontSize: '0.99rem', marginTop: 6 }}>
              — {author}
            </div>
          )}
        </div>
      )}
      <button
        className="fairy-btn"
        style={{
          marginTop: 19,
          fontSize: '1.05rem',
          padding: '7px 24px',
          borderRadius: 14,
          background: 'linear-gradient(90deg, #ffd700 70%, #ff69b4 100%)',
          color: '#fff',
          boxShadow: '0 2px 8px #ffd70066'
        }}
        onClick={fetchMagic}
        disabled={loading}
        aria-label="Get a new magic message"
      >
        🪄 New Magic
      </button>
    </div>
  );
}

export default FairyMagicMessage;
