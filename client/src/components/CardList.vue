<template>
  <Card v-for="item in posts" :key="item._id" :dataPost="item" />
</template>

<script>
import Card from "@/components/Card"
import {mapActions} from "vuex";

export default {
  name: "CardList",
  components: {
    Card
  },
  data() {
    return {
      posts: []
    }
  },
  mounted() {
    this.init(this.folder)
  },
  watch: {
    folder(val) {
      this.init(val)
    }
  },
  computed: {
    folder() {
      return this.$route.params.folder
    }
  },
  methods: {
    ...mapActions("posts", ["getPosts"]),
    init(val) {
      this.getPosts({'folder': val})
        .then(res => {
          if (res.data.length) {
            this.posts = res.data;
            if(window.hljs) {
              setTimeout(() => {
                document.querySelectorAll('pre code').forEach((block) => {
                  window.hljs.highlightBlock(block);
                });
              }, 100)
            }
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style scoped>

</style>
