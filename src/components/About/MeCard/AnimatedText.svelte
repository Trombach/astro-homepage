<script lang="ts">
import Typewriter from "svelte-typewriter";
</script>

<Typewriter mode="concurrent" element="span" delay={200} interval={90}>
  <slot />
</Typewriter>
