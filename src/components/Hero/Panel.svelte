<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { fly } from "svelte/transition";
  import PlusIcon from "icons:svelte/heroicons/plus";
  import { type PanelNumber } from "./HeroGrid.svelte";

  export let expanded: boolean;
  export let number: PanelNumber;
  export let title: string;
  export let transitionDirection: "left" | "right";

  let direction = 1;

  const dispatch = createEventDispatcher<{ hasExpanded: PanelNumber }>();

  const toggleExpanded = () => {
    expanded = true;
    dispatch("hasExpanded", number);
  };

  $: transitionDirection === "left" ? (direction = 1) : (direction = -1);
</script>

<div
  class="relative rounded-[50cqh] border border-border bg-card text-card-foreground backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:h-2/3 lg:rounded-[50cqw] overflow-clip"
  data-panel
  data-expanded={expanded || null}
  class:flex-col={expanded}
>
  {#key expanded}
    <div
      in:fly={{ delay: 500, x: 300 * direction }}
      out:fly={{ x: -300 * direction }}
      class="absolute inset-0"
      class:small-panel={!expanded}
    >
      {#if expanded}
        <slot name="panel" />
      {:else}
        <div class="lg:[writing-mode:_vertical-lr]">
          {title}
        </div>

        <button
          class="m-3 rounded-full border border-border bg-background p-3"
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
    @apply flex items-center justify-end lg:flex-col;
  }
</style>
