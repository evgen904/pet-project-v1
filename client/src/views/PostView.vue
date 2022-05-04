<template>
  <Header />
  <div class="edit-post">
    <div class="edit-post--sidebar">
      <Folders />
    </div>
    <div class="edit-post--content">
      <div class="post">
        <h2>
          Добавить пост
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
          <ui-select :options="options" />
        </div>
        <div class="post--field">
          <CkEditor @sendContent="getContent" :content="initialData" />
        </div>
        <div class="post--field">
          <ui-checkbox>
            Отобразить пост
          </ui-checkbox>
        </div>
        <div class="post--field">
          <ui-checkbox>
            Пост виден всем
          </ui-checkbox>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
import Folders from "@/components/Folders"
import CkEditor from "@/components/CkEditor"

export default {
  name: "PostView",
  components: {
    Header,
    Folders,
    CkEditor,
  },
  data() {
    return {
      options: [
        {
          value: 'sdf',
          text: 'sd f',
        },
        {
          value: 'ssd fsddf',
          text: 'sdsd fsdf f',
        },
        {
          value: 'sdsdfsdf sdf',
          text: 'sdsdf sdfsdf f',
        },
      ],
      title: "",
      initialData: "Test Post"
    }
  },
  methods: {
    getContent(val) {
      console.log(val);
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
