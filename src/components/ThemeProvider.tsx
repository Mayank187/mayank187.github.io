import { useEffect } from 'react';
import { theme } from '../data/theme';

function interpolate(c1: string, c2: string, t: number): string {
  const parse = (h: string) => [
    parseInt(h.slice(1, 3), 16),
    parseInt(h.slice(3, 5), 16),
    parseInt(h.slice(5, 7), 16),
  ];
  const [r1, g1, b1] = parse(c1);
  const [r2, g2, b2] = parse(c2);
  const hex = (v: number) =>
    Math.round(v).toString(16).padStart(2, '0');
  return `#${hex(r1 + (r2 - r1) * t)}${hex(g1 + (g2 - g1) * t)}${hex(b1 + (b2 - b1) * t)}`;
}

function lighten(hex: string, amt: number): string {
  return interpolate(hex, '#ffffff', amt);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const c = theme.colors;

    // Brand colors — use explicit shades if provided, else generate from primary
    const brand = c.brand ?? {
      50: lighten(c.primary, 0.85),
      100: lighten(c.primary, 0.75),
      200: lighten(c.primary, 0.6),
      300: lighten(c.primary, 0.4),
      400: c.primary,
      500: c.primaryDim,
      600: interpolate(c.primary, '#000000', 0.3),
      700: interpolate(c.primary, '#000000', 0.45),
    };

    root.style.setProperty('--color-brand-50', brand[50]);
    root.style.setProperty('--color-brand-100', brand[100]);
    root.style.setProperty('--color-brand-200', brand[200]);
    root.style.setProperty('--color-brand-300', brand[300]);
    root.style.setProperty('--color-brand-400', brand[400]);
    root.style.setProperty('--color-brand-500', brand[500]);
    root.style.setProperty('--color-brand-600', brand[600]);
    root.style.setProperty('--color-brand-700', brand[700]);

    // Override Tailwind's slate palette with theme bg colors
    // Components use slate-100 (text), slate-200-400 (secondary text), slate-500-600 (muted), slate-700-800 (borders/cards), slate-900-950 (backgrounds)
    root.style.setProperty('--color-slate-50', c.text.primary);
    root.style.setProperty('--color-slate-100', c.text.primary);
    root.style.setProperty('--color-slate-200', c.text.secondary);
    root.style.setProperty('--color-slate-300', c.text.secondary);
    root.style.setProperty('--color-slate-400', c.text.muted);
    root.style.setProperty('--color-slate-500', c.text.muted);
    root.style.setProperty('--color-slate-600', interpolate(c.text.muted, c.border, 0.5));
    root.style.setProperty('--color-slate-700', c.border);
    root.style.setProperty('--color-slate-800', c.bg.card);
    root.style.setProperty('--color-slate-900', c.bg.surface);
    root.style.setProperty('--color-slate-950', c.bg.base);

    // Also override gray (used by some Tailwind defaults)
    root.style.setProperty('--color-gray-950', c.bg.base);
    root.style.setProperty('--color-gray-900', c.bg.surface);

    // Surface colors
    root.style.setProperty('--color-surface-950', c.bg.base);
    root.style.setProperty('--color-surface-900', c.bg.surface);
    root.style.setProperty('--color-surface-800', c.bg.card);
    root.style.setProperty('--color-surface-700', c.bg.hover);

    // Accent colors
    root.style.setProperty('--color-accent-purple', c.secondary);
    root.style.setProperty('--color-accent-teal', c.accent);
    root.style.setProperty('--color-accent-green', c.terminal);

    // Fonts
    root.style.setProperty('--font-sans', theme.fonts.sans);
    root.style.setProperty('--font-mono', theme.fonts.mono);

    // Body
    document.body.style.backgroundColor = c.bg.base;
    document.body.style.color = c.text.primary;

    // Grid & glow
    root.style.setProperty('--grid-color', c.grid ?? c.glow);
    root.style.setProperty('--glow-color', c.glow);

    // Scrollbar
    if (c.scrollbar) {
      root.style.setProperty('--color-surface-950', c.scrollbar.track);
    }
  }, []);

  return <>{children}</>;
}
