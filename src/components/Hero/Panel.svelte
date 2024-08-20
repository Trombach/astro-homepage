<script lang="ts">
  import { blur } from "svelte/transition";
  import {
    expandPanel,
    getPanelState,
    type PanelNumber,
  } from "./HeroGrid.svelte";

  const transitionDuration = 500;
  const transitionDelay = 100;
  const fadeOutDuration = 250;

  export let number: PanelNumber;
  export let title: string;

  let expanded: boolean;
  const state = getPanelState(number);

  $: expanded = $state === "expanded";
</script>

<div
  data-panel
  data-state={$state}
  class="basis-24 overflow-clip rounded-4xl border bg-card text-card-foreground @container/panel lg:h-2/3 lg:basis-32"
  style:--transition-duration={`${transitionDuration}ms`}
  style:--transition-delay={`${transitionDelay}ms`}
>
  {#key expanded}
    <div
      out:blur={{ duration: fadeOutDuration }}
      in:blur={{
        delay: transitionDuration + fadeOutDuration - transitionDelay,
      }}
      class="h-full w-full overflow-clip"
      class:small-panel={!expanded}
    >
      {#if expanded}
        <slot name="panel" />
      {:else}
        <button
          class="flex h-full w-full items-center justify-center px-1 text-2xl transition-colors hover:bg-accent/50 active:bg-accent"
          on:click={() => expandPanel(number)}
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
      flex-basis var(--transition-duration) ease-in-out var(--transition-delay),
      transform var(--transition-duration) ease-in-out var(--transition-delay);
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
