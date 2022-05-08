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
        <div v-if="addWarning" class="post--field error">
          {{ addWarning }}
        </div>
        <div class="post--field">
          <ui-button type="click" color="success" @click="sendPost">
            {{ btnSend }}
          </ui-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Folders from "@/components/Folders"
import CkEditor from "@/components/CkEditor"
import {mapState, mapActions} from "vuex";
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
      addWarning: "",
    }
  },
  mounted() {
    if (this.isEdit) {
      this.editData(this.$route.params.id)
    }
  },
  computed: {
    ...mapState("folders", ["folders"]),
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
      if (this.folders.length) {
        this.folders.forEach(item => {
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
    ...mapActions("posts", ["addPost", "setPost", "editPost"]),
    getContent(val) {
      this.description = val;
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
            this.selectedFolder = res.data[0]["folder"]
            this.showPost = res.data[0]["show"]
            this.showAllPost = res.data[0]["showAll"]
          }
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style lang="scss" scoped>
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
    }
  }
}
</style>
