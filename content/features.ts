/**
 * Feature flags for unfinished / unconfirmed club content.
 * Flip to true only after real data lands (see CONTENT_TODO.md).
 */
export const FEATURES = {
  /** Real trainer names + photos required before showing this surface */
  trainers: false,
} as const;

export type FeatureFlag = keyof typeof FEATURES;
