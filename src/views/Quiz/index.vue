<template>
  <Main
    :title="
      loading ? 'Generating quiz ...' : `${this.$route.params.category} quiz`
    "
  >
    <div v-if="error" class="error">{{ error }}</div>
    <div v-if="data.length">
      <b-row>
        <b-col
          v-for="(question, i) in data"
          :key="i"
          cols="6"
          sm="3"
          md="2"
          lg="1"
          ><div
            class="question-tab"
            :class="{ active: i === index, seen: question.isSeen }"
            @click="handleChangeQuestion(i)"
          >
            <div class="text-center">Question</div>
            <div class="text-center">{{ i + 1 }}</div>
          </div></b-col
        >
      </b-row>

      <div class="question">
        <Hr :text="`Question ` + (index + 1)" />

        <div class="d-flex justify-content-between">
          <HintButton
            :onClick="handleUseHint"
            :disabled="!user.availableHints || hasHint"
          />

          <div class="answers-count">
            Correct answers:
            <span>{{ correctAnswersCount }}/{{ answersCount }}</span>
          </div>
        </div>
        <div class="description">{{ currentQuestion.question }}</div>
      </div>

      <b-form-group>
        <b-form-checkbox-group id="answers" name="answers">
          <b-form-checkbox
            v-for="(item, itemIndex) in currentQuestion.items"
            :key="itemIndex"
            :value="item.text"
            @change="handleClickCheckbox(itemIndex)"
            :class="{
              'hint-correct': hasHint && item.isRight,
              'hint-incorrect': hasHint && !item.isRight
            }"
            >{{ item.text }}</b-form-checkbox
          >
        </b-form-checkbox-group>
      </b-form-group>

      <Hr text="Finish Quiz" />

      <div class="text-center">
        <b-button
          variant="outline-success submit-button"
          @click="isConfirmationVisible = true"
          pill
          >SUBMIT ANSWERS</b-button
        >
      </div>
    </div>
    <b-modal
      v-model="isConfirmationVisible"
      title="Confirmation"
      cancel-title="No"
      ok-title="Yes"
      :cancel-disabled="isSubmitting"
      :ok-disabled="isSubmitting"
      hide-header-close
      centered
      @ok="submit"
      >Are you sure you want to submit your answers!</b-modal
    >

    <b-modal
      :visible="Boolean(discardCallback)"
      title="Save changes"
      cancel-title="No"
      ok-title="Yes"
      :cancel-disabled="isSubmitting"
      :ok-disabled="isSubmitting"
      header-bg-variant="warning"
      header-text-variant="light"
      ok-variant="danger"
      hide-header-close
      centered
      @ok="handleDiscard"
      @hide="discardCallback = null"
      >If you leave the page, the quiz will not be saved.<br />
      Do you want to leave?</b-modal
    >
  </Main>
</template>

<script>
import Main from "../../components/Main.vue"
import Hr from "../../components/Hr.vue"
import HintButton from "../../components/HintButton.vue"
import categories from "../../constans/categories"
import { STATIC_ROUTES } from "../../router"
import { submitQuiz } from "../../services/quiz"
import { editUserById } from "../../services/user"
import { prepareQuizPayload } from "../../utils/quiz"

import { calculateScore } from "../../utils/grade"
import { mapState } from "vuex"
import { MIN_SCORE } from "../../constans/grades"

