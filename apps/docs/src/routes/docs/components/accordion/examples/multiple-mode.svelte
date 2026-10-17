<script lang="ts">
    import * as Accordion from '@mielui/svelte/components/accordion';
</script>

<div class="w-full max-w-md">
    <Accordion.Root type="multiple">
        <Accordion.Item value="shipping">
            <Accordion.Trigger>Shipping</Accordion.Trigger>
            <Accordion.Content>
                Orders ship within two working days. Open returns too to compare both policies.
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="returns">
            <Accordion.Trigger>Returns</Accordion.Trigger>
            <Accordion.Content>
                Return anything within 30 days. Shipping stays open while you read this.
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
</div>
