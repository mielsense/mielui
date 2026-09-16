import type { AttachmentRejection } from '.';

function fileKey(file: File) {
    return `${file.name}\u0000${file.size}\u0000${file.lastModified}`;
}

export function formatBytes(bytes: number) {
    if (bytes < 1024) {
        return `${bytes} B`;
    }
    const units = ['KB', 'MB', 'GB', 'TB'];
    let value = bytes / 1024;
    let unit = 0;
    while (value >= 1024 && unit < units.length - 1) {
        value /= 1024;
        unit += 1;
    }
    return `${value < 10 ? value.toFixed(1) : Math.round(value)} ${units[unit]}`;
}

function acceptsFile(file: File, accept?: string) {
    const rules = accept
        ?.split(',')
        .map((rule) => rule.trim().toLowerCase())
        .filter(Boolean);
    if (!rules?.length) {
        return true;
    }

    const name = file.name.toLowerCase();
    const type = file.type.toLowerCase();
    return rules.some((rule) => {
        if (rule.startsWith('.')) {
            return name.endsWith(rule);
        }
        if (rule.endsWith('/*')) {
            return type.startsWith(rule.slice(0, -1));
        }
        return type === rule;
    });
}

export function validateFiles(
    incoming: Iterable<File>,
    files: readonly File[],
    {
        accept,
        multiple,
        maxFiles,
        maxSize
    }: {
        accept?: string;
        multiple: boolean;
        maxFiles?: number;
        maxSize?: number;
    }
) {
    const accepted: File[] = [];
    const rejections: AttachmentRejection[] = [];
    const keys = new Set(files.map(fileKey));
    const limit = Math.max(0, Math.min(multiple ? Infinity : 1, maxFiles ?? Infinity));

    for (const file of incoming) {
        const key = fileKey(file);
        if (keys.has(key)) {
            rejections.push({
                file,
                code: 'duplicate-file',
                reason: 'A file with the same name, size, and modified date is already attached.'
            });
            continue;
        }
        if (!acceptsFile(file, accept)) {
            rejections.push({
                file,
                code: 'file-invalid-type',
                reason: `This file type is not accepted${accept ? ` (${accept})` : ''}.`
            });
            continue;
        }
        if (maxSize !== undefined && file.size > maxSize) {
            rejections.push({
                file,
                code: 'file-too-large',
                reason: `This file is larger than the ${formatBytes(maxSize)} limit.`
            });
            continue;
        }
        if (files.length + accepted.length >= limit) {
            rejections.push({
                file,
                code: 'too-many-files',
                reason: `Only ${limit} ${limit === 1 ? 'attachment is' : 'attachments are'} allowed.`
            });
            continue;
        }

        keys.add(key);
        accepted.push(file);
    }

    return { accepted, rejections };
}
