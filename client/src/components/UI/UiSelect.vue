<template>
  <select class="ui-select" v-model="selected">
    <option v-for="(option) in options" :key="option.text" :value="option.value" :disabled="Boolean(option.disabled)">
      <span v-if="prefix">{{ prefix }}</span>
      <span>{{ option.text }}</span>
    </option>
  </select>
</template>

<script>
export default {
  name: "UiSelect",
  inheritAttrs: false,
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: {
      // type: [Object, Array, String, Number, Boolean],
      // default: undefined
    },
    options: {
      // type: [Object, Array, String, Number, Boolean],
      // default: undefined
    },
    prefix: {
      type: String,
      default: null
    }
  },
  mounted() {
    this.selected = this.value;
  },
  data() {
    return {
      selected: this.value,
    };
  },
  watch: {
    selected() {
      this.$emit("input", this.selected);
    },
    value(value) {
      this.selected = value;
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-select {
  font-size: 14px;
  line-height: 14px;
  color: #444;
  border-radius: 3px;
  border: 1px solid #d8d8d8;
  background: white url("assets/arrow.svg") no-repeat right .5rem center/16px 16px;
  padding: 7px 2px;
  appearance: none;
  outline: none;
  font: normal;
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -webkit-padding-end: 25px;
  -moz-padding-end: 25px;
  -webkit-padding-start: 10px;
  -moz-padding-start: 10px;
  position: relative;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &.error {
    border-color: #c00;
  }
}
</style>
