import type { MarkdownTableCell } from './_types';

/** U+0000 to U+0020 (C0 controls and space), negated because Biome rejects control escapes in `.ts` regexes. */
const CONTROL_OR_SPACE = /[^\u0021-\uFFFF]/g;

export function safeUrl(value?: string) {
    const url = value?.trim();
    if (!url) {
        return undefined;
    }

    const compact = url.replace(CONTROL_OR_SPACE, '');
    const scheme = compact.match(/^([a-z][a-z\d+.-]*):/i)?.[1]?.toLowerCase();
    if (scheme && scheme !== 'http' && scheme !== 'https' && scheme !== 'mailto') {
        return undefined;
    }

    return url;
}

export function isExternalUrl(value: string) {
    return /^(?:https?:|\/\/)/i.test(value.replace(CONTROL_OR_SPACE, ''));
}

export function safeImageUrl(value?: string) {
    const url = safeUrl(value);
    if (!url) {
        return undefined;
    }
    try {
        const base = new URL('https://mielui.invalid/');
        return new URL(url, base).origin === base.origin ? url : undefined;
    } catch {
        return undefined;
    }
}

export function codeLanguage(value?: string) {
    return value?.trim().split(/\s+/, 1)[0] || undefined;
}

export function listStart(value?: number | string) {
    const start = typeof value === 'number' ? value : Number.parseInt(value ?? '', 10);
    return Number.isFinite(start) ? start : undefined;
}

export function cellTokens(cell: MarkdownTableCell) {
    return cell.tokens ?? [{ type: 'text', text: cell.text ?? '' }];
}

export function alignmentClass(alignment?: 'center' | 'left' | 'right' | null) {
    if (alignment === 'center') {
        return 'text-center';
    }
    if (alignment === 'right') {
        return 'text-right';
    }
    if (alignment === 'left') {
        return 'text-left';
    }
    return 'text-start';
}
