<script lang="ts">
  import Panel from "./Panel.svelte";

  let transitioning = false;

  const expanded = { 1: true, 2: false, 3: false, 4: false };
  const panels: (keyof typeof expanded)[] = [1, 2, 3, 4] as const;

  const toggleOthers = ({ detail: expandedPanel }: CustomEvent<number>) => {
    panels
      .filter((panel) => panel !== expandedPanel)
      .forEach((panel) => (expanded[panel] = false));
  };
  const startTransition = () => (transitioning = true);
  const endTransition = () => (transitioning = false);
</script>

<div
  on:transitionstart={startTransition}
  on:transitionend={endTransition}
  class="h-full gap-5 px-5 grid max-w-screen-sm lg:max-w-screen-lg lg:h-full m-auto lg:items-center"
>
  <Panel
    title="Welcome"
    number={1}
    {transitioning}
    bind:expanded={expanded[1]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-one" slot="panel" />
  </Panel>

  <Panel
    title="About Me"
    number={2}
    {transitioning}
    bind:expanded={expanded[2]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-two" slot="panel" />
  </Panel>

  <Panel
    number={3}
    title="My projects"
    {transitioning}
    bind:expanded={expanded[3]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-three" slot="panel" />
  </Panel>

  <Panel
    number={4}
    title="Contact Me"
    {transitioning}
    bind:expanded={expanded[4]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-four" slot="panel" />
  </Panel>
</div>

<style global lang="postcss">
  .grid {
    transition: grid-template-rows 500ms ease-in-out;
    grid-template-rows: var(--template);

    @media screen(lg) {
      transition: grid-template-columns 500ms ease-in-out;

      grid-template-rows: auto;
      grid-template-columns: var(--template);
    }
  }

  .grid:has(:nth-child(1):is(.expanded)) {
    --template: 8fr 1fr 1fr 1fr;
  }

  .grid:has(:nth-child(2):is(.expanded)) {
    --template: 1fr 8fr 1fr 1fr;
  }

  .grid:has(:nth-child(3):is(.expanded)) {
    --template: 1fr 1fr 8fr 1fr;
  }

  .grid:has(:nth-child(4):is(.expanded)) {
    --template: 1fr 1fr 1fr 8fr;
  }
</style>
