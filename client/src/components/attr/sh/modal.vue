import VerifyFunc from '@/utils/verify';
<template>
  <div class="attr-modal">
    <div class="cp-attr-line">
      <div class="label">弹窗标题</div>
      <div class="cr">
        <cys-input
          v-model="_this.attr.label"
          type="text"
          placeholder="请输入弹窗标题"
        ></cys-input>
      </div>
    </div>
    <div class="static">
      <div
        class="cp-m"
        :key="index"
        v-for="(item, index) in _this.attr.options"
      >
        <div class="cp-attr-line">
          <cys-input v-model="item.label" class="epx" type="text" placeholder="名称"
            ><div slot="prepend">
              <cys-select
                @change="change($event, item)"
                v-model="item.type"
                placeholder="请选择组件"
              >
                <cys-option
                  v-for="item in cmpTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </cys-option>
              </cys-select></div
          ></cys-input>
          <span style="margin: 0 5px">-</span>
          <cys-input
            style="width: 150px;"
            v-model="item.field"
            type="text"
            placeholder="字段"
          ></cys-input>
          <div fixate="2" class="move" :vid="_this.pid + '_' + index">
          <cys-checkbox class="vy" v-model="item.verify">{{ item.verifyText }}</cys-checkbox>
          </div>
          <i
            @click="delStaticOptions(index)"
            class="cysicon icon-delete"
            style="margin: 0 5px"
          ></i>
        </div>
        <div
          class="cp-attr-line"
          style="margin-top: 5px;"
          v-if="
            item.type === 'select' ||
              item.type === 'radio' ||
              item.type === 'checkbox' ||
              item.type === 'cascader'
          "
        >
          <div class="cr">
            <cys-radio-group v-model="item.optionType">
              <cys-radio :label="1" v-if="item.type !== 'cascader'"
                >静态数据</cys-radio
              >
              <cys-radio :label="2">动态数据</cys-radio>
            </cys-radio-group>
            <div
              class="cei"
              v-if="item.optionType === 1 && item.type !== 'cascader'"
            >
              <div
                class="cp-attr-line"
                style="margin-top:10px;"
                :key="index2"
                v-for="(item2, index2) in item.options"
              >
                <cys-input
                  v-model="item2.label"
                  type="text"
                  placeholder="请输入名称"
                ></cys-input>
                <span style="margin: 0 5px">-</span>
                <cys-input
                  v-model="item2.value"
                  type="text"
                  placeholder="请输入值"
                ></cys-input>
                <i
                  @click="delSOptions(item, index2)"
                  class="cysicon icon-delete"
                  style="margin: 0 5px"
                ></i>
              </div>
              <div class="ae" @click="adSOptions(item)">
                <i class="cysicon icon-anonymous"></i>添加
              </div>
            </div>
            <div class="dynamic" v-if="item.optionType === 2">
              <div class="cp-attr-line">
                <div class="cr">
                  <cys-input
                    v-model="item.apiUrl"
                    class="c-se"
                    placeholder="接口地址"
                  >
                    <template slot="prepend">
                      <cys-select v-model="item.apiType" placeholder="请选择">
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
                <div class="cr">
                  <cys-input
                    v-model="item.optionLabel"
                    type="text"
                    placeholder="请输入键名"
                  ></cys-input>
                </div>
              </div>
              <div class="cp-attr-line">
                <div class="cr">
                  <cys-input
                    v-model="item.optionValue"
                    type="text"
                    placeholder="请输入键名"
                  ></cys-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="ad" @click="adStaticOptions">
      <i class="cysicon icon-anonymous"></i>添加
    </div>
    <div class="xzi">
      <div class="cp-attr-line" :key="index" v-for="(item, index) in _this.attr.btns">
        <div class="label">
          <cys-input
            class="bst"
            v-model="item.label"
            type="text"
            placeholder="按钮名称"
          ></cys-input>
        </div>
        <div class="cr" v-if="item.apiType">
          <cys-input v-model="item.apiUrl" class="c-se epx" placeholder="接口地址">
            <template slot="prepend">
              <cys-select v-model="item.apiType" placeholder="请选择">
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
        <cys-checkbox v-model="item.visible">显示</cys-checkbox>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['_this'],
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
      ],
      cmpTypeList: [
        {
          label: 'Input',
          value: 'input'
        },
        {
          label: 'Select',
          value: 'select'
        },
        {
          label: 'Switch',
          value: 'switch'
        },
        {
          label: 'Date',
          value: 'date'
        },
        {
          label: 'Month',
          value: 'month'
        },
        {
          label: 'Year',
          value: 'year'
        },
        {
          label: 'Time',
          value: 'time'
        },
        {
          label: 'daterange',
          value: 'daterange'
        },
        {
          label: 'datetimerange',
          value: 'datetimerange'
        },
        {
          label: 'Cascader',
          value: 'cascader'
        },
        {
          label: 'Checkbox',
          value: 'checkbox'
        },
        {
          label: 'Radio',
          value: 'radio'
        },
        {
          label: 'Textarea',
          value: 'textarea'
        }
      ]
    }
  },
  methods: {
    change (val, item) {
      console.log(item, '====item')
      if (val === 'select' || val === 'radio' || val === 'checkbox') {
        item.optionType = item.optionType ? item.optionType : 1
        if (val === 'checkbox') {
          item.value = item.value ? item.value : []
        }
      } else if (val === 'cascader') {
        item.optionType = item.optionType ? item.optionType : 2
      }
    },
    adStaticOptions () {
      this._this.attr.options.push({
        type: 'input',
        label: '输入框',
        field: '',
        value: '',
        verify: true,
        verifyText: '验证',
        verifyFunc: '',
        options: [],
        optionType: ''
      })
    },
    delStaticOptions (index) {
      this._this.attr.options.splice(index, 1)
    },
    adSOptions (item) {
      item.options.push({
        label: '选项名',
        value: '选项值'
      })
    },
    delSOptions (item, index) {
      item.options.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.attr-modal {
  >>> .cys-input-group--prepend {
    padding: 0;
    border: none;
    width: 110px;
  }
}
.vy {
  margin-left: 5px;
  background-color: #ecf5ff;
  display: inline-block;
  height: 30px;
  padding: 0 10px;
  line-height: 28px;
  font-size: 12px;
  color: #409eff;
  border: 1px solid #d9ecff;
  border-radius: 4px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  white-space: nowrap;
  >>> .cys-checkbox--inner {
    top: 5px;
  }
}
.static {
  padding-top: 5px;
  .cp-m {
    border: 1px solid #dedede;
    padding: 5px;
    margin: 0 10px;
    .cp-attr-line {
      margin-top: 0;
    }
  }
}
.xzi {
  padding: 0 15px 0 15px;
  border-top: 1px solid #dedede;
  .bst {
    >>> input {
      text-align: center;
    }
  }
}
.epx {
    >>> .cys-input-group--prepend {
        padding: 0 5px;
        width: 85px;
    }
}
.ad {
  text-align: left;
  color: #409eff;
  margin: 10px 0 0 15px;
  padding-bottom: 10px;
}
.ae {
  font-size: 14px;
  margin-top: 5px;
}
.dynamic {
  margin: 5px 0 0 0;
}
</style>
