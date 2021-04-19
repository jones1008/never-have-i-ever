<template>
  <div class="wave"></div>
  <div class="caption">
    <h1>Ich hab' noch nie...</h1>
  </div>
  <div class="centerer">
    <RouterView></RouterView>
  </div>
  <MessageBox
      v-model:message="globalSuccess"
      color="bg-green-600"
      :timeout="5000"
  ></MessageBox>
  <MessageBox
      v-model:message="globalError"
      color="bg-red-600"
      :timeout="5000"
  ></MessageBox>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import MessageBox from './components/MessageBox.vue';
import pwa from "./composition/pwa";
import app from "./composition/app";
import router from "./router";

export default defineComponent({
  name: 'App',
  components: {MessageBox},
  setup() {
    if (pwa.mobileBrowser() && !pwa.isPWA()) {
      router.push({name: "install"})
    }
    return app;
  }
})
</script>

<style lang="scss">
@import "./scss/app";
</style>