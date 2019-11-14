<template>
  <div class="composer">
    <form class="form">
      <fieldset class="form__fieldset">
        <legend class="form__legend">Send E-mail</legend>
        <ul class="form__list">
          <li class="form__list-item">
            <label for="composer-to-email" class="form__label">To</label>
            <input v-model="composerTo" id="composer-to-email" type="email" class="form__field" placeholder="To" />
          </li>
          <li class="form__list-item">
            <label for="composer-cc-email" class="form__label">CC</label>
            <input v-model="composerCC" id="composer-cc-email" type="email" class="form__field" placeholder="CC" />
          </li>
          <li class="form__list-item">
            <label for="composer-bcc-email" class="form__label">BCC</label>
            <input v-model="composerBCC" id="composer-bcc-email" type="email" class="form__field" placeholder="BCC" />
          </li>
          <li class="form__list-item">
            <label for="composer-subject" class="form__label">Subject</label>
            <input v-model="composerSubject" id="composer-subject" type="text" class="form__field" placeholder="Subject" />
          </li>
          <li class="form__list-item">
            <label for="composer-message" class="form__label">Message</label>
            <textarea v-model="composerMessage" id="composer-message" class="form__field" placeholder="Message"></textarea>
          </li>
          <li class="form__list-item--hidden">
            <label for="composer-attachment">Attachment</label>
            <input @change="composerAttachment" id="composer-attachment" type="file" class="form__field" />
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
    composerTo: {
      get() {
        return this.composerForm.emailTo.length ? this.composerForm.emailTo.join(","): "";
      },
      set(value) {
        if (value.indexOf(",") !== -1) {
          value = value.split(",");
        } else {
          value = [value.trim()];
        }
        this.$store.dispatch("updateComposer", { emailTo: value });
      }
    },
    composerCC: {
      get() {
        return this.composerForm.emailCC.length ? this.composerForm.emailCC.join(","): "";
      },
      set(value) {
        if (value.indexOf(",") !== -1) {
          value = value.split(",");
        } else {
          value = [value.trim()];
        }
        this.$store.dispatch("updateComposer", { emailCC: value });
      }
    },
    composerBCC: {
      get() {
        return this.composerForm.emailBCC.length ? this.composerForm.emailBCC.join(","): "";
      },
      set(value) {
        if (value.indexOf(",") !== -1) {
          value = value.split(",");
        } else {
          value = [value.trim()];
        }
        this.$store.dispatch("updateComposer", { emailBCC: value });
      }
    },
    composerSubject: {
      get() {
        return this.composerForm.emailSubject;
      },
      set(value) {
        this.$store.dispatch("updateComposer", { emailSubject: value });
      }
    },
    composerMessage: {
      get() {
        return this.composerForm.emailMessage;
      },
      set(value) {
        this.$store.dispatch("updateComposer", { emailMessage: value });
      }
    },
    composerAttachment: {
      get() {
        return this.composerForm.emailMessage;
      },
      set(value) {
        this.$store.dispatch("updateComposer", { emailMessage: value });
      }
    }
  }
}
</script>