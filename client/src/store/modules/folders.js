import { Folders } from "../../../api";

const state = () => ({
  folders: [],
});

const getters = {

};

const actions = {
  addFolder({commit}, payload) {
    return Folders.add(payload)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err)
      })
  }
};

const mutations = {

};

export default {
  namespaced: true,
  namespace: "folders",
  state,
  getters,
  actions,
  mutations,
};
