import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  composerForm: {
    emailTo: [], // made into array to allow more flexibility when sending data;
    emailCC: [],
    emailBCC: [],
    emailSubject: "",
    emailMessage: "",
    emailAttachments: []
  },
  composerConfirmation: false
};

export const actions = {
  updateComposer($event, payload) {
    $event.commit("UPDATE_COMPOSER", payload);
  },
  sendComposer($event) {
    // this is where an AJAX POST request would be preformed to the backend API.
    $event.commit("UPDATE_COMPOSER_CONFIRMATION", true);
  },
  addAttachment($event, file) {
    $event.commit("ADD_COMPOSER_ATTACHMENT", file);
  },
  removeAttachment($event, id) {
    $event.commit("REMOVE_COMPOSER_ATTACHMENT", id);
  }
};

export const mutations = {
  UPDATE_COMPOSER(state, payload) {
    state.composerForm = Object.assign(state.composerForm, payload);
  },
  UPDATE_COMPOSER_CONFIRMATION(state, status) {
    state.composerConfirmation = status;
  },
  ADD_COMPOSER_ATTACHMENT(state, file) {
    state.composerForm.emailAttachments = [
      ...state.composerForm.emailAttachments,
      file
    ];
  },
  REMOVE_COMPOSER_ATTACHMENT(state, filename) {
    state.composerForm.emailAttachments = state.composerForm.emailAttachments.filter(
      attachment => attachment.name !== filename
    );
  }
};

export const getters = {
  composerForm: state => state.composerForm,
  composerConfirmation: state => state.composerConfirmation
};

export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});
