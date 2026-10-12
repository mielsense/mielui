/** `localStorage` access that never throws: private windows and blocked storage read as empty. */
export function readStorage(key: string): string | null {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

export function writeStorage(key: string, value: string) {
    try {
        localStorage.setItem(key, value);
    } catch {
        return;
    }
}

export function removeStorage(key: string) {
    try {
        localStorage.removeItem(key);
    } catch {
        return;
    }
}
