import { tv } from 'tailwind-variants';

export const checkbox = tv({
    base: 'group flex select-none flex-row items-start gap-2 [transition-duration:var(--motion-duration-press)] ease-[var(--ease-out)]',
    variants: {
        variant: {
            default: '',
            primary:
                'rounded-lg border-[length:var(--border-size)] p-4 focus-within:bg-secondary hover:bg-secondary'
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
    base: 'mielui-press flex shrink-0 items-center justify-center rounded-[var(--radius-sm)] border-[length:var(--border-size)] p-0 transition-[background-color,border-color,box-shadow,transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none peer-focus-visible:shadow-[var(--focus-ring)]',
    variants: {
        size: {
            sm: 'size-[14px] [&_svg]:size-[10px]',
            md: 'size-[18px] [&_svg]:size-[12px]',
            lg: 'size-[22px] [&_svg]:size-[16px]'
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
