import { tv } from 'tailwind-variants';

export const checkbox = tv({
    base: 'group flex select-none flex-row items-start gap-2 [transition-duration:var(--motion-duration-press)] ease-[var(--ease-out)]',
    variants: {
        variant: {
            default: '',
            primary:
                'rounded-[var(--radius-xl)] border-[length:var(--border-size)] border-border bg-card p-4 transition-[background-color,border-color] [transition-duration:var(--motion-duration-hover)] motion-reduce:transition-none hover:bg-[color-mix(in_srgb,var(--color-foreground)_3%,var(--color-card))]'
        },
        disabled: {
            true: 'opacity-[var(--opacity-disabled)]',
            false: ''
        },
        checked: {
            true: '',
            false: ''
        }
    },
    /**
     * The checked edge belongs to the card-style `primary` variant only. A plain
     * `default` checkbox must not get a row background or border when checked.
     */
    compoundVariants: [
        {
            variant: 'primary',
            checked: true,
            class: 'border-[var(--color-border-strong)]'
        }
    ]
});

export const checkboxBox = tv({
    base: 'mielui-press flex shrink-0 items-center justify-center rounded-[calc(var(--radius-sm)*0.625)] border-[length:var(--border-size)] bg-origin-border p-0 transition-[background-color,border-color,box-shadow,transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none peer-focus-visible:shadow-[var(--focus-ring)] peer-aria-invalid:border-[var(--color-error)]',
    variants: {
        size: {
            sm: 'size-[calc(var(--size-hairline)*7)] [&_svg]:size-[calc(var(--size-hairline)*5)]',
            md: 'size-[calc(var(--size-hairline)*9)] [&_svg]:size-[calc(var(--size-hairline)*6)]',
            lg: 'size-[calc(var(--size-hairline)*11)] [&_svg]:size-[calc(var(--size-hairline)*8)]'
        },
        /**
         * Checked is the primary lit fill: `.mielui-glow` draws the fill and its
         * edges, so the border turns transparent and the focus ring adds to the
         * glow shadow instead of replacing it.
         */
        checked: {
            true: 'mielui-glow [--mielui-glow-color:var(--color-primary)] [--mielui-glow-light:0.3] border-transparent shadow-[var(--mielui-glow-shadow)] peer-focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]',
            false: 'border-[var(--mielui-control-border)] bg-[var(--color-field)] peer-hover:border-[color-mix(in_oklab,var(--color-foreground)_45%,var(--color-card))]'
        }
    },
    defaultVariants: {
        size: 'md'
    }
});

export const checkboxText = tv({
    base: '[font-size:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)]'
});
