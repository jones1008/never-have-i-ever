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
@import "../scss/overlay";
</style>