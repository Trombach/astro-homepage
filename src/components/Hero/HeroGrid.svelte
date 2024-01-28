<script lang="ts">
  import PlusIcon from "virtual:icons/heroicons-outline/plus";
</script>

<div class="hero-grid">
  <div id="panel-one">
    <slot name="panelOne" />
    <button><PlusIcon /></button>
  </div>
  <div id="panel-two">
    <slot name="panelTwo" />
    <button><PlusIcon /></button>
  </div>
  <div id="panel-three">
    <slot name="panelThree" />
    <button><PlusIcon /></button>
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
    @apply absolute bottom-0 right-0 rounded-full border border-primary p-3;
  }
</style>
