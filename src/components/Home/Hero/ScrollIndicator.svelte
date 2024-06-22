<script lang="ts">
  import { onMount } from "svelte";
  import DownIcon from "icons:svelte/heroicons/arrow-down-circle";
  import { fade } from "svelte/transition";

  let ready = false;

  onMount(() => (ready = true));
</script>

{#if ready}
  <div transition:fade={{ delay: 5000 }}>
    <DownIcon width="72" height="72" class="mb-5 animate-bounce" />
  </div>
{/if}
