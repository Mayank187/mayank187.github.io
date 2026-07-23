// Verified, defensible proof signals for the strip below the hero. Each is
// something Mayank personally owned, with a real number. Attribution labels
// keep it honest (no team/system metric is dressed up as sole ownership).

export interface ProofSignal {
  /** Small attribution/context label. */
  attribution: string;
  /** Headline value — static, immediately readable. */
  value: string;
  /** One-line context. */
  caption: string;
  /** Anchor to the relevant case study. */
  href: string;
}

export const proofSignals: ProofSignal[] = [
  {
    attribution: 'Owned component',
    value: '>0.90 F1 · 0.99 precision',
    caption: 'OOD query classifier · ~10 ms CPU inference — Samsung search',
    href: '#projects',
  },
  {
    attribution: 'Owned end-to-end',
    value: '100–150 RPS · ~600 ms P90',
    caption: 'Live production question API · ~1.5M records — Springer Nature',
    href: '#projects',
  },
  {
    attribution: 'Owned models',
    value: 'Detection mAP >0.60',
    caption: 'Detection & segmentation over 2M+ images — Camcom',
    href: '#projects',
  },
  {
    attribution: 'Owned framework',
    value: 'Multi-paper evaluation',
    caption: 'Retrieval · grounding · relevance · citation dimensions — Springer Nature',
    href: '#projects',
  },
];
