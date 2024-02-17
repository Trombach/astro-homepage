<script context="module" lang="ts">
  const panels = [1, 2, 3, 4] as const;
  export type PanelNumber = (typeof panels)[number];
</script>

<script lang="ts">
  /* global CustomEvent */

  import Panel from "./Panel.svelte";

  const panelState: { [key in PanelNumber]: boolean } = {
    1: true,
    2: false,
    3: false,
    4: false,
  };

  const toggleOthers = ({
    detail: currentExpanded,
  }: CustomEvent<PanelNumber>) => {
    panels
      .filter((panel) => panel !== currentExpanded)
      .forEach((panel) => (panelState[panel] = false));
  };
</script>

<div
  data-hero-grid
  class="m-auto grid h-full w-full max-w-screen-sm gap-5 p-5 lg:max-w-screen-xl lg:items-center"
>
  <Panel
    title="Welcome"
    number={1}
    bind:expanded={panelState[1]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-one" slot="panel" />
  </Panel>

  <Panel
    title="About Me"
    number={2}
    bind:expanded={panelState[2]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-two" slot="panel" />
  </Panel>

  <Panel
    title="My Projects"
    number={3}
    bind:expanded={panelState[3]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-three" slot="panel" />
  </Panel>

  <Panel
    title="Contact Me"
    number={4}
    bind:expanded={panelState[4]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-four" slot="panel" />
  </Panel>
</div>

<style global lang="postcss">
  [data-hero-grid] {
    --large-panel-width: 8fr;
    transition: grid-template-rows 500ms ease-in-out;
    grid-template-rows: var(--template);

    @media screen(lg) {
      --large-panel-width: 12fr;
      transition: grid-template-columns 500ms ease-in-out;

      grid-template-rows: auto;
      grid-template-columns: var(--template);
    }
  }

  [data-hero-grid]:has(:nth-child(1):is([data-expanded="true"])) {
    --template: var(--large-panel-width) 1fr 1fr 1fr;
  }

  [data-hero-grid]:has(:nth-child(2):is([data-expanded="true"])) {
    --template: 1fr var(--large-panel-width) 1fr 1fr;
  }

  [data-hero-grid]:has(:nth-child(3):is([data-expanded="true"])) {
    --template: 1fr 1fr var(--large-panel-width) 1fr;
  }

  [data-hero-grid]:has(:nth-child(4):is([data-expanded="true"])) {
    --template: 1fr 1fr 1fr var(--large-panel-width);
  }
</style>
