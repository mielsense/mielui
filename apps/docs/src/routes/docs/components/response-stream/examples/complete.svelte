<script lang="ts">
    import { ResponseStream } from '@mielui/svelte/components/response-stream';
</script>
<div class="w-full max-w-md text-sm leading-relaxed">
    <ResponseStream
        textStream="Your draft is ready. Review the changes, then share it with your team."
        speed={65}
    />
</div>
