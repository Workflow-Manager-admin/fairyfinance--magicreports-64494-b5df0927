import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * A whimsical section for displaying a Cataas cat image with a magical, customizable fairy message.
 * Uses a user-input message or a default magic phrase rendered on the cat image via Cataas API.
 * Handles error states and uses fairy-tale pastel/fun styling.
 */
function FairyCatMessage() {
  // The magic message to display.
  const [input, setInput] = useState('');
  const [message, setMessage] = useState('Fairy Cat Magic!');
  const [imgUrl, setImgUrl] = useState(
    `https://cataas.com/cat/says/Fairy%20Cat%20Magic!?width=400&height=350&fontSize=32&color=purple`
  );
  const [error, setError] = useState('');

  // PUBLIC_INTERFACE
  function handleChange(e) {
    setInput(e.target.value);
  }

  // PUBLIC_INTERFACE
  function handleShow(e) {
    e.preventDefault();
    const cleanMsg = input.trim() ? input.trim() : 'Fairy Cat Magic!';
    // update image URL to include encoded message
    const newUrl = `https://cataas.com/cat/says/${encodeURIComponent(cleanMsg)}?width=400&height=350&fontSize=32&color=purple`;
    setImgUrl(newUrl);
    setMessage(cleanMsg);
    setError('');
  }

  // PUBLIC_INTERFACE
  function handleImgError() {
    setError('😿 Fairy Cat is hiding! (Image not available now)');
  }

  return (
    <div
      className="fairy-card"
      style={{
        background: 'linear-gradient(120deg, #fff0fa 75%, #f8f2ff 100%)',
        borderRadius: 22,
        boxShadow: '0 1px 17px #ffd70042, 0 1px 33px #8a2be244',
        padding: '24px 24px 20px 24px',
        margin: '20px 0 30px 0',
        maxWidth: 540,
        marginLeft: 'auto',
        marginRight: 'auto',
        fontFamily: "'Comic Sans MS', cursive",
        textAlign: 'center',
        border: '2.2px solid #ffbcfe57',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          color: '#8a2be2',
          fontSize: '1.27rem',
          fontWeight: 560,
          marginBottom: 15,
          textShadow: '0 2px 7px #ffd70044',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 9,
        }}
      >
        <span role="img" aria-label="cat magic">😺</span>
        Magic Cat of the Fairy Realm
        <span role="img" aria-label="stars">✨</span>
      </div>
      <form
        onSubmit={handleShow}
        style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}
        autoComplete="off"
      >
        <input
          style={{
            borderRadius: 9,
            border: '1.8px solid #ffd70055',
            fontSize: '1.05rem',
            padding: '7px 13px',
            minWidth: 180,
            fontFamily: "'Comic Sans MS', cursive",
            color: '#822D90',
            background: '#fff8fc'
          }}
          maxLength={60}
          value={input}
          onChange={handleChange}
          placeholder="Type your magic wish!"
          aria-label="Enter a magic message"
        />
        <button
          className="fairy-btn"
          style={{
            borderRadius: 12,
            fontSize: '1.07rem',
            fontWeight: 500,
            letterSpacing: 0.5,
            margin: 0,
            background: 'linear-gradient(75deg, #ffd700 70%, #ff69b4 100%)'
          }}
          type="submit"
        >
          Show Cat Magic!
        </button>
      </form>
      <div>
        {error ? (
          <div style={{ color: '#e06797', fontWeight: 500, margin: '15px 0' }}>
            {error}
          </div>
        ) : (
          <img
            src={imgUrl}
            alt={message}
            width={350}
            height={270}
            onError={handleImgError}
            style={{
              borderRadius: 16,
              boxShadow: '0 4px 24px #8a2be266, 0 1px 11px #ffd70033',
              margin: '5px auto 11px auto',
              background: '#fffef8',
              maxWidth: '100%',
              display: 'block'
            }}
          />
        )}
      </div>
      <div
        style={{
          color: '#ff69b4d0',
          fontSize: '1.05rem',
          fontWeight: 500,
          marginTop: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 5,
        }}
      >
        <span role="img" aria-label="wand">🪄</span>
        {message}
      </div>
    </div>
  );
}

export default FairyCatMessage;
