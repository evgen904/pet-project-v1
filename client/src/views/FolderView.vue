<template>
  <Header />
  <div class="edit-folders">
    <div class="edit-folders--sidebar">
      <Folders />
    </div>
    <div class="edit-folders--content">
      <div class="folder">
        <h2>Добавить категорию</h2>
        <div class="folder--field">
          <ui-input :isBlock="true" v-model.trim="titleFolder" type="text" placeholder="Название категории" />
        </div>
        <div v-if="addWarning" class="folder--warning">
          {{ addWarning }}
        </div>
        <ui-button type="click" color="success" @click="addFolderBtn">Добавить</ui-button>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Folders from "@/components/Folders"
import cyrillicToTranslit from "cyrillic-to-translit-js"
import {mapActions, mapState} from "vuex";

export default {
  name: "FolderView",
  components: {
    Header,
    Folders,
  },
  data() {
    return {
      titleFolder: "",
      nameFolder: "",
      addWarning: "",
    }
  },
  methods: {
    ...mapActions("folders", ["addFolder"]),
    addFolderBtn() {
      const addFolder = {
        name: cyrillicToTranslit().transform(this.titleFolder.toLocaleLowerCase(), "_"),
        title: this.titleFolder,
      }
      this.addFolder(addFolder)
        .then(res => {
          if (res?.data?.message) {
            this.addWarning = res.data.message
          } else {
            this.addWarning = ""
          }
          if (res?.data?.folderData?.name) {
            this.titleFolder = ""
          }
        })
        .catch(err => console.log(err))
    },
  }
}
</script>

<style lang="scss" scoped>
.edit-folders {
  display: grid;
  grid-template-columns: 1fr 240px 20px minmax(100px, 1000px) 1fr;
  grid-template-areas: ". sidebar . content .";
  &--sidebar {
    grid-area: sidebar;
  }
  &--content {
    grid-area: content;
    h2 {
      margin-bottom: 20px;
    }
    .folder {
      &--field {
        margin-bottom: 10px;
      }
      &--warning {
        font-size: 14px;
        color: #cc0000;
        margin-bottom: 10px;
      }
    }
  }
}
</style>
