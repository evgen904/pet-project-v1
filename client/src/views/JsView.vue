<template>
  <div class="header">
    <div class="header--title">
      Шпаргалка по JS
    </div>
    <div class="header--btn">
      <ui-button color="default" @click="modalVisible = true"> Добавить шпаргалку </ui-button>
    </div>
  </div>
  <div class="site-content">
    <div class="site-content--sidebar">
      <ul class="menu">
        <li>
          <router-link to="/">Теория</router-link>
        </li>
        <li>
          <router-link to="/">Примеры</router-link>
        </li>
        <li>
          <router-link to="/">ES6</router-link>
        </li>
        <li>
          <router-link to="/">Архитектура</router-link>
        </li>
        <li>
          <router-link to="/">TypeScript</router-link>
        </li>
        <li>
          <router-link to="/">NODE</router-link>
        </li>
        <li>
          <router-link to="/">Тесты</router-link>
        </li>
        <li>
          <router-link to="/">Ссылки на материалы</router-link>
        </li>
        <li>
          <router-link to="/">Задачки</router-link>
        </li>
        <li>
          <router-link to="/">Сниппеты</router-link>
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
    </div>
    <div class="site-content--inner">
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
      <h2>Card Header Title</h2>
    </template>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim iste quas
      quod repudiandae vero. Consequuntur dolores doloribus facilis fugiat
      ipsum non quas reiciendis temporibus. Enim excepturi fugiat voluptatem
      voluptates. Adipisci aspernatur doloremque enim, esse explicabo fugiat
      fugit illum in ipsam ipsum itaque laborum laudantium magnam nihil odio
      porro rerum vel, veritatis voluptas voluptatibus. Eos facilis nisi
      saepe? Aut corporis debitis distinctio dolores facilis id iste libero,
      minima molestiae nam, natus necessitatibus nisi praesentium quasi
      quibusdam quidem quisquam repellendus rerum voluptate voluptates! A
      aliquam amet architecto dolorem eveniet iure molestiae nesciunt nulla
      ullam voluptatum? Aut dolorem et laboriosam quos suscipit unde.
    </p>
  </ui-modal>
</template>

<script>
  export default {
    name: "JsView",
    data() {
      return {
        modalVisible: false,
      }
    }
  }
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
  background: #f9f9f9;
  display: grid;
  grid-template-columns: 1fr minmax(100px, 1000px) minmax(100px, 240px) 1fr;
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
  }
}
.site-content {
  display: grid;
  grid-template-columns: 1fr 240px 20px minmax(100px, 1000px) 1fr;
  grid-template-areas: ". sidebar . content .";
  &--sidebar {
    grid-area: sidebar;
    .menu {
      padding: 0;
      margin: 0;
      list-style: none;
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
