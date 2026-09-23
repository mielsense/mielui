<script lang="ts">
    import { Separator, type SeparatorProps } from '../../components/separator';
    import { getToolbarOrientation } from './context';

    let { element = $bindable(null), orientation, ...rest }: SeparatorProps = $props();
    const toolbarOrientation = getToolbarOrientation();
</script>
<Separator
    {...rest}
    bind:element
    orientation={orientation ?? (toolbarOrientation() === 'horizontal' ? 'vertical' : 'horizontal')}
/>
