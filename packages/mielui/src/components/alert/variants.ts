import { tv } from 'tailwind-variants';

export const alert = tv({
    base: 'mielui-inset-frame grid grid-cols-[auto_minmax(0,1fr)] items-center gap-x-2 gap-y-1 text-foreground'
});

export const alertIcon = tv({
    base: 'col-start-1 row-start-2 ml-2 my-1 shrink-0',
    variants: {
        variant: {
            info: 'text-[var(--color-info)]',
            error: 'text-[var(--color-error)]',
            warning: 'text-[var(--color-warning)]',
            success: 'text-[var(--color-success)]'
        }
    },
    defaultVariants: {
        variant: 'info'
    }
});
