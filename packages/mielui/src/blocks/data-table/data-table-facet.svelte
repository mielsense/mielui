<script
    lang="ts"
    generics="TFeatures extends import('@tanstack/svelte-table').TableFeatures, TData extends import('@tanstack/svelte-table').RowData"
>
    import { parseDate } from '@internationalized/date';
    import { cn } from '@mielui/svelte/utils';
    import { Button } from '../../components/button';
    import { Checkbox } from '../../components/checkbox';
    import * as DatePicker from '../../components/date-picker';
    import { Input } from '../../components/input';
    import * as NativeSelect from '../../components/native-select';
    import * as Popover from '../../components/popover';
    import type { DataTableFacetProps } from '.';
    import { filterableColumn } from './features';
    import { filterSummary, readFilter } from './filter';

    let {
        table,
        filter,
        open = $bindable(false),
        onOpenChange,
        onRemove,
        class: className
    }: DataTableFacetProps<TFeatures, TData> = $props();
    const target = $derived(table.getColumn(filter.column));
    const column = $derived(target ? filterableColumn(target) : undefined);
    const raw = $derived(column?.getFilterValue?.());
    const clause = $derived(readFilter(raw));
    let chosenOperator = $state<string>();
    const operator = $derived(
        chosenOperator ??
            clause?.operator ??
            (filter.type === 'text' ? 'contains' : filter.type === 'select' ? 'in' : 'between')
    );
    const dateIndices = $derived<readonly (0 | 1)[]>(operator === 'between' ? [0, 1] : [0]);
    $effect(() => {
        chosenOperator = clause?.operator;
    });
    const description = $derived.by(() => {
        if (filter.type === 'select' && clause?.type === 'select' && clause.value.length === 1) {
            const label = filter.options.find((option) => option.value === clause.value[0])?.label;
            if (label) {
                return clause.operator === 'notIn' ? `not ${label}` : label;
            }
        }
        return filterSummary(clause);
    });
    const value = $derived(clause?.value);
    const operators = $derived(
        filter.type === 'text'
            ? [
                  { value: 'contains', label: 'Contains' },
                  { value: 'equals', label: 'Is exactly' },
                  { value: 'not', label: 'Is not' }
              ]
            : filter.type === 'select'
              ? [
                    { value: 'in', label: 'Is any of' },
                    { value: 'notIn', label: 'Is none of' }
                ]
              : [
                    { value: 'between', label: 'Between' },
                    { value: 'equals', label: 'Is exactly' },
                    { value: 'gte', label: filter.type === 'date' ? 'On or after' : 'At least' },
                    { value: 'lte', label: filter.type === 'date' ? 'On or before' : 'At most' }
                ]
    );
    function setValue(next: unknown) {
        column?.setFilterValue?.(next);
    }
    function commit(next: unknown, nextOperator = operator) {
        const empty =
            next === undefined ||
            next === '' ||
            (Array.isArray(next) && next.every((item) => item === undefined || item === ''));
        if (empty) {
            setValue(undefined);
            return;
        }
        const nextClause = readFilter({ type: filter.type, operator: nextOperator, value: next });
        setValue(nextClause);
    }
    function changeOperator(next: string) {
        chosenOperator = next;
        if (filter.type === 'number' || filter.type === 'date') {
            commit(
                next === 'between'
                    ? Array.isArray(value)
                        ? value
                        : [value, undefined]
                    : Array.isArray(value)
                      ? value[0]
                      : value,
                next
            );
        } else {
            commit(value, next);
        }
    }
    function setBound(index: 0 | 1, next: string | number | undefined) {
        const bounds = Array.isArray(value) ? [...value] : [undefined, undefined];
        bounds[index] = next;
        commit(bounds);
    }
    function numericValue(input: HTMLInputElement, index?: 0 | 1) {
        if (!input.validity.valid) {
            input.reportValidity();
            return;
        }
        const next = input.value === '' ? undefined : input.valueAsNumber;
        if (index === undefined) {
            commit(next);
        } else {
            setBound(index, next);
        }
    }
    function dateValue(source: unknown) {
        if (typeof source !== 'string' || !source) {
            return undefined;
        }
        try {
            return parseDate(source);
        } catch {
            return undefined;
        }
    }
