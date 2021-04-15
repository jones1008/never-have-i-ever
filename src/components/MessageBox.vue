<template>
  <div
      v-if="message"
      :class="['message-box', 'icon-right', color]"
  >
    <div class="message">
      {{ message }}
    </div>
    <button @click="close">
      <XIcon></XIcon>
    </button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import { XIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: "MessageBox",
  props: {
    message: {
      type: String,
      default: ''
    },
    timeout: {
      type: Number,
      default: -1
    },
    color: {
      type: String,
      default: "bg-green-600"
    },
  },
  components: {XIcon},
  data: () => ({
    timeoutInstance: null
  }),
  created() {
    this.startTimeout();
  },
  methods: {
    close(): void {
      this.$emit('update:message', null);
    },
    startTimeout(): void {
      if (this.timeout !== -1 && this.message) {
        // hack for overlapping timeouts
        let instance = this.timeoutInstance = setTimeout(() => {
          if (this.timeoutInstance === instance) {
            this.close();
          }
        }, this.timeout);
      }
    }
  },
  watch: {
    message(): void {
      this.startTimeout();
    }
  }
});
</script>

<style scoped lang="scss">
@import "../scss/messageBox";
</style>