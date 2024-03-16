<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { blur } from "svelte/transition";
  import { type PanelNumber, type PanelState } from "./HeroGrid.svelte";

  let expanded: boolean;
  export let state: PanelState;
  export let number: PanelNumber;
  export let title: string;

  const dispatch = createEventDispatcher<{ hasExpanded: PanelNumber }>();

  $: expanded = state === "expanded";

  const toggleExpanded = () => {
    state = "expanded";
    dispatch("hasExpanded", number);
  };
</script>

<div
  class="basis-24 overflow-clip rounded-4xl border bg-card text-card-foreground @container/panel lg:h-2/3 lg:basis-32"
  data-panel
  data-state={state}
>
  {#key expanded}
    <div
      transition:blur
      class="absolute left-0 top-0 h-full w-full overflow-clip"
      class:small-panel={!expanded}
    >
      {#if expanded}
        <slot name="panel" />
      {:else}
        <button
          class="flex h-full w-full items-center justify-center px-1 text-2xl transition-colors hover:bg-accent/50 active:bg-accent"
          on:click={toggleExpanded}
        >
          {title}
        </button>
      {/if}
    </div>
  {/key}
</div>

<style lang="postcss">
  [data-panel] {
    --perspective: 1000px;
    --angle: 45deg;
    --translate: translate(0px);
    --scale: scale(1);

    transition:
      flex-basis 500ms ease-in-out,
      transform 500ms ease-in-out;
    transform: var(--translate) var(--panel-perspective) var(--panel-rotate)
      var(--scale);
  }

  [data-panel][data-state="start"] {
    --panel-perspective: perspective(var(--perspective));
    --panel-rotate: rotateX(calc(var(--angle) * -1));
  }

  @media screen(lg) {
    [data-panel][data-state="start"] {
      --panel-rotate: rotateY(var(--angle));
    }
  }

  [data-panel][data-state="end"] {
    --panel-perspective: perspective(var(--perspective));
    --panel-rotate: rotateX(var(--angle));
  }

  @media screen(lg) {
    [data-panel][data-state="end"] {
      --panel-rotate: rotateY(calc(var(--angle) * -1));
    }
  }

  [data-panel][data-state="expanded"] {
    --panel-perspective: perspective(none);
    --panel-rotate: rotateX(0deg);

    @apply basis-full;
  }

  @media screen(lg) {
    [data-panel][data-state="expanded"] {
      --panel-rotate: rotateY(0deg);
    }
  }

  @media screen and (hover: hover) {
    [data-panel]:not([data-state="expanded"]):hover {
      --panel-perspective: perspective(none);
      --panel-rotate: rotateX(0deg);
      --scale: scale(1.1);
      @apply z-10;
    }

    @media screen(lg) {
      [data-panel]:not([data-state="expanded"]):hover {
        --panel-rotate: rotateY(0deg);
      }
    }
  }

  .small-panel {
    @apply lg:[writing-mode:_vertical-lr];
  }
</style>
