import { tv } from 'tailwind-variants';

export const toggle = tv({
    base: 'mielui-press inline-flex select-none items-center justify-center gap-1.5 rounded-[var(--radius-md)] [font-weight:var(--font-weight-button)] [letter-spacing:var(--tracking-button)] transition-[background-color,color,box-shadow,transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]',
    variants: {
        variant: {
            default: '',
            outlined:
                'border-[length:var(--border-size)] border-border shadow-[var(--elevation-control-edge)] focus-visible:shadow-[var(--focus-ring),var(--elevation-control-edge)]'
        },
        pressed: {
            true: 'bg-secondary text-foreground hover:bg-secondary shadow-[var(--elevation-control-edge)] focus-visible:shadow-[var(--focus-ring),var(--elevation-control-edge)]',
            false: 'bg-transparent text-foreground-muted hover:bg-secondary/60 hover:text-foreground'
        },
        size: {
            sm: 'h-[calc(var(--size-control-sm)-var(--size-hairline))] px-2 [font-size:var(--font-size-badge)]',
            md: 'h-[calc(var(--size-control-md)-var(--size-hairline))] px-3 [font-size:var(--font-size-label)]',
            lg: 'h-[calc(var(--size-control-lg)-var(--size-hairline))] px-4 [font-size:var(--font-size-button)]'
        }
    },
    defaultVariants: {
        variant: 'default',
        pressed: false,
        size: 'md'
    }
});
