<template>
  <Overlay @click="goHome"></Overlay>
  <Card class="card-taller">
    <template v-slot:card-top>
      <h1 class="dynamic-heading w-full m-5">
        Spielregeln
        <FireIcon class="inline-fire"></FireIcon>
      </h1>
    </template>
    <template v-slot:card-text>
      <div class="card-text-container">
        <ol>
          <li>
            Lies eine Aussage vor.<br>
            Beispiel: <em>"Ich hab' noch nie mein Handy verloren."</em>
          </li>
          <li>Jeder, der schon mal sein Handy verloren hat, muss 1 Schluck trinken.</li>
          <li>Seid kreativ und fügt selbst neue Aussagen hinzu, die dann auch andere Spieler sehen können.</li>
        </ol>
      </div>
    </template>

    <template v-slot:card-action>
      <button
          class="btn btn-gradient w-full"
          @click="goHome"
      >
        Los geht's!
      </button>
    </template>

  </Card>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Overlay from "../components/Overlay.vue";
import Card from "../components/Card.vue";
import {goHome} from "../utils/router";
import {XIcon, FireIcon} from '@heroicons/vue/solid';

export default defineComponent({
  name: "Intro",
  components: {Card, Overlay, XIcon, FireIcon},
  setup() {
    return {goHome}
  }
})
</script>

<style scoped>
@import "../scss/intro.scss";
</style>