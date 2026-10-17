import type { DefaultProps } from '@mielui/svelte/utils';
import type { HTMLAttributes } from 'svelte/elements';
import type { HeadingLevel } from '../typography';
import Root from './card.svelte';
import Content from './card-content.svelte';
import Description from './card-description.svelte';
import Footer from './card-footer.svelte';
import Header from './card-header.svelte';
import Title from './card-title.svelte';

export type CardProps = {
    /** `default` is one surface. `inset` puts the content on an inner surface with the footer on the frame. `panel` adds an inner ring. */
    variant?: 'default' | 'panel' | 'inset';
    /**
     * `glass` frosts the card so a backdrop behind it shows through. On `inset`
     * and `panel` cards the frame is frosted and the content surface stays close
     * to opaque. Cards are solid unless you ask for glass.
     */
    surface?: 'solid' | 'glass';
} & DefaultProps;

export type CardHeaderProps = DefaultProps;
export type CardTitleProps = DefaultProps &
    HTMLAttributes<HTMLHeadingElement> & {
        /** Heading level in the surrounding document. Defaults to 2. */
        level?: HeadingLevel;
    };
export type CardDescriptionProps = DefaultProps;
export type CardContentProps = DefaultProps;
export type CardFooterProps = DefaultProps;

export { Content, Description, Footer, Header, Root, Title };
