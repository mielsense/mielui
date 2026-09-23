<script lang="ts">
    import * as Reasoning from '@mielui/svelte/components/reasoning';
    import { ResponseStream } from '@mielui/svelte/components/response-stream';

    let streaming = $state(true);

    function complete() {
        streaming = false;
    }

    const trace =
        'Checking the release history, recent errors, and payment-provider status against the incident timeline.';
</script>

<Reasoning.Root class="w-full max-w-xl" {streaming} open>
    <Reasoning.Trigger />
    <Reasoning.Content>
        <ResponseStream
            textStream={trace}
            speed={45}
            onComplete={complete}
            class="text-foreground-muted"
        />
    </Reasoning.Content>
</Reasoning.Root>
