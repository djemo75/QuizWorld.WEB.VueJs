<template>
  <Main title="Results">
    <b-overlay :show="resultsLoading" rounded="sm"
      ><b-row>
        <b-col lg="6" sm="12" v-for="result in results" :key="result.id">
          <div class="result-card">
            <div class="description">
              <div class="left">
                <div class="description-item">
                  Date: {{ formateDate(result.createdAt) }}
                </div>
                <div class="description-item">
                  Score: {{ calculateScore(result.questions) }}%
                </div>
                <div class="description-item">
                  Topic:
                  <span class="category-name">{{
                    getCategoryname(result.category)
                  }}</span>
                </div>
                <div>
                  <b-button
                    variant="outline-info view-button"
                    pill
                    @click="handleView(result.id)"
                    >SHOW RESULTS</b-button
                  >
                </div>
              </div>
              <div class="right">
                <div class="text-center grade-text">Grade</div>
                <div
                  class="text-center grade-text grade-value"
                  :style="{
                    color: calculateLetterGrade(result.questions).color
                  }"
                >
                  {{ calculateLetterGrade(result.questions).text }}
                </div>
              </div>
            </div>
            <div class="image">
              <img src="../../assets/grade-result.png" alt="Test result" />
            </div>
          </div>
        </b-col> </b-row
    ></b-overlay>

    <div class="pagination-section">
      <b-pagination
        :value="page"
        :total-rows="totalRows"
        @change="handleChangePage"
        :per-page="perPage"
        align="center"
      ></b-pagination>
    </div>
  </Main>
</template>

<script>
import Main from "../../components/Main.vue"
import categories from "../../constans/categories"
import { STATIC_ROUTES } from "../../router"
import { calculateLetterGrade, calculateScore } from "../../utils/grade"
import moment from "moment"
import { mapState } from "vuex"

export default {
  name: "Results",
  components: { Main },
  data() {
    return { page: 1, perPage: 4 }
  },
  methods: {
    getData() {
      const params = {
        userId: this.$store.state.auth.user.id,
        _limit: this.perPage,
        _page: this.page,
        _sort: "createdAt",
        _order: "desc"
      }
      this.$store.dispatch("getResults", params)
    },
    handleChangePage(value) {
      this.page = value
      this.getData()
    },
    getCategoryname(lowerCaseName) {
      return categories.find((c) => c.name.toLowerCase() === lowerCaseName).name
    },
    handleView(id) {
      this.$router.push(STATIC_ROUTES.viewResult.replace(":id", id))
    },
    formateDate(date) {
      if (date) {
        return moment(date).format("MMMM Do YYYY, h:mm:ss a")
      }
      return "Unknown"
    },
    calculateScore,
    calculateLetterGrade
  },
  computed: {
    ...mapState({
      totalRows: (state) => state.quiz.totalResults,
      results: (state) => state.quiz.results,
      resultsLoading: (state) => state.quiz.resultsLoading
    })
  },
  mounted() {
    this.getData()
  },
  watch: {
    results(data) {
      this.data = data
    }
  }
}
</script>

<style>
.result-card {
  display: flex;
  align-items: center;
  color: #757575;
  border: 1px solid #f1f2f3;
  margin-bottom: 25px;
  padding: 15px 25px 15px 30px;
}
.result-card:hover {
  box-shadow: 0 0 15px rgb(0 0 0 / 6%);
}
.result-card .description {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.result-card .description .left {
  width: 100%;
}
.result-card .description .right {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0px 15px;
}
.result-card .image img {
  height: 100%;
  max-height: 150px;
}
.result-card .description .grade-text {
  color: #323d47;
  text-transform: uppercase;
  font-weight: bold;
}
.result-card .description .grade-text.grade-value {
  font-size: 2.5rem;
  color: #ff4954;
}
.result-card .description .description-item .category-name {
  color: #dc3545;
}
.result-card .view-button {
  margin-top: 15px;
}
.result-card .view-button:hover {
  color: #fff;
}
.pagination-section {
  margin: 25px 0px;
  text-align: center;
}
</style>
