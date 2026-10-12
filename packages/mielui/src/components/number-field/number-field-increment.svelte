<script lang="ts">
    import type { NumberFieldStepperProps } from '.';
    import Stepper from './number-field-stepper.svelte';

    let { element = $bindable(), ...rest }: NumberFieldStepperProps = $props();
</script>

<Stepper {...rest} bind:element direction={1} />
