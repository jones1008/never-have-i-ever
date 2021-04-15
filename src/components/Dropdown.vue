<template>
  <Overlay
      :onClick="close"
      :transparent="true"
      v-if="isOpen"
  ></Overlay>
  <div
      :class="['dropdown', {isOpen: isOpen}]"
  >
    <div
        v-if="blank || blank && isOpen"
        class="item blank"
        @click="isOpen = !isOpen"
    >
      <div :class="['icon', blank.iconColor]">
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
      <div class="icon">
        <component :is="item.icon" :class="item.iconColor"></component>
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
import Overlay from '../components/Overlay.vue';
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
  components: {ChevronDownIcon, CheckIcon, Overlay},
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
      this.isOpen = false;
    }
  }
});
</script>
<style scoped lang="scss">
@import "../scss/dropdown";
</style>