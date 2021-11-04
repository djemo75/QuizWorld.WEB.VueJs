<template>
  <Main title="Categories">
    <b-row>
      <b-col v-for="category in categories" :key="category.name" cols="3">
        <div class="category" @click="handleClick(category)">
          <img :src="category.backgroundImage" class="category-background" />
          <div class="category-name">{{ category.name }}</div>
        </div>
      </b-col>
    </b-row>
  </Main>
</template>

<script>
import categories from "../../constans/categories"
import Main from "../../components/Main.vue"
import { STATIC_ROUTES } from "../../router"

export default {
  name: "Categories",
  components: { Main },
  created() {
    this.categories = categories
  },
  methods: {
    handleClick(category) {
      this.$router.push(
        STATIC_ROUTES.quiz.replace(":category", category.name.toLowerCase())
      )
    }
  }
}
</script>

<style>
.category {
  position: relative;
  margin-bottom: 12px;
  background: #000;
  min-height: 200px;
  border-radius: 0.25rem;
  cursor: pointer;
}
.category .category-background {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  opacity: 0.6;
  transition: 1s;
}
.category:hover .category-background {
  opacity: 0.4;
}
.category .category-name {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  color: #fff;
}
</style>
