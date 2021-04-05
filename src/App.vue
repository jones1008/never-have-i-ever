<template>
  <div class="wave"></div>
  <div class="caption">
    <h1>Ich hab' noch nie...</h1>
  </div>
  <div class="centerer">
    <RouterView></RouterView>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: 'App',
})
</script>

<style lang="scss">
#app {
  @apply text-center;
  //@apply bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500;
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
  //@apply bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500;
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
  @apply p-2 relative;
  @apply text-2xl text-white font-bold;
  border-radius: 2.5rem;
  @apply bg-gradient-to-r from-yellow-500 to-pink-500;
  svg {
    @apply h-10 w-10;
    @apply inline;
  }
  &.right-icon {
    svg {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  &.btn-small {
    @apply p-0;
  }
}
</style>