export const spacingTokenDefinitions = [
    {
        name: '--mielui-space-unit',
        label: 'Base space',
        group: 'Spacing',
        fallback: '3.6px',
        min: 2,
        max: 8,
        step: 0.1
    },
    {
        name: '--mielui-space-1',
        label: 'Space 1',
        group: 'Spacing',
        fallback: 'calc(var(--mielui-space-unit) * 1)',
        min: 0,
        max: 48,
        step: 0.1
    },
    {
        name: '--mielui-space-2',
        label: 'Space 2',
        group: 'Spacing',
        fallback: 'calc(var(--mielui-space-unit) * 2)',
        min: 0,
        max: 48,
        step: 0.1
    },
    {
        name: '--mielui-space-3',
        label: 'Space 3',
        group: 'Spacing',
        fallback: 'calc(var(--mielui-space-unit) * 3)',
        min: 0,
        max: 64,
        step: 0.1
    },
    {
        name: '--mielui-space-4',
        label: 'Space 4',
        group: 'Spacing',
        fallback: 'calc(var(--mielui-space-unit) * 4)',
        min: 0,
        max: 64,
        step: 0.1
    },
    {
        name: '--mielui-space-5',
        label: 'Space 5',
        group: 'Spacing',
        fallback: 'calc(var(--mielui-space-unit) * 5)',
        min: 0,
        max: 80,
        step: 0.1
    },
    {
        name: '--mielui-space-6',
        label: 'Space 6',
        group: 'Spacing',
        fallback: 'calc(var(--mielui-space-unit) * 6)',
        min: 0,
        max: 80,
        step: 0.1
    },
    {
        name: '--mielui-space-8',
        label: 'Space 8',
        group: 'Spacing',
        fallback: 'calc(var(--mielui-space-unit) * 8)',
        min: 0,
        max: 96,
        step: 0.1
    },
    {
        name: '--mielui-space-10',
        label: 'Space 10',
        group: 'Spacing',
        fallback: 'calc(var(--mielui-space-unit) * 10)',
        min: 0,
        max: 96,
        step: 0.1
    },
    {
        name: '--size-control-sm',
        label: 'Small control',
        group: 'Controls',
        fallback: 'var(--mielui-space-8)',
        min: 16,
        max: 64,
        step: 1
    },
    {
        name: '--size-control-md',
        label: 'Medium control',
        group: 'Controls',
        fallback: 'calc(var(--mielui-space-8) + var(--mielui-space-2))',
        min: 16,
        max: 72,
        step: 1
    },
    {
        name: '--size-control-lg',
        label: 'Large control',
        group: 'Controls',
        fallback: 'var(--mielui-space-10)',
        min: 16,
        max: 80,
        step: 1
    },
    {
        name: '--size-icon-md',
        label: 'Icon',
        group: 'Controls',
        fallback: 'var(--mielui-space-8)',
        min: 12,
        max: 48,
        step: 1
    },
    {
        name: '--size-hairline',
        label: 'Hairline',
        group: 'Controls',
        fallback: '2px',
        min: 1,
        max: 4,
        step: 0.5
    },
    {
        name: '--radius-sm',
        label: 'Small radius',
        group: 'Corners',
        fallback: '6px',
        min: 0,
        max: 32,
        step: 1
    },
    {
        name: '--radius-md',
        label: 'Medium radius',
        group: 'Corners',
        fallback: '8px',
        min: 0,
        max: 32,
        step: 1
    },
    {
        name: '--radius-lg',
        label: 'Large radius',
        group: 'Corners',
        fallback: '10px',
        min: 0,
        max: 40,
        step: 1
    },
    {
        name: '--radius-xl',
        label: 'XL radius',
        group: 'Corners',
        fallback: '14px',
        min: 0,
        max: 48,
        step: 1
    },
    {
        name: '--border-size',
        label: 'Border width',
        group: 'Stroke',
        fallback: '1px',
        min: 0,
        max: 4,
        step: 1
    }
] as const;

export type SpacingTokenName = (typeof spacingTokenDefinitions)[number]['name'];
export type SpacingTokenDefinition = (typeof spacingTokenDefinitions)[number];
