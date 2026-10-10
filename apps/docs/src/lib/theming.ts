export const overrideCss = `@theme {
  --color-primary: #155eef;
  --color-background: #fcfcfd;
  --color-foreground: #101828;
  --radius-control: 9999px;
  --font-sans: 'DM Sans', sans-serif;
}

.dark {
  --color-background: #0d1118;
  --color-foreground: #f5f7fb;
  --color-primary: #7aa2ff;
}`;

export const themeImport = `@import './lib/mielui/ui.css';
@import './lib/mielui/theme.css';`;

export const classExample = '<Button class="w-full rounded-2xl">Continue</Button>';

export const dataUiExample = `[data-ui='button'][data-variant='primary'] {
  border-radius: var(--radius-md);
}

[data-ui='badge'][data-variant='secondary'] {
  text-transform: uppercase;
}`;

export const sourceExample = `# after: pnpm dlx @mielui/svelte add button
src/lib/mielui/components/button/
├── button.svelte
└── index.ts`;

export const tokenGroups = [
    {
        group: 'Color',
        tokens: [
            '--color-background',
            '--color-card',
            '--color-panel',
            '--color-secondary',
            '--color-foreground',
            '--color-foreground-muted',
            '--color-primary',
            '--color-on-primary',
            '--color-button-foreground',
            '--color-border',
            '--color-input',
            '--color-ring'
        ]
    },
    {
        group: 'Status text',
        tokens: [
            '--mielui-success-text',
            '--mielui-warning-text',
            '--mielui-error-text',
            '--mielui-info-text'
        ]
    },
    {
        group: 'Controls',
        tokens: [
            '--size-control-sm',
            '--size-control-md',
            '--size-control-lg',
            '--size-icon-md',
            '--mielui-control-border',
            '--focus-ring'
        ]
    },
    {
        group: 'Type',
        tokens: [
            '--font-sans',
            '--font-mono',
            '--font-header',
            '--font-size-header',
            '--font-weight-body',
            '--font-weight-label',
            '--font-weight-button'
        ]
    },
    {
        group: 'Radius and density',
        tokens: [
            '--radius-sm',
            '--radius-md',
            '--radius-lg',
            '--radius-xl',
            '--radius-2xl',
            '--radius-control',
            '--mielui-space-unit'
        ]
    },
    {
        group: 'Motion',
        tokens: [
            '--motion-duration-hover',
            '--motion-duration-menu',
            '--motion-duration-panel',
            '--motion-duration-sheet'
        ]
    },
    {
        group: 'Elevation',
        tokens: [
            '--elevation-1',
            '--elevation-float',
            '--elevation-control',
            '--elevation-control-edge',
            '--elevation-modal'
        ]
    }
];

export const themeJsonFields = [
    "`foundation.light` and `foundation.dark` hold each mode's base, border, background, secondary, foreground, foregroundMuted, and onPrimary colors.",
    '`typography` contains headerSize, headerWeight, and roleWeights for body, label, button, badge, and description text.',
    '`tokens.shared`, `tokens.light`, and `tokens.dark` hold raw token overrides, including per-mode values for `--color-primary`.',
    '`chrome` controls borders, edgeHighlight, surfaceShadows, controlShadows, dialogShadows, travelingHighlight, primaryStroke, and interactiveCursor. Turning off travelingHighlight keeps the selected fill and removes its movement.'
];
