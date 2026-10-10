import { type PlaygroundValues, select, toggle } from '$lib/components/docs/playground';

export const controls = {
    copy: select('Copy', ['actionbar', 'overlay', 'inline'], 'actionbar'),
    theme: select('Theme', ['mielui', 'custom'], 'mielui', 'Appearance'),
    showLineNumbers: toggle('Line numbers', 'Appearance'),
    content: select('Source', ['tabs', 'snippet', 'command'], 'tabs', 'Content'),
    actions: toggle('Extra action', 'Content')
};

export const typescript = `export async function getUser(id: string) {
    const response = await fetch('/api/users/' + id);
    if (!response.ok) {
        throw new Error('User not found');
    }
    return response.json();
}`;

export const python = `import httpx

async def get_user(id: str):
    async with httpx.AsyncClient() as client:
        response = await client.get("/api/users/" + id)
        response.raise_for_status()
        return response.json()`;

export const command = 'pnpm dlx @mielui/svelte add code-block';

function constant(name: string, source: string): string {
    return `    const ${name} = \`${source}\`;`;
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const tabs = values.content === 'tabs';
    const source = tabs
        ? [
              `tabs={[
        { label: 'TypeScript', lang: 'typescript', code: typescript },
        { label: 'Python', lang: 'python', code: python }
    ]}`
          ]
        : values.content === 'snippet'
          ? ['code={typescript}', 'lang="typescript"']
          : [`code="${command}"`, 'lang="bash"'];
    const parts = [
        ...source,
        values.copy !== 'actionbar' ? `copy="${values.copy}"` : '',
        values.theme !== 'mielui' ? `theme="${values.theme}"` : '',
        values.showLineNumbers ? 'showLineNumbers' : '',
        'class="max-w-xl"'
    ].filter(Boolean);
    const end = values.actions ? '>' : '/>';
    const inline = `<CodeBlock ${parts.join(' ')}${values.actions ? '' : ' '}${end}`;
    const open =
        tabs || inline.length > 100 ? `<CodeBlock\n    ${parts.join('\n    ')}\n${end}` : inline;
    const constants = tabs
        ? `${constant('typescript', typescript)}\n\n${constant('python', python)}`
        : values.content === 'snippet'
          ? constant('typescript', typescript)
          : '';
    const imports = values.actions
        ? `    import { LinkSquare02Icon } from '@hugeicons/core-free-icons';
    import { Button } from '@mielui/svelte/components/button';
    import { CodeBlock } from '@mielui/svelte/components/code-block';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';`
        : "    import { CodeBlock } from '@mielui/svelte/components/code-block';";
    const script = constants ? `${imports}\n\n${constants}` : imports;
    const element = values.actions
        ? `${open}
    {#snippet actions()}
        <Button variant="ghost" size="icon" aria-label="Open in editor">
            <HugeiconsIcon icon={LinkSquare02Icon} size={15} />
        </Button>
    {/snippet}
</CodeBlock>`
        : open;

    return `<script lang="ts">
${script}
</script>

${element}`;
}
