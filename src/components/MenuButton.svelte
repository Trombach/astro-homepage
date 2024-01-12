<script lang="ts">
  import { onMount } from "svelte";

  let showCloseIcon = false;
  export let className: string | undefined = undefined;

  let nav: HTMLElement | null;

  onMount(() => (nav = document.querySelector("nav")));

  const toggle = () => {
    showCloseIcon = !showCloseIcon;
    if (nav?.classList.contains("max-h-96")) {
      nav.classList.replace("max-h-96", "max-h-0");
    } else {
      nav?.classList.replace("max-h-0", "max-h-96");
    }
  };
</script>

<button class={className} on:click={toggle}>
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
        y={showCloseIcon ? 45 : 25}
        width="80"
        height="10"
        rx="5"
      />
      <rect class="middle" x="10" y="50" width="80" height="10" rx="5" />
      <rect
        class="bottom"
        x="10"
        y={showCloseIcon ? 45 : 75}
        width="80"
        height="10"
        rx="5"
      />
    </g>
  </svg>
</button>

<style>
  button {
    padding: 5px;
  }

  svg.hamburger {
    width: 25px;
    height: 25px;
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
