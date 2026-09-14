import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLImgAttributes } from 'svelte/elements';
import Root from './avatar.svelte';
import Fallback from './avatar-fallback.svelte';
import Image from './avatar-image.svelte';

export type AvatarProps = {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    shape?: 'circle' | 'square';
    children?: Snippet;
} & DefaultProps;

export type AvatarImageProps = {
    src?: string;
    alt?: string;
} & DefaultProps &
    HTMLImgAttributes;

export type AvatarFallbackProps = {
    children?: Snippet;
} & DefaultProps;

export { Fallback, Image, Root };
