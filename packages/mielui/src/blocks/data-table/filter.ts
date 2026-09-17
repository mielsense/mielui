import { parseDate } from '@internationalized/date';
import type { Row, RowData, TableFeatures } from '@tanstack/svelte-table';
import type { DataTableFilterClause } from '.';

function validDate(value: unknown) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }
    try {
        return parseDate(value).toString() === value;
    } catch {
        return false;
    }
}

export function readFilter(value: unknown): DataTableFilterClause | undefined {
    if (
        !value ||
        typeof value !== 'object' ||
        !('type' in value) ||
        !('operator' in value) ||
        !('value' in value)
    ) {
        return undefined;
    }
    const operand = value.value;
    if (
        value.type === 'text' &&
        ['contains', 'equals', 'not'].includes(String(value.operator)) &&
        typeof operand === 'string'
    ) {
        return value as DataTableFilterClause;
    }
    if (
        value.type === 'select' &&
        ['in', 'notIn'].includes(String(value.operator)) &&
        Array.isArray(operand) &&
        operand.every((item) => typeof item === 'string')
    ) {
        return value as DataTableFilterClause;
    }
    if (value.type === 'number' || value.type === 'date') {
        const valid = (item: unknown) => {
            return value.type === 'number'
                ? typeof item === 'number' && Number.isFinite(item)
                : validDate(item);
        };
        if (
            value.operator === 'between' &&
            Array.isArray(operand) &&
            operand.length === 2 &&
            operand.every((item) => item === undefined || valid(item))
        ) {
            return value as DataTableFilterClause;
        }
        if (
            ['equals', 'lt', 'lte', 'gt', 'gte'].includes(String(value.operator)) &&
            valid(operand)
        ) {
            return value as DataTableFilterClause;
        }
    }
    return undefined;
}

export function dataTableFilter<TFeatures extends TableFeatures, TData extends RowData>(
    row: Row<TFeatures, TData>,
    columnId: string,
    value: unknown
) {
    const clause = readFilter(value);
    if (!clause) {
        return true;
    }
    const source: unknown = row.getValue(columnId);
    if (clause.type === 'text') {
        const text = String(source ?? '').toLowerCase();
        const query = clause.value.toLowerCase();
        if (clause.operator === 'contains') {
            return text.includes(query);
        }
        return clause.operator === 'equals' ? text === query : text !== query;
    }
    if (clause.type === 'select') {
        const values = Array.isArray(source) ? source.map(String) : [String(source ?? '')];
        const matches = values.some((item) => clause.value.includes(item));
        return clause.operator === 'in' ? matches : !matches;
    }
    const candidate =
        clause.type === 'number'
            ? typeof source === 'number'
                ? source
                : Number.NaN
            : String(source ?? '').slice(0, 10);
    if (clause.type === 'date' && !validDate(candidate)) {
        return false;
    }
    if (typeof candidate === 'number' && !Number.isFinite(candidate)) {
        return false;
    }
    if (clause.operator === 'between') {
        const [min, max] = clause.value;
        if (typeof candidate === 'number' && clause.type === 'number') {
            return (
                (min === undefined || candidate >= Number(min)) &&
                (max === undefined || candidate <= Number(max))
            );
        }
        return (
            (min === undefined || String(candidate) >= String(min)) &&
            (max === undefined || String(candidate) <= String(max))
        );
    }
    if (typeof candidate !== typeof clause.value) {
        return false;
    }
    if (clause.operator === 'equals') {
        return candidate === clause.value;
    }
    if (clause.operator === 'lt') {
        return candidate < clause.value;
    }
    if (clause.operator === 'lte') {
        return candidate <= clause.value;
    }
    if (clause.operator === 'gt') {
        return candidate > clause.value;
    }
    return candidate >= clause.value;
}

export function filterSummary(clause: DataTableFilterClause | undefined) {
    if (!clause) {
        return '';
    }
    if (clause.type === 'select') {
        return `${clause.operator === 'notIn' ? 'not ' : ''}${clause.value.length} selected`;
    }
    if (clause.operator === 'between') {
        return `${clause.value[0] ?? 'Any'} – ${clause.value[1] ?? 'Any'}`;
    }
    const operators = {
        contains: 'contains',
        equals: 'is',
        not: 'is not',
        lt: '<',
        lte: '≤',
        gt: '>',
        gte: '≥'
    };
    return `${operators[clause.operator]} ${clause.value}`;
}
