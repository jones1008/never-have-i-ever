<template>
  <div class="card">
    <div class="card-center">
      <slot name="card-center"></slot>
      <div class="card-text">
        <slot name="card-text"></slot>
      </div>
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
@import "../scss/card";
</style>