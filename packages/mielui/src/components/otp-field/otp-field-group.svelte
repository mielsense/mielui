<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { OTPFieldGroupProps } from '.';

    let { children, class: className, ...rest }: OTPFieldGroupProps = $props();
</script>
<div {...rest} data-ui="otp-field-group" class={cn(className, 'flex items-center gap-1')}>
    {@render children?.()}
</div>
