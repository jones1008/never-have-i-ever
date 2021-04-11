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
      <span
          class="text-gray-400"
          @click="focusText"
      >
        Ich hab' noch nie&nbsp;
      </span>
      <span
          class="text-black"
          contenteditable="true"
          ref="text"
          @input="onInput"
          autocapitalize="none"
      ></span>
    </template>
    <template v-slot:card-action>
      <button
          class="btn btn-gradient w-full"
          @click="addQuestion"
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
import Question from "../entities/Question";
import {Category} from "../entities/Category";
import config from "../config";
import {mapGetters} from "vuex";
import clone from "../utils/clone";

export default defineComponent({
  name: "AddQuestion",
  components: {Card, Overlay, XIcon, Dropdown},
  data: () => ({
    text: "",
    dropdownBlank: {
      text: "Kategorien",
      iconColor: "text-gray-400"
    },
    categories: clone.cloneArray(config.categories)
  }),
  mounted() {
    this.focusText();
  },
  computed: {
    chosenCategories(): Category[] {
      let items = this.categories.filter(i => i.isChosen);
      let categories: Category[] = [];
      for (let item of items) {
        categories.push(Category[item.value]);
      }
      return categories;
    },
    currentCategory: {
      ...mapGetters({get: "currentCategory"})
    }
  },
  methods: {
    onInput(e: Event) {
      this.text = e.target.innerText;
    },
    focusText() {
      this.$refs.text.focus();
    },
    async addQuestion(): void {
      if (this.chosenCategories.length === 0) {
        this.$store.commit("globalError", "Kategorie wählen")
        return;
      }
      if (this.text) {
        let question: Question = new Question();
        question.text = this.optimizeQuestion(this.text);
        // TODO: überprüfen, ob es diese Frage bereits gibt oder ähnlich: Levensthein Distance, Fuzzy Hashing?
        question.reports = 0;
        question.categories = this.chosenCategories;
        question.save().then(() => {
          this.$store.commit("globalSuccess", "hinzugefügt")

          // add to questions if category is currently being viewed
          if (this.chosenCategories.includes(Category[this.currentCategory])) {
            this.$store.commit("addToQuestions", question);
          }
          return this.$router.push({name: "home"});
        }).catch(err => {
          this.$store.commit("globalError", "Fehler beim Hinzufügen")
        });
      }
    },
    optimizeQuestion(text: string): string {
      text = text.trim().replace(/^ich hab*. noch nie/i, '').trim();
      if (text.substr(-1) !== ".") {
        text = text + ".";
      }
      return text;
    },
    goHome() {
      this.$router.push({name: 'home'})
    }
  }
})
</script>

<style scoped lang="scss">
</style>