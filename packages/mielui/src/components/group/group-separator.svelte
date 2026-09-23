<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { HTMLAttributes } from 'svelte/elements';

    type Props = Omit<HTMLAttributes<HTMLDivElement>, 'children' | 'role' | 'aria-hidden'> & {
        orientation?: 'horizontal' | 'vertical';
    };

    let { class: className, orientation = 'vertical', ...rest }: Props = $props();
</script>

<div
    {...rest}
    data-ui="group-separator"
    data-orientation={orientation}
    aria-hidden="true"
    class={cn(className, 'pointer-events-none z-1 shrink-0 self-stretch bg-border has-[+[data-ui=input]:focus-visible]:bg-primary [[data-ui=input]:focus-visible+&]:bg-primary has-[+[data-ui=input-control]:focus-within]:bg-primary [[data-ui=input-control]:focus-within+&]:bg-primary', orientation === 'vertical' ? '-mx-[var(--border-size)] w-[var(--border-size)]' : '-my-[var(--border-size)] h-[var(--border-size)]')}
></div>
