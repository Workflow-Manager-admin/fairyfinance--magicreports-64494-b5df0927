import React, { useMemo } from 'react';

/**
 * PUBLIC_INTERFACE
 * FairyAvatar - displays a whimsical DiceBear fairy avatar.
 * Avatar is generated with DiceBear "fantasy-fairy" sprite set, random/per-session seed.
 * Use sessionStorage to persist the generated seed for consistent appearance during browsing.
 *
 * Props:
 *   size: number (avatar px size, default 64)
 *   style: React.CSSProperties for additional avatar wrapper styles
 */
function generateFairySeed() {
  // Try to use/persist per session
  let fairySeed = window?.sessionStorage?.getItem('fairy_avatar_seed');
  if (!fairySeed) {
    // fun, random "whimsical" seed
    fairySeed = 'fairy-' + Math.random().toString(36).slice(2, 12) + '-' + Date.now();
    window?.sessionStorage?.setItem('fairy_avatar_seed', fairySeed);
  }
  return fairySeed;
}

// PUBLIC_INTERFACE
function FairyAvatar({ size = 64, style = {} }) {
  // Compute seed only once per session
  const seed = useMemo(() => generateFairySeed(), []);
  // DiceBear fantasy-fairy sprite, .svg API: https://api.dicebear.com/7.x/fantasy-fairy/svg?seed=xyz
  const avatarUrl = `https://api.dicebear.com/7.x/fantasy-fairy/svg?seed=${encodeURIComponent(seed)}&backgroundColor=ffd700,fff0fa,fffbe7,f8f2ff&radius=50`;

  return (
    <div
      style={{
        display: 'inline-block',
        borderRadius: '50%',
        boxShadow: '0 2px 10px #ffd70066, 0 1px 6px #8a2be255',
        background: 'radial-gradient(#fffbe7 60%, #fff0fa 100%)',
        padding: 5,
        ...style
      }}
      aria-label="Fairy Avatar"
      title="Your fairy helper!"
    >
      <img
        src={avatarUrl}
        alt="Fairy Avatar"
        width={size}
        height={size}
        style={{
          display: 'block',
          borderRadius: '50%',
          background: '#fffbe7',
          width: size,
          height: size,
          boxShadow: '0 4px 14px #ffd70030',
        }}
        draggable={false}
        loading="lazy"
      />
    </div>
  );
}

export default FairyAvatar;
