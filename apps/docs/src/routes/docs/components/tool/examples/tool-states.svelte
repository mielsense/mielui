<script lang="ts">
    import * as Tool from '@mielui/svelte/components/tool';
    import { onMount } from 'svelte';

    let elapsedTenths = $state(0);
    let running = $state(true);
    let elapsed = $derived(`${(elapsedTenths / 10).toFixed(1)}s`);

    onMount(() => {
        const id = setInterval(() => {
            elapsedTenths += 1;
            if (elapsedTenths >= 24) {
                running = false;
                clearInterval(id);
            }
        }, 100);
        return () => {
            clearInterval(id);
        };
    });
</script>

<div class="flex w-full max-w-xl flex-col gap-3">
    <Tool.Root name="2 customer records" state="complete" duration="1.2s">
        <Tool.Item name="Grep" detail="cus_4f81" kind="search" />
        <Tool.Item name="Read" detail="refund status" kind="read" />
    </Tool.Root>
    <Tool.Root name="1 recipient" state={running ? 'running' : 'complete'} duration={elapsed}>
        <Tool.Item name="Bash" detail="validate recipient address" />
    </Tool.Root>
</div>
