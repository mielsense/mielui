<script lang="ts">
    import Chat from '$lib/components/demos/chat.svelte';
    import CodingAgent from '$lib/components/demos/coding-agent.svelte';
    import DemoFrame from '$lib/components/demos/demo-frame.svelte';
    import { fadeX, scrollFade } from '$lib/components/shell/scroll-fade';
</script>

<div
    {@attach scrollFade({ axis: 'x', size: 40 })}
    class={`flex h-full min-h-0 w-full gap-5 overflow-x-auto overscroll-x-contain p-4 sm:p-5 ${fadeX}`}
>
    <h2 class="sr-only">AI components</h2>
    <div class="h-full min-w-[min(100%,52rem)] flex-1">
        <DemoFrame title="Coding agent" description="Threads, diffs, checks, and a composer" fill>
            <CodingAgent />
        </DemoFrame>
    </div>
    <div class="h-full w-[min(100%,26rem)] shrink-0">
        <DemoFrame title="Chat" description="Reasoning and a streamed reply" fill>
            <Chat />
        </DemoFrame>
    </div>
</div>
