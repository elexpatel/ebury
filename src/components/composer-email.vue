<template>
  <div class="composer">
    <form class="form">
      <fieldset class="form__fieldset">
        <legend class="form__legend">Send E-mail</legend>
        <ul class="form__list">
          <li class="form__list-item">
            <input type="email" class="form__field" placeholder="To" />
          </li>
          <li class="form__list-item">
            <input type="email" class="form__field" placeholder="CC" />
          </li>
          <li class="form__list-item">
            <input type="email" class="form__field" placeholder="BCC" />
          </li>
          <li class="form__list-item">
            <input v-model="composerSubject" type="text" class="form__field" placeholder="Subject" />
          </li>
          <li class="form__list-item">
            <textarea class="form__field" placeholder="Message"></textarea>
          </li>
          <li class="form__list-item--hidden">
            <input type="file" class="form__field" />
          </li>
        </ul>
      </fieldset>
      <div class="form__button-container">
        <button class="form__button-attachment">@</button>
        <button class="form__button--inactive"><span>-></span> Send</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  computed: {
    composerForm() {
      return this.$store.getters.composerFrom;
    },
    composerSubject: {
      get() {
        return this.composerForm.emailSubject;
      },
      set(value) {
        this.$store.dispatch("updateComposer", { emailSubject: value });
      }
    }
  }
}
</script>