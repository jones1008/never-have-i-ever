<template>
  <Overlay
      :onClick="close"
      :transparent="true"
      v-if="isOpen"
  ></Overlay>
  <div :class="['dropdown', {isOpen: isOpen}]">
    <div
        v-if="blank || blank && isOpen"
        class="item blank"
        @click="isOpen = !isOpen"
    >
      <div :class="['icon', blank.iconColors]">
        <ChevronDownIcon></ChevronDownIcon>
      </div>
      <span v-show="chosenItems.length === 0 || isOpen">
        {{ blank.text }}&nbsp;
      </span>
      <div
          v-show="chosenItems.length > 0 && !isOpen"
          class="text-black dark:text-gray-300"
      >
        {{ chosenItems.map(i => i.text).join(', ') }}
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
        <component :is="item.icon" :class="item.iconColors"></component>
      </div>
      {{ item.text }}&nbsp;
      <ChevronDownIcon v-show="item.isChosen && !isOpen"></ChevronDownIcon>
      <CheckIcon v-show="item.isChosen && isOpen" class="text-blue-600 dark:text-blue-300"></CheckIcon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ChevronDownIcon, CheckIcon} from '@heroicons/vue/outline'
import Overlay from '../components/Overlay.vue';
import CategoryObject from "../classes/category/CategoryObject";
import CategoryObjectBase from "../classes/category/CategoryObjectBase";

export default defineComponent({
  name: "Dropdown",
  props: {
    items: Object as () => CategoryObject[],
    blank: Object as () => CategoryObjectBase,
    multiple: {
      type: Boolean,
      default: false
    },
    dropdown: {
      type: Boolean,
      default: null
    }
  },
  emits: ['update:dropdown', 'update:items'],
  components: {ChevronDownIcon, CheckIcon, Overlay},
  data: () => ({
    isOpenHelper: false as boolean,
  }),
  computed: {
    isOpen: {
      get(): boolean {
        if (this.dropdown === null) {
          return this.isOpenHelper;
        }
        return this.dropdown;
      },
      set(value: boolean): void {
        if (this.dropdown === null) {
          this.isOpenHelper = value;
        } else {
          this.$emit("update:dropdown", value);
        }
      }
    },
    chosenItems(): CategoryObject[] {
      return this.realItems.filter(i => i.isChosen);
    },
    realItems: {
      get(): CategoryObject[] | undefined {
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