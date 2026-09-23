<script lang="ts">
    import type { Snippet } from 'svelte';
    import { getPageInfoContext, type PageInfo } from './page-info-context';

    let { title, children }: { title: string; children?: Snippet } = $props();
    const context = getPageInfoContext();

    $effect(() => {
        if (!context) {
            return;
        }
        const info = $state<PageInfo>({ title, description: children });
        context.current = info;
        return () => {
            if (context.current === info) {
                context.current = null;
            }
        };
    });
</script>

<h1 class="sr-only">{title}</h1>
