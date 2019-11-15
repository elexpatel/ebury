<template>
  <div class="composer">
    <div class="composer__header-container">
      <h1 class="composer__header">Send E-mail</h1>
    </div>
    <form class="form" novalidate enctype="multipart/form-data" @submit.prevent>
      <fieldset class="form__fieldset">
        <legend class="form__legend">Send E-mail</legend>
        <ul class="form__list">
          <li class="form__list-item">
            <label for="composer-to-email" class="form__label">To</label>
            <input
              id="composer-to-email"
              v-model="composerTo"
              type="email"
              class="form__field"
              :class="{
                'form__field--invalid': $v.composerTo.$error,
                'form__field--valid': !$v.composerTo.$invalid
              }"
              placeholder="To"
            />
            <div
              v-show="$v.composerTo.$error && !$v.composerTo.required"
              class="form__field-validation-message--invalid"
            >
              Please add an email address
            </div>
            <div
              v-show="$v.composerTo.$error && !$v.composerTo.multipleEmails"
              class="form__field-validation-message--invalid"
            >
              Please add a valid email address
            </div>
          </li>
          <li class="form__list-item">
            <label for="composer-cc-email" class="form__label">CC</label>
            <input
              id="composer-cc-email"
              v-model="composerCC"
              type="email"
              class="form__field"
              :class="{
                'form__field--invalid': $v.composerCC.$error,
                'form__field--valid': !$v.composerCC.$invalid
              }"
              placeholder="CC"
            />
            <div
              v-show="$v.composerCC.$error && !$v.composerCC.required"
              class="form__field-validation-message--invalid"
            >
              Please add an email address
            </div>
            <div
              v-show="$v.composerCC.$error && !$v.composerCC.multipleEmails"
              class="form__field-validation-message--invalid"
            >
              Please add a valid email address
            </div>
          </li>
          <li class="form__list-item">
            <label for="composer-bcc-email" class="form__label">BCC</label>
            <input
              id="composer-bcc-email"
              v-model="composerBCC"
              type="email"
              class="form__field"
              :class="{
                'form__field--invalid': $v.composerBCC.$error,
                'form__field--valid': !$v.composerBCC.$invalid
              }"
              placeholder="BCC"
            />
            <div
              v-show="$v.composerBCC.$error && !$v.composerBCC.required"
              class="form__field-validation-message--invalid"
            >
              Please add an email address
            </div>
            <div
              v-show="$v.composerBCC.$error && !$v.composerBCC.multipleEmails"
              class="form__field-validation-message--invalid"
            >
              Please add a valid email address
            </div>
          </li>
          <li class="form__list-item">
            <label for="composer-subject" class="form__label">Subject</label>
            <input
              id="composer-subject"
              v-model="composerSubject"
              type="text"
              class="form__field"
              :class="{
                'form__field--invalid': $v.composerSubject.$error,
                'form__field--valid': !$v.composerSubject.$invalid
              }"
              placeholder="Subject"
              maxLength="100"
            />
            <div
              v-show="$v.composerSubject.$error && !$v.composerSubject.required"
              class="form__field-validation-message--invalid"
            >
              Please add a subject line
            </div>
            <div
              v-show="
                $v.composerSubject.$error && !$v.composerSubject.maxLength
              "
              class="form__field-validation-message--invalid"
            >
              Subject should not be greater than
              {{ $v.composerSubject.maxLength.max }} characters
            </div>
          </li>
          <li class="form__list-item">
            <label for="composer-message" class="form__label">Message</label>
            <textarea
              id="composer-message"
              v-model="composerMessage"
              class="form__field form__field-textarea"
              :class="{
                'form__field--invalid': $v.composerMessage.$error,
                'form__field--valid': !$v.composerMessage.$invalid
              }"
              placeholder="Message"
            ></textarea>
            <div
              v-show="$v.composerMessage.$error && !$v.composerMessage.required"
              class="form__field-validation-message--invalid"
            >
              Please add a message
            </div>
          </li>
          <li
            :class="[
              composerAttachments.length
                ? 'form__list-item'
                : 'form__list-item--hidden'
            ]"
          >
            <h2 class="attachment__header">Attached files</h2>
            <div class="attachment__container">
              <div
                v-for="(attachment, index) in composerAttachments"
                :key="index"
                class="attachment__item"
              >
                <span class="attachment__image-wrapper">
                  <img :src="attachment.data" class="attachment__image" />
                  <div class="attachment__image-mask">
                    <div
                      class="attachment__image-icon-wrapper"
                      @click="removeAttachment(attachment.name)"
                    >
                      <svg
                        class="attachment__image-icon"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <use :xlink:href="`#icon-bin`" />
                      </svg>
                    </div>
                  </div>
                </span>
              </div>
            </div>
            <label for="composer-attachment" class="form__label"
              >Attachment</label
            >
            <input
              id="composer-attachment"
              ref="attachmentField"
              type="file"
              class="form__field form__field-attachment"
              multiple
              accept="image/*"
              @change="updatedAttachment($event.target.files)"
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
            class="icon__composer-attachment"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <use :xlink:href="`#icon-attachment`" />
          </svg>
          <span class="form__button-sr-only">Attachment</span>
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
            class="icon__composer-send"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <use :xlink:href="`#icon-arrow-right`" />
          </svg>
          <span class="form__button-label">Send</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, requiredIf, maxLength } from "vuelidate/lib/validators";
import { multipleEmails } from "../utilities/custom-validation";

export default {
  data() {
    return {
      attachmentList: []
    };
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
      required,
      maxLength: maxLength(100)
    },
    composerMessage: {
      required
    }
  },
  computed: {
    composerForm() {
      return this.$store.getters.composerForm;
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
    composerAttachments() {
      return this.composerForm.emailAttachments;
    }
  },
  methods: {
    sendEmail() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.dispatch("sendComposer");
      }
    },
    openAttachment() {
      this.$refs.attachmentField.click();
    },
    updatedAttachment(files) {
      if (files.length === 1) {
        this.$store.dispatch("addAttachment", {
          name: files[0].name,
          data: URL.createObjectURL(files[0])
        });
      } else if (files.length > 1) {
        Array.from(files).forEach(file => {
          this.$store.dispatch("addAttachment", {
            name: file.name,
            data: URL.createObjectURL(file)
          });
        });
      }
    },
    removeAttachment(fileName) {
      this.$store.dispatch("removeAttachment", fileName);
    }
  }
};
</script>
