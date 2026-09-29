<script lang="ts">
    import { CodeBlock } from '@mielui/svelte/components/code-block';

    let { command }: { command: string } = $props();

    const managers = [
        {
            id: 'pnpm',
            label: 'pnpm',
            exec: 'pnpm dlx',
            add: 'pnpm add'
        },
        {
            id: 'npm',
            label: 'npm',
            exec: 'npx',
            add: 'npm i'
        },
        {
            id: 'yarn',
            label: 'yarn',
            exec: 'yarn dlx',
            add: 'yarn add'
        },
        {
            id: 'bun',
            label: 'bun',
            exec: 'bunx',
            add: 'bun add'
        }
    ];

    function translate(line: string, manager: (typeof managers)[number]) {
        const runner = line.match(/^pnpm\s+dlx\s+(.+)$/)?.[1];

        if (runner != null) {
            return `${manager.exec} ${runner}`;
        }

        const packages = line.match(/^(?:pnpm|npm|yarn|bun)\s+add\s+(.+)$/)?.[1];

        if (packages != null) {
            return `${manager.add} ${packages}`;
        }

        return line;
    }

    const tabs = $derived(
        managers.map((manager) => {
            const code = command
                .split('\n')
                .map((line) => translate(line, manager))
                .join('\n');

            return {
                label: manager.label,
                lang: 'bash',
                value: manager.id,
                code
            };
        })
    );
</script>

<CodeBlock
    {tabs}
    class="[--mielui-inset-position:top] [&_[data-ui=code-block-header]]:[--size-icon-md:var(--size-control-sm)]"
/>
