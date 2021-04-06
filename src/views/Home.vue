<template>
  <Card>
    <template v-slot:card-text>
      <p
          v-if="errorMessage"
          class="text-gray-400"
      >
        {{ errorMessage }}
      </p>
      <p v-else-if="currentQuestion">
        ...{{currentQuestion.text}}
      </p>
      <p v-else>
        Lädt Fragen...
      </p>
    </template>
    <template v-slot:card-action>
      <button
          class="btn icon bg-gray-400"
          @click="prevQuestion"
      >
        <ChevronLeftIcon></ChevronLeftIcon>
      </button>
      <button
          @click="nextQuestion"
          class="btn btn-gradient w-4/6"
      >
        <span>Weiter</span>
      </button>
    </template>

    <div class="absolute top-3 left-4 ">
      <Dropdown v-model:items="dropdownItems"></Dropdown>
    </div>
    <button
        class="btn btn-gradient btn-small icon absolute top-8 right-8"
        @click="$router.push({name: 'add-question'})"
    >
      <PlusIcon></PlusIcon>
    </button>
  </Card>
  <RouterView></RouterView>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Question from "../entities/Question";
import Card from "../components/Card.vue";

import { ChevronLeftIcon, PlusIcon } from '@heroicons/vue/solid'
import { FireIcon, CakeIcon, SparklesIcon } from '@heroicons/vue/outline'

import Dropdown from "../components/Dropdown.vue";
import {Category} from "../entities/Category";

export default defineComponent({
  name: 'Home',
  components: {Dropdown, ChevronLeftIcon, PlusIcon, Card, SparklesIcon, FireIcon, CakeIcon},
  async created() {
    this.refetchQuestions();
  },
  data: () => ({
    questions: [] as Question[],
    currentQuestionIndex: 0 as number,
    dropdownItems: [
      {
        text: "Alle",
        value: "all",
        iconColor: "yellow",
        isChosen: true,
        icon: SparklesIcon
      },
      {
        text: "Hot",
        value: "hot",
        iconColor: "red",
        isChosen: false,
        icon: FireIcon
      },
      {
        text: "Party",
        value: "party",
        iconColor: "purple",
        isChosen: false,
        icon: CakeIcon
      }
    ],
    errorMessage: null
  }),
  computed: {
    currentQuestion() : Question|null {
      if (this.questions.length > 0) {
        return this.questions[this.currentQuestionIndex];
      }
      return null;
    },
    isLastQuestion(): boolean {
      return this.currentQuestionIndex === this.questions.length - 1;
    },
    isFirstQuestion(): boolean {
      return this.currentQuestionIndex === 0;
    },
    chosenDropdownItem() {
      return this.dropdownItems.find(i => i.isChosen);
    },
    chosenCategory() {
      return this.chosenDropdownItem.value;
    }
  },
  methods: {
    async getAllQuestions(): Promise<Array<Question>> {
      return Question.getAll();
    },
    async getQuestions(category: String = "all"): Promise<Array<Question>> {
      if (category == "all") {
        return this.getAllQuestions();
      }
      let categoryObj: Category = Category[category];
      console.log("getting questions with category", categoryObj)
      return Question.find("categories", "array-contains", categoryObj);
    },
    reportQuestion() {
      if (this.currentQuestion) {
        this.currentQuestion.reports++;
        this.currentQuestion.save();
      }
    },
    nextQuestion(): void {
      if (this.isLastQuestion) {
        this.currentQuestionIndex = 0;
      } else {
        this.currentQuestionIndex++;
      }
    },
    prevQuestion(): void {
      if (this.isFirstQuestion) {
        this.currentQuestionIndex = this.questions.length - 1;
      } else {
        this.currentQuestionIndex--;
      }
    },
    refetchQuestions() {
      this.errorMessage = null;
      this.getQuestions(this.chosenCategory).then(questions => {
        if (questions.length === 0) {
          this.errorMessage = "Keine Fragen gefunden..."
          return;
        }
        this.questions = questions.sort((a, b) => 0.5 - Math.random());
      }).catch(err => {
        console.log(err);
        this.$store.commit("globalError", "Fehler beim Laden der Fragen");
      });
    }
  },
  watch: {
    chosenDropdownItem(item) {
      this.refetchQuestions();
    }
  }
})
</script>

<style scoped lang="scss">
</style>