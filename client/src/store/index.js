import { createStore } from "vuex";
import user from "./modules/user"
import folders from "./modules/folders"

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    folders,
  },
});
