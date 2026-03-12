export const theme = {
  colors: {
    primary: '#38bdf8',       // cyan-400
    primaryDim: '#0ea5e9',    // cyan-500
    secondary: '#a78bfa',     // purple-400
    accent: '#2dd4bf',        // teal-400
    terminal: '#4ade80',      // green-400
    bg: {
      base: '#030712',        // gray-950
      surface: '#0f172a',     // slate-900
      card: '#1e293b',        // slate-800
      hover: '#334155',       // slate-700
    },
    text: {
      primary: '#f1f5f9',     // slate-100
      secondary: '#94a3b8',   // slate-400
      muted: '#64748b',       // slate-500
    },
    border: '#1e293b',
    glow: 'rgba(56, 189, 248, 0.15)',
  },
  fonts: {
    sans: "'Inter', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },
  nav: {
    height: '64px',
  },
} as const;

export type Theme = typeof theme;
