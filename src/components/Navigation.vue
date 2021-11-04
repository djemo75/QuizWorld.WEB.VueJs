<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <router-link to="/"
        ><img src="../assets/logo.png" class="logo" />
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <li class="nav-item">
            <router-link :to="STATIC_ROUTES.home" class="nav-link">
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="STATIC_ROUTES.categories" class="nav-link">
              Categories
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="randomQuizUrl" class="nav-link">
              Random Quiz
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="STATIC_ROUTES.results" class="nav-link">
              Results
            </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="STATIC_ROUTES.ranking" class="nav-link">
              Ranking
            </router-link>
          </li>
        </b-navbar-nav>
      </b-collapse>
      <b-navbar-nav class="ml-auto" v-if="user">
        <b-nav-item-dropdown right>
          <template #button-content>
            <em>{{ user.username }}</em>
          </template>
          <b-dropdown-item @click="logout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
import { STATIC_ROUTES } from "../router"

export default {
  name: "Navigation",
  computed: {
    user() {
      return this.$store.state.auth.user
    },
    randomQuizUrl() {
      return STATIC_ROUTES.quiz.replace(":category", "random")
    }
  },
  methods: {
    logout() {
      this.$router.push(STATIC_ROUTES.logout)
    }
  },
  created() {
    this.STATIC_ROUTES = STATIC_ROUTES
  }
}
</script>

<style scoped>
.logo {
  margin-left: 20px;
  max-height: 30px;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #007bff;
  text-decoration: none;
  background-color: transparent;
}
</style>
