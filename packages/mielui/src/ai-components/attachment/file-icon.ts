import {
    Doc01Icon,
    File01Icon,
    Image01Icon,
    MusicNote01Icon,
    Pdf01Icon,
    Ppt01Icon,
    SourceCodeIcon,
    Video01Icon,
    Xls01Icon,
    Zip01Icon
} from '@hugeicons/core-free-icons';

type FileIcon = typeof File01Icon;

const extensionIcons: ReadonlyArray<readonly [FileIcon, ReadonlySet<string>]> = [
    [Pdf01Icon, new Set(['pdf'])],
    [Xls01Icon, new Set(['csv', 'numbers', 'ods', 'tsv', 'xls', 'xlsx'])],
    [Doc01Icon, new Set(['doc', 'docx', 'odt', 'pages', 'rtf'])],
    [Ppt01Icon, new Set(['key', 'odp', 'ppt', 'pptx'])],
    [Zip01Icon, new Set(['7z', 'gz', 'rar', 'tar', 'tgz', 'zip'])],
    [
        SourceCodeIcon,
        new Set([
            'css',
            'go',
            'html',
            'js',
            'json',
            'jsx',
            'py',
            'rs',
            'svelte',
            'ts',
            'tsx',
            'yaml',
            'yml'
        ])
    ]
];

export function fileExtension(file: File) {
    const dot = file.name.lastIndexOf('.');

    if (dot <= 0 || dot === file.name.length - 1) {
        return '';
    }

    return file.name.slice(dot + 1).toLowerCase();
}

export function fileIcon(file: File): FileIcon {
    if (file.type.startsWith('image/')) {
        return Image01Icon;
    }
    if (file.type.startsWith('video/')) {
        return Video01Icon;
    }
    if (file.type.startsWith('audio/')) {
        return MusicNote01Icon;
    }

    const extension = fileExtension(file);
    const match = extensionIcons.find(([, extensions]) => extensions.has(extension));

    return match ? match[0] : File01Icon;
}
