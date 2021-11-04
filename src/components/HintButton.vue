<template>
  <div class="hint-wrapper">
    <div
      class="hint-button"
      @click="!disabled && onClick()"
      :class="{ disabled: disabled }"
    >
      <img :src="hintImage" alt="Hint image" />
    </div>
  </div>
</template>

<script>
export default {
  name: "HintButton",
  props: {
    onClick: Function,
    disabled: Boolean
  },
  computed: {
    hintImage() {
      return require("@/assets/hint-icon.jpg")
    }
  }
}
</script>

<style scoped>
.hint-wrapper {
  display: flex;
  align-items: center;
}
@keyframes pulse {
  0% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
  50% {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}
.hint-button img {
  height: 35px;
  width: 35px;
  animation: pulse 2s linear infinite;
  transition: 0.5s;
  cursor: pointer;
}
.hint-button img:hover {
  filter: drop-shadow(3px 3px 3px #222222);
}
.hint-button.disabled img {
  cursor: not-allowed;
  animation: none;
  opacity: 0.5;
}
.hint-button.disabled img {
  filter: none;
}
</style>
