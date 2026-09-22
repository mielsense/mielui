import { tv } from 'tailwind-variants';

export const input = tv({
    base: 'flex min-h-[calc(var(--size-control-md)-var(--size-hairline))] w-full rounded-[var(--radius-lg)] border-[length:var(--border-size)] border-border bg-[var(--color-field)] px-3 py-0 text-[var(--color-field-foreground)] [font-size:var(--font-size-body)] transition-[background-color,border-color,box-shadow] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-out)] motion-reduce:transition-none placeholder:text-foreground-muted focus-visible:border-primary aria-invalid:border-error aria-invalid:focus-visible:border-error focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)] file:border-0 file:bg-transparent file:[font-weight:var(--font-weight-body)] file:[font-size:var(--font-size-body)] file:[letter-spacing:var(--tracking-body)] file:text-foreground',

    variants: {
        variant: {
            outline:
                'border-[var(--color-input)] bg-[var(--color-field)] shadow-[var(--elevation-control-edge)] focus-visible:shadow-[var(--focus-ring),var(--elevation-control-edge)]',
            secondary:
                'border-transparent bg-secondary focus-visible:border-[color-mix(in_srgb,var(--color-secondary)_45%,var(--color-primary))] shadow-[var(--elevation-control-edge)] focus-visible:shadow-[var(--focus-ring),var(--elevation-control-edge)]'
        }
    },
    defaultVariants: {
        variant: 'outline'
    }
});
