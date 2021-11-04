<template>
  <div>
    <b-container
      ><h3 class="page-title">{{ title }}</h3></b-container
    >
    <b-container><slot /></b-container>
  </div>
</template>

<script>
export default {
  name: "Main",
  props: {
    title: String
  }
}
</script>

<style scoped>
.page-title {
  font-size: 2.5rem;
  margin: 24px 0px;
}
</style>
