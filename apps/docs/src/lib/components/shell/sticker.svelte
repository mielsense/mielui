<script lang="ts">
    import HugeiconsIcon from '@mielui/svelte/hugeicons-icon';
    import type { ShellIcon } from './page-icon';

    let {
        icon,
        mesh,
        size = 24
    }: {
        icon: ShellIcon;
        mesh: string;
        size?: number;
    } = $props();
</script>

<!--
    @component
    A small tilted gradient tile with a white glyph. It springs upright when the
    `group/section` around it is hovered.
-->

<span
    aria-hidden="true"
    class="grain grid shrink-0 -rotate-6 place-items-center text-white shadow-[0_2px_6px_rgb(0_0_0/0.12)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/section:rotate-3 group-hover/section:scale-110 motion-reduce:transition-none"
    style:background={mesh}
    style:width={`${size}px`}
    style:height={`${size}px`}
    style:border-radius={`${Math.round(size * 0.29)}px`}
>
    <HugeiconsIcon {icon} size={Math.round(size / 2)} strokeWidth={2} />
</span>
