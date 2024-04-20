<script context="module" lang="ts">
  import { derived, get, writable } from "svelte/store";

  const panels = [1, 2, 3, 4] as const satisfies number[];
  export type PanelState = "expanded" | "start" | "end";
  export type PanelNumber = (typeof panels)[number];
  export type PanelStates = { [key in PanelNumber]: PanelState };

  const defaultPanelStates = {
    1: "expanded",
    2: "end",
    3: "end",
    4: "end",
  } as const satisfies PanelStates;

  const panelStates = writable<PanelStates>(defaultPanelStates);

  export const expandedPanel = derived(panelStates, ($panelStates) =>
    panels.find((panel) => $panelStates[panel] === "expanded"),
  );

  export const getPanelState = (panelNumber: PanelNumber) =>
    derived(panelStates, ($panelStates) => $panelStates[panelNumber]);

  export const expandPanel = (expandPanel: PanelNumber) => {
    let newPanelStates: PanelStates = { ...defaultPanelStates };

    panels.forEach((panel) => {
      if (panel !== expandPanel) {
        newPanelStates[panel] = expandPanel < panel ? "end" : "start";
      } else {
        newPanelStates[panel] = "expanded";
      }
    });

    panelStates.set(newPanelStates);
  };

  export const expandNextPanel = () => {
    const expanded = get(expandedPanel);

    if (!expanded || expanded === 4) return;
    expandPanel((expanded + 1) as PanelNumber);
  };

  export const expandPreviousPanel = () => {
    const expanded = get(expandedPanel);

    if (!expanded || expanded === 1) return;
    expandPanel((expanded - 1) as PanelNumber);
  };
</script>

<script lang="ts">
  /* global WheelEvent CustomEvent EventTarget HTMLDivElement setTimeout window */

  import Panel from "./Panel.svelte";
  import { swipe } from "svelte-gestures";

  let heroGrid: HTMLDivElement;
  let canWheel = true;
  let pointerType: string;

  const handleWheelEvent = (event: WheelEvent) => {
    if (canWheel) {
      if (event.deltaY > 0) {
        expandNextPanel();
      } else if (event.deltaY < 0) {
        expandPreviousPanel();
      }

      canWheel = false;
      setTimeout(() => (canWheel = true), 500);
    }
  };

  const handleSwipe = ({
    detail: { direction },
  }: CustomEvent<{
    direction: "top" | "right" | "bottom" | "left";
    target: EventTarget;
  }>) => {
    if (pointerType === "touch") {
      const isRow =
        window.getComputedStyle(heroGrid).getPropertyValue("flex-direction") ===
        "row";

      if ((direction === "left" && isRow) || direction === "top") {
        expandNextPanel();
      } else if ((direction === "right" && isRow) || direction === "bottom") {
        expandPreviousPanel();
      }
    }
  };
</script>

<div
  data-hero-grid
  class="
    m-auto flex h-full w-full max-w-screen-sm basis-auto flex-col p-3 md:max-w-screen-md lg:max-w-screen-xl lg:flex-row lg:items-center lg:p-5
    [&>:nth-child(1):is([data-state='start'])]:z-[1] [&>:nth-child(1)]:z-[4] [&>:nth-child(2):is([data-state='start'])]:z-[2] [&>:nth-child(2)]:z-[3]
    [&>:nth-child(3):is([data-state='start'])]:z-[3] [&>:nth-child(3)]:z-[2] [&>:nth-child(4):is([data-state='expanded'])]:z-[4] [&>:nth-child(4)]:z-[1]
  "
  bind:this={heroGrid}
  on:wheel|preventDefault={handleWheelEvent}
  use:swipe
  on:swipe={handleSwipe}
  on:swipemove={(event) => (pointerType = event.detail.event.pointerType)}
>
  <Panel title="Welcome" number={1}>
    <slot name="panel-one" slot="panel" />
  </Panel>

  <Panel title="About Me" number={2}>
    <slot name="panel-two" slot="panel" />
  </Panel>

  <Panel title="My Projects" number={3}>
    <slot name="panel-three" slot="panel" />
  </Panel>

  <Panel title="Contact Me" number={4}>
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
