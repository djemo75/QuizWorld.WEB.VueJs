<template>
  <div id="app">
    <AuthLayout>
      <Navigation />
      <router-view></router-view
    ></AuthLayout>
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue"
import AuthLayout from "./components/AuthLayout.vue"

export default {
  name: "App",
  components: {
    Navigation,
    AuthLayout
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
