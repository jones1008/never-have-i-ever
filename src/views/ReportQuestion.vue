<template>
  <Overlay :onClick="goHome"></Overlay>
  <Card>
    <template v-slot:card-top-left>
      <p class="text-2xl sm:text-3xl md:text-4xl font-extrabold m-5">
        Frage rauswerfen?
      </p>
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
      <span class="text-gray-500">
        ...{{currentQuestion?.data.text}}
      </span>
    </template>
    <template v-slot:card-action>
      <button
          @click="reportQuestion"
          class="btn btn-gradient w-full"
      >
        <span>Ja, weg damit!</span>
      </button>
    </template>
  </Card>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Overlay from "../components/Overlay.vue";
import Card from "../components/Card.vue";
import {XIcon} from '@heroicons/vue/solid';
import ls from "../utils/localStorage";

export default defineComponent({
  name: "ReportQuestion",
  components: {Card, Overlay, XIcon},
  methods: {
    reportQuestion() {
      if (!ls.getArray("reportedQuestionIds").includes(this.currentQuestion.id)) {
        this.currentQuestion.data.reports++;
        this.currentQuestion.save().then(() => {
          ls.addToArray("reportedQuestionIds", this.currentQuestion.id);
          this.$store.commit("globalSuccess", "Frage wurde gemeldet.");
          this.goHome();
        }).catch(() => {
          this.$store.commit("globalError", "Fehler beim Melden");
        });
      } else {
        this.$store.commit("globalError", "Hast du bereits gemeldet");
      }
    },
    goHome() {
      this.$router.push({name: 'home'})
    }
  },
  computed: {
    currentQuestion: {
      get() {
        return this.$store.state.currentQuestion;
      },
      set(value) {
        this.$store.commit('currentQuestion', value);
      }
    }
  }
});
</script>

<style scoped>

</style>