<template>
  <Overlay :onClick="goHome"></Overlay>
  <Card>
    <template v-slot:card-top-left>
      <Dropdown
          v-model:items="categories"
          :blank="dropdownBlank"
          multiple
      ></Dropdown>
    </template>
    <template v-slot:card-top-right-btns>
      <button
          class="btn btn-small icon bg-gray-400 m-2"
          @click="goHome"
      >
        <XIcon></XIcon>
      </button>
    </template>
    <template v-slot:card-text>
      <EditQuestionComponent v-model:text="text">
        <span class="text-gray-400">Ich hab' noch nie&nbsp;</span>
      </EditQuestionComponent>
    </template>
    <template v-slot:card-action>
      <button
          class="btn btn-gradient w-full"
          @click="add"
      >
        <span>Speichern</span>
      </button>
    </template>
  </Card>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Overlay from "../components/Overlay.vue";
import Card from "../components/Card.vue";
import Dropdown from "../components/Dropdown.vue";
import { XIcon } from '@heroicons/vue/solid'
import config from "../config";
import {mapGetters} from "vuex";
import clone from "../utils/clone";
import CategoryObject from "../category/CategoryObject";
import addQuestion from "../mixins/addQuestion";
import {CategoryType} from "../category/CategoryType";
import CategoryObjectBase from "../category/CategoryObjectBase";
import EditQuestionComponent from "../components/EditQuestion.vue";

export default defineComponent({
  name: "AddQuestion",
  components: {EditQuestionComponent, Card, Overlay, XIcon, Dropdown},
  mixins: [addQuestion],
  data: () => ({
    text: "" as string,
    dropdownBlank: {
      text: "Kategorien",
      iconColor: "text-gray-400"
    } as CategoryObjectBase,
    categories: clone.cloneArray(config.categories) as CategoryObject[]
  }),
  computed: {
    chosenCategories(): CategoryType[] {
      let items = this.categories.filter(i => i.isChosen);
      let categories: CategoryType[] = [];
      for (let item of items) {
        categories.push(item.value);
      }
      return categories;
    },
    currentCategory: {
      ...mapGetters({get: "currentCategory"})
    } as CategoryType
  },
  methods: {
    add(): void {
      this.addQuestion(this.text, this.chosenCategories, this.currentCategory).then(() => {
          this.goHome()
      });
    },
    goHome(): void {
      this.$router.push({name: 'home'})
    }
  }
})
</script>