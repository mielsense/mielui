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
    class={cn(
        className,
        'pointer-events-none z-1 shrink-0 self-stretch bg-[var(--color-input)] transition-[background-color] [transition-duration:var(--motion-duration-hover)] ease-[var(--ease-out)] motion-reduce:transition-none has-[+:is([data-ui=input],[role=combobox]):focus-visible:not([aria-invalid=true])]:bg-primary [:is([data-ui=input],[role=combobox]):focus-visible:not([aria-invalid=true])+&]:bg-primary has-[+:is([data-ui=input-control],[data-ui=combobox-trigger]):has(:focus-visible):not(:has([aria-invalid=true]))]:bg-primary [:is([data-ui=input-control],[data-ui=combobox-trigger]):has(:focus-visible):not(:has([aria-invalid=true]))+&]:bg-primary has-[+[data-ui$=picker-input]:focus-within:not([data-invalid])]:bg-primary [[data-ui$=picker-input]:focus-within:not([data-invalid])+&]:bg-primary has-[+[data-ui$=picker-input][data-invalid]]:bg-error [[data-ui$=picker-input][data-invalid]+&]:bg-error has-[+[aria-invalid=true]]:bg-error [[aria-invalid=true]+&]:bg-error has-[+[data-ui=input-control]:has([aria-invalid=true])]:bg-error [[data-ui=input-control]:has([aria-invalid=true])+&]:bg-error',
        orientation === 'vertical'
            ? '-mx-[var(--border-size)] my-[var(--border-size)] w-[var(--border-size)]'
            : 'mx-[var(--border-size)] -my-[var(--border-size)] h-[var(--border-size)]'
    )}
></div>
