<script lang="ts">
    import type {
        ComposerLabels,
        ComposerStatus,
        ComposerToolbarProps
    } from '@mielui/svelte/components/composer';
    import * as Composer from '@mielui/svelte/components/composer';

    let {
        value = $bindable(''),
        status = 'idle',
        asyncSubmit = false,
        toolbarVariant,
        labels
    }: {
        value?: string;
        status?: ComposerStatus;
        asyncSubmit?: boolean;
        toolbarVariant?: ComposerToolbarProps['variant'];
        labels?: ComposerLabels;
    } = $props();

    let submitCount = $state(0);
    let stopCount = $state(0);
    let settle: (() => void) | undefined;

    async function submit() {
        submitCount += 1;
        if (!asyncSubmit) {
            return;
        }

        await new Promise<void>((resolve) => {
            settle = resolve;
        });
        settle = undefined;
    }

    function resolveSubmission() {
        const resolve = settle;
        settle = undefined;
        resolve?.();
    }
</script>

<Composer.Root bind:value {status} {labels} onSubmit={submit} onStop={() => (stopCount += 1)}>
    <Composer.Input aria-label="Prompt" />
    <Composer.Toolbar variant={toolbarVariant}>
        <Composer.Actions />
        <Composer.Submit />
    </Composer.Toolbar>
</Composer.Root>

<p data-testid="composer-value">{value}</p>
<p data-testid="submit-count">{submitCount}</p>
<p data-testid="stop-count">{stopCount}</p>
<button type="button" onclick={resolveSubmission}>Resolve submission</button>
