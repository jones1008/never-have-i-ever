<template>
  <Overlay :onClick="goHome"></Overlay>
  <Card>
    <template v-slot:card-top-left>
      <Dropdown
          v-model:items="categories"
          :blank="dropdownBlank"
          multiple
      ></Dropdown>
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
      <EditQuestionComponent v-model:text="text">
        <span class="text-gray-400">Ich hab' noch nie&nbsp;</span>
      </EditQuestionComponent>
    </template>
    <template v-slot:card-action>
      <button
          class="btn btn-gradient w-full"
          @click="add"
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
import Dropdown from "../components/Dropdown.vue";
import { XIcon } from '@heroicons/vue/solid'
import addQuestion from "../composition/addQuestion";
import EditQuestionComponent from "../components/EditQuestion.vue";
import {goHome} from "../utils/router";

export default defineComponent({
  name: "AddQuestion",
  components: {EditQuestionComponent, Card, Overlay, XIcon, Dropdown},
  setup() {
    return {...addQuestion, goHome};
  }
})
</script>