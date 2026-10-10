const glassClasses =
    'supports-[backdrop-filter:blur(0)]:bg-card/70! supports-[backdrop-filter:blur(0)]:dark:bg-card/60! backdrop-blur-[calc(var(--spacing)*7)] backdrop-saturate-150 border-border! [&:not(.mielui-float-frame)>.mielui-inset-surface]:bg-background/80! dark:[&:not(.mielui-float-frame)>.mielui-inset-surface]:bg-background/60! [&>[data-ui=dialog-surface]]:bg-background/80! dark:[&>[data-ui=dialog-surface]]:bg-background/60! [&>[data-ui=composer-toolbar]]:[--composer-toolbar-overlap-scale:0] [&>:is([data-ui=composer-input],[data-ui=composer-toolbar][data-variant=default])]:bg-card/80! dark:[&>:is([data-ui=composer-input],[data-ui=composer-toolbar][data-variant=default])]:bg-[color-mix(in_oklab,var(--color-secondary)_95%,var(--color-foreground))]/60! [@media(prefers-reduced-transparency:reduce)]:bg-card! [@media(prefers-reduced-transparency:reduce)]:backdrop-filter-none';
const inheritedGlassClasses =
    '[@container_style(--mielui-surface:glass)]:supports-[backdrop-filter:blur(0)]:bg-card/70! [@container_style(--mielui-surface:glass)]:supports-[backdrop-filter:blur(0)]:dark:bg-card/60! [@container_style(--mielui-surface:glass)]:backdrop-blur-[calc(var(--spacing)*7)] [@container_style(--mielui-surface:glass)]:backdrop-saturate-150 [@container_style(--mielui-surface:glass)]:border-border! [@container_style(--mielui-surface:glass)]:[&:not(.mielui-float-frame)>.mielui-inset-surface]:bg-background/80! [@container_style(--mielui-surface:glass)]:dark:[&:not(.mielui-float-frame)>.mielui-inset-surface]:bg-background/60! [@container_style(--mielui-surface:glass)]:[&>[data-ui=dialog-surface]]:bg-background/80! [@container_style(--mielui-surface:glass)]:dark:[&>[data-ui=dialog-surface]]:bg-background/60! [@container_style(--mielui-surface:glass)]:[&>[data-ui=composer-toolbar]]:[--composer-toolbar-overlap-scale:0] [@container_style(--mielui-surface:glass)]:[&>:is([data-ui=composer-input],[data-ui=composer-toolbar][data-variant=default])]:bg-card/80! [@container_style(--mielui-surface:glass)]:dark:[&>:is([data-ui=composer-input],[data-ui=composer-toolbar][data-variant=default])]:bg-[color-mix(in_oklab,var(--color-secondary)_95%,var(--color-foreground))]/60! [@container_style(--mielui-surface:glass)]:[@media(prefers-reduced-transparency:reduce)]:bg-card! [@container_style(--mielui-surface:glass)]:[@media(prefers-reduced-transparency:reduce)]:backdrop-filter-none';

/**
 * Glass frosts the white frame and keeps content on a translucent inset in the
 * stage color. One-layer float frames frost as a single panel.
 */
export function overlaySurface(surface?: 'solid' | 'glass') {
    if (surface === 'solid') {
        return '';
    }
    return surface === 'glass' ? glassClasses : inheritedGlassClasses;
}

const tooltipGlassClasses =
    'supports-[backdrop-filter:blur(0)]:bg-[color-mix(in_oklab,var(--color-tooltip)_86%,transparent)] backdrop-blur-[calc(var(--spacing)*7)] backdrop-saturate-150 [@media(prefers-reduced-transparency:reduce)]:bg-[var(--color-tooltip)] [@media(prefers-reduced-transparency:reduce)]:backdrop-filter-none';
const inheritedTooltipGlassClasses =
    '[@container_style(--mielui-surface:glass)]:supports-[backdrop-filter:blur(0)]:bg-[color-mix(in_oklab,var(--color-tooltip)_86%,transparent)] [@container_style(--mielui-surface:glass)]:backdrop-blur-[calc(var(--spacing)*7)] [@container_style(--mielui-surface:glass)]:backdrop-saturate-150 [@container_style(--mielui-surface:glass)]:[@media(prefers-reduced-transparency:reduce)]:bg-[var(--color-tooltip)] [@container_style(--mielui-surface:glass)]:[@media(prefers-reduced-transparency:reduce)]:backdrop-filter-none';

export function tooltipSurface(surface?: 'solid' | 'glass') {
    if (surface === 'solid') {
        return '';
    }

    return surface === 'glass' ? tooltipGlassClasses : inheritedTooltipGlassClasses;
}
