<template>
  <div
      :class="['overlay', 'bg-gray-700', transparent ? 'bg-opacity-0' : 'bg-opacity-75']"
      @click="onClick"
  ></div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "Overlay",
  props: {
    onClick: Function,
    transparent: {
      type: Boolean,
      default: false
    }
  }
});
</script>

<style scoped lang="scss">
.overlay {
  @apply fixed top-0 left-0 w-full h-full;
}
</style>