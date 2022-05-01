<template>
  <Header />
  <div class="site-content">
    <div class="site-content--sidebar">
      <Folders />
    </div>
    <div class="site-content--inner">
      <div v-if="isAuth">
        es
      </div>
      <div v-else>
        no
      </div>

      <div class="card">
        <div class="card--title">
          Типы данных
        </div>
        <div class="card--body">
          <h3>
            Примитивные типы данных
          </h3>
          <p>
            <strong>boolean</strong> <br>
            <strong>string</strong> <br>
            <strong>number</strong> <br>
            <strong>bigint</strong> <br>
            <strong>null</strong> <br>
            <strong>undefined</strong> <br>
            <strong>symbol</strong> <br>
          </p>
          <h3>
            Все остальное объект
          </h3>
        </div>
      </div>
      <div class="card">
        <div class="card--title">
          Типы функций
        </div>
        <div class="card--body">
          <p>
            пример, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, reprehenderit.
          </p>
        </div>
      </div>
      <div class="card">
        <div class="card--title">
          Каррирование
        </div>
        <div class="card--body">
          <p>
            пример, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, reprehenderit.
          </p>
        </div>
      </div>
      <div class="card">
        <div class="card--title">
          proxy
        </div>
        <div class="card--body">
          <p>
            пример, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam, reprehenderit.
          </p>
        </div>
      </div>
    </div>
  </div>
  <ui-modal v-if="modalVisible" @close="modalVisible = false">
    <template v-slot:header>
      <h2>Login</h2>
    </template>
    <form @submit.prevent>
      <div>
        <ui-input v-model="email" placeholder="email" />
      </div>
      <div>
        <ui-input v-model="password" type="password" placeholder="password" />
      </div>
      <div>
        <ui-button type="click" @click="login"> login </ui-button>
        <ui-button type="click" @click="registration"> registration </ui-button>
        <ui-button type="click" @click="logout"> logout </ui-button>
        <ui-button type="click" @click="getUsersList"> getUsers </ui-button>
      </div>
    </form>
  </ui-modal>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Header from "@/components/Header"
import Folders from "@/components/Folders"

export default {
  name: "JsView",
  components: {
    Header,
    Folders,
  },
  data() {
    return {
      modalVisible: false,
      email: "evgen904@gmail.com",
      password: "12345",
    }
  },
  computed: {
    ...mapState("user", ["isAuth"]),
  },
  methods: {
    ...mapActions("user", ["userLogin", "userRegistration", "userLogout", "getUsers"]),
    login() {
      const dataUser = {
        email: this.email,
        password: this.password,
      }
      this.userLogin(dataUser)
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    },
    registration() {
      const dataUser = {
        email: this.email,
        password: this.password,
      }
      this.userRegistration(dataUser)
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    },
    logout() {
      this.userLogout()
    },
    getUsersList() {
      this.getUsers()
    }
  }
}
</script>

<style lang="scss" scoped>
.site-content {
  display: grid;
  grid-template-columns: 1fr 240px 20px minmax(100px, 1000px) 1fr;
  grid-template-areas: ". sidebar . content .";
  &--sidebar {
    grid-area: sidebar;
  }
  &--inner {
    grid-area: content;
    .card {
      border: 1px solid #ccc;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      &--title {
        font-size: 18px;
        margin-bottom: 20px;
        font-weight: bold;
      }
      &--body {
        font-size: 14px;
        line-height: 1.5;
        h3 {
          font-size: 16px;
          font-weight: normal;
          margin-bottom: 10px;
        }
        p {
          margin: 0 0 10px;
          &:last-child {
            margin-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
