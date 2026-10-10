import { tv } from 'tailwind-variants';

export const alert = tv({
    base: '@container rounded-[calc(var(--radius-xl)*var(--mielui-squircle,1))] [corner-shape:squircle] border-[length:var(--border-size)] border-border bg-card text-foreground shadow-[var(--elevation-1)]'
});

export const alertSurface = tv({
    base: 'grid grid-cols-[auto_minmax(0,1fr)_auto] px-4 py-3 [&>:is(a,button)]:col-start-2 [&>:is(a,button)]:mt-3 [&>:is(a,button)]:justify-self-start @md:[&>:is(a,button)]:col-start-3 @md:[&>:is(a,button)]:row-start-1 @md:[&>:is(a,button)]:row-span-2 @md:[&>:is(a,button)]:ms-4 @md:[&>:is(a,button)]:mt-0 @md:[&>:is(a,button)]:self-center'
});

export const alertIconSlot = tv({
    base: 'col-start-1 row-start-1 me-2.5 flex h-[1lh] items-center self-start text-[length:var(--font-size-body)] leading-body'
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
