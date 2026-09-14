<script lang="ts">
    import { Progress } from '@mielui/svelte/components/progress';
    import { Skeleton } from '@mielui/svelte/components/skeleton';
    import { Toaster } from '@mielui/svelte/components/toast';
</script>

<div data-testid="motion-skeleton"><Skeleton /></div>
<Progress data-testid="motion-progress" indeterminate />
<Toaster />
