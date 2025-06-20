import React, { useEffect, useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * FairyPushNotification - Integrates the OneSignal Web SDK for browser push notifications.
 *
 * Features:
 *   - Embeds OneSignal Web SDK script (only once)
 *   - Instructs developers on adding OneSignal app ID via .env file ("REACT_APP_ONESIGNAL_APP_ID")
 *   - Handles missing App ID (shows readable in-app notice)
 *   - Demo "Send Test Notification" button for developer/local testing
 *   - Graceful in local/dev mode: disables live push if no HTTPS or missing keys
 *   - Whimsically styled for the app's theme
 *
 * Setup:
 *   1. Sign up for free at https://onesignal.com/, create an app, get your web App ID.
 *   2. In fairyfinance_magicreports/.env add:
 *        REACT_APP_ONESIGNAL_APP_ID=your-onesignal-app-id-here
 *   3. Restart the dev server (npm start) after editing .env.
 */

const ONESIGNAL_SDK_URL = "https://cdn.onesignal.com/sdks/OneSignalSDK.js";

function isLocalhost() {
  return window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
}

function loadOneSignalScript() {
  if (!window.OneSignal && !document.getElementById("onesignal-sdk-script")) {
    const script = document.createElement('script');
    script.src = ONESIGNAL_SDK_URL;
    script.async = true;
    script.id = "onesignal-sdk-script";
    document.body.appendChild(script);
  }
}

// PUBLIC_INTERFACE
function FairyPushNotification() {
  const appId = process.env.REACT_APP_ONESIGNAL_APP_ID;
  const [ready, setReady] = useState(false);
  const [permission, setPermission] = useState('');
  const [error, setError] = useState('');
  const [init, setInit] = useState(false);

  useEffect(() => {
    if (!appId) return;
    loadOneSignalScript();

    // Wait until the SDK is loaded
    const timer = setInterval(() => {
      if (window.OneSignal) {
        if (!init) {
          window.OneSignal = window.OneSignal || [];
          window.OneSignal.push(function() {
            window.OneSignal.init({
              appId,
              serviceWorkerParam: { scope: '/' },
              notifyButton: { enable: false },
              autoRegister: false,
              allowLocalhostAsSecureOrigin: true
            });
            setInit(true);

            // Update permission immediately
            window.OneSignal.getNotificationPermission().then(setPermission);
            window.OneSignal.on('subscriptionChange', async (isSubscribed) => {
              const perm = await window.OneSignal.getNotificationPermission();
              setPermission(perm);
            });
          });
        }
        setReady(true);
        clearInterval(timer);
      }
    }, 350);

    return () => clearInterval(timer);
    // eslint-disable-next-line
  }, [appId]);

  // Ask for push permission
  const handlePrompt = () => {
    if (!ready || !window.OneSignal) return;
    window.OneSignal.showNativePrompt();
  };

  // Demo/test notification
  const handleTest = async () => {
    if (!ready || !window.OneSignal) return setError("Push system not active yet.");
    if (permission !== "granted") {
      setError("Push permission not granted.");
      return;
    }
    setError('');
    try {
      // NOTE: OneSignal test notifications are sent from their dashboard;
      // For demo, show a sample notification on eligible browsers using ServiceWorker API or a fallback.
      if ("serviceWorker" in navigator && "showNotification" in ServiceWorkerRegistration.prototype) {
        const reg = await navigator.serviceWorker.getRegistration();
        if (reg) {
          reg.showNotification("🧚 Fairy Finance Demo", {
            body: "This is a magical sample browser notification!",
            icon: "https://cdn.onesignal.com/sdks/onesignal-icon.png" // can swap to fairy favicon
          });
          return;
        }
      }
      // Fallback: try OneSignal API (should work if properly configured)
      window.OneSignal.sendSelfNotification(
        "🧚 FairyFinance Demo!","This is a magical sample notification from your app!", "https://localhost:3000/", null
      );
    } catch (e) {
      setError("Could not show notification. Check browser and key setup.");
    }
  };

  if (!appId) {
    return (
      <div className="fairy-card"
        style={{
          margin: "22px 0 24px 0",
          maxWidth: 520,
          background: "linear-gradient(120deg, #fffbe7 85%, #fff0fa 100%)",
          borderRadius: 22,
          fontFamily: "'Comic Sans MS', cursive",
          color: "#e06797",
          fontWeight: 500,
          border: "2.2px solid #ffbcfe57",
          boxShadow: "0 0px 18px #ffd7004c, 0 2px 32px #8a2be244"
        }}>
        <div style={{ fontSize: "1.19rem", color: "#e06797", marginBottom: 10, textShadow: "0 1px 10px #ffd70033" }}>
          <span role="img" aria-label="bell">🔔</span> Magical Push Notifications Setup
        </div>
        <div>
          <span>To enable fairy push notifications, add your OneSignal App ID:</span>
          <ol style={{ textAlign: 'left', marginTop: 8, marginBottom: 3 }}>
            <li>Get free App ID from <a href="https://onesignal.com/" target="_blank" rel="noopener noreferrer">onesignal.com</a></li>
            <li>Add:<br />
              <code style={{
                background: '#fffbea', padding: '2px 6px', borderRadius: 4
              }}>REACT_APP_ONESIGNAL_APP_ID=&lt;your-app-id&gt;</code> <br />
              to your <b>.env</b> file in <b>fairyfinance_magicreports/</b></li>
            <li>Restart <code>npm start</code></li>
          </ol>
          <div style={{ marginTop: 9, color: "#8a2be2" }}>
            <b>No notifications will be sent from this app unless you set your App ID!</b>
          </div>
        </div>
      </div>
    );
  }

  let content = (
    <div>
      <div style={{
        color: "#ffd700", fontWeight: 600, fontSize: "1.18rem", marginBottom: 10,
        textShadow: "0 2px 9px #ffd70044", display: 'flex', alignItems: 'center', gap: 8
      }}>
        <span role="img" aria-label="bell fairy">🔔🧚</span> Fairy Push Notifications!
      </div>
      <div style={{
        color: "#8a2be2", fontWeight: 500, marginBottom: 9,
        fontSize: "1.07rem"
      }}>
        Receive magical browser alerts—even when the tab is closed! Powered by OneSignal.
      </div>
      <div style={{
        color: "#ff69b4", marginBottom: 12, fontSize: "1.01rem"
      }}>
        Permission: <b>{permission === "granted" ? "Enabled" : (permission || "Not granted")}</b>
      </div>
      <button
        className="fairy-btn"
        style={{
          borderRadius: 14, margin: "4px 10px 8px 0", fontWeight: 540, background: "linear-gradient(75deg, #ffd700 70%, #ff69b4 100%)"
        }}
        type="button"
        onClick={handlePrompt}
        disabled={!ready || permission === "granted"}
      >🔔 Enable Push</button>
      <button
        className="fairy-btn"
        style={{
          borderRadius: 14, margin: "4px 0 8px 0", fontWeight: 540, background: "linear-gradient(75deg, #ffd700 40%, #8a2be2 100%)"
        }}
        type="button"
        onClick={handleTest}
        disabled={!ready || permission !== "granted"}
      >🧚 Demo Notification</button>
      <div style={{ marginTop: 5, color: "#e06797", minHeight: 23 }}>{error}</div>
      {isLocalhost() && (
        <div style={{ marginTop: 10, fontSize: "0.97rem", color: "#ff69b4cc" }}>
          <b>Note:</b> Push notifications can be tested on localhost in modern browsers, but production requires HTTPS.
        </div>
      )}
    </div>
  );
  return (
    <div className="fairy-card"
      style={{
        margin: "22px 0 24px 0",
        maxWidth: 520,
        background: "linear-gradient(120deg, #fffbe7 85%, #fff0fa 100%)",
        borderRadius: 22,
        fontFamily: "'Comic Sans MS', cursive",
        color: "#532b62",
        border: "2.2px solid #ffbcfe57",
        boxShadow: "0 0px 18px #ffd7004c, 0 2px 32px #8a2be244"
      }}>
      {content}
    </div>
  );
}

export default FairyPushNotification;
