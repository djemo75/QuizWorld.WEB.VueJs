<template>
  <div>
    <div class="form-wrapper">
      <div class="page-title">Login</div>

      <b-form @submit.prevent="onSubmit" class="login-form">
        <b-form-group label="Username" label-for="username-input">
          <b-form-input
            id="username-input"
            v-model="username"
            type="text"
            placeholder="Enter username"
            :disabled="loading"
            required
          ></b-form-input>
        </b-form-group>
        <ValidationError :message="errors.username" />

        <b-form-group label="Password" label-for="password-input">
          <b-form-input
            id="password-input"
            v-model="password"
            type="password"
            placeholder="Enter password"
            :disabled="loading"
            required
          ></b-form-input>
        </b-form-group>
        <ValidationError :message="errors.password" />

        <div class="actions">
          <b-button type="submit" variant="primary" :disabled="isDisabled"
            >Login</b-button
          >
          <router-link
            to="/register"
            class="nav-link"
            :disabled="loading"
            :event="!loading ? 'click' : ''"
            ><span class="text-link">Register now</span></router-link
          >
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { login } from "../../services/user"
import ValidationError from "../../components/ValidationError.vue"
import { STATIC_ROUTES } from "../../router"

export default {
  name: "Login",
  components: { ValidationError },
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      errors: { username: "", password: "" }
    }
  },
  methods: {
    async onSubmit() {
      const payload = { username: this.username, password: this.password }
      try {
        this.loading = true
        await login(payload)
        await this.$store.dispatch("getAuthData")
        this.loading = false
        this.$vToastify.success("You logged successfully!")
        this.$router.push(STATIC_ROUTES.home)
      } catch (error) {
        this.loading = false
        this.$vToastify.error(error.message)
      }
    }
  },
  watch: {
    username: function (value) {
      this.errors.username = !value ? "The field is required" : ""
    },
    password: function (value) {
      this.errors.password = !value
        ? "The field is required"
        : value.length < 4
        ? "The min length is 4 character"
        : ""
    }
  },
  computed: {
    isDisabled() {
      return (
        this.loading ||
        !this.username ||
        !this.password ||
        Boolean(this.errors.username) ||
        Boolean(this.errors.password)
      )
    }
  }
}
</script>

<style>
.page-title {
  font-size: 2.5rem;
  margin: 24px 0px;
  text-align: center;
}
.login-form {
  border: solid #f8f9fa;
  padding: 1.5rem;
}
.form-wrapper {
  max-width: 400px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 12px;
}
.actions {
  display: flex;
  align-items: center;
}
.text-link {
  margin-left: 12px;
}
</style>
