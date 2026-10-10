import {
    number,
    type PlaygroundValues,
    select,
    text,
    toggle
} from '$lib/components/docs/playground';

export const controls = {
    type: select('Type', ['default', 'success', 'error', 'warning', 'info', 'loading'], 'success'),
    glass: toggle('Glass surface', 'Appearance'),
    title: text('Title', 'Deployment ready', 'Content'),
    description: toggle('Description', 'Content', true),
    action: select(
        'Action',
        ['none', 'outline', 'primary', 'secondary', 'ghost'],
        'none',
        'Content'
    ),
    exitable: toggle('Close button', 'Content', true),
    persistent: toggle('Persistent', 'Behavior'),
    duration: number('Duration', 5600, {
        min: 1000,
        max: 20000,
        step: 100,
        group: 'Behavior'
    })
};

function quote(value: string): string {
    return `'${value.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}'`;
}

export function code(values: PlaygroundValues<typeof controls>): string {
    const variant =
        values.action === 'none' || values.action === 'outline'
            ? ''
            : `
                    variant: '${values.action}',`;
    const options = [
        `title: ${quote(values.title)}`,
        values.type !== 'default' && `type: '${values.type}'`,
        values.description && "description: 'Preview build for the main branch.'",
        values.glass && "surface: 'glass'",
        values.action !== 'none' &&
            `actions: [
                {
                    label: 'View details',${variant}
                    callback: viewDetails
                }
            ]`,
        !values.exitable && 'exitable: false',
        values.persistent && 'persistent: true',
        values.duration !== 5600 && `duration: ${values.duration}`
    ].filter((option) => typeof option === 'string');
    const viewDetails =
        values.action === 'none'
            ? ''
            : `
    function viewDetails() {
        toast.info('Opening details');
    }
`;

    return `<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { toast } from '@mielui/svelte/components/toast';
${viewDetails}
    function notify() {
        toast({
            ${options.join(',\n            ')}
        });
    }
</script>

<Button onclick={notify}>Show toast</Button>`;
}
