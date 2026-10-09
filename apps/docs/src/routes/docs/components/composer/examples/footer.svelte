<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import * as Composer from '@mielui/svelte/components/composer';

    let value = $state('');
    let web = $state(false);
    let result = $state('');

    function send() {
        result = `Submitted with web search ${web ? 'on' : 'off'}: ${value}`;
        value = '';
    }
</script>

<div class="flex w-full max-w-2xl flex-col gap-3">
    <Composer.Root bind:value onSubmit={send}>
        <Composer.Input aria-label="Prompt" placeholder="Ask a question..." />
        <Composer.Toolbar>
            <Composer.Submit />
        </Composer.Toolbar>
        <Composer.Footer>
            <span class="px-2.5">Answers can cite the web.</span>
            <Button
                variant="ghost"
                class="ms-auto"
                aria-pressed={web}
                onclick={() => {
                    web = !web;
                }}
            >
                {web ? 'Web search on' : 'Web search off'}
            </Button>
        </Composer.Footer>
    </Composer.Root>
    <p class="min-h-5 text-sm text-foreground-muted" role="status">{result}</p>
</div>
