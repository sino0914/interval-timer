export const STORAGE_KEYS = {
  HAS_LOGGED_IN: 'user.hasLoggedIn',
  GUIDE_CHOICE: 'user.guideChoice',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

