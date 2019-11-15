<template>
  <div id="app">
    <ComposerEmail v-if="!composerConfirmationStatus" />
    <ComposerConfirmation v-else />
    <Icons />
  </div>
</template>

<script>
import ComposerEmail from "./components/composer-email";
import ComposerConfirmation from "./components/composer-confirmation";
import Icons from "./components/icons";

export default {
  name: "app",
  components: {
    ComposerEmail,
    ComposerConfirmation,
    Icons
  },
  computed: {
    composerConfirmationStatus() {
      return this.$store.getters.composerConfirmation;
    },    
  }
};
</script>

<style lang="scss">
@import "./styles/_base";
</style>
