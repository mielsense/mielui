import { tv } from 'tailwind-variants';

export const toastIcon = tv({
    variants: {
        type: {
            success: 'text-[var(--color-success)]',
            error: 'text-[var(--color-error)]',
            warning: 'text-[var(--color-warning)]',
            info: 'text-[var(--color-info)]',
            loading: 'text-foreground-muted',
            default: ''
        }
    }
});
