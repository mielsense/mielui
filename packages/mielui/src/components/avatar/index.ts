import type { DefaultProps } from '@mielui/svelte/utils';
import type { Snippet } from 'svelte';
import type { HTMLImgAttributes } from 'svelte/elements';
import Root from './avatar.svelte';
import Fallback from './avatar-fallback.svelte';
import Image from './avatar-image.svelte';

export type AvatarProps = {
    /** Diameter of the avatar. */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Outline of the avatar. */
    shape?: 'circle' | 'square';
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps;

export type AvatarImageProps = {
    /** Image address. */
    src?: string;
    /** Image description. Leave it empty when the name is shown beside the avatar. */
    alt?: string;
} & DefaultProps &
    HTMLImgAttributes;

export type AvatarFallbackProps = {
    /** Content rendered inside. */
    children?: Snippet;
} & DefaultProps;

export { Fallback, Image, Root };
