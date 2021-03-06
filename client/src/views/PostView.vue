<template>
  <Header />
  <div class="edit-post">
    <div class="edit-post--sidebar">
      <Folders />
    </div>
    <div class="edit-post--content">
      <div class="post">
        <h2>
          {{ titlePage }}
        </h2>
        <div class="post--field">
          <p>
            Название поста
          </p>
          <ui-input :isBlock="true" v-model.trim="title" type="text" placeholder="Название поста" />
        </div>
        <div class="post--field">
          <p>
            Категория для поста
          </p>
          <ui-select v-model="selectedFolder" :options="folderList" />
        </div>
        <div class="post--field">
          <CkEditor @sendContent="getContent" :content="description" />
        </div>
        <div class="post--field">
          <ui-checkbox v-model="showPost">
            Отобразить пост
          </ui-checkbox>
        </div>
        <div class="post--field">
          <ui-checkbox v-model="showAllPost">
            Пост виден всем
          </ui-checkbox>
        </div>
        <div class="post--status" v-if="showAllPost">
          Статус:
          <span class="red" v-if="status === 'moderation'">на модерации</span>
          <span class="green" v-else-if="status === 'active'">Виден всем</span>
        </div>
        <div v-if="addWarning" class="post--field error">
          {{ addWarning }}
        </div>
        <div class="post--field">
          <ui-button type="click" color="success" @click="sendPost">
            {{ btnSend }}
          </ui-button>
        </div>
      </div>
      <div class="post">
        <h2>
          Редактирование постов
        </h2>
        <div class="post--list">
          <ul>
            <transition-group name="list">
              <li v-for="(item, index) in posts" :key="item.id" :class="{'active': item.id === $route.params.id}">
                <div class="post-name">
                  {{ item.title }}
                </div>
                <div class="post-del">
                  <ui-button v-if="isAdmin" type="click" color="success" @click="publishPostBtn(item.id, index)">Опубликовать</ui-button>
                  <ui-button type="click" color="success" @click="setPostBtn(item.id)">Редактировать</ui-button>
                  <ui-button type="click" color="danger" @click="delPostBtn(item.id)">Удалить</ui-button>
                </div>
              </li>
            </transition-group>
          </ul>
        </div>
      </div>
      <div class="post" v-if="postsModeration.length">
        <h2>
          Посты на модерацию
        </h2>
        <div class="post--list">
          <ul>
            <transition-group name="list">
              <li v-for="(item, index) in postsModeration" :key="item.id" :class="{'active': item.id === $route.params.id}">
                <div class="post-name">
                  {{ item.title }}
                </div>
                <div class="post-del">
                  <ui-button v-if="isAdmin" type="click" color="success" @click="publishPostBtn(item.id, index)">Опубликовать</ui-button>
                  <ui-button type="click" color="success" @click="setPostBtn(item.id)">Редактировать</ui-button>
                  <ui-button type="click" color="danger" @click="delPostBtn(item.id)">Удалить</ui-button>
                </div>
              </li>
            </transition-group>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Folders from "@/components/Folders"
import CkEditor from "@/components/CkEditor"
import {mapState, mapActions, mapGetters} from "vuex";
import cyrillicToTranslit from "cyrillic-to-translit-js";

