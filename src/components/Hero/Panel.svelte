<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import PlusIcon from "virtual:icons/heroicons-outline/plus";

  export let expanded: boolean;
  export let number: number;
  export let transitioning: boolean;
  export let title: string;

  const dispatch = createEventDispatcher<{ hasExpanded: number }>();

  const toggleExpanded = () => {
    expanded = true;
    transitioning = true;
    dispatch("hasExpanded", number);
  };
</script>

<div
  class="panel flex items-center justify-end rounded-[50cqh] border border-border bg-card text-card-foreground backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:h-1/2 lg:flex-col lg:rounded-[50cqw]"
  class:expanded
>
  {#if expanded && !transitioning}
    <div in:fade>
      <slot name="panel" />
    </div>
  {:else if !transitioning}
    <div class="lg:[writing-mode:_vertical-rl]" in:fade>
      {title}
    </div>
  {/if}

  <button
    class="m-3 rounded-full border border-border bg-background p-3 whitespace-nowrap overflow-clip [transition:_max-width_1s,_min-width_1s]"
    class:max-w-[50px]={!expanded}
    class:max-w-80={expanded}
    on:click={toggleExpanded}
    disabled={expanded}
  >
    {#if !expanded}<PlusIcon />{:else}{title}{/if}
  </button>
</div>

<style lang="postcss">
  .panel {
    transition: border-radius 250ms ease-in-out 400ms;
  }

  .panel.expanded {
    @apply rounded-4xl;
    transition: border-radius 250ms -250ms;
  }
</style>
