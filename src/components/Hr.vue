<template>
  <div class="custom-hr mt-4" :class="{ small: small }">
    <div class="text">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: "Hr",
  props: {
    text: String,
    small: Boolean
  }
}
</script>

<style lang="scss">
.custom-hr {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #bec6d4;
  margin-top: 5px;
  margin-bottom: 20px;

  .text {
    padding: 0px 12px;
    font-size: 0.825rem;
    margin-bottom: -10px;
    background: #fff;
    color: #929daf;
  }

  &.small {
    margin: 0 auto;
    max-width: 500px;
  }
}
</style>
