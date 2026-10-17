import { createContext } from '@mielui/svelte/utils';
import type { ComposerLabels, ComposerStatus } from '.';

export type ComposerContext = {
    value: string;
    readonly status: ComposerStatus;
    readonly disabled: boolean;
    readonly allowEmpty: boolean;
    readonly generating: boolean | undefined;
    readonly pending: boolean;
    readonly joinedToolbar: boolean;
    submit: () => void;
    stop: () => void;
    setJoinedToolbar: (next: boolean) => void;
};

const { set: setComposerContext, get: getComposerContext } =
    createContext<ComposerContext>('composer');

const { set: setComposerLabels, find: findComposerLabels } =
    createContext<() => ComposerLabels | undefined>('composer-labels');

export { findComposerLabels, getComposerContext, setComposerContext, setComposerLabels };
