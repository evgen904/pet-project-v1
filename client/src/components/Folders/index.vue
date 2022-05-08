<template>
  <ul class="menu">
    <li v-for="item in folders" :key="item._id">
      <router-link :to="{
          name: 'CardList',
          params: { folder: item.name }
        }">{{ item.title }}</router-link>
    </li>
    <li>
      <hr>
    </li>
    <li>
      <router-link to="/">Мусор</router-link>
    </li>
    <li>
      <router-link to="/">Todo list</router-link>
    </li>
  </ul>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Folder",
  computed: {
    ...mapState("folders", ["folders"]),
  },
  methods: {
    ...mapActions("folders", ["getFolder"])
  },
  mounted() {
    this.getFolder()
  }
}
</script>

<style lang="scss" scoped>
.menu {
  padding: 0;
  margin: 0;
  list-style: none;
  position: sticky;
  top: 0;
  li {
    a {
      display: block;
      padding: 10px 12px;
      color: #000000;
      text-decoration: none;
      font-size: 14px;
      background: #fff;
      transition: background .3s ease;
      &:hover {
        background: #f9f9f9;
      }
    }
    hr {
      height: 1px;
      border: none;
      background: #ccc;
    }
  }
}
</style>
