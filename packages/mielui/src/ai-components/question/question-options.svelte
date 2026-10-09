<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { QuestionOptionsProps } from '.';
    import { getQuestionContext } from './context.svelte';

    let { class: className, children, ...rest }: QuestionOptionsProps = $props();
    const context = getQuestionContext();
</script>

<div
    {...rest}
    data-ui="question-options"
    data-type={context.type}
    class={cn(className, 'grid gap-0.5 px-1.5 pt-3 pb-2.5 [counter-reset:question-option]')}
>
    {@render children?.()}
</div>
