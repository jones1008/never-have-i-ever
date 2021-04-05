<template>
  <div
      :class="['dropdown', {isOpen: isOpen}]"
      @click="isOpen = !isOpen"
      @click:outside="isOpen = false"
  >
    <div class="item chosen">
      <div class="icon text-yellow-600">
        <SparklesIcon></SparklesIcon>
      </div>
      Alle&nbsp;<ChevronDownIcon></ChevronDownIcon>
    </div>
    <div class="item">
      <div class="icon text-red-600">
        <FireIcon></FireIcon>
      </div>
      Hot
    </div>
    <div class="item">
      <div class="icon text-purple-600">
        <CakeIcon></CakeIcon>
      </div>
      Party
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ChevronDownIcon, FireIcon, CakeIcon, SparklesIcon} from '@heroicons/vue/outline'

export default defineComponent({
  name: "Dropdown",
  components: {ChevronDownIcon, FireIcon, CakeIcon, SparklesIcon},
  data: () => ({
    isOpen: false
  })
});
</script>

<style scoped lang="scss">
.dropdown {
  @apply p-4;
  @apply text-2xl font-extrabold text-left;
  @apply cursor-pointer select-none;

  .item {
    display: none;
    @apply items-center py-2;
    .icon {
      @apply inline mr-3;
      svg {
        @apply h-7 w-7;
      }
    }
    &.chosen {
      @apply flex;
      @apply text-2xl font-extrabold text-gray-500;
      > svg {
        @apply h-5 w-4 inline;
      }
    }
  }

  &.isOpen {
    @apply rounded-3xl bg-white shadow-2xl;
    .item {
      @apply flex;
      &.chosen {
        @apply text-black;
      }
    }
  }
}
</style>