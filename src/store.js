import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    composerForm: {
      emailTo: [], // made into array to allow more flexibility when sending data;
      emailCC: [],
      emailBCC: [],
      emailSubject: "",
      emailMessage: "",
      emailAttachments: []
    },
    composerConformation: false
  },
  actions: {
    updateComposer($event, payload) {
      $event.commit("UPDATE_COMPOSER", payload);
    },
    sendComposer($event) {
      // this is where an AJAX POST request would be preformed to the backend API.
      $event.commit("UPDATE_COMPOSER_CONFORMATION", true);
    },
    addAttachment($event, file) {
      $event.commit("ADD_COMPOSER_ATTACHMENT", file);
    },
    removeAttachment($event, id) {
      $event.commit("REMOVE_COMPOSER_ATTACHMENT", id);
    }    
  },
  mutations: {
    UPDATE_COMPOSER(state, payload) {
      state.composerForm = Object.assign(state.composerForm, payload);
    },
    UPDATE_COMPOSER_CONFORMATION(state, status) {
      state.composerConformation = status;
    },
    ADD_COMPOSER_ATTACHMENT(state, file) {
      state.composerForm.emailAttachments = [...state.composerForm.emailAttachments, file];
    },
    REMOVE_COMPOSER_ATTACHMENT(state, filename) {
      state.composerForm.emailAttachments = state.composerForm.emailAttachments.filter(attachment => attachment.name !== filename);
    }
  },
  getters: {
    composerForm: state => state.composerForm,
    composerConfirmation: state => state.composerConformation
  }
});
