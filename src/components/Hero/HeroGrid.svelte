<script lang="ts">
</script>

<div class="hero-grid">
  <div id="panel-one">
    <slot name="panelOne" />
    <button>+</button>
  </div>
  <div id="panel-two">
    <slot name="panelTwo" />
    <button>+</button>
  </div>
  <div id="panel-three">
    <slot name="panelThree" />
    <button>+</button>
  </div>
</div>

<style lang="postcss">
  .hero-grid,
  .hero-grid * {
    outline: solid red 1px;
  }

  .hero-grid {
    @apply absolute left-0 top-0 flex min-h-screen-less-header w-full flex-col p-5 lg:top-1/3 lg:grid;
  }

  .hero-grid > div[id^="panel"] {
    @apply relative rounded-2xl bg-card text-card-foreground;
  }

  .hero-grid > div[id^="panel"] > button {
    @apply absolute bottom-0 right-0 rounded-full p-3;
  }
</style>
