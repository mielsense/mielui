<script lang="ts">
    import {
        TextAlignCenterIcon as AlignCenter,
        TextAlignLeftIcon as AlignLeft,
        TextAlignRightIcon as AlignRight,
        TextBoldIcon as Bold,
        ArrowDown01Icon as ChevronDown,
        InboxIcon as Inbox,
        TextItalicIcon as Italic,
        Moon02Icon as Moon,
        PenTool01Icon as Pen,
        PlusSignIcon as Plus,
        MousePointer01Icon as Pointer,
        Search01Icon as Search,
        SquareIcon as Square,
        TextFontIcon as TextFont,
        Upload04Icon as Upload,
        Edit02Icon as Write
    } from '@hugeicons/core-free-icons';
    import { CalendarDate } from '@internationalized/date';
    import { Button } from '@mielui/svelte/components/button';
    import * as Calendar from '@mielui/svelte/components/calendar';
    import { Checkbox } from '@mielui/svelte/components/checkbox';
    import * as ColorPicker from '@mielui/svelte/components/color-picker';
    import * as Combobox from '@mielui/svelte/components/combobox';
    import { CopyButton } from '@mielui/svelte/components/copy-button';
    import * as DatePicker from '@mielui/svelte/components/date-picker';
    import * as DateRangePicker from '@mielui/svelte/components/date-range-picker';
    import * as DropdownMenu from '@mielui/svelte/components/dropdown-menu';
    import * as Field from '@mielui/svelte/components/field';
    import * as Fieldset from '@mielui/svelte/components/fieldset';
    import * as FileUpload from '@mielui/svelte/components/file-upload';
    import * as Form from '@mielui/svelte/components/form';
    import * as Group from '@mielui/svelte/components/group';
    import { Input } from '@mielui/svelte/components/input';
    import Kbd from '@mielui/svelte/components/kbd';
    import { Label } from '@mielui/svelte/components/label';
    import * as NativeSelect from '@mielui/svelte/components/native-select';
    import * as NumberField from '@mielui/svelte/components/number-field';
    import * as OTPField from '@mielui/svelte/components/otp-field';
    import { Progress } from '@mielui/svelte/components/progress';
    import * as RadioGroup from '@mielui/svelte/components/radio-group';
    import * as RangeCalendar from '@mielui/svelte/components/range-calendar';
    import * as Select from '@mielui/svelte/components/select';
    import { Slider } from '@mielui/svelte/components/slider';
    import { Switch } from '@mielui/svelte/components/switch';
    import * as TagInput from '@mielui/svelte/components/tag-input';
    import { Textarea } from '@mielui/svelte/components/textarea';
    import { Toggle } from '@mielui/svelte/components/toggle';
    import * as ToggleGroup from '@mielui/svelte/components/toggle-group';
    import * as Toolbar from '@mielui/svelte/components/toolbar';
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import {
        floatingFrame,
        floatingSurface,
        highlightedItem,
        menu,
        modalFrame
    } from './shapes.svelte';

    let { slug }: { slug: string } = $props();

    async function uploadPreview(
        _file: File,
        { signal, onProgress }: Parameters<FileUpload.FileUploadProps['onUpload']>[1]
    ) {
        signal.throwIfAborted();
        onProgress(100);
    }

    const id = $props.id();
    const date = new CalendarDate(2026, 9, 17);
    const range = {
        start: new CalendarDate(2026, 9, 17),
        end: new CalendarDate(2026, 9, 23)
    };
    const commandItems = [
        {
            label: 'Inbox',
            icon: Inbox
        },
        {
            label: 'New issue',
            icon: Write,
            shortcut: 'C'
        },
        {
            label: 'Theme',
            icon: Moon
        }
    ];
    const tools = [
        {
            value: 'move',
            label: 'Move',
            icon: Pointer
        },
        {
            value: 'pen',
            label: 'Pen',
            icon: Pen
        },
        {
            value: 'shape',
            label: 'Rectangle',
            icon: Square
        },
        {
            value: 'text',
            label: 'Text',
            icon: TextFont
        }
    ];
</script>

