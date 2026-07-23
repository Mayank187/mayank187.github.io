// Single source of truth for years of experience, so nothing drifts out of date.
// Career start: June 2019 (month index 5).
export const CAREER_START = new Date(2019, 5, 1);

/** Fractional years of experience since CAREER_START. */
export function yearsOfExperience(now: Date = new Date()): number {
  const ms = now.getTime() - CAREER_START.getTime();
  return ms / (1000 * 60 * 60 * 24 * 365.25);
}

/** Whole years, rounded down (e.g. 7.1 → 7). */
export function wholeYearsOfExperience(now: Date = new Date()): number {
  return Math.floor(yearsOfExperience(now));
}

/** Display label, e.g. "7+ years". */
export function yearsLabel(now: Date = new Date()): string {
  return `${wholeYearsOfExperience(now)}+ years`;
}
