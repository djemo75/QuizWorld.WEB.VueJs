<template>
  <div>
    <div v-if="message" class="validation-error">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ValidationError",
  props: {
    message: String
  }
}
</script>

<style scoped>
.validation-error {
  font-size: 0.75rem;
  color: red;
  margin-top: -5px;
  margin-bottom: 10px;
}
</style>
