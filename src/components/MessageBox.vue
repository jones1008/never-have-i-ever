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
    // active: false,
    timeoutInstance: null
  }),
  created() {
    this.startTimeout();
  },
  methods: {
    close() {
      this.$emit('update:message', null);
    },
    startTimeout() {
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
    message() {
      this.startTimeout();
    }
  }
});
</script>

<style scoped lang="scss">
.message-box {
  @apply container fixed bottom-6 flex items-center justify-center;
  height: fit-content !important;
  width: fit-content !important;
  left: 50%;
  transform: translateX(-50%);
  @apply rounded-3xl;
  @apply h-14 py-4 px-8;
  @apply shadow-2xl;
  .message {
    @apply text-white font-extrabold text-2xl;
  }
  svg {
    @apply w-7 h-7 m-4 text-gray-100;
  }
  &.icon-right {
    @apply pr-2;
  }
}
</style>