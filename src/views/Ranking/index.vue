<template>
  <div>
    <Main title="Ranking">
      <CountFilter :onChange="handleChangeFilter" />
      <UsersList />
    </Main>
  </div>
</template>

<script>
import Main from "@/components/Main.vue"
import CountFilter from "./CountFilter.vue"
import UsersList from "./UsersList.vue"

export default {
  name: "Ranking",
  components: { Main, CountFilter, UsersList },
  data() {
    return { count: 5 }
  },
  methods: {
    handleChangeFilter(value) {
      this.count = value
    },
    getUsers() {
      const params = {
        _limit: this.count,
        _page: 1,
        _sort: "level",
        _order: "desc"
      }
      this.$store.dispatch("getAllUsers", params)
    }
  },
  mounted() {
    this.getUsers()
  },
  watch: {
    count() {
      this.getUsers()
    }
  }
}
</script>

<style>
.filter {
  display: flex;
}
.filter .item {
  margin-right: 15px;
  padding: 10px 15px;
  color: #000;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  cursor: pointer;
  text-transform: uppercase;
}
.filter .item:hover {
  color: #fff;
  background: rgb(0, 119, 255);
}
.filter .item.selected {
  color: #fff;
  background: rgb(0, 119, 255);
}
</style>
