<template>
  <div>
    <component :is="getCompt" :css="css"></component>
  </div>
</template>
<script>
import Input from './sh/input'
import Select from './sh/select'
import Date from './sh/Date'
import Cascader from './sh/cascader'
import Modal from './sh/modal'
export default {
  components: {
    Input,
    Select,
    Date,
    Cascader,
    Modal
  },
  props: {
    attr: {
      type: Object,
      defualt: {}
    }
  },
  watch: {
    css: {
      handler (val, oldVal) {
        console.log(this.attr, 'this.attr==')
        if (
          this.attr.type.indexOf('modal') > -1
        ) {} else {
          this.setCss(val)
        }
      },
      deep: true, // true 深度监听
      immediate: true
    }
  },
  created () {
    if (Object.keys(this.attr.css).length > 0) {
      this.css = this.attr.css
    }
  },
  data () {
    return {
      css: {
        labelWidth: {
          key: '.cys-form-label',
          c: {
            k: 'width',
            u: 'px',
            v: '80'
          }
        },
        height: {
          key: '.cys-input--inner',
          c: {
            k: 'height',
            u: 'px',
            v: '30'
          }
        },
        lineHeight: {
          key: '.cys-input--inner',
          c: {
            k: 'line-height',
            u: 'px',
            v: '30'
          }
        },
        inputWidth: {
          key: '.cys-input--inner',
          c: {
            k: 'width',
            u: 'px',
            v: '195'
          }
        },
        inputBorderColor: {
          key: '.cys-input--inner',
          c: {
            k: 'border-color',
            u: '',
            v: ' #ccc'
          }
        }
      }
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
  },
  methods: {
    setCss (val) {
      this._parent.pageTree[this._parent.pageIndex].list[this._parent.spIndex].css = val
    }
  }
}
</script>
<style lang="scss">
.cp-cattr-line {
  display: flex;
  align-items: center;
  margin-top: 10px;
  .label {
    width: 90px;
    text-align: right;
    margin-right: 8px;
  }
  .cr {
    flex: 1;
    margin-right: 10px;
  }
}
</style>
