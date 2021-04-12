<template>
  <Card>
    <template v-slot:card-top-left>
      <Dropdown v-model:items="allCategories"></Dropdown>
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
    <template
        v-slot:card-center
        v-if="currentQuestion && !errorMessage"
    >
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
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import config from "../config";

export default defineComponent({
  name: 'Home',
  components: {Dropdown, ChevronLeftIcon, PlusIcon, Card, FlagIcon},
  async created() {
    this.refetchQuestions();
  },
  data: () => ({
    errorMessage: null
  }),
  computed: {
    currentQuestion: {
      ...mapGetters({get: "currentQuestion"})
    },
    questions: {
      ...mapState({ get: 'questions' }),
      ...mapMutations({set: 'questions'})
    },
    currentQuestionIndex: {
      ...mapState({get: 'currentQuestionIndex'}),
      ...mapMutations({set: 'currentQuestionIndex'})
    },
    allCategories: {
      ...mapState({get: 'allCategories'}),
      ...mapMutations({set: 'allCategories'})
    },
    currentCategory: {
      ...mapGetters({get: 'currentCategory'})
    }
  },
  methods: {
    async getAllQuestions(): Promise<Array<Question>> {
      return this.reportLimitQuery().get();
    },
    async getQuestions(category: String = "all"): Promise<Array<Question>> {
      if (category == "all") {
        return this.getAllQuestions();
      }
      let categoryObj: Category = Category[category];
      return this.reportLimitQuery().where("categories", "array-contains", categoryObj).get();
    },
    reportLimitQuery() {
      return Question.query().where("reports", "<", config.reportLimit);
    },
    ...mapActions(["nextQuestion", "prevQuestion"]),

    refetchQuestions() {
      this.errorMessage = null;
      this.getQuestions(this.currentCategory).then(questions => {
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
    },
    filterReported(questions: Array<Question>): Array<Question> {
      let reportedQuestions = ls.getArray("reportedQuestionIds");
      return questions.filter(q => !reportedQuestions.includes(q.id));
    },
  },
  watch: {
    currentCategory(item) {
      this.refetchQuestions();
    }
  }
})
</script>

<style scoped lang="scss">
</style>