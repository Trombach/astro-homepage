<script lang="ts">
import { onMount } from "svelte";

let showCloseIcon = $state(false);
let header: HTMLElement | null;

onMount(() => {
  header = document.querySelector("[data-header]");
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

<button class="sm:hidden" {onclick}>
  <svg
    class="hamburger fill-foreground"
    class:close={showCloseIcon}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
  >
    <g transform={showCloseIcon ? "" : "translate(0 -5)"}>
      <rect
        class="top"
        x="10"
        y={showCloseIcon ? 47.5 : 25}
        width="80"
        height="5"
        rx="2.5"
      />
      <rect class="middle" x="10" y="50" width="80" height="5" rx="2.5" />
      <rect
        class="bottom"
        x="10"
        y={showCloseIcon ? 47.5 : 75}
        width="80"
        height="5"
        rx="2.5"
      />
    </g>
  </svg>
  <span class="sr-only">Menu Toggle</span>
</button>

<style>
  button {
    @apply p-1;
  }

  svg.hamburger {
    @apply size-8;
  }

  svg.hamburger g {
    transition: transform 300ms ease-in;
  }

  svg.hamburger rect {
    transition:
      rotate 300ms ease-in,
      y 300ms ease-in 300ms,
      opacity 0ms 300ms;
    transform-origin: center;
  }

  svg.hamburger.close rect {
    transition:
      y 300ms ease-in,
      rotate 300ms ease-in 300ms,
      opacity 0ms 300ms;
  }

  svg.hamburger.close rect.top {
    rotate: 45deg;
  }

  svg.hamburger.close rect.middle {
    opacity: 0;
  }

  svg.hamburger.close rect.bottom {
    rotate: -45deg;
  }
</style>
