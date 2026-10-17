<script lang="ts">
    import * as Reasoning from '@mielui/svelte/components/reasoning';
    import { ResponseStream } from '@mielui/svelte/components/response-stream';

    const trace =
        'Checking the release history, recent errors, and payment-provider status against the incident timeline.';

    let streaming = $state(true);
</script>

<Reasoning.Root class="w-full max-w-xl" {streaming}>
    <Reasoning.Trigger />
    <Reasoning.Content>
        <ResponseStream
            textStream={trace}
            speed={45}
            onComplete={() => {
                streaming = false;
            }}
            class="text-foreground-muted"
        />
    </Reasoning.Content>
</Reasoning.Root>
