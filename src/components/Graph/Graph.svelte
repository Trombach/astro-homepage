<script lang="ts">
import { onMount } from "svelte";
import { draw } from "svelte/transition";

const { class: className }: { class: string } = $props();

let show = $state(false);
onMount(() => {
  show = true;
});
</script>

<svg
  viewBox="0 0 312.49279 300"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  class={"p-2 sm:p-3 lg:p-5 " + className}
>
  {#if show}
    <g transform-origin="center" transform="translate(0 45)">
      <path
        transition:draw={{ duration: 2500 }}
        d="m 138.20133,96.169887 36.67167,-0.0021 -18.3441,45.885573 -48.88072,-28.2213 30.55424,-17.662998 18.32544,45.882238"
      />
      <path
        transition:draw={{ delay: 150, duration: 2500 }}
        d="M 174.76114,96.115464 156.42349,64.357912 205.33361,57.301583 V 113.74417 L 174.75988,96.114924 205.33234,57.303514"
      />
      <path
        transition:draw={{ delay: 300, duration: 2500 }}
        d="m 156.30265,64.359737 -18.33402,31.759648 -30.56602,-38.829243 48.88071,-28.221292 0.0195,35.292248 -48.89789,-7.070822"
      />
      <path
        transition:draw={{ delay: 500, duration: 2500 }}
        d="M 156.57449,240.83508 0.79304268,0.79386718 107.67958,113.81476 107.16011,57.218833 0.79315868,0.79341018 156.07603,29.022022"
      />
      <path
        transition:draw={{ delay: 650, duration: 2500 }}
        d="M 0.79374999,0.79456828 H 311.69983 L 156.4551,29.05424 205.3146,57.29965 311.69673,0.79353428 205.35833,113.73817"
      />
      <path
        transition:draw={{ delay: 800, duration: 2500 }}
        d="M 311.67188,0.83369867 156.54774,240.81234 l 48.87763,-126.99173 -48.87898,28.22029 0.001,98.76524 -48.92968,-127.09951"
      />
    </g>
  {/if}
</svg>

<style lang="postcss">
  svg path {
    fill: none;
    fill-opacity: 1;
    stroke-linejoin: round;
    stroke-dasharray: none;
    stroke-opacity: 1;
    width: 1;
    @apply stroke-foreground stroke-2;
  }
</style>