<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Composer from '@mielui/svelte/components/composer';
    import * as Conversation from '@mielui/svelte/components/conversation';
    import { Markdown } from '@mielui/svelte/components/markdown';
    import * as Message from '@mielui/svelte/components/message';
    import * as Reasoning from '@mielui/svelte/components/reasoning';
    import { onMount } from 'svelte';

    type Turn = {
        question: string;
        answer: string;
    };

    const first: Turn = {
        question: 'When does my plan renew, and can I pay less?',
        answer: 'Your **Team plan** renews on **March 1** for $240.\n\nTwo ways to pay less:\n\n- Switch to yearly billing and save 20%, which comes to $192 a month.\n- Remove the 3 seats nobody has used since January and save $36 a month.\n\nWant me to do either one?'
    };
    const followUp =
        'Done. I switched billing to yearly, so the next charge is **$2,304 on March 1**. You can change it back any time before then.';

    let turns = $state<Turn[]>([{ question: first.question, answer: '' }]);
    let prompt = $state('');
    let generating = $state(false);
    let timer: ReturnType<typeof setInterval> | undefined;

    function stream(text: string) {
        clearInterval(timer);
        generating = true;
        let cursor = 0;
        timer = setInterval(() => {
            cursor = Math.min(cursor + 4, text.length);
            turns[turns.length - 1].answer = text.slice(0, cursor);
            if (cursor === text.length) {
                stop();
            }
        }, 40);
    }

    function stop() {
        clearInterval(timer);
        timer = undefined;
        generating = false;
    }

    function send(question: string) {
        turns.push({ question, answer: '' });
        prompt = '';
        stream(followUp);
    }

    function replay() {
        turns = [{ question: first.question, answer: '' }];
        stream(first.answer);
    }

    onMount(() => {
        stream(first.answer);

        return stop;
    });
</script>

<!--
    @component
    A support chat with reasoning and a streamed Markdown reply.
-->

<div class="flex h-full min-h-0 min-w-0 flex-col text-foreground">
    <header
        class="flex h-12 shrink-0 items-center justify-between gap-3 border-b-[length:var(--border-size)] border-border px-4"
    >
        <div class="flex min-w-0 items-baseline gap-2.5">
            <h4 class="m-0 shrink-0 text-sm font-medium">Billing assistant</h4>
            <span class="truncate text-xs text-foreground-muted">Northwind · Team plan</span>
        </div>
        <Button variant="ghost" size="sm" disabled={generating} onclick={replay}>Replay</Button>
    </header>
    <Conversation.Root class="min-h-0 flex-1">
        <Conversation.Content
            aria-label="Billing conversation"
            transcriptClass="mx-auto w-full max-w-3xl gap-5 px-4 py-5"
        >
            {#each turns as turn, index (index)}
                <Message.Root from="user">
                    <Message.Content>
                        <p>{turn.question}</p>
                    </Message.Content>
                </Message.Root>
                <Message.Root from="assistant">
                    <Message.Content class="max-w-none space-y-3">
                        {#if index === 0}
                            <Reasoning.Root open={false}>
                                <Reasoning.Trigger
                                    title="Checked the plan and seat usage"
                                    duration="1.4s"
                                />
                                <Reasoning.Content>
                                    <p>
                                        The workspace is on monthly Team billing with 20 seats.
                                        Three seats have had no sign-in for over 30 days.
                                    </p>
                                </Reasoning.Content>
                            </Reasoning.Root>
                        {/if}
                        <Markdown
                            content={turn.answer}
                            streaming={generating && index === turns.length - 1}
                        />
                    </Message.Content>
                </Message.Root>
            {/each}
        </Conversation.Content>
    </Conversation.Root>
    <div class="mx-auto w-full max-w-3xl shrink-0 px-4 pb-4">
        <Composer.Root bind:value={prompt} {generating} onSubmit={send} onStop={stop}>
            <Composer.Input
                aria-label="Message"
                placeholder="Reply to the assistant"
                class="min-h-12"
            />
            <Composer.Toolbar>
                <div class="ms-auto flex shrink-0 items-center gap-1">
                    <Composer.Submit />
                </div>
            </Composer.Toolbar>
        </Composer.Root>
    </div>
</div>
