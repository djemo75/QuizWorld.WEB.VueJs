<template>
  <div class="main-container">
    <div class="single-day-container">
      <div class="day-container">
        <div class="day-info">
          <div class="day-number">{{ selectedDay.number }}</div>
          <div class="day-name">{{ selectedDay.name }}</div>
        </div>
        <div class="day-data"></div>
      </div>
      <div class="event-container">
        <ul class="event-list">
          <li
            class="event-list-item"
            v-for="(dayEvent, index) in dayEvents"
            :key="index"
          >
            <div class="event-dates">
              <span>{{ dayEvent.date | getTime }}</span>
            </div>
            <div class="event-details" @click="handleClickEvent(dayEvent)">
              {{ dayEvent.title }}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="calendar-container">
      <div class="calendar">
        <div class="header">
          <b-icon
            icon="arrow-left-square"
            class="icon"
            @click="prevMonth"
          ></b-icon>
          <div>
            <transition tag="div" :name="typeTransition">
              <div :key="month" class="month-name">{{ month }}</div>
            </transition>
          </div>
          <b-icon
            icon="arrow-right-square"
            class="icon"
            @click="nextMonth"
          ></b-icon>
        </div>
        <div class="days row">
          <div
            class="col col-center"
            v-for="(day, index) in dayNames"
            :key="`h-${index}`"
          >
            <div class="day-name">{{ day }}</div>
          </div>
        </div>
        <div class="body">
          <div class="row" v-for="(row, index) in rows" :key="`r-${index}`">
            <div
              class="col cell"
              :class="[{ 'has-events': day.hasEvents }, day.type]"
              v-for="(day, index) in row.days"
              :key="`d-${index}`"
              @click="updateDate(day)"
            >
              <transition-group tag="div" :name="typeTransition">
                <div :key="day.formattedDate" class="day-number">
                  {{ day.formattedDate }}
                </div>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFns from "date-fns"

