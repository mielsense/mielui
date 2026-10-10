import { tv } from 'tailwind-variants';

export const toggle = tv({
    base: 'mielui-press inline-flex select-none items-center justify-center gap-1.5 rounded-[var(--radius-control)] hover:cursor-[var(--ui-cursor-interactive)] [font-weight:var(--font-weight-button)] [letter-spacing:var(--tracking-button)] leading-none transition-[background-color,border-color,color,box-shadow,transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)] [&_svg]:pointer-events-none [&_svg]:shrink-0',
    variants: {
        variant: {
            default: '',
            outline: 'border-[length:var(--border-size)] bg-origin-border'
        },
        /**
         * Off is flat. On is the neutral lit pill: `.mielui-glow` draws the fill
         * and every edge, and the shadow utilities keep the focus ring from
         * replacing those edges.
         */
        pressed: {
            true: 'mielui-glow mielui-glow-neutral text-foreground shadow-[var(--mielui-glow-shadow)] focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]',
            false: 'bg-transparent text-foreground-muted hover:bg-[var(--color-wash)] hover:text-foreground'
        },
        size: {
            sm: 'h-[calc(var(--size-control-sm)-var(--size-hairline))] min-w-[calc(var(--size-control-sm)-var(--size-hairline))] px-2 [font-size:var(--font-size-badge)]',
            md: 'h-[calc(var(--size-control-md)-var(--size-hairline))] min-w-[calc(var(--size-control-md)-var(--size-hairline))] px-[calc(var(--spacing)*2.75)] [font-size:var(--font-size-label)]',
            lg: 'h-[calc(var(--size-control-lg)-var(--size-hairline))] min-w-[calc(var(--size-control-lg)-var(--size-hairline))] px-3.5 [font-size:var(--font-size-button)]'
        }
    },
    compoundVariants: [
        {
            variant: 'outline',
            pressed: false,
            class: 'border-[var(--color-input)]'
        },
        {
            variant: 'outline',
            pressed: true,
            class: 'border-transparent'
        }
    ],
    defaultVariants: {
        variant: 'default',
        pressed: false,
        size: 'md'
    }
});