export default {
  name: "Quiz",
  components: { Main, Hr, HintButton },
  data() {
    return {
      data: [],
      index: 0,
      isConfirmationVisible: false,
      discardCallback: null,
      isSubmitting: false,
      hasHint: false
    }
  },
  created() {
    this.categories = categories
  },
  methods: {
    getQuiz() {
      const { category } = this.$route.params
      const params = {
        category: category.toLowerCase() !== "random" ? category : "",
        difficulty: this.$store.getters.difficulty.mode.toLowerCase(),
        limit: 20
      }
      this.$store.dispatch("getQuiz", params)
    },
    async submit(e) {
      e.preventDefault() // Prevent modal from closing
      const payload = prepareQuizPayload(
        this.user,
        this.$route.params.category.toLowerCase(),
        this.data
      )

      try {
        this.isSubmitting = true
        const responseData = await submitQuiz(payload)
        await this.updateUserLevel(responseData.questions)
        this.$router.push(
          STATIC_ROUTES.viewResult.replace(":id", responseData.id)
        )
        this.isConfirmationVisible = false
      } catch (error) {
        this.$vToastify.error(
          error.response.data.error || "Error on submitting your answers!"
        )
      } finally {
        this.isSubmitting = false
      }
    },
    async updateUserLevel(questions) {
      const score = calculateScore(questions)
      const isPassed = score >= MIN_SCORE
      if (isPassed) {
        const userPayload = { ...this.$store.state.auth.user }
        userPayload.level++
        await editUserById(userPayload.id, userPayload)
        await this.$store.dispatch("getAuthData")
      }
    },
    handleChangeQuestion(i) {
      const updatedData = this.data
      updatedData[i].isSeen = true
      this.data = updatedData
      this.index = i
      this.hasHint = false
    },
    handleClickCheckbox(itemIndex) {
      const updatedData = this.data
      const currentItem = updatedData[this.index].items[itemIndex]
      currentItem.isSelected = !currentItem.isSelected
      this.data = updatedData
    },
    handleDiscard() {
      this.discardCallback()
    },
    async handleUseHint() {
      const userPayload = { ...this.$store.state.auth.user }
      userPayload.availableHints--
      userPayload.usedHints++
      await editUserById(userPayload.id, userPayload)
      this.$store.commit("useHint")
      this.$vToastify.info(
        `You use your hint! You have ${userPayload.availableHints} hint${
          userPayload.availableHints > 1 ? "s" : ""
        } left`
      )
      this.hasHint = true
    }
  },
  mounted() {
    const { category } = this.$route.params
    if (
      !categories.some((c) => c.name.toLowerCase() === category.toLowerCase())
    ) {
      this.$router.push(STATIC_ROUTES.categories)
    }

    this.getQuiz()
  },
  watch: {
    "$route.params.category": function () {
      this.getQuiz()
    },
    quiz(data) {
      let updatedData = [...data]
      if (updatedData && updatedData.length) {
        updatedData[this.index].isSeen = true
        updatedData = updatedData.map((q) => {
          const answersKeys = Object.keys(q.answers)

          const items = answersKeys
            .map((key) => {
              if (q.answers[key]) {
                const isRight = q.correct_answers[`${key}_correct`] === "true"
                return {
                  text: q.answers[key],
                  isRight,
                  isSelected: false
                }
              }
            })
            .filter((item) => item)

          return { ...q, items }
        })
      }

      this.data = updatedData
    }
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
      error: (state) => state.quiz.quizError,
      loading: (state) => state.quiz.quizLoading,
      quiz: (state) => state.quiz.quiz
    }),
    currentQuestion() {
      return this.data[this.index]
    },
    correctAnswersCount() {
      let correctAnswersCount = 0
      const correctAnswersKeys = Object.keys(
        this.currentQuestion.correct_answers
      )
      correctAnswersKeys.map((key) => {
        if (this.currentQuestion.correct_answers[key] === "true") {
          correctAnswersCount++
        }
      })

      return correctAnswersCount
    },
    answersCount() {
      const answersKeys = Object.keys(this.currentQuestion.answers)

      let answersCount = 0
      answersKeys.map((key) => {
        if (this.currentQuestion.answers[key]) {
          answersCount++
        }
      })

      return answersCount
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isConfirmationVisible) {
      this.discardCallback = next
    } else {
      next()
    }
  }
}
</script>

<style>
.question-tab {
  margin-bottom: 12px;
  padding: 5px;
  color: #757575;
  font-size: 0.75rem;
  font-weight: bold;
  border-radius: 0.25rem;
  cursor: pointer;
  user-select: none;
}
.question-tab.seen {
  background: #eff4f6;
}
.question-tab.active {
  background: #0dcaf0;
  color: #fff;
}
.question {
  margin-top: 20px;
}
.question .description {
  font-size: 1.125rem;
  font-weight: 500;
  margin-top: 16px;
}
.question .answers-count {
  text-align: right;
  color: #929daf;
}
.question .answers-count span {
  color: #3cd458;
}
.error {
  color: red;
}
.page-title:first-letter {
  text-transform: capitalize;
}
.submit-button {
  color: #3cd458;
  border-color: #3cd458;
  margin: 20px 0px;
  padding-left: 50px;
  padding-right: 50px;
}
.submit-button:hover {
  background-color: #3cd458;
  border-color: #3cd458;
}
.custom-checkbox {
  display: flex;
  align-items: center;
}
.custom-checkbox label {
  margin-left: 10px;
  color: #757575;
}
@keyframes colorGrayToLime {
  from {
    color: #757575;
  }
  to {
    color: lime;
  }
}
#answers .hint-correct label {
  animation: colorGrayToLime 1s;
  color: lime;
}
@keyframes colorGrayToRed {
  from {
    color: #757575;
  }
  to {
    color: red;
  }
}
#answers .hint-incorrect label {
  animation: colorGrayToRed 1s;
  color: red;
}
</style>
