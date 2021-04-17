<template>
  <Overlay></Overlay>
  <Card>
    <template v-slot:card-top>
      <h1 class="dynamic-heading m-5">App installieren</h1>
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
      <div class="card-text-container">
        <div class="pseudo-apps">
          <div class="bg-gray-300"></div>
          <div>
            <img src="../img/app-icon.png">
          </div>
          <div class="bg-gray-300"></div>
          <div class="bg-gray-200"></div>
        </div>
        <br>
        <ol class="relative">
          <li>
            Tippe auf
            <span class="italic">
              <template v-if="mobileBrowser === 'Safari'">
                &nbsp;<img src="../img/apple-share.png">
              </template>
              <template v-else-if="mobileBrowser === 'Chrome'">
                <DotsVerticalIcon></DotsVerticalIcon>
              </template>
              <template v-else>
                <MenuIcon></MenuIcon>
              </template>
            </span>
          </li>
          <li>
            Wähle
            <span class="italic">
              <template v-if="mobileBrowser === 'Safari'">
                "Zum Home-Bildschirm"
              </template>
              <template v-else-if="mobileBrowser === 'Chrome'">
                "Zum Startbildschirm zufügen"
              </template>
              <template v-else>
                "Seite hinzufügen zu" - "Startbildschirm"
              </template>
            </span>
          </li>
          <li>Tippe auf <span class="italic">"Hinzufügen"</span></li>
        </ol>
        <br>
        <p>
          Oder: <router-link :to="{name: 'home'}">einfach hier verwenden</router-link>
        </p>
      </div>
    </template>
  </Card>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Overlay from "../components/Overlay.vue";
import Card from "../components/Card.vue";
import pwaMixin from "../mixins/pwa";
import {XIcon, DotsVerticalIcon, MenuIcon} from '@heroicons/vue/solid';

export default defineComponent({
  name: "Install",
  components: {Overlay, Card, XIcon, DotsVerticalIcon, MenuIcon},
  mixins: [pwaMixin],
  methods: {
    goHome(): void {
      this.$router.push({name: "home"})
    }
  }
})
</script>

<style scoped lang="scss">
@import "../scss/install";
</style>