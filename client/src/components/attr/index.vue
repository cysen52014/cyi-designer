<template>
  <div>
    <component :is="getCompt"></component>
  </div>
</template>
<script>
import Input from './sh/input'
import Select from './sh/select'
import Date from './sh/date'
import Cascader from './sh/cascader'
import Table from './sh/Table'
import Modal from './sh/modal'
export default {
  components: {
    Input,
    Select,
    Date,
    Cascader,
    Table,
    Modal
  },
  props: {
    attr: {
      type: Object,
      defualt: {}
    },
    type: {
      type: String
    },
    name: {
      type: String
    },
    pid: {
      type: String
    }
  },
  computed: {
    getCompt () {
      if (Object.keys(this.attr).length > 0) {
        if (
          this.attr.type.indexOf('date') > -1 ||
          this.attr.type.indexOf('month') > -1 ||
          this.attr.type.indexOf('year') > -1 ||
          this.attr.type.indexOf('time') > -1
        ) {
          return 'Date'
        } else {
          return (
            this.attr.type.substr(0, 1).toUpperCase() +
            this.attr.type.substr(1, this.attr.type.length)
          )
        }
      }
    }
  },
  inject: ['_parent'],
  provide () {
    return { _parent: this._parent, _this: this }
  }
}
</script>
<style lang="scss">
.cp-attr-line {
  display: flex;
  align-items: center;
  margin-top: 10px;
  .label {
    width: 88px;
    text-align: right;
    margin-right: 8px;
  }
  .cr {
    flex: 1;
    margin-right: 10px;
    text-align: left;
  }
  .cys-radio+.cys-radio {
    margin-left: 10px;
  }
}
</style>
