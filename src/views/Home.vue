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
      <p
          v-else-if="currentQuestion"
          @click="$router.push({name: 'edit-question'})"
      >
        ...{{currentQuestion.text}}.
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
import Card from "../components/Card.vue";
import Dropdown from "../components/Dropdown.vue";
import { ChevronLeftIcon, PlusIcon, FlagIcon } from '@heroicons/vue/solid'
import {mapActions, mapGetters, mapMutations, mapState} from "vuex";
import fetchQuestions from "../mixins/fetchQuestions";
import Question from "../question/Question";
import CategoryObject from "../category/CategoryObject";
import {CategoryType} from "../category/CategoryType";

export default defineComponent({
  name: 'Home',
  components: {Dropdown, ChevronLeftIcon, PlusIcon, Card, FlagIcon},
  mixins: [fetchQuestions],
  async created() {
    this.fetch();
  },
  data: () => ({
    errorMessage: "" as string
  }),
  computed: {
    currentQuestion: {
      ...mapGetters({get: "currentQuestion"})
    } as Question,
    questions: {
      ...mapState({ get: 'questions' }),
      ...mapMutations({set: 'questions'})
    } as Question[],
    currentQuestionIndex: {
      ...mapState({get: 'currentQuestionIndex'}),
      ...mapMutations({set: 'currentQuestionIndex'})
    } as number,
    allCategories: {
      ...mapState({get: 'allCategories'}),
      ...mapMutations({set: 'allCategories'})
    } as CategoryObject[],
    currentCategory: {
      ...mapGetters({get: 'currentCategory'})
    } as CategoryType
  },
  methods: {
    async fetch(): void {
      this.questions = await this.fetchQuestions(this.currentCategory);
      if (!this.questions || this.questions.length === 0) {
        this.errorMessage = "Keine Fragen gefunden..."
      }
    },
    ...mapActions(["nextQuestion", "prevQuestion"]),
  },
  watch: {
    currentCategory(item): void {
      this.fetch();
    }
  }
})
</script>