import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      account: null,
    },
  },
  getters: {
    getUserAccount: (state) => {
      return state.user.account;
    },
  },
  mutations: {
    setUserAccount(state, account) {
      state.user.account = account;
    },
  },
  actions: {},
  modules: {},
});
