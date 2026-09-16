<script lang="ts">
    import { cn } from '@mielui/svelte/utils';
    import { titleClasses } from '../typography/variants';
    import type { CardTitleProps } from '.';

    let { children, class: classProp, ...rest }: CardTitleProps = $props();
</script>

<h1
    {...rest}
    class={cn(
        classProp,
        'py-1',
        titleClasses
    )}
>
    {@render children?.()}
</h1>
