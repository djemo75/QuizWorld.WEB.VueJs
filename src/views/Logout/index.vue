<template>
  <div></div>
</template>

<script>
import { STATIC_ROUTES } from "../../router"
export default {
  name: "Logout",
  created() {
    this.$store.commit("logout")
    this.$router.push(STATIC_ROUTES.login)
  }
}
</script>

<style></style>
