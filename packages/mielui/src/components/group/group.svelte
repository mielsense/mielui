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
        'isolate inline-flex w-fit max-w-full items-stretch [&>*]:relative [&>*:focus-visible]:z-10 [&>*:has(:focus-visible)]:z-10 has-[>[data-ui=group]]:gap-2 [&>[data-ui=input]]:min-w-0 [&>[data-ui=input-control]]:min-w-0',
        orientation === 'horizontal'
            ? '[&>[data-ui].mielui-glow]:my-[var(--border-size)] [&>[data-ui].mielui-glow]:me-[var(--border-size)] [&>[data-ui].mielui-glow:first-child]:ms-[var(--border-size)] [&>[data-ui=group-separator]+.mielui-glow]:ms-[var(--border-size)] has-[>[data-size=sm]]:[--mielui-group-control-size:var(--size-control-sm)] has-[>[data-size=md]]:[--mielui-group-control-size:var(--size-control-md)] has-[>[data-size=lg]]:[--mielui-group-control-size:var(--size-control-lg)] [&>:is([data-ui=button],[data-ui=input],[data-ui=input-control],[data-ui=combobox-trigger])]:h-auto [&>:is([data-ui=button],[data-ui=input],[data-ui=input-control],[data-ui=combobox-trigger])]:min-h-[calc(var(--mielui-group-control-size,var(--size-control-md))-var(--size-hairline))] [&>[data-ui].mielui-glow]:min-h-[calc(var(--mielui-group-control-size,var(--size-control-md))-var(--size-hairline)-var(--border-size)*2)] [&>[data-ui]:not([data-ui=group]):not(:nth-child(1_of_[data-ui]:not([data-ui=group])))]:rounded-s-none [&>[data-ui]:not([data-ui=group]):not(:nth-child(1_of_[data-ui]:not([data-ui=group])))]:border-s-0 [&>[data-ui]:not([data-ui=group]):not(:nth-last-child(1_of_[data-ui]:not([data-ui=group])))]:rounded-e-none [&>[data-ui]:not([data-ui=group]):not(:nth-last-child(1_of_[data-ui]:not([data-ui=group])))]:border-e-0'
            : 'flex-col [&>[data-ui].mielui-glow]:mx-[var(--border-size)] [&>[data-ui].mielui-glow]:mb-[var(--border-size)] [&>[data-ui].mielui-glow:first-child]:mt-[var(--border-size)] [&>[data-ui=group-separator]+.mielui-glow]:mt-[var(--border-size)] [&>[data-ui]:not([data-ui=group])]:rounded-[min(var(--radius-control),var(--radius-xl))] [&>[data-ui]:not([data-ui=group]):not(:nth-child(1_of_[data-ui]:not([data-ui=group])))]:rounded-t-none [&>[data-ui]:not([data-ui=group]):not(:nth-child(1_of_[data-ui]:not([data-ui=group])))]:border-t-0 [&>[data-ui]:not([data-ui=group]):not(:nth-last-child(1_of_[data-ui]:not([data-ui=group])))]:rounded-b-none [&>[data-ui]:not([data-ui=group]):not(:nth-last-child(1_of_[data-ui]:not([data-ui=group])))]:border-b-0'
    )}
>
    {@render children?.()}
</div>
