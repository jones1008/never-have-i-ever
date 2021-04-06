<template>
  <div class="wave"></div>
  <div class="caption">
    <h1>Ich hab' noch nie...</h1>
  </div>
  <div class="centerer">
    <RouterView></RouterView>
  </div>
  <MessageBox
      v-model:message="globalSuccess"
      color="bg-green-600"
      :timeout="5000"
  ></MessageBox>
  <MessageBox
      v-model:message="globalError"
      color="bg-red-600"
      :timeout="5000"
  ></MessageBox>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MessageBox from './components/MessageBox.vue';

export default defineComponent({
  name: 'App',
  components: {MessageBox},
  computed: {
    globalError: {
      get() {
        return this.$store.state.globalError;
      },
      set(value) {
        this.$store.commit("globalError", value)
      }
    },
    globalSuccess: {
      get() {
        return this.$store.state.globalSuccess;
      },
      set(value) {
        this.$store.commit("globalSuccess", value)
      }
    }
  }
})
</script>

<style lang="scss">
#app {
  @apply text-center;
}

.caption {
  @apply font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white;
  @apply flex items-center justify-center;
  height: 15vh;
}

.wave {
  @apply absolute top-0;
  width: 100%;
  height: 25vh;
  z-index: -1;
  background: rgb(246,119,48);
  background: linear-gradient(125deg, rgba(246,119,48,1) 0%, rgba(221,28,78,1) 50%, rgba(36,173,181,1) 100%);
  border-bottom-right-radius: 4rem;
  border-bottom-left-radius: 4rem;
}

.centerer {
  @apply relative container mx-auto justify-center items-center h-full;
  height: 85vh;
}

.btn {
  @apply p-3 relative;
  @apply text-2xl text-white font-bold;
  border-radius: 2.5rem;
  svg {
    @apply h-10 w-10;
    @apply inline;
  }
  &.icon {
    @apply p-1;
    svg {
      @apply mx-1;
    }
  }
  &.btn-small {
    @apply p-0;
    svg {
      @apply h-9 w-9 m-1;
    }
  }
  &.btn-gradient {
    @apply bg-gradient-to-r from-yellow-500 to-pink-500;
  }
}
</style>