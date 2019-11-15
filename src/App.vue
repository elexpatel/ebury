<template>
  <div id="app">
    <transition name="composer" mode="out-in">
      <ComposerEmail v-if="!composerConfirmationStatus" />
      <ComposerConfirmation v-else />
    </transition>
    <Icons />
  </div>
</template>

<script>
import ComposerEmail from "./components/composer-email";
import ComposerConfirmation from "./components/composer-confirmation";
import Icons from "./components/icons";

export default {
  name: "App",
  components: {
    ComposerEmail,
    ComposerConfirmation,
    Icons
  },
  computed: {
    composerConfirmationStatus() {
      return this.$store.getters.composerConfirmation;
    }
  }
};
</script>

<style lang="scss">
@import "./styles/_base";
</style>
