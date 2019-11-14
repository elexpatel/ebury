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
      emailAttachements: []
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
    }
  },
  mutations: {
    UPDATE_COMPOSER(state, payload) {
      console.log(state);
      console.log(payload);
    },
    UPDATE_COMPOSER_CONFORMATION(state, status) {
      state.composerConformation = status;
    }
  },
  getters: {
    composerFrom(state) {
      return state.composerForm;
    },
    composerConfirmation(state) {
      return state.composerConformation;
    }
  }
});
