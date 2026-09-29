import { tv } from 'tailwind-variants';

export const alert = tv({
    base: 'mielui-inset-frame flex flex-col text-foreground'
});

export const alertSurface = tv({
    base: 'mielui-inset-surface grid grid-cols-[minmax(0,1fr)] gap-y-1 px-4 py-3.5 has-[>[data-alert-icon]]:grid-cols-[auto_minmax(0,1fr)] has-[>[data-alert-icon]]:gap-x-2.5'
});

export const alertIconSlot = tv({
    base: 'col-start-1 row-start-1 flex h-[1lh] items-center self-start text-[length:var(--font-size-header)] leading-snug'
});

export const alertIcon = tv({
    base: 'shrink-0',
    variants: {
        variant: {
            info: 'text-[var(--mielui-info-text)]',
            error: 'text-[var(--mielui-error-text)]',
            warning: 'text-[var(--mielui-warning-text)]',
            success: 'text-[var(--mielui-success-text)]'
        }
    },
    defaultVariants: {
        variant: 'info'
    }
});
