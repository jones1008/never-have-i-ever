<template>
  <div
      :class="['dropdown', {isOpen: isOpen}]"
      v-click-outside="close"
  >
    <div
        v-if="blank || blank && isOpen"
        class="item blank"
        @click="isOpen = !isOpen"
    >
      <div :class="['icon', 'text-'+blank.iconColor+'-400']">
        <ChevronDownIcon></ChevronDownIcon>
      </div>
      <span v-show="chosenItems.length === 0 || isOpen">
        {{ blank.text }}&nbsp;
      </span>
      <div
          v-show="chosenItems.length > 0 && !isOpen"
          class="text-black"
      >
        {{ chosenItemsText }}
      </div>
    </div>
    <div
        v-for="(item, index) in realItems"
        :key="index"
        v-show="isOpen || item.isChosen && !multiple"
        :class="['item', {isChosen: item.isChosen}]"
        @click="isOpen ? item.isChosen ? unselect(item) : select(item) : isOpen = true"
    >
      <div :class="['icon', 'text-'+item.iconColor+'-600']">
        <component :is="item.icon"></component>
      </div>
      {{ item.text }}&nbsp;
      <ChevronDownIcon v-show="item.isChosen && !isOpen"></ChevronDownIcon>
      <CheckIcon v-show="item.isChosen && isOpen" class="text-blue-600"></CheckIcon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ChevronDownIcon, CheckIcon} from '@heroicons/vue/outline'

export default defineComponent({
  name: "Dropdown",
  props: {
    items: {
      text: String,
      isChosen: {
        type: Boolean,
        default: false
      },
      iconColor: String,
      icon: Function
    },
    blank: {
      text: String,
      iconColor: String,
      icon: Function
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  components: {ChevronDownIcon, CheckIcon},
  data: () => ({
    isOpen: false as boolean,
  }),
  computed: {
    chosenItems() {
      return this.realItems.filter(i => i.isChosen);
    },
    chosenItemsText() {
      return this.chosenItems.map(i => i.text).join(', ')
    },
    realItems: {
      get() {
        return this.items;
      },
      set(value) {
        this.$emit('update:items', value);
      }
    }
  },
  methods: {
    select(item) {
      if (!this.multiple) {
        this.resetSelects();
      }
      item.isChosen = true;
      if (!this.multiple) {
        this.isOpen = false;
      }
    },
    unselect(item) {
      if (this.multiple) {
        item.isChosen = false;
      } else {
        this.isOpen = false;
      }
    },
    resetSelects() {
      for (let item of this.chosenItems){
        item.isChosen = false;
      }
    },
    close() {
      console.log("closing");
      this.isOpen = false;
    }
  }
});
</script>

<style scoped lang="scss">
.dropdown {
  @apply p-4;
  @apply text-2xl font-extrabold text-left;
  @apply cursor-pointer select-none;

  .item {
    @apply flex;
    @apply items-center py-2;
    .icon {
      @apply inline mr-3;
      svg {
        @apply h-7 w-7 inline;
      }
    }
    &.isChosen {
      @apply flex;
      @apply text-2xl font-extrabold text-gray-500;
    }
    &.blank {
      @apply text-xl text-gray-400;
    }
    > svg {
      @apply inline h-5 w-5;
    }
  }

  &.isOpen {
    @apply rounded-3xl bg-white shadow-2xl;
    .item {
      //@apply flex;
      &.isChosen {
        @apply text-black;
      }
    }
  }
}
@keyframes dropdown-open {
  from {
    height: 0;
  }
  to {
    height: 100%;
  }
}
</style>