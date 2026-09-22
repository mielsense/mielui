import type { DefaultProps } from '@mielui/svelte/utils';
import Gauge from './gauge.svelte';

export type GaugeTone = 'primary' | 'muted' | 'success' | 'warning' | 'error';

export type GaugeProps = {
    /** The bounded quantity shown by the filled arc. */
    value: number;
    max?: number;
    /** Describes the quantity, such as "Context remaining" or "Monthly API usage". */
    label?: string;
    /** Diameter in pixels. Defaults to 120; use an explicit size for inline meters. */
    size?: number;
    /** Arc thickness in pixels. Defaults to one fifteenth of the diameter, with a 2px minimum. */
    strokeWidth?: number;
    tone?: GaugeTone;
} & DefaultProps;

export { Gauge };
export default Gauge;
