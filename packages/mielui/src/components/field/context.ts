import { createContext } from '@mielui/svelte/utils';
import type { FieldControlAttributes, FieldIssue } from '.';

export type FieldContext = {
    readonly controlId: string;
    readonly invalid: boolean;
    readonly disabled: boolean;
    readonly required: boolean;
    readonly issues: readonly FieldIssue[];
    readonly control: FieldControlAttributes;
};

const { set: setFieldContext, get: getFieldContext } = createContext<FieldContext>('field');

export { getFieldContext, setFieldContext };