{#if slug === 'button'}
    <div class="flex items-center gap-2">
        <Button>Continue</Button>
        <Button variant="outline">Cancel</Button>
    </div>
{:else if slug === 'calendar'}
    <div
        class="self-start rounded-[var(--radius-xl)] border-[length:var(--border-size)] border-border bg-card [mask-image:linear-gradient(to_bottom,black_65%,transparent)]"
    >
        <Calendar.Root value={date} calendarLabel="Meeting date" />
    </div>
{:else if slug === 'range-calendar'}
    <div
        class="self-start rounded-[var(--radius-xl)] border-[length:var(--border-size)] border-border bg-card [mask-image:linear-gradient(to_bottom,black_65%,transparent)]"
    >
        <RangeCalendar.Root value={range} calendarLabel="Travel dates" />
    </div>
{:else if slug === 'date-picker'}
    <DatePicker.Root value={date} calendarLabel="Publish date">
        <div class="grid w-60 gap-2">
            <DatePicker.Label>Publish date</DatePicker.Label>
            <Group.Root aria-label="Publish date controls" class="w-full">
                <DatePicker.Input />
                <Group.Separator />
                <DatePicker.Trigger />
            </Group.Root>
        </div>
    </DatePicker.Root>
{:else if slug === 'date-range-picker'}
    <DateRangePicker.Root value={range} calendarLabel="Travel dates">
        <div class="grid w-fit gap-2">
            <DateRangePicker.Label>Travel dates</DateRangePicker.Label>
            <div class="flex items-center gap-2">
                <DateRangePicker.Input type="start" aria-label="Start date" />
                <DateRangePicker.Input type="end" aria-label="End date" />
                <DateRangePicker.Trigger />
            </div>
        </div>
    </DateRangePicker.Root>
{:else if slug === 'checkbox'}
    <div class="flex w-48 flex-col gap-3">
        <Checkbox checked label="Finalize pricing" />
        <Checkbox checked label="Write the changelog" />
        <Checkbox label="Update screenshots" />
    </div>
{:else if slug === 'radio-group'}
    <RadioGroup.Root value="pro" name={`${id}-plan`} class="w-48">
        <RadioGroup.Item value="free" label="Free" />
        <RadioGroup.Item value="pro" label="Pro" />
        <RadioGroup.Item value="team" label="Team" />
    </RadioGroup.Root>
{:else if slug === 'select'}
    <div class="flex w-52 flex-col gap-1">
        <Select.Root value="medium">
            <Select.Trigger variant="outline" aria-label="Priority" class="w-full">
                Medium
            </Select.Trigger>
        </Select.Root>
        {@render menu(['High', 'Medium', 'Low'], 1)}
    </div>
{:else if slug === 'native-select'}
    <div class="flex w-56 flex-col gap-2">
        <Label for={`${id}-timezone`}>Time zone</Label>
        <NativeSelect.Root id={`${id}-timezone`} value="Europe/Paris">
            <NativeSelect.Option value="Europe/Paris">Paris</NativeSelect.Option>
            <NativeSelect.Option value="Europe/London">London</NativeSelect.Option>
        </NativeSelect.Root>
    </div>
{:else if slug === 'combobox'}
    <div class="flex w-56 flex-col gap-1">
        <Combobox.Root>
            <Combobox.Trigger placeholder="Select a framework" class="w-full" />
        </Combobox.Root>
        {@render menu(['SvelteKit', 'Astro', 'Remix'], 0)}
    </div>
{:else if slug === 'dropdown-menu'}
    <div class="flex w-48 flex-col items-start gap-1">
        <DropdownMenu.Root>
            <DropdownMenu.Trigger variant="outline">
                My account
                <HugeiconsIcon
                    icon={ChevronDown}
                    size={14}
                    class="text-foreground-muted"
                    aria-hidden="true"
                />
            </DropdownMenu.Trigger>
        </DropdownMenu.Root>
        {@render menu(['Profile', 'Billing', 'Settings'], 0, 'alex@example.com')}
    </div>
{:else if slug === 'context-menu'}
    <div class="relative flex w-64 flex-col items-start">
        <div
            class="flex h-20 w-full items-start rounded-[var(--radius-lg)] border-[length:var(--border-size)] border-dashed border-border p-3 text-foreground-muted"
        >
            Right-click a file
        </div>
        <div class="-mt-9 ml-14 w-44">{@render menu(['Open', 'Duplicate', 'Delete'], 1)}</div>
    </div>
{:else if slug === 'command'}
    <div class={`${modalFrame} w-64 text-sm`}>
        <div class="flex h-9 items-center gap-2 px-2.5 text-foreground-muted">
            <HugeiconsIcon icon={Search} size={14} aria-hidden="true" />
            <span>Type a command…</span>
        </div>
        <div class={floatingSurface}>
            {#each commandItems as item, index (item.label)}
                <span class={`mielui-menu-item ${index === 0 ? highlightedItem : ''}`}>
                    <HugeiconsIcon icon={item.icon} size={16} aria-hidden="true" />
                    <span class="flex-1">{item.label}</span>
                    {#if item.shortcut}
                        <Kbd shortcut={item.shortcut} />
                    {/if}
                </span>
            {/each}
        </div>
    </div>
{:else if slug === 'input'}
    <div class="w-60">
        <Input label="Display name" value="Alex Morgan" />
    </div>
{:else if slug === 'label'}
    <div class="flex w-60 flex-col gap-1.5">
        <Label for={`${id}-email`}>Email address</Label>
        <Input id={`${id}-email`} type="email" placeholder="you@ui.miel.my" />
    </div>
{:else if slug === 'field'}
    <Field.Root class="w-60" required>
        <Field.Label>Work email</Field.Label>
        <Field.Control>
            {#snippet children(control)}
                <Input {...control} type="email" placeholder="you@company.com" />
            {/snippet}
        </Field.Control>
        <Field.Description>Used for account updates.</Field.Description>
    </Field.Root>
{:else if slug === 'textarea'}
    <div class="w-64">
        <Textarea label="Message" value="Please add the launch checklist to the notes." />
    </div>
{:else if slug === 'number-field'}
    <NumberField.Root value={2} min={1} max={12} class="w-40">
        <NumberField.Label>Seats</NumberField.Label>
        <NumberField.Group class="w-36">
            <NumberField.Decrement />
            <NumberField.Input />
            <NumberField.Increment />
        </NumberField.Group>
    </NumberField.Root>
{:else if slug === 'tag-input'}
    <div class="w-64">
        <TagInput.Root tags={['svelte', 'design']} label="Topics">
            <TagInput.List />
            <TagInput.Input placeholder="Add a topic…" />
        </TagInput.Root>
    </div>
{:else if slug === 'otp-field'}
    <div class="flex flex-col gap-2">
        <Label for={`${id}-code`}>Verification code</Label>
        <OTPField.Root id={`${id}-code`} value="284" length={6}>
            {#snippet children({ cells })}
                <OTPField.Group>
                    {#each cells.slice(0, 3) as cell, index (index)}
                        <OTPField.Cell {cell} />
                    {/each}
                </OTPField.Group>
                <OTPField.Separator />
                <OTPField.Group>
                    {#each cells.slice(3) as cell, index (index)}
                        <OTPField.Cell {cell} />
                    {/each}
                </OTPField.Group>
            {/snippet}
        </OTPField.Root>
    </div>
{:else if slug === 'fieldset'}
    <Fieldset.Root class="w-64">
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Field.Group>
            <Field.Root>
                <Field.Label>Full name</Field.Label>
                <Field.Control>
                    {#snippet children(control)}
                        <Input {...control} placeholder="Sam Rivera" />
                    {/snippet}
                </Field.Control>
            </Field.Root>
        </Field.Group>
    </Fieldset.Root>
{:else if slug === 'form'}
    <Form.Root class="w-64">
        <Field.Root>
            <Field.Label>Display name</Field.Label>
            <Field.Control>
                {#snippet children(control)}
                    <Input {...control} placeholder="Sam Rivera" />
                {/snippet}
            </Field.Control>
        </Field.Root>
        <Form.Actions>
            <Form.Submit>Save profile</Form.Submit>
        </Form.Actions>
    </Form.Root>
{:else if slug === 'file-upload'}
    <FileUpload.Root accept="image/*,.pdf" maxFiles={3} onUpload={uploadPreview} class="w-72">
        {#snippet children()}
            <FileUpload.Dropzone>
                <HugeiconsIcon icon={Upload} size={20} class="text-foreground-muted" />
                <p class="text-sm font-medium">Drop your files here</p>
                <FileUpload.Trigger>Choose files</FileUpload.Trigger>
            </FileUpload.Dropzone>
        {/snippet}
    </FileUpload.Root>
{:else if slug === 'group'}
    <Group.Root aria-label="Email subscription" class="w-64">
        <Input type="email" aria-label="Email address" placeholder="Email address" />
        <Group.Separator />
        <Button variant="outline">Subscribe</Button>
    </Group.Root>
{:else if slug === 'toggle-group'}
    <ToggleGroup.Root type="single" value="center">
        <ToggleGroup.Item value="left" aria-label="Align left">
            <HugeiconsIcon icon={AlignLeft} size={14} />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="center" aria-label="Align center">
            <HugeiconsIcon icon={AlignCenter} size={14} />
        </ToggleGroup.Item>
        <ToggleGroup.Item value="right" aria-label="Align right">
            <HugeiconsIcon icon={AlignRight} size={14} />
        </ToggleGroup.Item>
    </ToggleGroup.Root>
{:else if slug === 'toolbar'}
    <Toolbar.Root aria-label="Design tools" class="gap-1 border border-border bg-card p-1">
        <Toolbar.Group type="single" value="move" aria-label="Active tool" class="gap-1">
            {#each tools as tool (tool.value)}
                <Toolbar.Item value={tool.value} aria-label={tool.label}>
                    <HugeiconsIcon icon={tool.icon} size={16} aria-hidden="true" />
                </Toolbar.Item>
            {/each}
        </Toolbar.Group>
        <Toolbar.Separator />
        <Toolbar.Button aria-label="Add frame">
            <HugeiconsIcon icon={Plus} size={16} aria-hidden="true" />
        </Toolbar.Button>
    </Toolbar.Root>
{:else if slug === 'toggle'}
    <div class="flex items-center gap-2">
        <Toggle pressed aria-label="Bold">
            <HugeiconsIcon icon={Bold} size={14} />
        </Toggle>
        <Toggle aria-label="Italic">
            <HugeiconsIcon icon={Italic} size={14} />
        </Toggle>
    </div>
{:else if slug === 'progress'}
    <div class="flex w-60 flex-col gap-3">
        <div class="flex items-center justify-between text-sm">
            <span>Uploading files</span>
            <span class="tabular-nums text-foreground-muted">64%</span>
        </div>
        <Progress value={64} aria-label="Upload progress" />
    </div>
{:else if slug === 'slider'}
    <div class="flex w-60 flex-col gap-3">
        <div class="flex items-center justify-between text-sm">
            <span class="text-foreground-muted">Volume</span>
            <span class="tabular-nums">64</span>
        </div>
        <Slider value={64} label="Volume" />
    </div>
{:else if slug === 'switch'}
    <div class="flex w-48 flex-col gap-4">
        <Switch checked label="Notifications" />
        <Switch label="Quiet mode" />
    </div>
{:else if slug === 'color-picker'}
    <ColorPicker.Root value="#b47da3">
        <div class={`${floatingFrame} w-56`}>
            <div class="mielui-inset-surface flex flex-col overflow-hidden">
                <ColorPicker.Plane />
                <div class="flex items-center gap-2.5 p-2">
                    <ColorPicker.Preview />
                    <div class="min-w-0 flex-1">
                        <ColorPicker.Hue />
                    </div>
                </div>
            </div>
        </div>
    </ColorPicker.Root>
{:else if slug === 'copy-button'}
    <div
        class="flex items-center gap-3 rounded-[calc(var(--radius-control)+var(--spacing)+var(--border-size))] border-[length:var(--border-size)] border-border bg-card py-1 pr-1 pl-3"
    >
        <code class="font-mono text-sm">pnpm add @mielui/svelte</code>
        <CopyButton text="pnpm add @mielui/svelte" label="Copy install command" />
    </div>
{/if}
