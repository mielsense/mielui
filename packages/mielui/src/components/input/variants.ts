import { tv } from 'tailwind-variants';

/**
 * The flat field pill. One hairline on the field color, a stronger hairline on
 * hover, and the primary edge composed with the focus ring on focus. Invalid
 * swaps both for the error color. Nothing is lit and nothing is inset.
 */
export const input = tv({
    base: 'flex min-h-[calc(var(--size-control-md)-var(--size-hairline))] w-full rounded-[var(--radius-control)] border-[length:var(--border-size)] px-[calc(var(--spacing)*3.5)] py-0 text-[var(--color-field-foreground)] [font-size:var(--font-size-body)] transition-[background-color,border-color,box-shadow] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none placeholder:text-foreground-muted focus-visible:border-primary focus-visible:shadow-[var(--focus-ring)] focus-visible:outline-none focus-visible:ring-0 aria-invalid:border-error aria-invalid:focus-visible:border-error aria-invalid:focus-visible:shadow-[0_0_0_calc(var(--border-size)*3)_color-mix(in_srgb,var(--color-error)_30%,transparent)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)] file:border-0 file:bg-transparent file:[font-weight:var(--font-weight-body)] file:[font-size:var(--font-size-body)] file:[letter-spacing:var(--tracking-body)] file:text-foreground',

    variants: {
        variant: {
            outline:
                'border-[var(--color-input)] bg-[var(--color-field)] hover:border-[var(--color-border-strong)] disabled:border-[var(--color-input)]',
            secondary:
                'border-transparent bg-secondary hover:border-[var(--color-input)] disabled:border-transparent'
        }
    },
    defaultVariants: {
        variant: 'outline'
    }
});
