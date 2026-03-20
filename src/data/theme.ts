export const theme = {
  colors: {
    primary: '#f59e0b',
    primaryDim: '#d97706',
    secondary: '#d97706',
    accent: '#fbbf24',
    terminal: '#84cc16',

    brand: {
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
    },

    bg: {
      base: '#0a0a0a',
      surface: '#171717',
      card: '#262626',
      hover: '#404040',
      elevated: '#525252',
    },

    text: {
      primary: '#e5e5e5',
      secondary: '#d4d4d4',
      muted: '#a3a3a3',
    },

    border: '#404040',
    glow: 'rgba(245, 158, 11, 0.16)',
    grid: 'rgba(245, 158, 11, 0.03)',
    scrollbar: {
      track: '#0a0a0a',
      thumb: '#525252',
    },
  },

  fonts: {
    sans: "'Inter', ui-sans-serif, system-ui, sans-serif",
    display: "'Clash Display', 'Sora', ui-sans-serif, system-ui, sans-serif",
    mono: "'JetBrains Mono', ui-monospace, monospace",
  },

  effects: {
    glowCyan: {
      boxShadow:
        '0 0 22px rgba(245, 158, 11, 0.15), 0 0 58px rgba(251, 191, 36, 0.05)',
    },
    grid: {
      size: '34px 34px',
      color: 'rgba(245, 158, 11, 0.03)',
    },
    scrollbar: {
      width: '8px',
      radius: '2px',
    },
  },

  nav: {
    height: '66px',
  },
} as const;

export type Theme = typeof theme;
