<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    type Props = Omit<HTMLAttributes<HTMLDivElement>, 'role'> & {
        orientation?: 'horizontal' | 'vertical';
    };

    let { children, class: className, orientation = 'horizontal', ...rest }: Props = $props();
</script>

<div
    {...rest}
    role="group"
    data-ui="group"
    data-orientation={orientation}
    class={cn(className,
        'isolate inline-flex w-fit items-stretch rounded-[var(--radius-lg)] not-has-[>[data-ui=group]]:shadow-[var(--elevation-button-outline)] [&>*:not([data-ui=group]):not(:focus-visible):not(:focus-within)]:shadow-none [&>*]:relative [&>*:focus-within]:z-10 has-[>[data-ui=group]]:gap-2',
        orientation === 'horizontal'
            ? '[&>*:not([data-ui=group]):not(:first-child)]:rounded-s-none [&>*:not([data-ui=group]):not(:last-child)]:rounded-e-none'
            : 'flex-col [&>*:not([data-ui=group]):not(:first-child)]:rounded-t-none [&>*:not([data-ui=group]):not(:last-child)]:rounded-b-none'
    )}
>
    {@render children?.()}
</div>
