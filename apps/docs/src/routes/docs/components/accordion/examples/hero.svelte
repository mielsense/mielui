<script lang="ts">
    import * as Accordion from '@mielui/svelte/components/accordion';
</script>

<div class="w-full max-w-md">
    <Accordion.Root type="single" value="item-1">
        <Accordion.Item value="item-1">
            <Accordion.Trigger>Who can access this workspace?</Accordion.Trigger>
            <Accordion.Content>
                Only invited members can open projects. Owners can invite people and change their
                roles.
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-2">
            <Accordion.Trigger>Can I change my plan?</Accordion.Trigger>
            <Accordion.Content>
                Change your plan from Billing. New limits apply immediately, and your existing
                projects stay available.
            </Accordion.Content>
        </Accordion.Item>
        <Accordion.Item value="item-3">
            <Accordion.Trigger>How do I export my data?</Accordion.Trigger>
            <Accordion.Content>
                Open Settings and choose Export. The archive includes your projects, files, and
                member list.
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
</div>
