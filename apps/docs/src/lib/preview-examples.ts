export const previewExamples = [
    'notch/hero',
    'notch/peek',
    'notch/activity',
    'notch/glass',
    'toast/notch',
    'toast/hero',
    'toast/actions',
    'toast/all-types',
    'toast/composition',
    'toast/glass',
    'toast/promise'
] as const;

export type PreviewExample = (typeof previewExamples)[number];
