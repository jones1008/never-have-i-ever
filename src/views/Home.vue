<template>
  <Card>
    <template v-slot:card-top-left>
      <Dropdown v-model:items="dropdownItems"></Dropdown>
    </template>
    <template v-slot:card-top-right-btns>
      <button
          class="btn btn-small icon bg-gray-400 m-2"
          @click="$router.push({name: 'report-question'})"
      >
        <FlagIcon class="p-2"></FlagIcon>
      </button>
      <button
          class="btn btn-gradient btn-small icon m-2"
          @click="$router.push({name: 'add-question'})"
      >
        <PlusIcon></PlusIcon>
      </button>
    </template>
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
    <template v-slot:card-center>
      <span class="absolute bottom-24 right-7 text-gray-400 text-sm font-bold">
        {{currentQuestionIndex+1}} / {{questions.length}}
      </span>
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
  </Card>
  <RouterView></RouterView>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Question from "../entities/Question";
import Card from "../components/Card.vue";
import Dropdown from "../components/Dropdown.vue";
import {Category} from "../entities/Category";
import ls from "../utils/localStorage";

import { ChevronLeftIcon, PlusIcon, FlagIcon } from '@heroicons/vue/solid'
import { FireIcon, CakeIcon, SparklesIcon } from '@heroicons/vue/outline'

const reportLimit = 3;

export default defineComponent({
  name: 'Home',
  components: {Dropdown, ChevronLeftIcon, PlusIcon, Card, SparklesIcon, FireIcon, CakeIcon, FlagIcon},
  async created() {
    this.refetchQuestions();
  },
  data: () => ({
    questions: [] as Question[],
    currentQuestionIndex: 0 as number,
    // TODO: dropdownItems irgendwie auslagern, weil es bei AddQuestion auch verwendet wird
    dropdownItems: [
      {
        text: "Alle",
        value: "all",
        iconColor: "text-yellow-600",
        isChosen: false,
        icon: SparklesIcon
      },
      {
        text: "Hot",
        value: Category[Category.hot],
        iconColor: "text-red-600",
        isChosen: false,
        icon: FireIcon
      },
      {
        text: "Party",
        value: Category[Category.party],
        iconColor: "text-purple-600",
        isChosen: true,
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
      return Question.query().where("reports", "<", reportLimit).get();
    },
    async getQuestions(category: String = "all"): Promise<Array<Question>> {
      if (category == "all") {
        return this.getAllQuestions();
      }
      let categoryObj: Category = Category[category];
      return Question.find("categories", "array-contains", categoryObj);
    },
    filterReported(questions: Array<Question>): Array<Question> {
      let reportedQuestions = ls.getArray("reportedQuestionIds");
      return questions.filter(q => !reportedQuestions.includes(q.id));
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
        questions = this.filterReported(questions);

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
    },
    currentQuestion(question) {
      this.$store.commit('currentQuestion', question);
    }
  }
})
</script>

<style scoped lang="scss">
</style>