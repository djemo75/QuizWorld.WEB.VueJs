<template>
  <div>
    <div v-if="!userLoading">
      <slot />
    </div>
    <div class="loading-screen" v-else>
      <b-spinner variant="primary" type="grow"></b-spinner>
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthLayout",
  mounted() {
    this.$store.dispatch("getAuthData")
  },
  computed: {
    userLoading() {
      return this.$store.state.auth.userLoading
    }
  }
}
</script>

<style>
.loading-screen {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  width: 100%;
}
</style>
