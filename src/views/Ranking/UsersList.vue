<template>
  <div class="list">
    <b-overlay :show="usersLoading" rounded="sm"
      ><b-table :fields="fields" :items="users">
        <template #cell(index)="data">
          {{ data.index + 1 }}
        </template>

        <template #cell(rank)="data">
          <img
            v-if="[1, 2, 3].includes(data.index + 1)"
            :src="getRankImage(data.index + 1)"
            class="rank-image"
            alt="rank" /></template
      ></b-table>
    </b-overlay>
  </div>
</template>

<script>
import { mapState } from "vuex"

export default {
  name: "UsersList",
  data() {
    return {
      fields: [
        { key: "index", label: "#" },
        { key: "rank", label: "Rank" },
        { key: "username", label: "Username" },
        { key: "level", label: "Level(Passed tests)" }
      ]
    }
  },
  methods: {
    getRankImage(id) {
      if (id === 1) {
        return require("@/assets/ranks/rank1.png")
      } else if (id === 2) {
        return require("@/assets/ranks/rank2.png")
      } else if (id === 3) {
        return require("@/assets/ranks/rank3.png")
      }
    }
  },
  computed: {
    ...mapState({
      users: (state) => state.users.users,
      usersLoading: (state) => state.users.usersLoading
    })
  }
}
</script>

<style>
/* Loading indicator */
.list {
  margin-top: 15px;
}
.list .position-absolute {
  top: 0px !important;
}
.list .position-absolute span {
  margin-top: 100px;
}
/* Table styles */
.table {
  border-collapse: separate;
  border-spacing: 0 20px;
}
.table tbody tr {
  box-shadow: rgba(0, 0, 0, 3%) 0px 3px 3px 0px;
}
.table tbody tr td {
  border-top-width: 1px;
}
.table tbody tr td:first-of-type {
  border-left-width: 1px;
}
.table tbody tr td:last-of-type {
  border-right-width: 1px;
}
.table > :not(caption) > * > * {
  padding: 1rem 1.5rem;
}
.table thead {
  background: #0f0c29; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #24243e,
    #302b63,
    #0f0c29
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #24243e,
    #302b63,
    #0f0c29
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  color: #fff;
}
.table-hover > tbody > tr:hover {
  --bs-table-accent-bg: #fff;
  color: #000;
}
.table tbody tr:first-of-type {
  background: #8033e5;
  color: #fff;
}
.table tbody tr:nth-of-type(2) {
  background: #5967ff;
  color: #fff;
}
.table tbody tr:nth-of-type(3) {
  background: #68c5fe;
  color: #fff;
}
.table .rank-image {
  max-height: 40px;
  position: absolute;
  margin-top: -8px;
}
</style>
