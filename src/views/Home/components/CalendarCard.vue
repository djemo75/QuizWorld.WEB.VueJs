<template>
  <div>
    <EventCalendar
      :eventsData="events"
      :onChangeMonth="handleChangeMonth"
      :onClickEvent="handleClickEvent"
    />
  </div>
</template>

<script>
import { mapState } from "vuex"
import EventCalendar from "../../../components/EventCalendar.vue"
import categories from "../../../constans/categories"
import { STATIC_ROUTES } from "../../../router"

export default {
  name: "CalendarCard",
  components: { EventCalendar },
  data() {
    return {
      currentMonth: new Date()
    }
  },
  methods: {
    handleChangeMonth(value) {
      this.currentMonth = value
    },
    handleClickEvent(event) {
      this.$router.push(STATIC_ROUTES.viewResult.replace(":id", event.id))
    },
    getData() {
      const monthDate = this.currentMonth.toISOString().substring(0, 7)
      const params = {
        userId: this.$store.state.auth.user.id,
        createdAt_like: monthDate,
        _sort: "createdAt",
        _order: "desc"
      }
      this.$store.dispatch("getCurrentMonthQuizzes", params)
    },
    getCategoryName(value) {
      return categories.find((c) => c.name.toLowerCase() === value).name
    }
  },
  mounted() {
    this.getData()
  },
  watch: {
    currentMonth() {
      this.getData()
    }
  },
  computed: {
    ...mapState({
      currentMonthQuizzes: (state) => state.quiz.currentMonthQuizzes
    }),
    events() {
      return this.currentMonthQuizzes.map((ev) => ({
        id: ev.id,
        title: `Quiz - ${this.getCategoryName(ev.category)}`,
        date: ev.createdAt
      }))
    }
  }
}
</script>

<style></style>
