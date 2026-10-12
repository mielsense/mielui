import { createContext } from '@mielui/svelte/utils';
import type { FileDiffContext } from '.';

const { set: setFileDiffContext, find: findFileDiffContext } =
    createContext<FileDiffContext>('file-diff');

export { findFileDiffContext, setFileDiffContext };
