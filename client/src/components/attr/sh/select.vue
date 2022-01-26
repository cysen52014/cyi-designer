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
    <div class="qh"><span>选项</span></div>
    <div class="cp-attr-line">
      <div class="label">数据类型</div>
      <div class="cr">
        <cys-radio-group v-model="_this.attr.optionType"  @input="change($event, 'optionType')">
          <cys-radio :label="1">静态数据</cys-radio>
          <cys-radio :label="2">动态数据</cys-radio>
        </cys-radio-group>
      </div>
    </div>
    <div class="static" v-if="_this.attr.optionType === 1">
      <div
        class="cp-attr-line"
        style="padding: 0 15px"
        :key="index"
        v-for="(item, index) in _this.attr.options"
      >
        <cys-input
          v-model="item.label"
          type="text"
          placeholder="请输入名称"
        ></cys-input>
        <span style="margin: 0 5px">—</span>
        <cys-input
          v-model="item.value"
          type="text"
          placeholder="请输入值"
        ></cys-input>
        <i
          @click="delStaticOptions(index)"
          class="cysicon icon-delete"
          style="margin: 0 5px"
        ></i>
      </div>
      <div class="ad" @click="adStaticOptions">
        <i class="cysicon icon-anonymous"></i>添加
      </div>
    </div>
    <div class="dynamic" v-if="_this.attr.optionType === 2">
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
      return this._parent.attr
    }
  },
  data () {
    return {
      cash: {},
      sIndex: 0, // 静态选项卡创建序号
      apiType: 1, // 动态请求api方式
      apiUrl: '', // api 地址
      optionLabel: '',
      optionValue: '',
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
      if (key) {
        const obj = {}
        obj[key] = this[key]
        this._parent.attr = Object.assign({}, this._parent.attr, obj)
      }
      this.setCash()
    },
    setCash () {
      this.cash = Object.assign({}, this._this.attr)
      if (this._this.attr.optionType === 1) {
        this.cash.optionLabel = 'label'
        this.cash.optionValue = 'value'
        delete this.cash.apiUrl
        delete this.cash.apiType
      } else {
        this.cash.options = []
      }
      this._parent.pageTree[this._parent.pageIndex].list[this._parent.spIndex].__rd = this.cash
    },
    adStaticOptions () {
      this._parent.attr.options.push({
        index: this.sIndex,
        label: '',
        value: ''
      })
      console.log(this._parent.attr)
      this.sIndex++
    },
    delStaticOptions (index) {
      this._parent.attr.options.splice(index, 1)
    }
  }
}
</script>
<style lang="stylus" scoped>
.static
  padding-top 5px
.ad
  text-align left
  color #409eff
  margin 10px 0 0 15px
.c-se
  >>> .cys-input-group--prepend
    padding 0
    border none
    width 86px
>>> .qh
  position relative
  height 40px
  line-height 40px
  margin-top 10px
  &::before {
      position absolute
      left 0
      top 20px
      height 1px
      width 100%
      background #dedede
      content ""
  }
  span
   display inline-block
   height 100%
   padding 0 15px
   background #fff
   position relative
</style>
