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
        'isolate inline-flex w-fit max-w-full items-stretch [&>*]:relative [&>*:focus-within]:z-10 has-[>[data-ui=group]]:gap-2 [&>[data-ui=input]:not(:focus-visible)]:border-border [&>[data-ui=input-control]:not(:focus-within)]:border-border [&>[data-ui=input]]:min-w-0 [&>[data-ui=input]]:min-h-[calc(var(--size-control-md)-var(--size-hairline))] [&>[data-ui=input-control]]:min-w-0 [&>[data-ui=input-control]]:min-h-[calc(var(--size-control-md)-var(--size-hairline))] [&>[data-ui=button]]:border-[length:var(--border-size)] [&>[data-ui=button]]:border-transparent [&>[data-ui=button][data-variant=outline]]:border-border [&>[data-ui=button]:not(:focus-visible)]:shadow-none [&>[data-ui=button]:focus-visible]:shadow-[var(--focus-ring)]',
        orientation === 'horizontal'
            ? '[&>[data-ui]:not([data-ui=group]):not(:first-child)]:rounded-s-none [&>[data-ui]:not([data-ui=group]):not(:first-child)]:border-s-0 [&>[data-ui]:not([data-ui=group]):not(:last-child)]:rounded-e-none [&>[data-ui]:not([data-ui=group]):not(:last-child)]:border-e-0'
            : 'flex-col [&>[data-ui]:not([data-ui=group]):not(:first-child)]:rounded-t-none [&>[data-ui]:not([data-ui=group]):not(:first-child)]:border-t-0 [&>[data-ui]:not([data-ui=group]):not(:last-child)]:rounded-b-none [&>[data-ui]:not([data-ui=group]):not(:last-child)]:border-b-0'
    )}
>
    {@render children?.()}
</div>
