import { tv } from 'tailwind-variants';

export const checkbox = tv({
    base: 'group flex select-none flex-row items-start gap-2 [transition-duration:var(--motion-duration-press)] ease-[var(--ease-out)]',
    variants: {
        variant: {
            default: '',
            primary:
                'rounded-lg border-[length:var(--border-size)] p-4 transition-[background-color,border-color] motion-reduce:transition-none focus-within:bg-secondary hover:bg-secondary'
        },
        disabled: {
            true: 'opacity-60',
            false: ''
        },
        checked: {
            true: '',
            false: ''
        }
    },
    /**
     * The checked tint belongs to the card-style `primary` variant only. A plain
     * `default` checkbox must not get a tinted row background when checked.
     */
    compoundVariants: [
        {
            variant: 'primary',
            checked: true,
            class: 'bg-primary/10 border-primary/30 focus-within:bg-primary/20 hover:bg-primary/20'
        }
    ]
});

export const checkboxBox = tv({
    base: 'mielui-press flex shrink-0 items-center justify-center rounded-[var(--radius-sm)] border-[length:var(--border-size)] p-0 transition-[background-color,border-color,box-shadow,transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none shadow-[var(--elevation-control-edge)] peer-focus-visible:shadow-[var(--focus-ring),var(--elevation-control-edge)]',
    variants: {
        size: {
            sm: 'size-[calc(var(--size-hairline)*7)] [&_svg]:size-[calc(var(--size-hairline)*5)]',
            md: 'size-[calc(var(--size-hairline)*9)] [&_svg]:size-[calc(var(--size-hairline)*6)]',
            lg: 'size-[calc(var(--size-hairline)*11)] [&_svg]:size-[calc(var(--size-hairline)*8)]'
        },
        checked: {
            true: 'border-primary bg-primary',
            false: 'border-border bg-[var(--color-field)] peer-hover:bg-[var(--color-field-hover)] peer-focus-visible:bg-[var(--color-field-hover)]'
        }
    }
});

export const checkboxText = tv({
    base: '[font-size:var(--font-size-body)] [font-weight:var(--font-weight-body)] [letter-spacing:var(--tracking-body)] text-text'
});