export default {
  name: "EventCalendar",
  props: { eventsData: Array, onChangeMonth: Function, onClickEvent: Function },
  data() {
    return {
      currentMonth: new Date(),
      selectedDate: new Date(),
      events: [],
      transitionDirection: "",
      currentPage: {
        month: dateFns.getMonth(new Date()),
        year: dateFns.getYear(new Date())
      }
    }
  },
  watch: {
    currentPage(val, oldVal) {
      this.transitionDirection = this.getTransitionDirection(oldVal, val)
    },
    eventsData(array) {
      this.events = array
    },
    currentMonth(value) {
      this.onChangeMonth(value)
    }
  },
  methods: {
    nextMonth() {
      this.currentMonth = dateFns.addMonths(this.currentMonth, 1)
      this.updateCurrentPage(this.currentMonth)
    },
    prevMonth() {
      this.currentMonth = dateFns.subMonths(this.currentMonth, 1)
      this.updateCurrentPage(this.currentMonth)
    },
    updateDate(day) {
      this.selectedDate = day.day
    },
    updateCurrentPage(date) {
      this.currentPage = {
        month: dateFns.getMonth(date),
        year: dateFns.getYear(date)
      }
    },
    findEvents(day, sort = false) {
      const hasEvents = this.events.filter((ev) =>
        dateFns.isSameDay(day, new Date(ev.date))
      )

      if (sort) {
        hasEvents.sort((a, b) => {
          return dateFns.compareAsc(new Date(a.date), new Date(b.date))
        })
      }
      return hasEvents
    },
    getTransitionDirection(fromPage, toPage) {
      if (!fromPage || !toPage) return ""
      if (fromPage.year !== toPage.year)
        return fromPage.year < toPage.year ? "next" : "prev"
      if (fromPage.month !== toPage.month)
        return fromPage.month < toPage.month ? "next" : "prev"
      return ""
    },
    handleClickEvent(value) {
      this.onClickEvent(value)
    }
  },
  computed: {
    selectedDay() {
      return {
        number: dateFns.format(this.selectedDate, "D"),
        name: dateFns.format(this.selectedDate, "dddd")
      }
    },
    month() {
      return dateFns.format(this.currentMonth, "MMMM YYYY")
    },
    dayNames() {
      let startDate = dateFns.startOfISOWeek(this.currentMonth)

      const days = []
      for (let i = 0; i < 7; i += 1) {
        days.push(dateFns.format(dateFns.addDays(startDate, i), "ddd"))
      }
      return days
    },

    rows() {
      const monthStart = dateFns.startOfMonth(this.currentMonth)
      const monthEnd = dateFns.endOfMonth(monthStart)
      const startDate = dateFns.startOfISOWeek(monthStart)
      const endDate = dateFns.endOfISOWeek(monthEnd)

      const rows = []

      let days = []
      let day = startDate

      while (day <= endDate) {
        for (let i = 0; i < 7; i += 1) {
          const dayInfo = {
            day,
            formattedDate: dateFns.format(day, "D"),
            type: !dateFns.isSameMonth(day, monthStart)
              ? "disabled"
              : dateFns.isSameDay(day, this.selectedDate)
              ? "selected"
              : "",
            hasEvents: this.findEvents(day).length > 0
          }
          days.push(dayInfo)
          day = dateFns.addDays(day, 1)
        }
        rows.push({ days })
        days = []
      }
      return rows
    },
    dayEvents() {
      return this.findEvents(this.selectedDate, true)
    },
    typeTransition() {
      return `${
        this.transitionDirection === "next" ? "slide-left" : "slide-right"
      }`
    }
  },
  filters: {
    getTime(value) {
      return dateFns.format(value, "h:mm A")
    }
  }
}
</script>
<style scoped>
.icon {
  font-style: normal;
  display: inline-block;
  vertical-align: middle;
  line-height: 1;
  text-transform: none;
  letter-spacing: normal;
  word-wrap: normal;
  white-space: nowrap;
  direction: ltr;
  text-rendering: optimizeLegibility;
  font-feature-settings: "liga";
  user-select: none;
}
/* Wrapper */
.main-container {
  display: flex;
}
.main-container .single-day-container {
  flex-shrink: 1;
  flex-grow: 0;
  flex-basis: 33.3333333333%;
  max-width: 33.3333333333%;
  background-color: #3fdd86;
  padding: 4rem;
  display: flex;
  flex-direction: column;
}
.main-container .calendar-container {
  flex-shrink: 1;
  flex-grow: 0;
  flex-basis: 66.6666666667%;
  max-width: 66.6666666667%;
  background-color: #fff;
  padding: 3rem;
}
/* Calendar */
.calendar {
  display: block;
  position: relative;
  width: 100%;
  background: #fff;
}
.calendar .header {
  text-transform: capitalize;
  font-weight: 400;
  font-size: 120%;
  padding: 1.5em 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.calendar .header .icon {
  cursor: pointer;
  user-select: none;
  transition: 0.15s ease-out;
}
.calendar .header .icon:hover {
  transform: scale(1.75);
  transition: 0.25s ease-out;
  color: #3fdd86;
}
.calendar .header .icon:first-of-type {
  margin-left: 2rem;
}
.calendar .header .icon:last-of-type {
  margin-right: 2rem;
}
.calendar .header .col {
  flex-shrink: 1;
  flex-basis: auto;
}
.calendar .header .month-name {
  font-size: 2rem;
  color: #3fdd86;
}
.calendar .days {
  text-transform: uppercase;
  font-weight: 700;
  color: #3fdd86;
  padding: 0.75rem 0;
}
.calendar .days .col {
  padding: 0 1.5rem;
}
.calendar .days .day-name {
  padding: 0.25rem 0;
}
.calendar .days .selected .day-name {
  font-weight: 700;
  border-bottom: 2px solid #3fdd86;
}
.calendar .body .cell {
  position: relative;
  background: #fff;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.calendar .body .cell :last-child {
  border-right: none;
}
.calendar .body .cell.has-events:after {
  position: absolute;
  content: "";
  width: 0.75rem;
  height: 0.75rem;
  background-color: #3fdd86;
  top: 8px;
  right: 23px;
  border-radius: 0.5rem;
  border: 3px solid #fff;
}
.calendar .body .cell .day-number {
  line-height: 1;
  font-weight: 700;
  padding: 0.75rem;
  width: 42px;
  text-align: center;
  cursor: pointer;
  border-radius: 0.25rem;
}
.calendar .body .cell .day-number:hover {
  background: #f7f7f7;
}
.calendar .body .col {
  flex-grow: 0;
  flex-basis: 14.2857142857%;
  width: 14.2857142857%;
}
.calendar .body .selected .day-number {
  background-color: #3fdd86;
  color: #fff;
}
.calendar .body .selected .day-number:hover {
  background-color: #3fdd86;
  color: #fff;
}
.calendar .body .disabled {
  color: #ccc;
  pointer-events: none;
}
.day-container {
  display: flex;
  flex-direction: row;
  padding-bottom: 1rem;
  border-bottom: 2px solid #fff;
}
.day-container .day-info {
  color: #fff;
  flex: 1;
  text-align: center;
  font-weight: 400;
}
.day-container .day-info .day-number {
  font-size: 4rem;
  line-height: 1;
}
.day-container .day-data {
  flex: 2;
}
.event-container .event-list {
  margin-top: 15px;
  padding: 0;
  color: #fff;
  font-size: 14px;
}
.event-container .event-list .event-list-item {
  list-style: none;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.75rem;
  align-items: center;
  position: relative;
}
.event-container .event-list .event-list-item:last-child {
  margin-bottom: 0;
}
.event-container .event-list .event-list-item .event-dates {
  min-width: 60px;
}
.event-container .event-list .event-list-item .event-dates span {
  text-align: right;
  display: block;
}
.event-container .event-list .event-list-item .event-details {
  margin-left: 0.75rem;
  background-color: rgba(255, 255, 255, 0.2);
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: 0.5s;
}
.event-container .event-list .event-list-item .event-details:hover {
  background-color: rgba(255, 255, 255, 0.4);
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.25s ease-in-out;
}
.slide-left-leave-active,
.slide-right-leave-active {
  position: absolute;
}
.slide-left-enter,
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(50px) translateZ(0);
}
.slide-left-leave-to,
.slide-right-enter {
  opacity: 0;
  transform: translateX(-50px) translateZ(0);
}
</style>
