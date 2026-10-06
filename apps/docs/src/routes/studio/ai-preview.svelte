<script lang="ts">
    import Chat from '$lib/components/demos/chat.svelte';
    import CodingAgent from '$lib/components/demos/coding-agent.svelte';
    import { fadeX, scrollFade } from '$lib/components/shell/scroll-fade';
</script>

<div
    {@attach scrollFade({ axis: 'x', size: 40 })}
    class={`flex h-full min-h-0 w-full overflow-x-auto overscroll-x-contain ${fadeX}`}
>
    <h2 class="sr-only">AI components</h2>
    <section aria-label="Coding agent" class="@container h-full min-w-[min(100%,52rem)] flex-1">
        <CodingAgent />
    </section>
    <section
        aria-label="Chat"
        class="h-full w-[min(100%,26rem)] shrink-0 border-s-[length:var(--border-size)] border-border"
    >
        <Chat />
    </section>
</div>
