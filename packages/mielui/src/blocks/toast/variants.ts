import { tv } from 'tailwind-variants';

export const toastIcon = tv({
    variants: {
        type: {
            success: 'text-[var(--mielui-success-text)]',
            error: 'text-[var(--mielui-error-text)]',
            warning: 'text-[var(--mielui-warning-text)]',
            info: 'text-[var(--mielui-info-text)]',
            loading: 'text-foreground-muted',
            default: ''
        }
    }
});
