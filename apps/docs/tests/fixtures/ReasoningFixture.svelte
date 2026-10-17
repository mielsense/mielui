<script lang="ts">
    import type { ReasoningLabels } from '@mielui/svelte/components/reasoning';
    import * as Reasoning from '@mielui/svelte/components/reasoning';

    let {
        streaming = false,
        open = false,
        title,
        duration,
        labels
    }: {
        streaming?: boolean;
        open?: boolean;
        title?: string;
        duration?: string;
        labels?: ReasoningLabels;
    } = $props();
</script>

<Reasoning.Root {streaming} {open} {labels}>
    <Reasoning.Trigger {title} {duration} />
    <Reasoning.Content>
        <p>Compared the incident timestamp with the last five deployments.</p>
    </Reasoning.Content>
</Reasoning.Root>
