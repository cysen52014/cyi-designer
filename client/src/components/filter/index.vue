<template>
  <div class="lt-filter">
    <div class="lt-filter-box">
      <div class="ad-filter" @click="adFilters">
        <i class="cysicon icon-anonymous"></i>新增
      </div>
      <div class="save" @click="createFilters">保存</div>
      <i class="cysicon icon-guanbi close" @click="_parent.DGfilterVisble = false"></i>
      <div class="mxo">
        <div
          :class="index === 0 ? 'filter-node first' : 'filter-node'"
          v-for="(item, index) in _parent.GFilters"
          :key="index"
        >
          <div class="filter-node-label">
            <span class="kfs">
              <i
                class="cysicon icon-anonymous ad"
                v-if="item.type === 1 || !item.type"
                @click="adOptions(item, 1)"
                >o</i
              >
              <i
                class="cysicon icon-anonymous ad"
                v-if="!item.type"
                @click="adOptions(item, 2)"
                >a</i
              >
            </span>
            <cys-input
              v-model="item.name"
              class="apt"
              type="text"
              placeholder="过滤器名称"
            ><template slot="append"><div class="sce"><span class="cyii" dragsort="S">{{item.name}}</span></div></template></cys-input>
            <i
              class="cysicon del icon-delete"
              @click="delFilter(index)"
            ></i>
          </div>
          <div class="filter-node-children">
            <div
              :class="
                item.options.length === 1
                  ? 'filter-node-line one'
                  : 'filter-node-line'
              "
              v-for="(item2, index2) in item.options"
              :key="index2"
            >
              <div :class="'filter-node-line-label'" v-if="item.type === 1">
                <div class="k">
                  <cys-input
                    v-model="item2.label"
                    type="text"
                    placeholder="过滤器键"
                  ></cys-input>
                </div>
                <span>:</span>
                <div class="v">
                  <cys-input
                    v-model="item2.value"
                    type="text"
                    placeholder="过滤器值"
                  ></cys-input>
                </div>
                <i
                  class="cysicon del icon-delete"
                  @click="delOptions(item, index2)"
                ></i>
              </div>
              <div :class="'filter-node-line-label flx'" v-if="item.type === 2">
                <div class="cg">
                  <cys-input
                    v-model="item2.apiUrl"
                    class="c-se"
                    placeholder="接口地址"
                  >
                    <template slot="prepend">
                      <cys-select v-model="item2.apiType" placeholder="请选择">
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
                <div class="cg">
                  <cys-input
                    v-model="item2.label"
                    type="text"
                    placeholder="返回值名称"
                  ></cys-input>
                  <cys-input
                    v-model="item2.value"
                    type="text"
                    placeholder="返回值键值"
                  ></cys-input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  createFilters
} from '@/api/create'
export default {
  inject: ['_parent'],
  data () {
    return {
      type: 1,
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
    async createFilters () {
      const { code, message } = await createFilters({
        name: this._parent.projectName,
        list: this._parent.GFilters
      })
      if (code === 0) {
        this.$cysMessage({
          type: 'success',
          message: '保存成功'
        })
      } else {
        this.$cysMessage({
          type: 'error',
          message: message
        })
      }
    },
    adFilters () {
      const a = {
        name: '',
        options: []
      }
      this._parent.GFilters.push(a)
    },
    delFilter (index) {
      this._parent.GFilters.splice(index, 1)
    },
    delOptions (item, index) {
      item.options.splice(index, 1)
    },
    adOptions (item, type) {
      item.type = type
      if (type === 1) {
        const a = {
          label: '',
          value: ''
        }
        item.options.push(a)
      } else {
        const a = {
          apiUrl: 1,
          label: 'label',
          value: 'value',
          apiType: 'get'
        }
        item.options = [a]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.c-se {
  >>> .cys-input-group--prepend {
    padding: 0;
    border: none;
    width: 86px;
  }
}

.cyii {
    display: inline-block;
    height: 100%;
    border: 1px dashed #787be8;
    padding: 0px 5px;
}

.sce {
  cursor: move;
  width: 24px;
  height: 24px;
  background: url(~@/assets/ty.png) no-repeat;
  background-size: auto 100%;
  overflow: hidden;
  span.cyii {
    height: 100%;
    border: none;
    opacity: 0;
  }
}
.mxo {
  height: 795px;
  overflow-y: auto;
}
.close {
  position: absolute;
  right: 10px;
  top: 15px;
  cursor: pointer;
}
.lt-filter {
    >>> .cys-input.cys-input-group .cys-input-group--append{
      padding: 0 0;
    }
  .ad-filter {
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 15px;
    background: #409eff;
    color: #fff;
    padding: 5px 20px;
    font-size: 14px;
  }
  .save {
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    left: 120px;
    top: 15px;
    background: #409eff;
    color: #fff;
    padding: 5px 20px;
    font-size: 14px;
  }
  .lt-filter-box {
    position: absolute;
    padding: 60px 20px 20px 20px;
    top: 60px;
    left: 300px;
    z-index: 100;
    box-shadow: 3px 2px 8px 3px rgb(0 0 0 / 10%);
    background: #fff;
    width: 760px;
    height: 800px;
    .filter-node {
      display: flex;
      align-items: center;
    }
    .filter-node-label {
      display: flex;
      width: 250px;
      height: 34px;
      padding: 5px 5px 5px 5px;
      justify-content: center;
      align-items: center;
      border-radius: 3px;
      -webkit-box-shadow: 0 1px 5px rgb(0 0 0 / 15%);
      box-shadow: 0 1px 5px rgb(0 0 0 / 15%);
      .del {
        background: none;
        color: #000;
        margin-left: 5px;
      }
      .kfs {
        display: flex;
        margin-right: 5px;
      }
      i {
        color: #fff;
        padding: 5px 5px 5px 5px;
        cursor: pointer;
        margin-right: 3px;
        background: #409eff;
      }
    }
    .filter-node-children {
      position: relative;
      &::before {
        top: 50%;
        left: 0;
        width: 20px;
        content: "";
        position: absolute;
        height: 0;
        border-left: 0;
        border-top: 1px solid #ddd;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 0;
      padding-left: 20px;
      .filter-node-line {
        position: relative;
        border-left: 1px solid #ddd;
        .filter-node-line-label {
          display: flex;
          align-items: center;
          padding: 8px 10px;
          margin: 10px 0 10px 15px;
          box-shadow: 3px 2px 8px 0 rgb(0 0 0 / 10%);
          &.flx {
            display: block;
            width: 275px;
          }
        }
        .cg {
          display: flex;
        }
        span {
          margin: 0 5px;
        }
        &::before {
          top: 50%;
          left: 0;
          width: 20px;
          content: "";
          position: absolute;
          height: 0;
          border-left: 0;
          border-top: 1px solid #ddd;
        }
        &:nth-child(1)::after {
          top: -50%;
          left: -1px;
          content: "";
          position: absolute;
          height: 100%;
          width: 2px;
          background: #fff;
        }
        &:last-child::after {
          top: 51%;
          left: -1px;
          content: "";
          position: absolute;
          height: 100%;
          width: 2px;
          background: #fff;
        }
        &.one {
          border: none;
        }
        .k {
          width: 120px;
        }
        .v {
          width: 120px;
        }
        .del {
          margin-left: 5px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
