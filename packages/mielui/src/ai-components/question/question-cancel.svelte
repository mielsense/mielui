<script lang="ts">
    import { Button } from '@mielui/svelte/components/button';
    import { buttonAttributes } from '../../components/_internal/button-attributes';
    import type { QuestionActionProps } from '.';
    import { getQuestionContext } from './context.svelte';

    let { children, disabled = false, onclick, ...rest }: QuestionActionProps = $props();
    const context = getQuestionContext();
</script>

<Button
    {...buttonAttributes(rest)}
    type="button"
    variant="quiet"
    size="md"
    data-ui="question-cancel"
    disabled={context.disabled || context.busy || !!disabled}
    onclick={(event: MouseEvent) => {
        onclick?.(event);
        if (!event.defaultPrevented) {
            context.cancel(event);
        }
    }}
>
    {@render children?.()}
</Button>
