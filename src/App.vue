<template>
  <div id="app">
    <ComposerEmail />
  </div>
</template>

<script>
import ComposerEmail from "./components/composer-email.vue";

export default {
  name: "app",
  components: {
    ComposerEmail
  }
};
</script>

<style lang="scss">
@import "./styles/_base";
</style>
