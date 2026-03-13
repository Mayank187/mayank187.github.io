import type { Variants, Transition } from 'framer-motion';

// ─── Transition Presets ──────────────────────────────────────────────────────
// Reusable timing curves. Change these to adjust the overall feel site-wide.

export const transition = {
  /** Gentle spring — natural feel for entrances */
  spring: { type: 'spring', stiffness: 260, damping: 25 } satisfies Transition,
  /** Bouncy spring — playful micro-interactions */
  bouncy: { type: 'spring', stiffness: 400, damping: 15 } satisfies Transition,
  /** Smooth ease-out — default entrance */
  smooth: { type: 'tween', ease: 'easeOut', duration: 0.5 } satisfies Transition,
  /** Quick ease — micro-interactions, hover feedback */
  quick: { type: 'tween', ease: [0.25, 0.46, 0.45, 0.94], duration: 0.3 } satisfies Transition,
  /** Slow ease — dramatic reveals, gradient lines */
  slow: { type: 'tween', ease: 'easeOut', duration: 0.8 } satisfies Transition,
};

// ─── Viewport Config ─────────────────────────────────────────────────────────
// Shared IntersectionObserver options for whileInView triggers.

export const viewport = { once: true, margin: '-80px' } as const;
export const viewportEarly = { once: true, margin: '-100px' } as const;

// ─── Entrance Variants ──────────────────────────────────────────────────────
// Each variant pair: hidden → visible. Used with whileInView or animate.

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: transition.smooth },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: transition.smooth },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: transition.smooth },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: transition.smooth },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: transition.smooth },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: transition.spring },
};

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: { opacity: 1, filter: 'blur(0px)', transition: transition.smooth },
};

// ─── Stagger Containers ─────────────────────────────────────────────────────
// Wrap children in a stagger container; each child uses an entrance variant.
// The container itself is invisible — it only controls child timing.

export const stagger = (
  staggerDelay = 0.08,
  startDelay = 0,
): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: startDelay,
    },
  },
});

// ─── Combined Variants ──────────────────────────────────────────────────────
// Animate self AND stagger children — great for cards containing lists/tags.

export const fadeUpWithStagger = (staggerDelay = 0.03): Variants => ({
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { ...transition.smooth, staggerChildren: staggerDelay },
  },
});

export const fadeLeftWithStagger = (staggerDelay = 0.03): Variants => ({
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { ...transition.smooth, staggerChildren: staggerDelay },
  },
});

// ─── Hero (page-load entrance, not scroll-triggered) ────────────────────────

export const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

// ─── Hover / Tap (style objects for whileHover & whileTap) ───────────────────
// These are NOT variants — pass them directly to whileHover / whileTap props.

export const hover = {
  /** Lift card upward */
  lift: { y: -5, transition: transition.spring },
  /** Subtle scale increase */
  scale: { scale: 1.04, transition: transition.spring },
  /** Gentle tilt for icons */
  tilt: { rotate: 8, scale: 1.15, transition: transition.bouncy },
  /** Glow shadow for cards */
  glow: {
    boxShadow: '0 0 24px rgba(255,107,53,0.12), 0 8px 32px rgba(0,0,0,0.25)',
    transition: transition.quick,
  },
};

export const tap = {
  /** Press-down for buttons */
  press: { scale: 0.96 },
  /** Lighter press */
  soft: { scale: 0.98 },
};

// ─── Special Effects ────────────────────────────────────────────────────────

/** Gradient line grows from left to right */
export const lineReveal: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.8, ease: 'easeOut', delay: 0.3 },
  },
};

/** Timeline dot springs into view */
export const dotPulse: Variants = {
  hidden: { scale: 0, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: transition.bouncy },
};

/** Tag / badge pop-in */
export const tagPop: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: transition.spring },
};

/** Counter / number slide-up */
export const numberReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 20 },
  },
};

// ─── Modal ──────────────────────────────────────────────────────────────────

export const backdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modal: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { ...transition.spring, staggerChildren: 0.06, delayChildren: 0.1 },
  },
  exit: { opacity: 0, scale: 0.95, y: 16, transition: { duration: 0.2 } },
};

// ─── Navigation ─────────────────────────────────────────────────────────────

export const mobileMenu: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.3, ease: 'easeOut', staggerChildren: 0.04, delayChildren: 0.08 },
  },
  exit: { opacity: 0, height: 0, transition: { duration: 0.25, ease: 'easeIn' } },
};

export const navItem: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: transition.quick },
  exit: { opacity: 0, x: -8 },
};

// ─── Tab Content ────────────────────────────────────────────────────────────

export const tabContent: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, staggerChildren: 0.04 },
  },
  exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
};

// ─── Notification / Toast ───────────────────────────────────────────────────

export const notification: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: transition.spring },
  exit: { opacity: 0, y: -8, scale: 0.95, transition: { duration: 0.2 } },
};
