const glassClasses =
    'supports-[backdrop-filter:blur(0)]:bg-card/75! supports-[backdrop-filter:blur(0)]:dark:bg-card/60! backdrop-blur-[calc(var(--spacing)*7)] backdrop-saturate-150 border-foreground/10! [&>.mielui-inset-surface]:bg-background/55! [&>[data-ui=dialog-surface]]:bg-background/55! [&>[data-ui=sheet-surface]]:bg-background/55! [&>[data-ui=toast-content]]:bg-background/55! [@media(prefers-reduced-transparency:reduce)]:bg-card! [@media(prefers-reduced-transparency:reduce)]:backdrop-filter-none';
const inheritedGlassClasses =
    '[@container_style(--mielui-surface:glass)]:supports-[backdrop-filter:blur(0)]:bg-card/75! [@container_style(--mielui-surface:glass)]:supports-[backdrop-filter:blur(0)]:dark:bg-card/60! [@container_style(--mielui-surface:glass)]:backdrop-blur-[calc(var(--spacing)*7)] [@container_style(--mielui-surface:glass)]:backdrop-saturate-150 [@container_style(--mielui-surface:glass)]:border-foreground/10! [@container_style(--mielui-surface:glass)]:[&>.mielui-inset-surface]:bg-background/55! [@container_style(--mielui-surface:glass)]:[&>[data-ui=dialog-surface]]:bg-background/55! [@container_style(--mielui-surface:glass)]:[&>[data-ui=sheet-surface]]:bg-background/55! [@container_style(--mielui-surface:glass)]:[&>[data-ui=toast-content]]:bg-background/55! [@container_style(--mielui-surface:glass)]:[@media(prefers-reduced-transparency:reduce)]:bg-card! [@container_style(--mielui-surface:glass)]:[@media(prefers-reduced-transparency:reduce)]:backdrop-filter-none';

export function overlaySurface(surface?: 'solid' | 'glass') {
    if (surface === 'solid') {
        return '';
    }
    return surface === 'glass' ? glassClasses : inheritedGlassClasses;
}
