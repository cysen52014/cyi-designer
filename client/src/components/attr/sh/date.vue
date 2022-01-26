<template>
  <div class="cp-attr">
    <Base />
    <div class="cp-attr-line">
      <div class="label">类型</div>
      <div class="cr">
        <cys-select v-model="_this.attr.type" placeholder="请选择">
          <cys-option
            v-for="item in dateTypeList"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </cys-option>
        </cys-select>
      </div>
    </div>
    <div class="cp-attr-line" v-if="_this.attr.type.indexOf('range') > 0">
      <div class="label">开始字段</div>
      <div class="cr">
        <cys-input
          v-model="arr2Obj.start"
          @change="change"
          type="text"
          placeholder="控件输出值转化为改字段名称"
        ></cys-input>
      </div>
    </div>
    <div class="cp-attr-line" v-if="_this.attr.type.indexOf('range') > 0">
      <div class="label">结束字段</div>
      <div class="cr">
        <cys-input
          v-model="arr2Obj.end"
          @change="change"
          type="text"
          placeholder="控件输出值转化为改字段名称"
        ></cys-input>
      </div>
    </div>
  </div>
</template>
<script>
import Base from './base'
export default {
  components: {
    Base
  },
  inject: ['_parent', '_this'],
  provide () {
    return { _parent: this._parent, _this: this }
  },
  computed: {
    getAttr () {
      return this._this.attr
    }
  },
  data () {
    return {
      arr2Obj: {
        start: '',
        end: ''
      },
      dateTypeList: [
        {
          label: 'date',
          value: 'date'
        },
        {
          label: 'daterange',
          value: 'daterange'
        },
        {
          label: 'datetime',
          value: 'datetime'
        },
        {
          label: 'daterangetime',
          value: 'daterangetime'
        },
        {
          label: 'year',
          value: 'year'
        },
        {
          label: 'month',
          value: 'month'
        },
        {
          label: 'time',
          value: 'time'
        }
      ]
    }
  },
  methods: {
    change () {
      const obj = {}
      obj[this.arr2Obj.start] = ''
      obj[this.arr2Obj.end] = ''
      this._parent.pageTree[this._parent.pageIndex].list[this._parent.spIndex].arr2Obj = obj
    }
  },
  created () {
    console.log(this.attr)
  }
}
</script>
