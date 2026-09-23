export const easingOptions = [
    {
        label: 'Ease out',
        value: 'cubic-bezier(0.23, 1, 0.32, 1)'
    },
    {
        label: 'Press',
        value: 'cubic-bezier(0.22, 1, 0.36, 1)'
    },
    {
        label: 'Ease in',
        value: 'cubic-bezier(0.55, 0, 1, 0.45)'
    },
    {
        label: 'Ease in-out',
        value: 'cubic-bezier(0.77, 0, 0.175, 1)'
    },
    {
        label: 'Standard',
        value: 'cubic-bezier(0.4, 0, 0.2, 1)'
    },
    {
        label: 'Decelerate',
        value: 'cubic-bezier(0, 0, 0.2, 1)'
    },
    {
        label: 'Accelerate',
        value: 'cubic-bezier(0.4, 0, 1, 1)'
    },
    {
        label: 'Snappy',
        value: 'cubic-bezier(0.16, 1, 0.3, 1)'
    },
    {
        label: 'Soft',
        value: 'cubic-bezier(0.33, 1, 0.68, 1)'
    },
    {
        label: 'Emphasized',
        value: 'cubic-bezier(0.2, 0, 0, 1)'
    },
    {
        label: 'Linear',
        value: 'linear'
    }
] as const;

export const animationTokenDefinitions = [
    {
        name: '--motion-duration-hover',
        label: 'Hover',
        group: 'Speed',
        fallback: '120ms',
        kind: 'duration',
        min: 0,
        max: 600,
        step: 10
    },
    {
        name: '--motion-duration-menu',
        label: 'Menu',
        group: 'Speed',
        fallback: '40ms',
        kind: 'duration',
        min: 0,
        max: 600,
        step: 10
    },
    {
        name: '--motion-duration-panel',
        label: 'Panel',
        group: 'Speed',
        fallback: '180ms',
        kind: 'duration',
        min: 0,
        max: 600,
        step: 10
    },
    {
        name: '--motion-duration-sheet',
        label: 'Sheet',
        group: 'Speed',
        fallback: '320ms',
        kind: 'duration',
        min: 0,
        max: 600,
        step: 10
    },
    {
        name: '--motion-duration-sheet-out',
        label: 'Sheet close',
        group: 'Speed',
        fallback: '220ms',
        kind: 'duration',
        min: 0,
        max: 600,
        step: 10
    },
    {
        name: '--motion-duration-overlay',
        label: 'Overlay',
        group: 'Speed',
        fallback: '120ms',
        kind: 'duration',
        min: 0,
        max: 600,
        step: 10
    },
    {
        name: '--motion-duration-toast-in',
        label: 'Toast in',
        group: 'Speed',
        fallback: '320ms',
        kind: 'duration',
        min: 0,
        max: 600,
        step: 10
    },
    {
        name: '--motion-duration-toast-out',
        label: 'Toast out',
        group: 'Speed',
        fallback: '240ms',
        kind: 'duration',
        min: 0,
        max: 600,
        step: 10
    },
    {
        name: '--motion-duration-panel-in',
        label: 'Panel open',
        group: 'Speed',
        fallback: '110ms',
        kind: 'duration',
        min: 0,
        max: 600,
        step: 10
    },
    {
        name: '--motion-duration-panel-out',
        label: 'Panel close',
        group: 'Speed',
        fallback: '150ms',
        kind: 'duration',
        min: 0,
        max: 600,
        step: 10
    },
    {
        name: '--motion-duration-modal-in',
        label: 'Dialog open',
        group: 'Speed',
        fallback: '180ms',
        kind: 'duration',
        min: 0,
        max: 600,
        step: 10
    },
    {
        name: '--motion-duration-modal-out',
        label: 'Dialog close',
        group: 'Speed',
        fallback: '110ms',
        kind: 'duration',
        min: 0,
        max: 600,
        step: 10
    },
    {
        name: '--motion-duration-press',
        label: 'Press duration',
        group: 'Speed',
        fallback: '160ms',
        kind: 'duration',
        min: 0,
        max: 600,
        step: 10
    },
    {
        name: '--motion-duration-item',
        label: 'Item',
        group: 'Speed',
        fallback: '160ms',
        kind: 'duration',
        min: 0,
        max: 600,
        step: 10
    },
    {
        name: '--motion-panel-y',
        label: 'Panel offset',
        group: 'Movement',
        fallback: '2px',
        kind: 'length',
        min: 0,
        max: 16,
        step: 1
    },
    {
        name: '--motion-panel-scale-start',
        label: 'Start scale',
        group: 'Movement',
        fallback: '0.97',
        kind: 'scale',
        min: 0.8,
        max: 1,
        step: 0.01
    },
    {
        name: '--motion-menu-y',
        label: 'Menu offset',
        group: 'Movement',
        fallback: '2px',
        kind: 'length',
        min: 0,
        max: 16,
        step: 1
    },
    {
        name: '--motion-menu-scale-start',
        label: 'Menu start scale',
        group: 'Movement',
        fallback: '0.97',
        kind: 'scale',
        min: 0.8,
        max: 1,
        step: 0.01
    },
    {
        name: '--motion-menu-blur',
        label: 'Menu blur',
        group: 'Movement',
        fallback: '2px',
        kind: 'length',
        min: 0,
        max: 12,
        step: 1
    },
    {
        name: '--motion-modal-y',
        label: 'Dialog offset',
        group: 'Movement',
        fallback: '4px',
        kind: 'length',
        min: 0,
        max: 24,
        step: 1
    },
    {
        name: '--motion-modal-scale-start',
        label: 'Dialog start scale',
        group: 'Movement',
        fallback: '0.93',
        kind: 'scale',
        min: 0.8,
        max: 1,
        step: 0.01
    },
    {
        name: '--motion-modal-blur',
        label: 'Dialog blur',
        group: 'Movement',
        fallback: '2px',
        kind: 'length',
        min: 0,
        max: 12,
        step: 1
    },
    {
        name: '--motion-opacity-start',
        label: 'Movement opacity',
        group: 'Movement',
        fallback: '0',
        kind: 'opacity',
        min: 0,
        max: 1,
        step: 0.05
    },
    {
        name: '--motion-press-px',
        label: 'Press distance',
        group: 'Movement',
        fallback: '2px',
        kind: 'length',
        min: 0,
        max: 12,
        step: 1
    },
    {
        name: '--ease-out',
        label: 'Ease out',
        group: 'Easing',
        fallback: 'cubic-bezier(0.23, 1, 0.32, 1)',
        kind: 'ease'
    },
    {
        name: '--ease-press',
        label: 'Press ease',
        group: 'Easing',
        fallback: 'cubic-bezier(0.22, 1, 0.36, 1)',
        kind: 'ease'
    },
    {
        name: '--ease-in-out',
        label: 'Ease in-out',
        group: 'Easing',
        fallback: 'cubic-bezier(0.77, 0, 0.175, 1)',
        kind: 'ease'
    }
] as const;

export type AnimationTokenName = (typeof animationTokenDefinitions)[number]['name'];
export type AnimationTokenDefinition = (typeof animationTokenDefinitions)[number];
