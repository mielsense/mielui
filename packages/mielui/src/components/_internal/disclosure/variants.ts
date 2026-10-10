import { tv } from 'tailwind-variants';

export const DISCLOSURE_ICON_SIZE = 14;

export const disclosureTrigger = tv({
    base: 'mielui-press min-h-[var(--size-control-sm)] items-center gap-1.5 rounded-[var(--radius-md)] px-2 text-start hover:cursor-[var(--ui-cursor-interactive)] transition-[background-color,color,transform,scale] [transition-duration:var(--motion-duration-hover),var(--motion-duration-hover),var(--motion-duration-press),var(--motion-duration-press)] ease-[var(--ease-press)] motion-reduce:transition-none enabled:hover:bg-[var(--color-wash)] focus-visible:outline-none focus-visible:shadow-[var(--focus-ring)] disabled:cursor-not-allowed disabled:opacity-[var(--opacity-disabled)]',
    variants: {
        layout: {
            row: 'flex w-full',
            inline: 'inline-flex w-auto max-w-full'
        },
        bleed: {
            true: '-mx-2 max-w-[calc(100%+var(--spacing)*4)]',
            false: ''
        }
    },
    defaultVariants: {
        layout: 'row',
        bleed: false
    }
});

export const disclosureChevron = tv({
    base: 'size-3.5 shrink-0 text-foreground-muted transition-transform [transition-duration:var(--motion-duration-flick)] ease-[var(--ease-spring-flick)] motion-reduce:transition-none',
    variants: {
        open: {
            true: 'rotate-180',
            false: ''
        }
    }
});
