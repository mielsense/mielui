<script lang="ts">
    import { prefersReducedMotion } from 'svelte/motion';

    const WIDTH = 6;
    const LIFE = 14;
    const TICK = 240;

    type Slots = { above: string[]; beside: string[] };

    function place(slots: Slots, age: number) {
        if (age < 0 || age >= LIFE) {
            return;
        }
        const line = age < 7 ? slots.beside : slots.above;
        const x = WIDTH - 1 - Math.floor(age / 2.2);
        if (x < 0) {
            return;
        }
        line[x] = age < 3 ? 'z' : age < 10 ? 'Z' : age < 12 ? 'z' : '.';
    }

    function frame(tick: number) {
        const slots: Slots = { above: Array(WIDTH).fill(' '), beside: Array(WIDTH).fill(' ') };
        place(slots, tick % LIFE);
        place(slots, (tick + Math.floor(LIFE / 2)) % LIFE);
        const breathing = Math.floor(tick / 6) % 2 === 1;
        const flick = tick % 41 === 0;
        return {
            above: slots.above.join(''),
            beside: slots.beside.join(''),
            back: breathing ? '_,,,----,,_' : '_,,,---,,_ ',
            tail: flick ? "`-'\\_," : "`-'\\_)"
        };
    }

    let tick = $state(0);
    const cat = $derived(frame(tick));

    $effect(() => {
        if (prefersReducedMotion.current) {
            return;
        }
        const id = setInterval(() => (tick += 1), TICK);
        return () => clearInterval(id);
    });
</script>

<pre
    class="my-7 max-w-full overflow-x-auto font-mono text-[0.8rem] leading-[1.3] text-foreground-muted sm:text-[0.95rem]"
    aria-hidden="true"
>{cat.above} |\      {cat.back}
{cat.beside} /,`.-'`'    -.  ;-;;,_
       |,4-  ) )-,_. ,\ (  `'-'
      '---''(_/--'  {cat.tail}  miel</pre>
