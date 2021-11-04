<template>
  <b-card no-body class="overflow-hidden">
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img :src="image" alt="Image" class="rounded-0"></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body title="Your progress">
          <b-card-text>You are level {{ difficulty.level }} </b-card-text>
        </b-card-body>

        <b-card-body title="Mode">
          <b-card-text>
            <b-progress max="100" height="4rem">
              <b-progress-bar :value="value" :variant="barColor" striped>
                {{ difficulty.mode }}
              </b-progress-bar>
            </b-progress>
          </b-card-text>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
export default {
  name: "ProgressCard",
  components: {},
  computed: {
    difficulty() {
      return this.$store.getters.difficulty
    },
    image() {
      return require("@/assets/home-progress.jpg")
    },
    barColor() {
      switch (this.difficulty.mode) {
        case "Easy":
          return "primary"
        case "Medium":
          return "warning"
        case "Hard":
        default:
          return "danger"
      }
    },
    value() {
      switch (this.difficulty.mode) {
        case "Easy":
          return 33
        case "Medium":
          return 66
        case "Hard":
        default:
          return 100
      }
    }
  }
}
</script>

<style></style>
