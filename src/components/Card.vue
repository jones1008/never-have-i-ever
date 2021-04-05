<template>
  <div class="card">
    <slot></slot>
    <div class="card-heading">
      <slot name="card-heading"></slot>
    </div>
    <div class="card-text">
      <slot name="card-text"></slot>
    </div>
    <div class="card-action">
      <slot name="card-action"></slot>
    </div>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: "Card"
});
</script>

<style scoped lang="scss">

.card {
  @apply w-full mx-auto absolute;
  min-height: 75vh;
  max-width: 1200px;
  @apply flex justify-center items-center flex-col;
  @apply shadow-2xl;
  border-radius: 2.5rem;
  @apply bg-white;
  left: 50%;
  transform: translateX(-50%);

  .card-heading {
    @apply absolute p-6 top-0;
    @apply font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl;
  }

  .card-text {
    @apply w-5/6;
    @apply px-2 sm:px-0;
    @apply font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl;
    @apply leading-snug;
    position: relative;
    top: -2rem;
  }

  .card-action {
    @apply absolute p-4 bottom-0;
    width: 100%;
    @apply flex justify-between;
  }
}
</style>