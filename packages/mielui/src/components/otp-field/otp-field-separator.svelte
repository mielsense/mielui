<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { OTPFieldSeparatorProps } from '.';

    let { children, class: className, ...rest }: OTPFieldSeparatorProps = $props();
</script>
<span
    {...rest}
    data-ui="otp-field-separator"
    aria-hidden="true"
    class={cn(className, 'text-foreground-muted')}
>
    {#if children}
        {@render children()}
    {:else}
        −
    {/if}
</span>
