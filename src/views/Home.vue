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
        ...{{currentQuestionSuffix}}.
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
        {{currentCategoryIndex+1}} / {{currentQuestions.length}}
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
import {defineComponent} from 'vue'
import Card from "../components/Card.vue";
import Dropdown from "../components/Dropdown.vue";
import { ChevronLeftIcon, PlusIcon, FlagIcon } from '@heroicons/vue/solid'
import fetchQuestions from "../composition/fetchQuestions";

export default defineComponent({
  name: 'Home',
  components: {Dropdown, ChevronLeftIcon, PlusIcon, Card, FlagIcon},
  setup() {
    fetchQuestions.fetch();
    return fetchQuestions;
  }
})
</script>