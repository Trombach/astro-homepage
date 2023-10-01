<script lang="ts">
  import { draw, fade } from "svelte/transition";
  import { inner, outer } from "./graph-paths";
  import { onMount } from "svelte";

  let ready = false;
  onMount(() =>
    setTimeout(() => {
      ready = true;
    }, 1000)
  );
</script>

<div>
  <svg
    viewBox="0 0 312.49279 241.62859"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    {#if ready}
      <g>
        {#each inner as path, i}
          <path
            in:draw={{ delay: i * 150, duration: 2500 }}
            out:fade={{ duration: 500 }}
            d={path}
          />
        {/each}
        {#each outer as path, i}
          <path
            in:draw={{ delay: 500 + i * 150, duration: 2500 }}
            out:fade={{ duration: 500 }}
            d={path}
          />
        {/each}
      </g>
    {/if}
  </svg>
</div>

<style>
  div {
    width: 25%;
  }
  div svg path {
    fill: none;
    fill-opacity: 1;
    stroke: white;
    stroke-width: 1.587;
    stroke-linejoin: round;
    stroke-dasharray: none;
    stroke-opacity: 1;
  }
</style>
