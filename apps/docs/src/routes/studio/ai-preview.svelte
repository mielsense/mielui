<script lang="ts">
    import Chat from '$lib/components/demos/chat.svelte';
    import CodingAgent from '$lib/components/demos/coding-agent.svelte';
    import DemoFrame from '$lib/components/demos/demo-frame.svelte';
    import FadeScrollArea from '$lib/components/shell/fade-scroll-area.svelte';
</script>

<FadeScrollArea class="h-full" start>
    <div class="@container w-full">
        <h2 class="sr-only">AI components</h2>
        <div class="mx-auto flex w-full max-w-[76rem] flex-col gap-8 p-4 sm:p-5">
            <DemoFrame
                title="Coding agent"
                description="Threads, diffs, checks, and a composer"
                class="h-[42rem]"
            >
                <CodingAgent />
            </DemoFrame>
            <div class="w-full max-w-3xl">
                <DemoFrame
                    title="Chat"
                    description="Reasoning and a streamed reply"
                    class="h-[30rem]"
                >
                    <Chat />
                </DemoFrame>
            </div>
        </div>
    </div>
</FadeScrollArea>
