<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { blur } from "svelte/transition";
  import PlusIcon from "icons:svelte/heroicons/plus";
  import { type PanelNumber } from "./HeroGrid.svelte";

  export let expanded: boolean;
  export let number: PanelNumber;
  export let title: string;

  const dispatch = createEventDispatcher<{ hasExpanded: PanelNumber }>();

  const toggleExpanded = () => {
    expanded = true;
    dispatch("hasExpanded", number);
  };
</script>

<div
  class="relative overflow-clip rounded-[50cqh] border bg-card text-card-foreground backdrop-blur @container/panel lg:h-2/3 lg:rounded-[50cqw]"
  data-panel
  data-expanded={expanded || null}
  class:flex-col={expanded}
>
  {#key expanded}
    <div
      transition:blur
      class="absolute left-0 top-0 h-full w-full"
      class:small-panel={!expanded}
    >
      {#if expanded}
        <slot name="panel" />
      {:else}
        <div class="lg:[writing-mode:_vertical-lr]">
          {title}
        </div>

        <button
          class="rounded-full border bg-background p-2 transition-colors hover:bg-accent/50 active:bg-accent lg:p-3"
          on:click={toggleExpanded}
        >
          <PlusIcon />
        </button>
      {/if}
    </div>
  {/key}
</div>

<style lang="postcss">
  [data-panel] {
    transition: border-radius 250ms ease-in-out 400ms;
  }

  [data-panel][data-expanded="true"] {
    @apply rounded-4xl;
    transition: border-radius 250ms ease-in-out -250ms;
  }

  .small-panel {
    @apply flex items-center justify-end space-x-3 px-3 lg:flex-col lg:space-x-0 lg:space-y-3 lg:py-3;
  }
</style>
