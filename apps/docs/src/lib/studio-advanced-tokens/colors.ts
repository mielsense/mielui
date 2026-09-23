export const colorTokenDefinitions = [
    {
        name: '--mielui-neutral-0',
        label: 'Neutral 0',
        group: 'Palette',
        fallback: 'hsl(0 0% 100%)',
        darkFallback: 'hsl(0 0% 5%)'
    },
    {
        name: '--mielui-neutral-10',
        label: 'Neutral 10',
        group: 'Palette',
        fallback: 'hsl(60 11.1% 99.2%)'
    },
    {
        name: '--mielui-neutral-50',
        label: 'Neutral 50',
        group: 'Palette',
        fallback: 'hsl(60 11.1% 96.5%)',
        darkFallback: 'hsl(0 0% 10%)'
    },
    {
        name: '--mielui-neutral-100',
        label: 'Neutral 100',
        group: 'Palette',
        fallback: 'hsl(60 6.2% 93.7%)',
        darkFallback: 'hsl(0 0% 13%)'
    },
    {
        name: '--mielui-neutral-150',
        label: 'Neutral 150',
        group: 'Palette',
        fallback: 'hsl(60 4.2% 90.6%)',
        darkFallback: 'hsl(0 0% 15.7%)'
    },
    {
        name: '--mielui-neutral-300',
        label: 'Neutral 300',
        group: 'Palette',
        fallback: 'hsl(60 4.4% 82.4%)',
        darkFallback: 'hsl(0 0% 22.7%)'
    },
    {
        name: '--mielui-neutral-500',
        label: 'Neutral 500',
        group: 'Palette',
        fallback: 'hsl(60 3% 41.5%)',
        darkFallback: 'hsl(0 0% 65%)'
    },
    {
        name: '--mielui-neutral-900',
        label: 'Neutral 900',
        group: 'Palette',
        fallback: 'hsl(60 5.7% 10.4%)',
        darkFallback: 'hsl(0 0% 93%)'
    },
    {
        name: '--mielui-blue-50',
        label: 'Blue 50',
        group: 'Palette',
        fallback: 'hsl(218.8 100% 96.7%)',
        darkFallback: 'hsl(217.1 52.5% 15.7%)'
    },
    {
        name: '--mielui-blue-500',
        label: 'Blue 500',
        group: 'Palette',
        fallback: 'hsl(212.2 100% 64.5%)',
        darkFallback: 'hsl(216.6 100% 67.8%)'
    },
    {
        name: '--mielui-success',
        label: 'Success',
        group: 'Palette',
        fallback: 'hsl(148.7 42.2% 42.7%)',
        darkFallback: 'hsl(149.7 39.4% 49.2%)'
    },
    {
        name: '--mielui-warning',
        label: 'Warning',
        group: 'Palette',
        fallback: 'hsl(36.1 64.8% 47.8%)',
        darkFallback: 'hsl(37.3 72.6% 55.7%)'
    },
    {
        name: '--mielui-error',
        label: 'Error',
        group: 'Palette',
        fallback: 'hsl(0 57.7% 56.5%)',
        darkFallback: 'hsl(0 66.7% 63.5%)'
    },
    {
        name: '--color-background',
        label: 'Background',
        group: 'Surfaces',
        fallback: 'var(--mielui-neutral-10)',
        darkFallback: 'hsl(0 0% 4%)'
    },
    {
        name: '--color-card',
        label: 'Card',
        group: 'Surfaces',
        fallback: 'var(--mielui-neutral-0)',
        darkFallback: 'hsl(0 0% 9%)'
    },
    {
        name: '--color-panel',
        label: 'Panel',
        group: 'Surfaces',
        fallback: 'var(--mielui-neutral-0)',
        darkFallback: 'hsl(0 0% 11.5%)'
    },
    {
        name: '--color-secondary',
        label: 'Secondary',
        group: 'Surfaces',
        fallback: 'var(--mielui-neutral-100)',
        darkFallback: 'hsl(0 0% 14.5%)'
    },
    {
        name: '--color-field',
        label: 'Field',
        group: 'Surfaces',
        fallback: 'var(--color-card)',
        darkFallback: 'var(--color-secondary)'
    },
    {
        name: '--color-field-hover',
        label: 'Field hover',
        group: 'Surfaces',
        fallback: 'var(--color-secondary)',
        darkFallback: 'var(--color-secondary)'
    },
    {
        name: '--color-field-foreground',
        label: 'Field text',
        group: 'Surfaces',
        fallback: 'var(--color-foreground)'
    },
    {
        name: '--color-foreground',
        label: 'Text',
        group: 'Text',
        fallback: 'var(--mielui-neutral-900)'
    },
    {
        name: '--color-foreground-muted',
        label: 'Muted text',
        group: 'Text',
        fallback: 'var(--mielui-neutral-500)'
    },
    {
        name: '--color-button-foreground',
        label: 'Button text',
        group: 'Text',
        fallback: 'var(--color-foreground)'
    },
    {
        name: '--color-tooltip',
        label: 'Tooltip',
        group: 'Text',
        fallback: 'var(--mielui-neutral-900)'
    },
    {
        name: '--color-tooltip-foreground',
        label: 'Tooltip text',
        group: 'Text',
        fallback: 'var(--mielui-neutral-0)'
    },
    {
        name: '--color-primary',
        label: 'Brand',
        group: 'Brand',
        fallback: '#1e78e6'
    },
    {
        name: '--color-primary-hover',
        label: 'Brand hover',
        group: 'Brand',
        fallback: 'color-mix(in srgb, var(--color-primary) 78%, black)'
    },
    {
        name: '--color-on-primary',
        label: 'On brand',
        group: 'Brand',
        fallback: 'hsl(0 0% 100%)'
    },
    {
        name: '--color-accent-tint',
        label: 'Tint',
        group: 'Brand',
        fallback: 'var(--mielui-blue-50)'
    },
    {
        name: '--color-ring',
        label: 'Focus ring',
        group: 'Brand',
        fallback: 'color-mix(in srgb, var(--color-primary) 30%, transparent)'
    },
    {
        name: '--color-border',
        label: 'Border',
        group: 'Borders',
        fallback: 'var(--mielui-neutral-150)',
        darkFallback: 'hsl(0 0% 16.5%)'
    },
    {
        name: '--color-border-strong',
        label: 'Strong border',
        group: 'Borders',
        fallback: 'var(--mielui-neutral-300)',
        darkFallback: 'hsl(0 0% 26%)'
    },
    {
        name: '--color-input',
        label: 'Input',
        group: 'Borders',
        fallback: 'var(--mielui-neutral-300)',
        darkFallback: 'hsl(0 0% 24%)'
    },
    {
        name: '--color-success',
        label: 'Success',
        group: 'Status',
        fallback: 'var(--mielui-success)'
    },
    {
        name: '--color-warning',
        label: 'Warning',
        group: 'Status',
        fallback: 'var(--mielui-warning)'
    },
    {
        name: '--color-error',
        label: 'Error',
        group: 'Status',
        fallback: 'var(--mielui-error)'
    },
    {
        name: '--color-info',
        label: 'Info',
        group: 'Status',
        fallback: 'var(--mielui-blue-500)'
    },
    {
        name: '--color-overlay',
        label: 'Overlay',
        group: 'Status',
        fallback: 'rgb(0 0 0 / 0.18)',
        darkFallback: 'rgb(0 0 0 / 0.55)'
    }
] as const;

export type ColorTokenName = (typeof colorTokenDefinitions)[number]['name'];
export type ColorTokenDefinition = (typeof colorTokenDefinitions)[number];
