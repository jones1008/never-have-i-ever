<template>
  <Overlay :onClick="goHome"></Overlay>
  <Card>
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

    <div class="absolute top-3 left-4">
      <Dropdown
          v-model:items="dropdownItems"
          :blank="dropdownBlank"
          multiple
      ></Dropdown>
    </div>
    <button
        class="btn btn-small absolute top-8 right-8 bg-gray-400"
        @click="goHome"
    >
      <XIcon></XIcon>
    </button>
  </Card>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Overlay from "../components/Overlay.vue";
import Card from "../components/Card.vue";
import Dropdown from "../components/Dropdown.vue";
import { XIcon } from '@heroicons/vue/solid'
import Question from "../entities/Question";
import { FireIcon, CakeIcon } from '@heroicons/vue/outline'
import {Category} from "../entities/Category";

export default defineComponent({
  name: "AddQuestion",
  components: {Card, Overlay, XIcon, Dropdown},
  data: () => ({
    text: "",
    dropdownBlank: {
      text: "Kategorien",
      iconColor: "text-gray-400"
    },
    dropdownItems: [
      {
        text: "Hot",
        value: "hot",
        iconColor: "text-red-600",
        isChosen: false,
        icon: FireIcon
      },
      {
        text: "Party",
        value: "party",
        iconColor: "text-purple-600",
        isChosen: false,
        icon: CakeIcon
      }
    ]
  }),
  mounted() {
    this.focusText();
  },
  computed: {
    chosenCategories(): Category[] {
      let items = this.dropdownItems.filter(i => i.isChosen);
      let categories: Category[] = [];
      for (let item of items) {
        categories.push(Category[item.value]);
      }
      return categories;
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
        let text = this.text.trim().replace(/^ich hab*. noch nie/i, '').trim();
        let question: Question = new Question();
        question.text = text;
        question.reports = 0;
        question.categories = this.chosenCategories;
        question.save().then(() => {
          this.$store.commit("globalSuccess", "hinzugefügt")
          return this.$router.push({name: "home"});
        }).catch(err => {
          this.$store.commit("globalError", "Fehler beim Hinzufügen")
        });
      }
    },
    goHome() {
      this.$router.push({name: 'home'})
    }
  }
})
</script>

<style scoped lang="scss">
</style>