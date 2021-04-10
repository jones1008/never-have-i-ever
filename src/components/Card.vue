<template>
  <div class="card">
    <div class="card-text">
      <slot name="card-text"></slot>
    </div>
    <div class="card-action">
      <slot name="card-action"></slot>
    </div>
    <div class="card-top">
      <slot name="card-top"></slot>
      <div class="card-top-right-btns">
        <slot name="card-top-right-btns"></slot>
      </div>
      <div class="card-top-left">
        <slot name="card-top-left"></slot>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
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

  .card-top {
    @apply absolute p-4 top-0;
    width: 100%;
    @apply flex justify-between;
    .card-top-left {
      @apply absolute left-2;
    }
    .card-top-right-btns {
      @apply absolute right-2;
      @apply flex place-items-center p-2;
    }
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