export default {
  name: "PostView",
  components: {
    Header,
    Folders,
    CkEditor,
  },
  data() {
    return {
      title: "",
      description: "",
      selectedFolder: "0",
      showPost: true,
      showAllPost: false,
      status: "moderation",
      addWarning: "",
      posts: [],
      postsModeration: [],
    }
  },
  watch: {
    '$route.params.id': {
      handler: function(id) {
        this.editData(this.$route.params.id)
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
    if (this.isEdit) {
      this.editData(this.$route.params.id)
    }
    this.initPosts()
    if (this.isAdmin) {
      this.loadPostsModeration()
    }
  },
  computed: {
    ...mapState("folders", ["foldersAll", "foldersUser"]),
    ...mapGetters("user", ["isAdmin"]),
    ...mapState("user", ["user"]),
    isEdit() {
      return this.$route?.params?.id ? true : false
    },
    titlePage() {
      return this.isEdit ? "Редактировать пост" : "Добавить пост"
    },
    btnSend() {
      return this.isEdit ? "Сохранить" : "Добавить"
    },
    folderList() {
      const list = [{
        value: '0',
        text: 'Выберите категорию',
      }]
      if (this.foldersAll.length) {
        this.foldersAll.forEach(item => {
          list.push({
            value: item.name,
            text: item.title,
          })
        })
      }
      if (this.foldersUser.length) {
        this.foldersUser.forEach(item => {
          list.push({
            value: item.name,
            text: item.title,
          })
        })
      }
      return list;
    }
  },
  methods: {
    ...mapActions("posts", ["addPost", "setPost", "editPost", "getPostsUser", "removePost", "getPostsModeration", "setPublishPost"]),
    getContent(val) {
      this.description = val;
    },
    initPosts() {
      this.getPostsUser()
        .then(res => {
          if (res.data.length) {
            const posts = res.data.map(item => {
              return {
                id: item._id,
                title: item.title
              }
            })
            this.posts = posts
          }
        })
        .catch(err => console.log(err))
    },
    loadPostsModeration() {
      this.getPostsModeration()
        .then(res => {
          if (res.data.length) {
            const posts = res.data.filter(item => item.user !== this.user.id).map(item => {
              return {
                id: item._id,
                title: item.title
              }
            })
            this.postsModeration = posts
          }
        })
        .catch(err => console.log(err))
    },
    sendPost() {
      const postData = {
        title: this.title,
        description: this.description,
        show: this.showPost,
        showAll: this.showAllPost,
        folder: this.selectedFolder
      }
      if (!this.isEdit) {
        this.addPost(postData)
          .then(res => {
            if (res?.data?.message) {
              this.addWarning = res.data.message
            } else {
              this.addWarning = ""
              this.initPosts()
            }
            console.log(res, "res");
          })
          .catch(err => console.log(err))
      } else {
        postData._id = this.$route.params.id;
        this.setPost(postData)
          .then(res => {
            if (res?.data?.message) {
              this.addWarning = res.data.message
            } else {
              this.addWarning = ""
            }
            console.log(res, "res");
          })
          .catch(err => console.log(err))
      }
    },
    editData(id) {
      this.editPost({_id: id})
        .then(res => {
          if (res?.data?.message) {
            this.addWarning = res.data.message
          } else if (res.data.length) {
            this.addWarning = ""
            this.title = res.data[0]["title"]
            this.description = res.data[0]["description"]
            this.status = res.data[0]["status"]
            this.selectedFolder = res.data[0]["folder"]
            this.showPost = res.data[0]["show"]
            this.showAllPost = res.data[0]["showAll"]
          }
        })
        .catch(err => console.log(err))
    },
    setPostBtn(id) {
      this.$router.push({
        name: "PostViewEdit",
        params: {
          id
        }
      })
    },
    delPostBtn(id) {
      this.removePost({_id: id})
        .then(res => {
          if (res?.data?.deletedCount) {
            this.initPosts()
          }
        })
        .catch(err => console.log(err))
    },
    publishPostBtn(id, index) {
      this.setPublishPost({_id: id})
        .then(res => {
          if (res.data.modifiedCount) {

          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.edit-post {
  display: grid;
  grid-template-columns: 1fr 240px 20px minmax(100px, 1000px) 1fr;
  grid-template-areas: ". sidebar . content .";
  &--sidebar {
    grid-area: sidebar;
  }
  &--content {
    grid-area: content;
    .post {
      margin-bottom: 30px;
      h2 {
        margin-bottom: 20px;
      }
      &--field {
        margin-bottom: 14px;
        &.error {
          color: #cc0000;
        }
        p {
          margin: 0;
          font-size: 14px;
          margin-bottom: 4px;
        }
        .ui-select {
          max-width: 400px;
        }
      }
      &--status {
        font-size: 14px;
        margin-bottom: 20px;
        span {
          &.green {
            color: #00970c;
          }
          &.red {
            color: #cc0000;
          }
        }
      }
      &--list {
        ul {
          padding: 0;
          margin: 0;
          list-style: none;
          li {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            background: #f0f0f0;
            margin-bottom: 10px;
            transition: .3s background ease;
            &.active, &:hover {
              background: #d9d9d9;
            }
            .post-name {
              width: 100%;
              display: flex;
              align-items: center;
              font-size: 18px;
              padding-left: 10px;
            }
            .post-del {
              margin-left: 10px;
              display: flex;
              flex-wrap: nowrap;
              align-items: flex-start;
              .ui-btn {
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
