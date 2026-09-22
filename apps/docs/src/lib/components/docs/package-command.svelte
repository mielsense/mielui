<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';

    let { command }: { command: string } = $props();

    const runnerRest = $derived(command.match(/^pnpm\s+dlx\s+(.+)$/)?.[1]);
    const addPkgs = $derived(command.match(/^(?:pnpm|npm|yarn|bun)\s+add\s+(.+)$/)?.[1]);

    const managers = [
        { id: 'pnpm', label: 'pnpm', exec: 'pnpm dlx', add: 'pnpm add' },
        { id: 'npm', label: 'npm', exec: 'npx', add: 'npm i' },
        { id: 'yarn', label: 'yarn', exec: 'yarn dlx', add: 'yarn add' },
        { id: 'bun', label: 'bun', exec: 'bunx', add: 'bun add' }
    ];

    const tabs = $derived(
        managers.map((m) => {
            let code: string;
            if (runnerRest != null) {
                code = `${m.exec} ${runnerRest}`;
            } else if (addPkgs != null) {
                code = `${m.add} ${addPkgs}`;
            } else {
                code = command;
            }
            return {
                label: m.label,
                lang: 'bash',
                value: m.id,
                code
            };
        })
    );
</script>

<div class="flex flex-col gap-4">
    <CodeBlock {tabs} />
</div>
