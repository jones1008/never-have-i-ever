<template>
  <Overlay :onClick="goHome"></Overlay>
  <Card>
    <template v-slot:card-top>
      <p class="dynamic-heading m-5">
        Frage bearbeiten
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
      <EditQuestionComponent v-model:text="text">...</EditQuestionComponent>
    </template>
    <template v-slot:card-action>
      <button
          class="btn btn-gradient w-full"
          @click="edit"
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
import EditQuestionComponent from "../components/EditQuestion.vue";
import Dropdown from "../components/Dropdown.vue";
import {XIcon} from '@heroicons/vue/solid';
import {mapGetters} from "vuex";
import editQuestion from "../mixins/editQuestion";

export default defineComponent({
  name: "EditQuestion",
  components: {Overlay, Card, Dropdown, EditQuestionComponent, XIcon},
  mixins: [editQuestion],
  data: () => ({
    newText: "" as string
  }),
  computed: {
    currentQuestion: {
      ...mapGetters({get: "currentQuestion"})
    },
    text: {
      get() {
        return this.currentQuestion?.text ?? "";
      },
      set(value) {
        this.newText = value;
      }
    }
  },
  methods: {
    goHome(): void {
      this.$router.push({name: "home"})
    },
    edit(): void {
      this.editQuestion(this.currentQuestion, this.newText).then(() => {
        this.goHome();
      });
    }
  }
})
</script>