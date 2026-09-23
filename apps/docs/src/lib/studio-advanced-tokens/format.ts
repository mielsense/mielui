import { easingOptions } from './animation';

export function formatPx(value: number): string {
    const rounded = Math.round(value * 10) / 10;
    return `${rounded}px`;
}

export function formatMs(value: number): string {
    return `${Math.round(value)}ms`;
}

export function formatScale(value: number): string {
    return String(Math.round(value * 100) / 100);
}

export function parseDurationMs(value: string): number {
    const trimmed = value.trim().toLowerCase();
    if (!trimmed) {
        return 0;
    }

    const parsed = Number.parseFloat(trimmed);
    if (!Number.isFinite(parsed)) {
        return 0;
    }

    if (trimmed.endsWith('ms')) {
        return parsed;
    }

    if (trimmed.endsWith('s')) {
        return parsed * 1000;
    }

    return parsed;
}

export function parseScale(value: string): number {
    const parsed = Number.parseFloat(value.trim());
    if (!Number.isFinite(parsed)) {
        return 1;
    }

    return parsed;
}

export function normalizeEase(value: string): string {
    return value.trim().toLowerCase().replace(/\s+/g, '');
}

export function matchingEase(value: string): string {
    const normalized = normalizeEase(value);
    const match = easingOptions.find((option) => normalizeEase(option.value) === normalized);
    if (match) {
        return match.value;
    }

    return value.trim();
}
