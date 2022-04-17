<template>
  <router-view />
</template>

<style lang="scss">
html, body {
  padding: 0;
  margin: 0;
  height: 100%;
}

* {
  box-sizing: border-box;
}

body {
  background: #fff;
  font-family: Arial, Avenir, Helvetica, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  padding: 0;
  margin: 0;
}


nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