</script>
<Popover.Root bind:open {onOpenChange} inert={false} placement="bottom-start">
    <Popover.Trigger
        variant="outline"
        size="md"
        class={cn(className, 'max-w-full gap-2')}
        disabled={!column?.getCanFilter?.()}
    >
        <span>{filter.label}</span>
        {#if description}
            <span aria-hidden="true" class="h-4 w-px bg-border"></span>
            <span class="max-w-40 truncate text-foreground-muted">{description}</span>
        {/if}
    </Popover.Trigger>
    <Popover.Content
        class="w-72"
        surfaceClass="flex flex-col gap-3 p-3"
        focusTrap
        lockScroll={false}
        dismissLayer={false}
        aria-label={`${filter.label} filter`}
    >
        <Popover.Title>{filter.label}</Popover.Title>
        {#if filter.editor}
            {@render filter.editor({ value: raw, setValue })}
        {:else}
            <NativeSelect.Root
                aria-label={`${filter.label} operator`}
                value={operator}
                onchange={(event) => {
                    changeOperator(event.currentTarget.value);
                }}
            >
                {#each operators as item (item.value)}
                    <NativeSelect.Option value={item.value}>{item.label}</NativeSelect.Option>
                {/each}
            </NativeSelect.Root>
            {#if filter.type === 'text'}
                <Input
                    aria-label={`${filter.label} value`}
                    placeholder={filter.placeholder ?? 'Enter a value…'}
                    value={typeof value === 'string' ? value : ''}
                    oninput={(event) => {
                        commit(event.currentTarget.value);
                    }}
                />
            {:else if filter.type === 'select'}
                <div class="flex max-h-60 flex-col gap-1 overflow-auto">
                    {#each filter.options as option (option.value)}
                        {const selected = $derived(
                            Array.isArray(value) && value.some((item) => item === option.value)
                        )}
                        <Checkbox
                            class="min-h-9 items-center rounded-md px-2 py-2 hover:bg-secondary"
                            label={option.label}
                            checked={selected}
                            onCheckedChange={(checked) => {
                                const current = Array.isArray(value)
                                ? value.filter((item): item is string => typeof item === 'string')
                                : [];
                                commit(checked
                                ? [...current, option.value]
                                : current.filter((item) => item !== option.value));
                            }}
                        />
                    {/each}
                </div>
            {:else if filter.type === 'number'}
                {#if operator === 'between'}
                    <div class="grid grid-cols-2 gap-2">
                        <Input
                            type="number"
                            aria-label={`${filter.label} minimum`}
                            placeholder="Minimum"
                            min={filter.min}
                            max={filter.max}
                            step={filter.step ?? 'any'}
                            value={Array.isArray(value) ? value[0] : undefined}
                            oninput={(event) => {
                                numericValue(event.currentTarget, 0);
                            }}
                        />
                        <Input
                            type="number"
                            aria-label={`${filter.label} maximum`}
                            placeholder="Maximum"
                            min={filter.min}
                            max={filter.max}
                            step={filter.step ?? 'any'}
                            value={Array.isArray(value) ? value[1] : undefined}
                            oninput={(event) => {
                                numericValue(event.currentTarget, 1);
                            }}
                        />
                    </div>
                {:else}
                    <Input
                        type="number"
                        aria-label={`${filter.label} value`}
                        min={filter.min}
                        max={filter.max}
                        step={filter.step ?? 'any'}
                        value={typeof value === 'number' ? value : undefined}
                        oninput={(event) => {
                            numericValue(event.currentTarget);
                        }}
                    />
                {/if}
            {:else}
                {#each dateIndices as index}
                    <DatePicker.Root
                        value={dateValue(Array.isArray(value) ? value[index] : value)}
                        onValueChange={(date) => {
                            if (operator === 'between') {
                                setBound(index, date?.toString());
                            } else {
                                commit(date?.toString());
                            }
                        }}
                    >
                        <DatePicker.Label>
                            {operator === 'between' ? (index === 0 ? 'From' : 'Through') : 'Date'}
                        </DatePicker.Label>
                        <div class="flex items-center gap-1">
                            <DatePicker.Input />
                            <DatePicker.Trigger />
                        </div>
                        <DatePicker.Content><DatePicker.Calendar /></DatePicker.Content>
                    </DatePicker.Root>
                {/each}
            {/if}
        {/if}
        <div class="flex items-center justify-between gap-2 border-t border-border pt-3">
            <Button
                variant="ghost"
                size="sm"
                onclick={() => {
                    setValue(undefined);
                    open = false;
                    onOpenChange?.(false);
                    onRemove?.();
                }}
            >
                Remove filter
            </Button>
            <Button
                variant="secondary"
                size="sm"
                onclick={() => {
                    open = false;
                    onOpenChange?.(false);
                }}
            >
                Done
            </Button>
        </div>
    </Popover.Content>
</Popover.Root>
