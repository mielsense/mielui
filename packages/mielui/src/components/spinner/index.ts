import Spinner from './spinner.svelte';

export type SpinnerProps = {
    /** Diameter in pixels. */
    size?: number;
    /** Marks the work as finished. */
    ready?: boolean;
    /** Rotation speed multiplier. */
    speed?: number;
    /** Speeds up and slows down through each turn instead of spinning at a steady pace. */
    eased?: boolean;
    /** Classes added to the element. */
    class?: string;
    /** Accessible name when there is no visible label. */
    'aria-label'?: string;
    /** Hides it from assistive technology when it is decorative. */
    'aria-hidden'?: boolean | 'true' | 'false';
};

export { Spinner };
