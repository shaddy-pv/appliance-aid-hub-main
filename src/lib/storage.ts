const STORAGE_PREFIX = "aahub";

function buildKey(key: string): string {
  return `${STORAGE_PREFIX}:${key}`;
}

export function readFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(buildKey(key));
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeToStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(buildKey(key), JSON.stringify(value));
  } catch {
    // no-op
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(buildKey(key));
  } catch {
    // no-op
  }
}


