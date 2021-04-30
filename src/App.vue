<template>
  <div class="wave"></div>
  <div class="caption">
    <h1>
      <template v-if="currentQuestionPrefix">{{ currentQuestionPrefix }}...</template>
      <template v-else>{{defaultPrefix}}</template>
    </h1>
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
// import store from "./store";

export default defineComponent({
  name: 'App',
  components: {MessageBox},
  setup() {
    // store.commit("globalSuccess", "hinzugefügt");
    if (pwa.mobileBrowser.value && !pwa.isPWA.value) {
      router.push({name: "install"})
    }
    return app;
  }
})
</script>

<style lang="scss">
@import "./scss/app";
</style>