<script lang="ts">
    import * as Accordion from '@mielui/svelte/components/accordion';
</script>

<div class="w-full max-w-md">
    <Accordion.Root type="single">
        <Accordion.Item value="billing">
            <Accordion.Trigger>When am I billed?</Accordion.Trigger>
            <Accordion.Content>
                On the first of each month. Only one answer is open at a time.
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="cancel">
            <Accordion.Trigger>Can I cancel anytime?</Accordion.Trigger>
            <Accordion.Content>
                Yes, from Settings. Opening this answer closes the one above.
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
</div>
