const glassClasses =
    'supports-[backdrop-filter:blur(0)]:bg-secondary/65! supports-[backdrop-filter:blur(0)]:dark:bg-background/60! backdrop-blur-[calc(var(--spacing)*7)] backdrop-saturate-150 border-foreground/10! [&>.mielui-inset-surface]:bg-card/40! [&>[data-ui=dialog-surface]]:bg-card/40! [&>[data-ui=sheet-surface]]:bg-card/40! [&>[data-ui=toast-content]]:bg-card/40! [&>[data-ui=composer-input]]:bg-card/80! dark:[&>[data-ui=composer-input]]:bg-[color-mix(in_oklab,var(--color-secondary)_85%,var(--color-foreground))]/75! [@media(prefers-reduced-transparency:reduce)]:bg-card! [@media(prefers-reduced-transparency:reduce)]:backdrop-filter-none';
const inheritedGlassClasses =
    '[@container_style(--mielui-surface:glass)]:supports-[backdrop-filter:blur(0)]:bg-secondary/65! [@container_style(--mielui-surface:glass)]:supports-[backdrop-filter:blur(0)]:dark:bg-background/60! [@container_style(--mielui-surface:glass)]:backdrop-blur-[calc(var(--spacing)*7)] [@container_style(--mielui-surface:glass)]:backdrop-saturate-150 [@container_style(--mielui-surface:glass)]:border-foreground/10! [@container_style(--mielui-surface:glass)]:[&>.mielui-inset-surface]:bg-card/40! [@container_style(--mielui-surface:glass)]:[&>[data-ui=dialog-surface]]:bg-card/40! [@container_style(--mielui-surface:glass)]:[&>[data-ui=sheet-surface]]:bg-card/40! [@container_style(--mielui-surface:glass)]:[&>[data-ui=toast-content]]:bg-card/40! [@container_style(--mielui-surface:glass)]:[&>[data-ui=composer-input]]:bg-card/80! [@container_style(--mielui-surface:glass)]:dark:[&>[data-ui=composer-input]]:bg-[color-mix(in_oklab,var(--color-secondary)_85%,var(--color-foreground))]/75! [@container_style(--mielui-surface:glass)]:[@media(prefers-reduced-transparency:reduce)]:bg-card! [@container_style(--mielui-surface:glass)]:[@media(prefers-reduced-transparency:reduce)]:backdrop-filter-none';

export function overlaySurface(surface?: 'solid' | 'glass') {
    if (surface === 'solid') {
        return '';
    }
    return surface === 'glass' ? glassClasses : inheritedGlassClasses;
}
