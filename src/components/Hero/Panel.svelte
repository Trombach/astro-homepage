<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import PlusIcon from "virtual:icons/heroicons-outline/plus";

  export let expanded: boolean;
  export let number: number;
  export let transitioning: boolean;
  export let title: string;
  export let href: string;

  const dispatch = createEventDispatcher<{ hasExpanded: number }>();

  const toggleExpanded = () => {
    expanded = true;
    transitioning = true;
    dispatch("hasExpanded", number);
  };
</script>

<div
  class="flex items-center justify-end rounded-[50cqh] border border-border bg-card text-card-foreground backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:h-1/2 lg:flex-col lg:rounded-[50cqw]"
  data-panel
  data-expanded={expanded || null}
  class:flex-col={expanded}
>
  {#if expanded && !transitioning}
    <div in:fade>
      <slot name="panel" />
    </div>
  {:else if !transitioning}
    <div in:fade class="lg:[writing-mode:_vertical-lr]">
      {title}
    </div>
  {/if}

  {#if !transitioning}
    {#if !expanded}
      <button
        in:fade
        class="m-3 rounded-full border border-border bg-background p-3"
        on:click={toggleExpanded}
      >
        <PlusIcon />
      </button>
    {:else}
      <a
        in:fade
        {href}
        class="m-3 rounded-full border border-border bg-background p-3"
      >
        {title}
      </a>{/if}
  {/if}
</div>

<style lang="postcss">
  [data-panel] {
    transition: border-radius 250ms ease-in-out 400ms;
  }

  [data-panel][data-expanded="true"] {
    @apply rounded-4xl;
    transition: border-radius 250ms -250ms;
  }
</style>
