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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
