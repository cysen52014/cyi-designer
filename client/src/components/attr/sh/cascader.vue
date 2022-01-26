<template>
  <div class="cp-attr">
    <Base />
    <div class="cp-attr-line">
      <div class="label">可搜索</div>
      <div class="cr">
          <cys-radio-group
            v-model="_this.attr.filter"
            @change="change"
          >
            <cys-radio :label="true">是</cys-radio>
            <cys-radio :label="false">否</cys-radio>
          </cys-radio-group>
      </div>
    </div>
    <div class="dynamic">
      <div class="cp-attr-line">
        <div class="label">接口地址</div>
        <div class="cr">
          <cys-input
            v-model="_this.attr.apiUrl"
            @change="change($event, 'apiUrl')"
            class="c-se"
            placeholder="接口地址"
          >
            <template slot="prepend">
              <cys-select
                @change="change($event, 'apiType')"
                v-model="_this.attr.apiType"
                placeholder="请选择"
              >
                <cys-option
                  v-for="item in apiTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                >
                </cys-option>
              </cys-select>
            </template>
          </cys-input>
        </div>
      </div>
      <div class="cp-attr-line">
        <div class="label">键名</div>
        <div class="cr">
          <cys-input
            v-model="_this.attr.optionLabel"
            @change="change($event, 'optionLabel')"
            type="text"
            placeholder="请输入键名"
          ></cys-input>
        </div>
      </div>
      <div class="cp-attr-line">
        <div class="label">键值</div>
        <div class="cr">
          <cys-input
            v-model="_this.attr.optionValue"
            @change="change($event, 'optionValue')"
            type="text"
            placeholder="请输入键名"
          ></cys-input>
        </div>
      </div>
      <div class="cp-attr-line">
        <div class="label">选中所有级</div>
        <div class="cr">
          <cys-radio-group
            v-model="_this.attr.checkStrictly"
            @input="change('checkStrictly')"
          >
            <cys-radio :label="true">是</cys-radio>
            <cys-radio :label="false">否</cys-radio>
          </cys-radio-group>
        </div>
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
  data () {
    return {
      apiTypeList: [
        {
          label: 'get',
          value: 1
        },
        {
          label: 'post',
          value: 2
        },
        {
          label: 'put',
          value: 3
        },
        {
          label: 'delete',
          value: 4
        }
      ]
    }
  },
  methods: {
    change (val, key) {
      const tree = this._parent.pageTree
      const attr = tree[this._parent.pageIndex].list[this._parent.spIndex]
      attr[key] = val
    }
  }
}
</script>
<style lang="stylus" scoped>
.c-se
  >>> .cys-input-group--prepend
    padding 0
    border none
    width 86px
</style>
