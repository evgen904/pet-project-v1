<template>
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
</template>

<script>
  export default {
    name: "Folder"
  }
</script>

<style lang="scss" scoped>
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
</style>
