<template>
  <Main title="Home">
    <b-row>
      <b-col cols="6"><ProgressCard /></b-col>
      <b-col cols="6"><HintCard /></b-col>
      <b-col cols="12" style="margin: 40px 0 80px 0"><CalendarCard /></b-col
    ></b-row>
  </Main>
</template>

<script>
import Main from "../../components/Main.vue"
import ProgressCard from "./components/ProgressCard.vue"
import HintCard from "./components/HintCard.vue"
import CalendarCard from "./components/CalendarCard.vue"

export default {
  name: "Home",
  components: { Main, ProgressCard, HintCard, CalendarCard }
}
</script>

<style></style>
