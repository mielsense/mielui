import { tv } from 'tailwind-variants';

export const badge = tv({
    base: 'inline-flex w-fit max-w-full items-center justify-center gap-1.5 min-h-6 rounded-full border-[length:var(--border-size)] border-transparent px-2 py-0.5 [font-size:var(--font-size-badge)] leading-tight [font-weight:var(--font-weight-badge)] [letter-spacing:var(--tracking-badge)] transition-[background-color,border-color,color] [transition-duration:var(--motion-duration-hover)] ease-in-out motion-reduce:transition-none hover:cursor-default disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]',

    variants: {
        variant: {
            primary: 'bg-primary text-[var(--color-on-primary)]',
            secondary: 'bg-secondary text-foreground',
            ghost: 'bg-transparent text-foreground hover:bg-[color-mix(in_srgb,var(--color-foreground)_6%,transparent)]',
            outline: 'border-border bg-transparent text-foreground',
            destructive:
                'border-[color:color-mix(in_oklab,var(--color-error)_22%,transparent)] bg-error-soft text-[var(--mielui-error-text)]',
            info: 'border-[color:color-mix(in_oklab,var(--color-info)_22%,transparent)] bg-info-soft text-[var(--mielui-info-text)]',
            success:
                'border-[color:color-mix(in_oklab,var(--color-success)_22%,transparent)] bg-success-soft text-[var(--mielui-success-text)]',
            warning:
                'border-[color:color-mix(in_oklab,var(--color-warning)_22%,transparent)] bg-warning-soft text-[var(--mielui-warning-text)]',
            error: 'border-[color:color-mix(in_oklab,var(--color-error)_22%,transparent)] bg-error-soft text-[var(--mielui-error-text)]'
        }
    },
    defaultVariants: {
        variant: 'secondary'
    }
});
