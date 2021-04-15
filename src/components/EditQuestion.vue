<template>
  <span
    class="text-black"
    contenteditable="true"
    ref="text"
    @input="onInput"
    autocapitalize="none"
  >{{text}}</span>.
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "EditQuestion",
  props: {
    text: String
  },
  mounted() {
    this.focusText();
  },
  methods: {
    onInput(e: Event): void {
      this.$emit("update:text", e.target.innerText);
    },
    focusText(): void {
      this.$refs.text.focus();
    },
  }
})
</script>

<style scoped>

</style>