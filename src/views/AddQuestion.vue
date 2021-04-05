<template>
  <Overlay></Overlay>
  <Card>
    <template v-slot:card-heading>
      Frage hinzufügen:
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
      ></span>
    </template>
    <template v-slot:card-action>
      <button
          class="btn"
          @click="$router.go(-1)"
      >
        <XIcon></XIcon>
      </button>
      <button
          class="btn w-4/6"
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
import { XIcon } from '@heroicons/vue/solid'
import Question from "../entities/Question";

export default defineComponent({
  name: "AddQuestion",
  components: {Card, Overlay, XIcon},
  data: () => ({
    text: "",
  }),
  mounted() {
    this.focusText();
  },
  methods: {
    onInput(e: Event) {
      this.text = e.target.innerText;
    },
    focusText() {
      this.$refs.text.focus();
    },
    async addQuestion(): void {
      if (this.text) {
        let text = this.text.trim().replace(/^ich hab*. noch nie/i, '').trim();
        let question: Question = new Question();
        question.text = text;
        question.reports = 0;
        await question.save();
        await this.$router.push({name: "home"});
      }
    },
  }
})
</script>

<style scoped lang="scss">
</style>