<script lang="ts">
  import { onMount } from "svelte";
  import { fade, fly } from "svelte/transition";
  import Wave from "./Wave.svelte";

  const duration = 1000;

  let ready = false;

  onMount(() => (ready = true));
</script>

{#if ready}
  <div
    in:fade
    class="z-10 mx-auto flex h-full flex-col justify-center space-y-10"
  >
    <h1 in:fly={{ y: 100, duration }} class="flex items-center gap-5 text-9xl">
      <span>
        Hi there,<br />
        I'm <span class="font-bold">Lukas</span>
      </span>
      <Wave />
    </h1>
    <p
      in:fly={{ y: 100, duration, delay: 500 }}
      class="border-l-4 border-foreground pl-2 font-mono text-3xl"
    >
      Software Developer <br />
      Researcher
    </p>
  </div>
{/if}
