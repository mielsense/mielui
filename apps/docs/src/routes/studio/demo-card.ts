/**
 * With glass surfaces on, the card frame turns frosted while the inner surface
 * stays solid. The frame shows as a gutter only with double borders, and as the
 * footer strip in either mode.
 * Class names stay literal so Tailwind can detect them.
 */
export const demoCardClass = [
    'min-w-0',
    '[@container_style(--mielui-surface:glass)]:border-foreground/10!',
    '[@container_style(--mielui-surface:glass)]:supports-[backdrop-filter:blur(0)]:bg-white/30!',
    '[@container_style(--mielui-surface:glass)]:supports-[backdrop-filter:blur(0)]:dark:bg-white/[0.07]!',
    '[@container_style(--mielui-surface:glass)]:shadow-[inset_0_1px_0_rgb(255_255_255/0.45)]',
    '[@container_style(--mielui-surface:glass)]:dark:shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]',
    '[@container_style(--mielui-surface:glass)]:backdrop-blur-[calc(var(--spacing)*7)]',
    '[@container_style(--mielui-surface:glass)]:backdrop-saturate-150',
    '[@container_style(--mielui-surface:glass)]:[@media(prefers-reduced-transparency:reduce)]:bg-secondary!',
    '[@container_style(--mielui-surface:glass)]:[@media(prefers-reduced-transparency:reduce)]:backdrop-filter-none'
].join(' ');
