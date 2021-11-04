<template>
  <div class="filter">
    <div
      v-for="(option, index) in options"
      class="item"
      :class="{ selected: option === value }"
      :key="index"
      @click="handleChangeFilter(option)"
    >
      Top {{ option }}
    </div>
  </div>
</template>

<script>
const options = [5, 10, 25, 50, 100]

export default {
  name: "CountFilter",
  props: {
    onChange: Function
  },
  data() {
    return { options, value: options[0] }
  },
  methods: {
    handleChangeFilter(value) {
      this.value = value
      this.onChange(value)
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
