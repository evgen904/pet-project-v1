<template>
  <div class="header">
    <div class="header--title">
      Шпаргалка по JS
    </div>
    <div class="header--btn">
      <ui-button v-if="!isAuth" @click="auth" color="primary">Войти</ui-button>
      <template v-else>
        <ui-button @click="$router.push({name: 'FolderView'})" color="primary">Добавить категорию</ui-button>
        <ui-button @click="$router.push({name: 'PostView'})" color="primary">Добавить пост</ui-button>
        <ui-button @click="logout" color="default">Выйти</ui-button>
      </template>
    </div>
  </div>
  <ui-modal class="modal-auth" v-if="modalVisible" @close="modalVisible = false">
    <template v-slot:header>
      <h2>Вход</h2>
    </template>
    <form class="form-auth" @submit.prevent>
      <div class="form-auth--field">
        <ui-input :isBlock="true" v-model="email" placeholder="email" />
      </div>
      <div class="form-auth--field">
        <ui-input :isBlock="true" v-model="password" type="password" placeholder="пароль" />
      </div>
      <div v-if="warningAuth" class="form-auth--warning">
        {{ warningAuth }}
      </div>
      <div class="form-auth--btn">
        <ui-button type="click" color="primary" @click="login">Войти</ui-button>
        <ui-button type="click" color="success" @click="registration">Регистрация</ui-button>
      </div>
    </form>
  </ui-modal>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState("user", ["isAuth"])
  },
  data() {
    return {
      modalVisible: false,
      warningAuth: "",
      email: "",
      password: "",
    }
  },
  methods: {
    ...mapActions("user", ["userLogin", "userRegistration", "userLogout"]),
    auth() {
      this.modalVisible = true
    },
    login() {
      const dataUser = {
        email: this.email,
        password: this.password,
      }
      this.userLogin(dataUser)
        .then(res => {
          if (res?.data?.message) {
            this.warningAuth = res.data.message
          } else {
            this.warningAuth = ""
          }
          if (res?.data?.accessToken) {
            this.modalVisible = false
          }
        })
        .catch(err => console.log(err))
    },
    registration() {

    },
    logout() {
      this.userLogout()
      this.$router.push({
        name: "JsView"
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  background: #f9f9f9;
  display: grid;
  grid-template-columns: 1fr minmax(100px, 640px) minmax(100px, 600px) 1fr;
  grid-template-areas: ". title btn .";
  margin-bottom: 20px;
  &--title {
    grid-area: title;
    align-self: center;
    font-size: 20px;
    font-weight: bold;
  }
  &--btn {
    grid-area: btn;
    justify-self: flex-end;
    align-self: center;
    .ui-btn {
      margin-left: 10px;
    }
  }
}
.modal-auth {
  .ui-dialog--content {
    max-width: 400px;
  }
  h2 {
    margin-bottom: 20px;
  }
}
.form-auth {
  padding: 0;
  margin: 0;
  &--field {
    margin-bottom: 10px;
  }
  &--warning {
    font-size: 14px;
    color: #cc0000;
    margin-bottom: 10px;
  }
  &--btn {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
  }
}
</style>
