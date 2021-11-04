<template>
  <b-card no-body class="hint-card overflow-hidden">
    <div class="green-effect"></div>
    <b-row no-gutters>
      <b-col md="6">
        <b-card-img
          :src="image"
          alt="Image"
          class="hint-image rounded-0"
        ></b-card-img>
      </b-col>
      <b-col md="6">
        <b-card-body title="Hints" class="vertical-center">
          <div>Available hints: {{ user.availableHints || 0 }}</div>
          <div>Total used hints: {{ user.usedHints || 0 }}</div>
          <div style="margin-top: 20px">
            <span
              v-b-tooltip.top
              :title="
                isGetHintDisabled
                  ? `You can receive your hint at ${hintAvailableDate}.`
                  : ''
              "
              ><b-button
                variant="outline-warning"
                :disabled="isGetHintDisabled"
                @click="getFreeHint"
                >GET FREE HINT</b-button
              ></span
            >
          </div>
        </b-card-body>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import moment from "moment"
import dateFns from "date-fns"
import { mapState } from "vuex"
import { editUserById } from "../../../services/user"

export default {
  name: "HintCard",
  components: {},
  methods: {
    async getFreeHint() {
      const userPayload = { ...this.$store.state.auth.user }
      userPayload.availableHints++
      userPayload.hintGenerationDate = new Date()
      await editUserById(userPayload.id, userPayload)
      this.$store.commit("increaseAvailableHints")
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user
    }),
    image() {
      return require("@/assets/hint-icon.jpg")
    },
    isGetHintDisabled() {
      const date = this.user.hintGenerationDate
      if (!date) {
        return false
      }

      const hours = moment().diff(moment(date), "hours")
      if (hours >= 24) {
        return false
      }

      return true
    },
    hintAvailableDate() {
      const date = this.user.hintGenerationDate
      const availableDate = dateFns.addDays(date, 1)

      return dateFns.format(availableDate, "MMMM DD h:mm A")
    }
  }
}
</script>

<style>
.hint-card {
  position: relative;
  background: linear-gradient(
    0deg,
    rgba(21, 13, 153, 1) 0%,
    rgba(43, 48, 142, 1) 100%
  );
  color: #fff;
  height: 100%;
  border: 0px;
}
.hint-card .green-effect {
  position: absolute;
  right: 0px;
  top: 0px;
  background: linear-gradient(
    to right top,
    #23b881,
    #40bd6f,
    #5cc05b,
    #77c343,
    #93c425
  );
  margin-top: -50px;
  margin-right: -25px;
  height: 70px;
  width: 100%;
  transform: rotate(10deg);
  z-index: 1;
}
.hint-card > .row {
  z-index: 1;
}
@keyframes pulse {
  0% {
    -webkit-transform: scale(1) rotate(-5deg);
    transform: scale(1) rotate(-5deg);
  }
  50% {
    -webkit-transform: scale(0.9) rotate(-5deg);
    transform: scale(0.9) rotate(-5deg);
  }
  100% {
    -webkit-transform: scale(1) rotate(-5deg);
    transform: scale(1) rotate(-5deg);
  }
}
.hint-card .hint-image {
  position: absolute;
  height: 100%;
  margin-left: 15px;
  width: auto;
  animation: pulse 2s linear infinite;
  transition: 0.5s;
}
.hint-card .hint-image:hover {
  opacity: 0.75;
}
.vertical-center {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}
</style>
