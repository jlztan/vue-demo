<template>
  <div id="app">
    <Nav></Nav>
    <router-view class="content" />
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';

export default {
  name: 'App',
  components: {
    Nav
  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  height: 100%;
}

.content {
  flex: 1;
  overflow: hidden;
}
</style>
