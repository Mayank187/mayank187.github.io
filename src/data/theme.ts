export const theme = {
  colors: {
    primary: '#ff6b35',
    primaryDim: '#e85d2f',
    secondary: '#ffb703',
    accent: '#fb7185',
    terminal: '#84cc16',

    brand: {
      50: '#fff4ed',
      100: '#ffe6d5',
      200: '#ffbf99',
      300: '#ff9a66',
      400: '#ff6b35',
      500: '#e85d2f',
      600: '#c2410c',
      700: '#9a3412',
    },

    bg: {
      base: '#15110f',
      surface: '#1f1815',
      card: '#2b211d',
      hover: '#3a2b25',
      elevated: '#523a31',
    },

    text: {
      primary: '#fff7f2',
      secondary: '#f0d6c9',
      muted: '#b8998b',
    },

    border: '#3a2b25',
    glow: 'rgba(255, 107, 53, 0.16)',
    grid: 'rgba(255, 183, 3, 0.04)',
    scrollbar: {
      track: '#15110f',
      thumb: '#523a31',
    },
  },

  fonts: {
    sans: "'Sora', ui-sans-serif, system-ui, sans-serif",
    display: "'Clash Display', 'Sora', ui-sans-serif, system-ui, sans-serif",
    mono: "'IBM Plex Mono', 'JetBrains Mono', ui-monospace, monospace",
  },

  effects: {
    glowCyan: {
      boxShadow:
        '0 0 22px rgba(255, 107, 53, 0.15), 0 0 58px rgba(251, 113, 133, 0.05)',
    },
    grid: {
      size: '34px 34px',
      color: 'rgba(255, 183, 3, 0.04)',
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