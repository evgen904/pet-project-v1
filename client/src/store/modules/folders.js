import { Folders } from "@/api";

const state = () => ({
  folders: [],
});

const getters = {

};

const actions = {
  addFolder({commit}, payload) {
    return Folders.addFolder(payload)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err)
      })
  },
  setFolder({commit}, payload) {
    return Folders.setFolder(payload)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err)
      })
  },
  removeFolder({commit}, payload) {
    return Folders.removeFolder(payload)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err)
      })
  },
  getFolder({commit}) {
    return Folders.getFolders()
      .then(res => {
        if (res?.data) {
          commit("setFolders", res.data);
        }
        return res;
      })
      .catch(err => {
        console.log(err)
      })
  }
};

const mutations = {
  setFolders(state, value) {
    state.folders = value
  },
};

export default {
  namespaced: true,
  namespace: "folders",
  state,
  getters,
  actions,
  mutations,
};
