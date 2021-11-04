<template>
  <div class="question-card">
    <div>
      <img
        :src="isAnsweredCorrectly ? randomCorrectIcon() : randomWrongIcon()"
        class="result-icon"
        alt="result-icon"
      />
    </div>
    <div class="counter">QUESTION {{ index + 1 }}</div>
    <div class="question">{{ data.question }}</div>
    <div class="answers-card">
      <div class="left">
        <div class="title">Given Answers</div>
        <div v-for="answer in data.items" :key="answer.id">
          <b-icon
            v-if="answer.isSelected"
            icon="check2"
            font-scale="1.5"
            style="color: lime"
          ></b-icon>
          <b-icon v-else icon="x" font-scale="1.5" style="color: red"></b-icon>
          {{ answer.text }}
        </div>
      </div>
      <div class="right">
        <div class="title">Correct Answers</div>
        <div v-for="answer in data.items" :key="answer.id">
          <b-icon
            v-if="answer.isRight"
            icon="check2"
            font-scale="1.5"
            style="color: lime"
          ></b-icon>
          <b-icon v-else icon="x" font-scale="1.5" style="color: red"></b-icon>
          {{ answer.text }}
        </div>
      </div>
    </div>
    <div
      class="result"
      :style="{ color: isAnsweredCorrectly ? `lime` : `red` }"
    >
      {{ isAnsweredCorrectly ? `CORRECT` : `WRONG` }}
    </div>
  </div>
</template>

<script>
import {
  resultCorrectIcons,
  resultWrongIcons
} from "../../constans/resultIcons"

export default {
  name: "QuestionCard",
  props: {
    data: Object,
    index: Number
  },
  methods: {
    randomCorrectIcon() {
      const img =
        resultCorrectIcons[
          Math.floor(Math.random() * resultCorrectIcons.length)
        ]
      return img
    },
    randomWrongIcon() {
      const img =
        resultWrongIcons[Math.floor(Math.random() * resultWrongIcons.length)]
      return img
    }
  },
  computed: {
    isAnsweredCorrectly() {
      return this.data.items.every((item) => item.isRight === item.isSelected)
    }
  }
}
</script>

<style scoped>
.question-card {
  width: 100%;
  margin: 20px 0px 40px 0px;
  border: 1px solid #f5f6f7;
  border-radius: 20px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: 0.5s;
}
.question-card:hover {
  border: 1px solid #bacde0;
}
.question-card .counter {
  margin-top: 20px;
  font-size: 0.75rem;
}
.question-card .question {
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
}
.question-card .answers-card {
  display: flex;
  width: 100%;
}
.question-card .answers-card > div {
  width: 50%;
  color: #fff;
  padding: 15px 20px;
}
.question-card .answers-card .left {
  background: linear-gradient(45deg, #926dde 0%, #b59ce9 100%);
}
.question-card .answers-card .right {
  background: linear-gradient(45deg, #50a1ff 0%, #88bfff 100%);
}
.question-card .answers-card .title {
  text-align: center;
  margin-bottom: 12px;
  font-size: 1.25rem;
  font-weight: bold;
}
.question-card .result {
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 600;
}
.question-card .result-icon {
  max-height: 50px;
  margin-top: 20px;
}
</style>
