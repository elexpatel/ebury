<template>
  <div class="composer">
    <div class="composer__confirmation">
      <div class="composer__confirmation-header-container">
        <svg class="icon__tick icon__composer-confirmation" viewBox="0 0 24 24" width="24" height="24">
          <use :xlink:href="`#icon-tick`" />
        </svg>
        <h2 class="composer__confirmation-header">Your email has been sent</h2>
      </div>
      <hr class="composer__confirmation-divider" />
      <h3 class="composer__confirmation-subject">{{ composerForm.emailSubject }}</h3>
      <div class="composer__confirmation-recipient-container">
        <template v-if="composerForm.emailTo.length">
          <p class="composer__confirmation-recipient">
            to 
            <span v-for="(to, index) in composerForm.emailTo" :key="index" class="composer__confirmation-recipient-email">{{ to }}</span>
          </p>
        </template>
        <template v-if="composerForm.emailCC.length">
          <p class="composer__confirmation-recipient">
            cc 
            <span v-for="(cc, index) in composerForm.emailCC" :key="index" class="composer__confirmation-recipient-email">{{ cc }}</span>
          </p>
        </template>   
        <template v-if="composerForm.emailBCC.length">
          <p class="composer__confirmation-recipient">
            bcc 
            <span v-for="(bcc, index) in composerForm.emailBCC" :key="index" class="composer__confirmation-recipient-email">{{ bcc }}</span>
          </p>
        </template>             
      </div>
      <pre class="composer__confirmation-message">{{ composerForm.emailMessage }}</pre>
      <div class="form__attachment-container">
        <span v-for="(attachment, index) in composerForm.emailAttachments" :key="index" class="form__attachment-image-wrapper">
          <img :src="attachment.data" class="form__attachment-image" />
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    composerForm() {
      return this.$store.getters.composerFrom;
    },
  }
};
</script>
