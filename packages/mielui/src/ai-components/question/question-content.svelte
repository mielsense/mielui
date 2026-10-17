<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import type { QuestionContentProps } from '.';

    let { class: className, children, ...rest }: QuestionContentProps = $props();
</script>

<div class="relative min-w-0 overflow-hidden">
    <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
    <fieldset
        {...rest}
        data-ui="question-content"
        tabindex={rest.tabindex ?? -1}
        class={cn(
            className,
            'm-0 min-w-0 rounded-[var(--radius-md)] border-0 p-0 outline-none focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary'
        )}
    >
        {@render children?.()}
    </fieldset>
</div>
