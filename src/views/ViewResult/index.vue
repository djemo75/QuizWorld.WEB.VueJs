<template>
  <Main title="View result">
    <div v-if="resultError" class="error">{{ resultError }}</div>
    <div v-if="result">
      <Hr text="Quiz information" />

      <div
        class="result-guide"
        :style="{
          color: isPassed ? `lime` : `red`
        }"
      >
        {{
          isPassed ? `Congratulations` : `OH BUMMER, YOU NEED TO STUDY MORE!`
        }}
      </div>
      <div class="statistic">
        <div>
          <div>
            Score: <span>{{ score }}%</span>
          </div>
          <div>Total questions: {{ result.questions.length }}</div>
          <div>Correct answers: {{ correctAnswersCount }}</div>
        </div>
        <div>
          <div>
            Topic: <span>{{ category }}</span>
          </div>
          <div>
            Grade:
            <span
              :style="{
                color: letterGrade.color
              }"
              >{{ letterGrade.text }}</span
            >
          </div>
          <div>
            Final:
            <span
              :style="{
                color: isPassed ? `lime` : `red`
              }"
              >{{ isPassed ? "Pass" : "Failed" }}</span
            >
          </div>
        </div>
      </div>

      <div class="divider big" />
      <Hr text="Answers" style="margin-bottom: 50px" small />

      <QuestionCard
        v-for="(question, index) in result.questions"
        :data="question"
        :index="index"
        :key="index"
      />
    </div>
  </Main>
</template>

<script>
import Main from "../../components/Main.vue"
import Hr from "../../components/Hr.vue"
import QuestionCard from "./QuestionCard.vue"
import { calculateLetterGrade, calculateScore } from "../../utils/grade"
import categories from "../../constans/categories"
import { mapState } from "vuex"
import { MIN_SCORE } from "../../constans/grades"

export default {
  name: "ViewResult",
  components: { Main, Hr, QuestionCard },
  data() {
    return {}
  },
  methods: {
    getData() {
      this.$store.dispatch("getResult", this.$route.params.id)
    }
  },
  computed: {
    ...mapState({
      result: (state) => state.quiz.result,
      resultLoading: (state) => state.quiz.resultLoading,
      resultError: (state) => state.quiz.resultError
    }),
    score() {
      return calculateScore(this.result.questions)
    },
    letterGrade() {
      return calculateLetterGrade(this.result.questions)
    },
    category() {
      return categories.find(
        (c) => c.name.toLowerCase() === this.result.category
      ).name
    },
    correctAnswersCount() {
      const points = this.result.questions.map((q) => {
        if (q.items.every((item) => item.isRight === item.isSelected)) {
          return true
        }
        return false
      })

      let correctCouuter = 0
      points.map((point) => point && correctCouuter++)
      return correctCouuter
    },
    isPassed() {
      return this.score >= MIN_SCORE
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    "$route.params.id": function () {
      this.getQuiz()
    }
  }
}
</script>

<style>
.error {
  color: red;
}
.result-guide {
  color: #ff4954;
  text-align: center;
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 40px;
}
.statistic {
  margin: 0 auto;
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
  max-width: 30%;
}
.statistic > div > div > span {
  color: #ff4954;
}
.divider {
  background: #f5f6f7;
  display: block;
  width: 100%;
  height: 1px;
  margin: 40px 0px;
}
.divider.big {
  height: 10px;
}
</style>
