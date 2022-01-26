
<template>
  <div class="cp-attr">
    <div class="cp-attr-line">
      <div class="label">表格名称</div>
      <div class="cr">
        <div class="cp-attr-line" dragsort="H" :lk="'lkf:' + _this.name">
            <cys-input
            v-model="_this.name"
            type="text"
            disabled
          ></cys-input>
        </div>
      </div>
    </div>
    <div class="cp-attr-line">
      <div class="label">接口地址</div>
      <div class="cr">
        <cys-input
          v-model="_this.attr.apiUrl"
          class="c-se"
          placeholder="接口地址"
        >
          <template slot="prepend">
            <cys-select v-model="_this.attr.apiType" placeholder="请选择">
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
      <div class="label">接口参数</div>
      <div class="cr">
        <div class="cp-attr-line" :key="index" v-for="(item, index) in parmas">
          <cys-input
            v-model="item.key"
            type="text"
            placeholder="接口code名称"
          ></cys-input>
          <span style="margin: 0 3px">—</span>
          <cys-input
            v-model="item.val"
            type="text"
            placeholder="接口code值"
          ></cys-input>
          <i
            @click="delParmas(index)"
            class="cysicon icon-delete"
            style="margin: 0 5px"
          ></i>
        </div>
        <div class="ad s" @click="adParmas">
          <i class="cysicon icon-anonymous"></i>添加
        </div>
      </div>
    </div>
    <div class="cp-attr-line">
      <div class="label">code配置</div>
      <div class="cr">
        <div class="cp-attr-line">
          <cys-input
            v-model="_this.attr.options.method.cKey"
            type="text"
            placeholder="接口code名称"
          ></cys-input>
          <span style="margin: 0 3px">—</span>
          <cys-input
            v-model="_this.attr.options.method.cVal"
            type="text"
            placeholder="接口code值"
          ></cys-input>
        </div>
      </div>
    </div>

    <div class="cp-attr-line">
      <div class="label">显示分页</div>
      <div class="cr">
        <div class="cp-attr-line">
        <cys-switch
            width="50"
            v-model="_this.attr.options.isPagination"
            active-color="#409eff"
            inactive-color="#dcdfe6"
        ></cys-switch>
        </div>
      </div>
    </div>
    <div class="static">
      <div class="tl">表头字段</div>
      <div
        class="dfx"
        :key="index"
        v-for="(item, index) in _this.attr.options.thead.column"
      >
        <div class="v-l">
          <div class="cp-attr-line">
            <cys-input
              v-model="item.label"
              type="text"
              placeholder="名称"
            ></cys-input>
            <cys-input
              v-model="item.prop"
              type="text"
              placeholder="键值"
            ></cys-input>
          </div>
          <div class="cp-attr-line">
            <cys-input
              class="move"
              fixate="2"
              :mid="_this.pid + '_' + index"
              v-model="item.slotName"
              type="text"
              placeholder="插槽名"
            ><template v-if="item.FUT && item.FUT === 1" slot="append">(f)|<span>x</span><i @click="delSlot(item)" class="cysicon ix icon-delete"></i></template></cys-input>
            <cys-input
              v-model="item.width"
              @change="change($event, item)"
              type="number"
              placeholder="宽度"
            ></cys-input>
          </div>
          <div class="cp-attr-line">
            <cys-switch
              width="50"
              v-model="item.sort"
              active-color="#409eff"
              inactive-color="#dcdfe6"
            ></cys-switch>
          </div>
        </div>
        <i
          @click="delColumn(index)"
          class="cysicon icon-delete"
          style="margin: 0 5px"
        ></i>
      </div>
      <div class="ad" @click="adColumn">
        <i class="cysicon icon-anonymous"></i>添加表头
      </div>
    </div>
  </div>
</template>
<script>
export default {
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
      column: [],
      parmas: [],
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
  watch: {
    parmas: {
      handler (val, oldVal) {
        this.setParams()
      },
      deep: true // true 深度监听
    }
  },
  created () {
    console.log('cw', this._parent.attr)
  },
  methods: {
    setParams () {
      this.parmas.forEach(p => {
        this._parent.attr.parmas[p.key] = p.val
      })
      this._parent.attr.options.method.parmas = this._parent.attr.parmas
    },
    change (val, item) {
      if (val === '') {
        item.width = ''
        item.style.width = 'auto'
      } else {
        item.width = val
        item.style.width = val + 'px'
      }
    },
    toHump (s) {
      const a = s.split(/[\\/]/gi)
      let result = a[0]
      for (let i = 1; i < a.length; i++) {
        result = result + a[i].slice(0, 1).toUpperCase() + a[i].slice(1)
      }
      return result
    },
    adColumn () {
      const op = {
        label: '列一',
        prop: 'aa',
        FUT: '',
        FUM: '',
        slotName: '',
        style: {},
        sort: false
      }
      console.log(this._this, '_this')
      this.column.push(op)
      this._parent.attr.options.thead.column = this.column
    },
    delColumn (index) {
      this._parent.attr.options.thead.column.splice(index, 1)
    },
    adParmas () {
      this.parmas.push({
        index: this.sIndex,
        label: '',
        value: ''
      })
    },
    delParmas (index) {
      this.parmas.splice(index, 1)
    },
    delSlot (item) {
      item.FUT = ''
      item.FUM = ''
      console.log(item, 'item=')
    }
  }
}
</script>
<style lang="stylus" scoped>

.static
  padding-top 5px
  .dfx
   display flex
   padding 10px
   align-items center
  .tl {
    text-align left
    border-top 1px solid #dedede
    padding 15px 20px 0
    margin-top 20px
  }
.ad
  text-align left
  color #409eff
  margin 5px 0 0 15px
  &.s
   margin-left 0
   display inline-block
.c-se
  >>> .cys-input-group--prepend
    padding 0
    border none
    width 86px
.cp-attr-line
>>> .cys-input.cys-input-group .cys-input-group--append {
    padding 0 10px
  }
  .ix {
    font-size 14px
    color red
    margin-left 5px
    cursor pointer
  }
  .cr
    .cp-attr-line
        margin-top 5px
</style>
