import React, { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * FairyGifMagic - Fetches and displays a random 'fairy' GIF from Giphy.
 * - Handles loading and error states.
 * - Uses magical pastel, whimsical animated styling.
 * - Instructs user to set up their Giphy API key via a .env file (see comments below).
 * 
 * To use your Giphy API key:
 *   1. Get a free key at https://developers.giphy.com/ (log in/sign up).
 *   2. Add the following line to the root of your fairyfinance_magicreports/.env file:
 *       REACT_APP_GIPHY_API_KEY=your_giphy_key_here
 *   3. Restart the dev server (npm start) after editing .env!
 */

const GIPHY_QUERY = 'fairy';
const GIPHY_ENDPOINT = 'https://api.giphy.com/v1/gifs/random';

// PUBLIC_INTERFACE
function FairyGifMagic() {
  // API key from env (React exposes only with REACT_APP_ prefix)
  const apiKey = process.env.REACT_APP_GIPHY_API_KEY;
  const [gifUrl, setGifUrl] = useState('');
  const [gifTitle, setGifTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // PUBLIC_INTERFACE
  async function fetchGif() {
    if (!apiKey) {
      setError('Giphy API key not set! See instructions in the code and README for .env setup.');
      setLoading(false);
      setGifUrl('');
      return;
    }
    setLoading(true);
    setError('');
    setGifUrl('');
    try {
      const resp = await fetch(
        `${GIPHY_ENDPOINT}?api_key=${encodeURIComponent(apiKey)}&tag=${GIPHY_QUERY}`
      );
      if (!resp.ok) throw new Error('Could not fetch GIF from Giphy');
      const data = await resp.json();
      if (data.data && data.data.images && data.data.images.original && data.data.images.original.url) {
        setGifUrl(data.data.images.original.url);
        setGifTitle(data.data.title || 'Fairy GIF');
      } else {
        throw new Error('No GIF found for the magic fairy!');
      }
    } catch (err) {
      setError('✨ Unable to fetch a fairy GIF. ' + (err.message || 'Network error.'));
      setGifUrl('');
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchGif();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className="fairy-card"
      style={{
        background: 'linear-gradient(120deg, #fff0fa 82%, #f8f2ff 100%)',
        borderRadius: 22,
        boxShadow: '0 2px 17px #ffd70049, 0 1px 33px #8a2be244',
        padding: '26px 24px 20px 24px',
        margin: '22px 0 38px 0',
        maxWidth: 520,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: "'Comic Sans MS', cursive",
        textAlign: 'center',
        border: '2.2px solid #ffbcfe57',
        position: 'relative',
        overflow: 'hidden',
        animation: 'fairy-gif-fadeIn 0.75s cubic-bezier(0.68,-0.55,0.27,1.55)'
      }}
    >
      {/* Header and instructions */}
      <div
        style={{
          color: '#ffd700',
          fontSize: '1.37rem',
          fontWeight: 600,
          marginBottom: 9,
          textShadow: '0 2px 7px #ffd70088',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 9,
        }}
      >
        <span role="img" aria-label="fairy sparkle">🧚‍♀️</span>
        Fairy Gif Magic!
        <span role="img" aria-label="sparkle">✨</span>
      </div>
      {/* API key setup instruction */}
      {!apiKey && (
        <div
          style={{
            color: '#e06797',
            fontWeight: 500,
            background: '#ffe9fd',
            borderRadius: 14,
            margin: '13px 0 20px 0',
            padding: '12px 12px 8px 12px',
            fontSize: '1.02rem',
            boxShadow: '0 1px 8px #ffd70022',
          }}
        >
          <div>🔑 <b>To see magical fairy GIFs:</b></div>
          <ol style={{ textAlign: 'left', margin: '7px auto 4px auto', maxWidth: 380 }}>
            <li>Get a <b>free Giphy API Key</b> at <a href="https://developers.giphy.com/" target="_blank" rel="noreferrer">developers.giphy.com</a></li>
            <li>Add:<br/><span style={{background:'#fffbea',padding:'2px 6px',borderRadius:4}}>REACT_APP_GIPHY_API_KEY=&lt;your_key&gt;</span> <br/> to the <b>.env</b> file in project root</li>
            <li>Restart <code>npm start</code></li>
          </ol>
        </div>
      )}
      {loading ? (
        <div style={{ color: '#8a2be2', fontSize: '1.09rem', margin: '21px 0' }}>
          Summoning magical GIFs from Fairyland...
        </div>
      ) : error ? (
        <div style={{ color: '#e06797', fontWeight: 500, margin: '17px 0', minHeight: 46 }}>
          {error}
        </div>
      ) : gifUrl ? (
        <div
          style={{
            margin: '15px auto 15px auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 7,
            minHeight: 240,
          }}
        >
          <img
            src={gifUrl}
            alt={gifTitle}
            width={330}
            height={220}
            style={{
              borderRadius: 20,
              boxShadow: '0 8px 26px #ffd70038, 0 2px 34px #ff69b455',
              background: '#fffbe7',
              maxWidth: '100%',
              animation: 'fairy-gif-twinkle 2s infinite alternate',
              border: '3.5px dotted #ffd70080',
              margin: 'auto'
            }}
            loading="lazy"
          />
          <div style={{
            color: '#ff69b4',
            fontWeight: 500,
            fontSize: '1.06rem',
            marginTop: 4,
            textShadow: '0 1px 9px #ffd70030'
          }}
          >
            {gifTitle || 'Random Fairy GIF'}
          </div>
        </div>
      ) : null}
      <button
        className="fairy-btn"
        style={{
          borderRadius: 12,
          fontSize: '1.07rem',
          fontWeight: 540,
          letterSpacing: 0.5,
          margin: '2px 0 0 0',
          background: 'linear-gradient(75deg, #ffd700 60%, #ff69b4 100%)'
        }}
        type="button"
        onClick={fetchGif}
        disabled={loading || !apiKey}
        aria-label="Fetch new fairy gif"
      >
        🧚‍♀️ Summon New Fairy GIF
      </button>
      {/* Animations for magical twinkle */}
      <style>{`
      @keyframes fairy-gif-fadeIn { from { opacity: 0; transform: scale(0.95);} to { opacity: 1; transform: scale(1);} }
      @keyframes fairy-gif-twinkle {
        0% { filter: drop-shadow(0 0 10px #ffd70080) brightness(1.01); }
        100% { filter: drop-shadow(0 0 21px #ffbcfe) brightness(1.07); }
      }
      `}</style>
    </div>
  );
}

export default FairyGifMagic;
