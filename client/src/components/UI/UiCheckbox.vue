<template>
  <label class="ui-checkbox" :class="{ 'ui-checkbox--disabled': disabled }" cy-checkbox>
    <input class="ui-checkbox--input" :disabled="disabled" type="checkbox" v-model="isChecked" :value="value" />
    <span class="ui-checkbox--mark"></span>
    <span>
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "UiCheckbox",
  inheritAttrs: false,
  model: {
    prop: "checked",
    event: "input"
  },
  props: {
    value: {
      default: true
    },
    uncheckedValue: {
      default: false
    },
    checked: {
      default: false
    },
    disabled: {
      type: Boolean,
    }
  },
  data() {
    return {
      isChecked: false
    };
  },
  mounted() {
    this.selected = this.value;
    if (this.value == this.checked) {
      this.isChecked = true;
    } else if (this.uncheckedValue == this.checked) {
      this.isChecked = false;
    } else {
      this.isChecked = !!this.checked;
    }
  },
  watch: {
    isChecked() {
      this.$emit("input", this.isChecked ? this.value : this.uncheckedValue);
    },
    checked(value) {
      if (this.value == value) {
        this.isChecked = true;
      } else if (this.uncheckedValue == value) {
        this.isChecked = false;
      } else {
        this.isChecked = !!value;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ui-checkbox {
  font-size: 14px;
  line-height: 16px;
  color: #464646;
  vertical-align: top;
  min-height: 1.5rem;
  margin-bottom: 0px;
  position: relative;
  display: flex;
  input {
    display: none;
  }
  &--mark {
    display: inline-block;
    height: 15px;
    width: 15px;
    min-width: 15px;
    margin-right: 6px;
    position: relative;
    top: 1px;
    background-image: url("assets/unchecked.svg");
  }
  & input:checked ~ .ui-checkbox--mark {
    background-image: url("assets/checked.svg");
  }
  & input:active ~ .ui-checkbox--mark {
    background-image: url("assets/checked.svg");
    opacity: 0.5;
  }
  &--disabled {
    filter: contrast(0.4);
    opacity: 0.75;
  }
}
</style>
