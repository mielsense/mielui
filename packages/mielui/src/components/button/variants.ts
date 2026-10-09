import { tv } from 'tailwind-variants';

export const button = tv({
    base: 'mielui-press inline-flex h-[calc(var(--size-control-md)-var(--size-hairline))] hover:cursor-[var(--ui-cursor-interactive)] items-center justify-center gap-2 whitespace-nowrap select-none rounded-[var(--radius-control)] px-[calc(var(--spacing)*3.5+var(--size-hairline))] [font-size:var(--font-size-button)] [font-weight:var(--font-weight-button)] [letter-spacing:var(--tracking-button)] leading-none antialiased transition-[background-color,border-color,color,box-shadow,transform,scale] [transition-duration:var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-0 focus-visible:shadow-[var(--focus-ring)] disabled:pointer-events-none disabled:opacity-[var(--opacity-disabled)] aria-disabled:cursor-default [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0 [&_.truncate]:leading-normal',
    variants: {
        variant: {
            /**
             * Filled variants are lit pills: the fill, light layers, and every edge
             * come from `.mielui-glow` in ui.css, and each variant only names its
             * color and how much light it catches. The shadow utilities keep the
             * focus ring from replacing the edge shadows. Outline, ghost, and
             * quiet stay flat. `data-[state=open]` mirrors hover so a menu trigger
             * reads as hovered while its surface is open.
             */
            primary:
                'mielui-glow [--mielui-glow-color:var(--color-primary)] [--mielui-glow-light:0.6] text-[var(--color-on-primary)] shadow-[var(--mielui-glow-shadow)] focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]',
            secondary:
                'mielui-glow [--mielui-glow-color:var(--color-secondary)] [--mielui-glow-light:0.55] [--mielui-glow-ring:var(--color-border)] dark:[--mielui-glow-light:0.1] text-[var(--color-button-foreground)] shadow-[var(--mielui-glow-shadow)] focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]',
            ghost: 'bg-transparent text-[var(--color-button-foreground)] hover:bg-[var(--color-wash)] data-[state=open]:bg-[var(--color-wash)]',
            quiet: 'bg-transparent text-[var(--color-button-foreground)]',
            outline:
                'border-[length:var(--border-size)] border-[var(--color-input)] bg-[var(--color-field)] text-[var(--color-button-foreground)] hover:bg-[color-mix(in_srgb,var(--color-foreground)_4%,var(--color-field))] data-[state=open]:bg-[color-mix(in_srgb,var(--color-foreground)_4%,var(--color-field))]',
            destructive:
                'mielui-glow [--mielui-glow-color:color-mix(in_oklab,var(--color-error)_20%,var(--color-card))] [--mielui-glow-light:0.7] dark:[--mielui-glow-light:0.1] text-[var(--mielui-error-text)] shadow-[var(--mielui-glow-shadow)] focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]',
            /**
             * The headline action: a lighter tint of the primary color under
             * dark text, at full light.
             */
            glow: 'mielui-glow text-[color-mix(in_oklab,var(--color-primary)_12%,#18181b)] shadow-[var(--mielui-glow-shadow)] focus-visible:shadow-[var(--focus-ring),var(--mielui-glow-shadow)]',
            /**
             * A clickable plate: the same interaction as `outline` wearing the
             * resting surface, so a whole card can be the control.
             */
            panel: 'rounded-[var(--radius-xl)] border-[length:var(--border-size)] border-border bg-card text-[var(--color-button-foreground)] shadow-[var(--elevation-1)] hover:bg-[color-mix(in_srgb,var(--color-foreground)_3%,var(--color-card))] data-[state=open]:bg-[color-mix(in_srgb,var(--color-foreground)_3%,var(--color-card))] focus-visible:shadow-[var(--focus-ring),var(--elevation-1)]'
        },
        size: {
            sm: 'h-[calc(var(--size-control-sm)-var(--size-hairline))] px-[calc(var(--spacing)*3)] [font-size:var(--font-size-label)]',
            md: 'h-[calc(var(--size-control-md)-var(--size-hairline))]',
            lg: 'h-[calc(var(--size-control-lg)-var(--size-hairline))] px-5',
            icon: 'h-[var(--size-icon-md)] w-[var(--size-icon-md)] min-w-[var(--size-icon-md)] justify-center px-0'
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md'
    }
});
