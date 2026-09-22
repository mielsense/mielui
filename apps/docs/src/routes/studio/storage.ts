export function readStudioStorage(key: string): string | null {
    try {
        return localStorage.getItem(key);
    } catch {
        return null;
    }
}

export function writeStudioStorage(key: string, value: string) {
    try {
        localStorage.setItem(key, value);
    } catch {
        return;
    }
}

export function removeStudioStorage(key: string) {
    try {
        localStorage.removeItem(key);
    } catch {
        return;
    }
}
