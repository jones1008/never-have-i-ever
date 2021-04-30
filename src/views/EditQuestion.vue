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
          class="btn btn-small icon btn-gray m-2"
          @click="goHome"
      >
        <XIcon></XIcon>
      </button>
    </template>
    <template v-slot:card-text>
      <EditQuestionComponent v-model:text="text"></EditQuestionComponent>
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
import editQuestion from "../composition/editQuestion";
import {goHome} from "../utils/router";

export default defineComponent({
  name: "EditQuestion",
  components: {Overlay, Card, Dropdown, EditQuestionComponent, XIcon},
  setup() {
    return {...editQuestion, goHome};
  }
})
</script>