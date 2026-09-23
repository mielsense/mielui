<script lang="ts">
    import { Dithering } from '@devmischief/shaders-svelte';
    import { mode } from 'mode-watcher';
    import { onMount } from 'svelte';
    import { prefersReducedMotion } from 'svelte/motion';

    let ready = $state(false);
    onMount(() => {
        ready = true;
    });
</script>

{#if ready}
    <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-15"
    >
        <Dithering
            width="100%"
            height="100%"
            colorBack={mode.current === 'dark' ? '#080808' : '#ffffff'}
            colorFront={mode.current === 'dark' ? '#202020' : '#e3e2e2'}
            shape="warp"
            type="4x4"
            size={2}
            speed={prefersReducedMotion.current ? 0 : 0.3}
            scale={1.4}
        />
    </div>
{/if}
