import { Posts } from "@/api";

const state = () => ({
  posts: [],
});

const getters = {

};

const actions = {
  addPost({commit}, payload) {
    return Posts.addPost(payload)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err)
      })
  },
};

const mutations = {
  setFolders(state, value) {
    state.folders = value
  },
};

export default {
  namespaced: true,
  namespace: "post",
  state,
  getters,
  actions,
  mutations,
};
