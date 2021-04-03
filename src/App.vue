<template>
  <div class="wave"></div>
  <div class="caption">
    <h1>Ich hab' noch nie...</h1>
  </div>
  <div class="centerer">
    <div class="card">
      <div class="card-text">
        <p v-if="currentQuestion">
          {{currentQuestion.text}}
        </p>
        <p v-else>
          Lädt Fragen...
        </p>
      </div>
      <div class="card-action">
        <button
            class="prev-btn"
            @click="prevQuestion"
        >
          <ChevronLeftIcon></ChevronLeftIcon>
        </button>
        <button
            @click="nextQuestion"
            class="next-btn right-icon"
        >
          <span>Weiter</span>
          <ChevronRightIcon></ChevronRightIcon>
        </button>
      </div>
<!--      <button @click="reportQuestion">report</button>-->
    </div>
  </div>
<!--  <br>-->
<!--  <br>-->
<!--  <br>-->
<!--  <textarea-->
<!--      cols="50"-->
<!--      rows="2"-->
<!--      placeholder="Ich hab noch nie..."-->
<!--      name="new-question"-->
<!--      v-model="newQuestionText"-->
<!--  ></textarea>-->
<!--  <br>-->
<!--  <button @click="addQuestion">Frage abschicken</button>-->
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Question from "./entities/Question";
import firebase from "firebase/app";
import 'firebase/firestore';
import { FirestoreOrmRepository } from "@arbel/firebase-orm";
import {firebaseConfig} from '../local.config';

import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/solid'

export default defineComponent({
  name: 'App',
  components: {ChevronRightIcon, ChevronLeftIcon},
  async created() {
    let firebaseApp = firebase.initializeApp(firebaseConfig);

    let connection = firebaseApp.firestore();
    FirestoreOrmRepository.initGlobalConnection(connection);

    let questions = await this.getQuestions();
    this.questions = questions.sort((a, b) => 0.5 - Math.random());
  },
  data() {
    return {
      questions: [] as Question[],
      currentQuestionIndex: 0 as number,
      newQuestionText: "" as string
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
    addQuestion(): void {
      if (this.newQuestionText) {
        let text = this.newQuestionText.trim().replace(/^ich hab*. noch nie/i, '').trim();
        let question: Question = new Question();
        question.text = "..." + text;
        question.reports = 0;
        question.save();
      }
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

<style lang="scss">
#app {
  @apply text-center;
  //@apply bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500;
}

.caption {
  @apply font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white;
  @apply flex items-center justify-center;
  height: 15vh;
}

.wave {
  @apply absolute top-0;
  width: 100%;
  height: 25vh;
  z-index: -1;
  //@apply bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500;
  background: rgb(246,119,48);
  background: linear-gradient(125deg, rgba(246,119,48,1) 0%, rgba(221,28,78,1) 50%, rgba(36,173,181,1) 100%);
  border-bottom-right-radius: 4rem;
  border-bottom-left-radius: 4rem;
}

.centerer {
  @apply container mx-auto justify-center items-center h-full;
  height: 85vh;
}

.card {
  @apply w-full mx-auto relative;
  min-height: 75vh;
  max-width: 1200px;
  @apply flex justify-center items-center flex-col;
  @apply shadow-2xl;
  border-radius: 2.5rem;
  @apply bg-white;
  //@apply bg-gradient-to-tr from-purple-400 via-pink-500 to-red-500;
  //@apply text-white;

  .card-text {
    @apply w-5/6;
    @apply px-2 sm:px-0;
    @apply font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl;
    @apply leading-snug;
  }

  .card-action {
    @apply absolute p-4 bottom-0;
    width: 100%;
    @apply flex justify-between;
    button {
      @apply p-2 relative;
      @apply text-2xl text-white font-bold;
      border-radius: 2.5rem;
      @apply bg-gradient-to-r from-yellow-500 to-pink-500;
      svg {
        @apply h-10 w-10;
        @apply inline;
      }
    }
    .next-btn {
      width: 60%;
    }
    .prev-btn {
    }
    .right-icon {
      svg {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
}
</style>