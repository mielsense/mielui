export function overlaySurface(surface: 'solid' | 'glass') {
    return surface === 'glass'
        ? 'supports-[backdrop-filter:blur(1px)]:bg-card/75! supports-[backdrop-filter:blur(1px)]:dark:bg-card/60! backdrop-blur-[28px] backdrop-saturate-150 border-foreground/10! [&>.mielui-inset-surface]:bg-background/55! [&>[data-ui=dialog-surface]]:bg-background/55! [&>[data-ui=sheet-surface]]:bg-background/55! [&>[data-ui=toast-content]]:bg-background/55! [@media(prefers-reduced-transparency:reduce)]:bg-card! [@media(prefers-reduced-transparency:reduce)]:backdrop-filter-none'
        : '';
}
