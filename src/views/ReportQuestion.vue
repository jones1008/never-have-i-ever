<template>
  <Overlay :onClick="goHome"></Overlay>
  <Card>
    <template v-slot:card-top-left>
      <p class="dynamic-heading m-5">
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
          @click="report"
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
import {mapGetters, mapMutations} from "vuex";
import reportQuestion from "../mixins/reportQuestion";

export default defineComponent({
  name: "ReportQuestion",
  components: {Card, Overlay, XIcon},
  mixins: [reportQuestion],
  computed: {
    currentQuestion: {
      ...mapGetters({get: "currentQuestion"}),
      ...mapMutations({set: "setQuestion"})
    }
  },
  methods: {
    report(): void {
      this.reportQuestion(this.currentQuestion).then(() => {
        this.goHome()
      });
    },
    goHome(): void {
      this.$router.push({name: 'home'})
    }
  }
});
</script>