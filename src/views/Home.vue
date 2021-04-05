<template>
  <Card>
    <div class="absolute top-4 left-4">
      <Dropdown></Dropdown>
    </div>
    <button
        class="btn btn-small absolute top-8 right-8"
        @click="$router.push({name: 'add-question'})"
    >
      <PlusIcon></PlusIcon>
    </button>
    <template v-slot:card-text>
      <p v-if="currentQuestion">
        ...{{currentQuestion.text}}
      </p>
      <p v-else>
        Lädt Fragen...
      </p>
    </template>
    <template v-slot:card-action>
      <button
          class="btn"
          @click="prevQuestion"
      >
        <ChevronLeftIcon></ChevronLeftIcon>
      </button>
      <button
          @click="nextQuestion"
          class="btn right-icon w-4/6"
      >
        <span>Weiter</span>
      </button>
    </template>
  </Card>
  <RouterView></RouterView>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Question from "../entities/Question";
import Card from "../components/Card.vue";

import { ChevronLeftIcon, PlusIcon } from '@heroicons/vue/solid'
import Dropdown from "../components/Dropdown.vue";

export default defineComponent({
  name: 'Home',
  components: {Dropdown, ChevronLeftIcon, PlusIcon, Card},
  async created() {
    let questions = await this.getQuestions();
    this.questions = questions.sort((a, b) => 0.5 - Math.random());
  },
  data() {
    return {
      questions: [] as Question[],
      currentQuestionIndex: 0 as number
    }
  },
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
    }
  },
  methods: {
    async getQuestions(): Promise<Array<Question>> {
    return Question.getAll();
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
  }
}
})
</script>

<style scoped lang="scss">
</style>