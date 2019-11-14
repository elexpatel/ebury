<template>
  <div id="app">
    <ComposerEmail />
    <Icons />
  </div>
</template>

<script>
import ComposerEmail from "./components/composer-email.vue";
import Icons from "./components/icons"

export default {
  name: "app",
  components: {
    ComposerEmail,
    Icons
  }
};
</script>

<style lang="scss">
@import "./styles/_base";
</style>
