<span data-waving-hand>👋</span>

<style lang="postcss">
  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }
    7% {
      transform: rotate(18deg);
    }
    14% {
      transform: rotate(-10deg);
    }
    21% {
      transform: rotate(14deg);
    }
    28% {
      transform: rotate(-5deg);
    }
    35% {
      transform: rotate(5deg);
    }
    42% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }

  [data-waving-hand] {
    @apply motion-safe:animate-[wave_4s_ease-in-out_1s_infinite];
    @apply inline-block origin-bottom-right;
  }
</style>
