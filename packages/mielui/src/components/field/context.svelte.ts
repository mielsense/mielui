import { createContext } from '@mielui/svelte/utils';
import type { FieldControlAttributes, FieldIssue } from '.';

type FieldContext = {
    readonly controlId: string;
    readonly invalid: boolean;
    readonly disabled: boolean;
    readonly required: boolean;
    readonly issues: readonly FieldIssue[];
    readonly control: FieldControlAttributes;
};

const context = createContext<FieldContext>('field');
export const getFieldContext = context.get;
export const setFieldContext = context.set;
