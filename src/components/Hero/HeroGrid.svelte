<script context="module" lang="ts">
  const panels = [1, 2, 3, 4] as const satisfies number[];
  export type PanelState = "expanded" | "start" | "end";
  export type PanelNumber = (typeof panels)[number];
</script>

<script lang="ts">
  /* global CustomEvent */

  import Panel from "./Panel.svelte";

  const panelStates: { [key in PanelNumber]: PanelState } = {
    1: "expanded",
    2: "end",
    3: "end",
    4: "end",
  };

  const toggleOthers = ({
    detail: currentExpanded,
  }: CustomEvent<PanelNumber>) => {
    panels
      .filter((panel) => panel !== currentExpanded)
      .forEach(
        (panel) =>
          (panelStates[panel] = currentExpanded < panel ? "end" : "start"),
      );
  };
</script>

<div
  data-hero-grid
  class="m-auto flex h-full w-full max-w-screen-sm basis-auto flex-col p-3 lg:max-w-screen-xl lg:flex-row lg:items-center lg:p-5"
>
  <Panel
    title="Welcome"
    number={1}
    bind:state={panelStates[1]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-one" slot="panel" />
  </Panel>

  <Panel
    title="About Me"
    number={2}
    bind:state={panelStates[2]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-two" slot="panel" />
  </Panel>

  <Panel
    title="My Projects"
    number={3}
    bind:state={panelStates[3]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-three" slot="panel" />
  </Panel>

  <Panel
    title="Contact Me"
    number={4}
    bind:state={panelStates[4]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-four" slot="panel" />
  </Panel>
</div>

<style lang="postcss" global>
  [data-hero-grid] {
    --translate-x: 0px;
    --translate-y: 30px;
  }

  @media screen(lg) {
    [data-hero-grid] {
      --translate-x: 50px;
      --translate-y: 0px;
    }
  }

  [data-hero-grid] > :nth-child(1) {
    @apply z-[4];
  }

  [data-hero-grid] > :nth-child(2) {
    @apply z-[3];
  }

  [data-hero-grid] > :nth-child(3) {
    @apply z-[2];
  }

  [data-hero-grid] > :nth-child(4) {
    @apply z-[1];
  }

  [data-hero-grid] > :nth-child(1):is([data-state="start"]) {
    @apply z-[1];
  }

  [data-hero-grid] > :nth-child(2):is([data-state="start"]) {
    @apply z-[2];
  }

  [data-hero-grid] > :nth-child(3):is([data-state="start"]) {
    @apply z-[3];
  }

  [data-hero-grid] > :nth-child(4):is([data-state="expanded"]) {
    @apply z-[4];
  }

  [data-hero-grid] > :nth-child(2):is([data-state="start"]) {
    --translate: translate(
      calc(var(--translate-x) * -1),
      calc(var(--translate-y) * -1)
    );
  }

  [data-hero-grid] > :nth-child(3):is([data-state="start"]) {
    --translate: translate(
      calc(var(--translate-x) * -2),
      calc(var(--translate-y) * -2)
    );
  }

  [data-hero-grid] > :nth-child(2):is([data-state="end"]) {
    --translate: translate(
      calc(var(--translate-x) * 2),
      calc(var(--translate-y) * 2)
    );
  }

  [data-hero-grid] > :nth-child(3):is([data-state="end"]) {
    --translate: translate(
      calc(var(--translate-x) * 1),
      calc(var(--translate-y) * 1)
    );
  }
</style>
