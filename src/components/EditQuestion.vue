<template>
  <div @click="focusText">
    <slot></slot>
    <span
      class="text-black dark:text-white"
      contenteditable="true"
      ref="text"
      @blur="onBlur"
      autocapitalize="none"
    >{{text}}</span>.
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "EditQuestion",
  props: {
    text: String
  },
  mounted() {
    this.focusText(null);
  },
  computed: {
    textField() {
      return this.$refs.text;
    }
  },
  methods: {
    onBlur(e: Event): void {
      this.$emit("update:text", this.textField.innerText);
    },
    focusText(e: Event | null): void {
      this.textField.focus();
      // only move cursor to end if not clicked in text field
      if (!e || e.target !== this.textField) {
        this.moveCursorToEnd(this.textField);
      }
    },
    moveCursorToEnd(element) {
      // from https://stackoverflow.com/questions/1125292/how-to-move-cursor-to-end-of-contenteditable-entity/3866442#3866442
      let range = document.createRange();
      range.selectNodeContents(element);
      range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
      let selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }
  }
})
</script>

<style scoped>
[contenteditable] {
  outline: 0 solid transparent;
}
</style>