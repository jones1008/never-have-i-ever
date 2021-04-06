<template>
  <div
      class="overlay"
      @click="onClick"
  ></div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Overlay",
  props: ["onClick"]
});
</script>

<style scoped lang="scss">
.overlay {
  @apply fixed top-0 left-0 w-full h-full;
  @apply bg-gray-700 bg-opacity-75;
}
</style>