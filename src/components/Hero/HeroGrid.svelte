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
  data-hero-grid
  on:transitionstart={startTransition}
  on:transitionend={endTransition}
  class="h-full gap-5 p-5 grid max-w-screen-sm lg:max-w-screen-xl m-auto lg:items-center"
>
  <Panel
    title="Welcome"
    href="/"
    number={1}
    {transitioning}
    bind:expanded={expanded[1]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-one" slot="panel" />
  </Panel>

  <Panel
    title="Read About Me"
    href="/about"
    number={2}
    {transitioning}
    bind:expanded={expanded[2]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-two" slot="panel" />
  </Panel>

  <Panel
    title="Learn About My Projects"
    href="/projects"
    number={3}
    {transitioning}
    bind:expanded={expanded[3]}
    on:hasExpanded={toggleOthers}
  >
    <slot name="panel-three" slot="panel" />
  </Panel>

  <Panel
    title="Contact Me"
    href="/contact"
    number={4}
    {transitioning}
    bind:expanded={expanded[4]}
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
