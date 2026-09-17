<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import type { FormSubmitProps } from '.';
    import { getFormContext } from './context.svelte';

    let { children, loading, element = $bindable(), ...rest }: FormSubmitProps = $props();
    const form = getFormContext();
</script>

<Button
    {...rest}
    bind:element
    type="submit"
    loading={loading ?? form.pending}
    data-ui="form-submit"
>
    {@render children?.()}
</Button>
