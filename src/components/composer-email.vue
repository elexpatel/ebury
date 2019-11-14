<template>
  <div class="composer">
    <div class="composer__header-container">
      <h1 class="composer__header">Send E-mail</h1>
    </div>
    <form class="form" @submit.prevent novalidate enctype="multipart/form-data">
      <fieldset class="form__fieldset">
        <legend class="form__legend">Send E-mail</legend>
        <ul class="form__list">
          <li class="form__list-item">
            <label for="composer-to-email" class="form__label">To</label>
            <input
              v-model="composerTo"
              id="composer-to-email"
              type="email"
              class="form__field"
              :class="{
                'form__field--invalid': $v.composerTo.$error,
                '': !$v.composerTo.$invalid
              }"
              placeholder="To"
            />
          </li>
          <li class="form__list-item">
            <label for="composer-cc-email" class="form__label">CC</label>
            <input
              v-model="composerCC"
              id="composer-cc-email"
              type="email"
              class="form__field"
              :class="{
                'form__field--invalid': $v.composerCC.$error,
                '': !$v.composerCC.$invalid
              }"
              placeholder="CC"
            />
          </li>
          <li class="form__list-item">
            <label for="composer-bcc-email" class="form__label">BCC</label>
            <input
              v-model="composerBCC"
              id="composer-bcc-email"
              type="email"
              class="form__field"
              :class="{
                'form__field--invalid': $v.composerBCC.$error,
                '': !$v.composerBCC.$invalid
              }"
              placeholder="BCC"
            />
          </li>
          <li class="form__list-item">
            <label for="composer-subject" class="form__label">Subject</label>
            <input
              v-model="composerSubject"
              id="composer-subject"
              type="text"
              class="form__field"
              :class="{
                'form__field--invalid': $v.composerSubject.$error,
                '': !$v.composerSubject.$invalid
              }"
              placeholder="Subject"
            />
          </li>
          <li class="form__list-item">
            <label for="composer-message" class="form__label">Message</label>
            <textarea
              v-model="composerMessage"
              id="composer-message"
              class="form__field form__field-textarea"
              :class="{
                'form__field--invalid': $v.composerMessage.$error,
                '': !$v.composerMessage.$invalid
              }"
              placeholder="Message"
            ></textarea>
          </li>
          <li :class="[composerForm.emailAttachments.length ? 'form__list-item' : 'form__list-item--hidden']">
            <h2 class="form__attachment-header">Attached files</h2>
            <div class="form__attachment-container">
              <span v-for="(attachment, index) in composerForm.emailAttachments" :key="index" class="form__attachment-image-wrapper">
                <img :src="attachment.data" class="form__attachment-image" />
                <div class="form__attachment-image-mask">
                  <div class="form__attachment-image-icon-wrapper" @click="removeAttachment(attachment.name)">
                    <svg class="form__attachment-image-icon" viewBox="0 0 24 24" width="24" height="24">
                      <use :xlink:href="`#icon-bin`" />
                    </svg>
                  </div>
                </div>
              </span>
            </div>
            <label for="composer-attachment" class="form__label">Attachment</label>
            <input
              ref="attachmentField"
              @change="
                updatedAttachment($event.target.files)
              "
              id="composer-attachment"
              type="file"
              class="form__field form__field-attachment"
              multiple
            />
          </li>
        </ul>
      </fieldset>
      <div class="form__button-container">
        <button
          type="button"
          class="form__button-attachment"
          @click="openAttachment"
        >
          <svg
            class="form__button-attachment-icon"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <use :xlink:href="`#icon-attachment`" />
          </svg>
          <span class="form__button-sr-only" style="display:none;"
            >Attachment</span
          >
        </button>
        <button
          type="submit"
          :class="[
            $v.$dirty && !$v.$invalid
              ? 'form__button'
              : 'form__button--inactive'
          ]"
          @click="sendEmail"
        >
          <svg
            class="form__button-arrow-right"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <use :xlink:href="`#icon-arrow-right`" />
          </svg>
          <span class="form__button-label">Send</span>
        </button>
      </div>
      <!-- <pre>{{ $v }}</pre> -->
    </form>
  </div>
</template>

<script>
import { required, requiredIf } from "vuelidate/lib/validators";

const multipleEmails = value => {
  const emailRx = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (value === "") return true;
  return value.indexOf(",") !== -1
    ? value
        .split(",")
        .every(item => (item === "" ? true : emailRx.test(item.trim())))
    : emailRx.test(value);
};

export default {
  data() {
    return {
      attachmentList:[]
    }
  },
  validations: {
    composerTo: {
      required: requiredIf(
        value => value.composerCC === "" && value.composerBCC === ""
      ),
      multipleEmails
    },
    composerCC: {
      required: requiredIf(
        value => value.composerTo === "" && value.composerBCC === ""
      ),
      multipleEmails
    },
    composerBCC: {
      required: requiredIf(
        value => value.composerTo === "" && value.composerCC === ""
      ),
      multipleEmails
    },
    composerSubject: {
      required
    },
    composerMessage: {
      required
    }
  },
  computed: {
    composerForm() {
      return this.$store.getters.composerFrom;
    },
    composerTo: {
      get() {
        return this.composerForm.emailTo.length
          ? this.composerForm.emailTo.join(",")
          : "";
      },
      set(value) {
        if (value.indexOf(",") !== -1) {
          value = value.split(",");
        } else {
          value = [value.trim()];
        }
        this.$store.dispatch("updateComposer", { emailTo: value });
        this.$v.composerTo.$touch();
      }
    },
    composerCC: {
      get() {
        return this.composerForm.emailCC.length
          ? this.composerForm.emailCC.join(",")
          : "";
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
        return this.composerForm.emailBCC.length
          ? this.composerForm.emailBCC.join(",")
          : "";
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
  },
  methods: {
    sendEmail() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        console.log("send");
      }
    },
    openAttachment() {
      this.$refs.attachmentField.click();
    },
    updatedAttachment(files) {
      if (files.length === 1) {
        this.$store.dispatch("addAttachment", { name: files[0].name, data: URL.createObjectURL(files[0]) });
      } else if (files.length > 1) {
        Array.from(files).forEach(file => {
          this.$store.dispatch("addAttachment", { name: file.name, data: URL.createObjectURL(file) });
        });
      }
    },
    removeAttachment(fileName) {
      this.$store.dispatch("removeAttachment", fileName);
    }
  }
};
</script>