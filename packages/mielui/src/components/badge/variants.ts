import { tv } from 'tailwind-variants';

export const badge = tv({
    base: 'inline-flex w-fit max-w-full items-center justify-center gap-1.5 min-h-6 rounded-[var(--radius-control)] border-[length:var(--border-size)] border-transparent px-2 py-0.5 [font-size:var(--font-size-badge)] leading-tight [font-weight:var(--font-weight-badge)] [letter-spacing:var(--tracking-badge)] transition-[background-color,border-color,color] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none hover:cursor-default disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]',

    /**
     * Badges are flat pills. Status variants are a soft tint under status text,
     * with no colored border: a status tints text, it does not outline a box.
     */
    variants: {
        variant: {
            primary: 'bg-primary text-[var(--color-on-primary)]',
            secondary: 'bg-secondary text-foreground',
            ghost: 'bg-transparent text-foreground hover:bg-[var(--color-wash)]',
            outline: 'border-border bg-transparent text-foreground',
            destructive: 'bg-error-soft text-[var(--mielui-error-text)]',
            info: 'bg-info-soft text-[var(--mielui-info-text)]',
            success: 'bg-success-soft text-[var(--mielui-success-text)]',
            warning: 'bg-warning-soft text-[var(--mielui-warning-text)]',
            error: 'bg-error-soft text-[var(--mielui-error-text)]'
        }
    },
    defaultVariants: {
        variant: 'secondary'
    }
});
