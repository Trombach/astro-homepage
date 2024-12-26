<script lang="ts">
import { onMount } from "svelte";

let showCloseIcon = $state(false);
let header: HTMLElement | null;

onMount(() => {
  header = document.querySelector("[data-header]");
  showCloseIcon = header?.dataset.header === "expanded";
});

const onclick = () => {
  showCloseIcon = !showCloseIcon;
  if (!header) return;

  if (header.dataset.header === "collapsed") {
    header.dataset.header = "expanded";
  } else {
    header.dataset.header = "collapsed";
  }
};
</script>

<button class="p-1 sm:hidden" popovertarget="menu-container" {onclick}>
  <svg
    class="group/hamburger fill-foreground size-8"
    class:close={showCloseIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
  >
    <g
      transform={showCloseIcon ? "" : "translate(0 -5)"}
      class="transition-transform ease-in"
    >
      <rect
        class="top"
        x="10"
        y={showCloseIcon ? 47.5 : 25}
        width="80"
        height="5"
        rx="2.5"
        transform-origin="center"
      />
      <rect class="middle" x="10" y="50" width="80" height="5" rx="2.5" />
      <rect
        class="bottom"
        x="10"
        y={showCloseIcon ? 47.5 : 75}
        width="80"
        height="5"
        rx="2.5"
        transform-origin="center"
      />
    </g>
  </svg>
  <span class="sr-only">Menu Toggle</span>
</button>

<style>
  svg rect {
    transition:
      rotate calc(var(--header-animation-duration) / 2) ease-in,
      y calc(var(--header-animation-duration) / 2) ease-in
        calc(var(--header-animation-duration) / 2),
      opacity 0ms calc(var(--header-animation-duration) / 2);
  }

  svg.close rect {
    transition:
      y calc(var(--header-animation-duration) / 2) ease-in,
      rotate calc(var(--header-animation-duration) / 2) ease-in
        calc(var(--header-animation-duration) / 2),
      opacity 0ms calc(var(--header-animation-duration) / 2);
  }

  svg.close rect.top {
    rotate: 45deg;
  }

  svg.close rect.middle {
    opacity: 0;
  }

  svg.close rect.bottom {
    rotate: -45deg;
  }
</style>
