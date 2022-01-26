<template>
  <div class="create-page">
    <div class="header">
      <div class="u-b build" @click="toPackage">打包项目</div>
      <div class="project-name">
        <span>项目</span>
        <div class="p-ifo" v-if="visibleProjectTpis">
          <div class="ifo">
            <p>
              <span class="l">名称</span>
              <span class="r">{{ projectInfo.name }}</span>
            </p>
            <p>
              <span class="l">域名</span>
              <span class="r">{{ projectInfo.hostname }}</span>
            </p>
            <p>
              <span class="l">端口</span>
              <span class="r">{{ projectInfo.port }}</span>
            </p>
            <p>
              <span class="l">接口地址</span>
              <span class="r">{{ projectInfo.apiurl }}</span>
            </p>
          </div>
        </div>
        <cys-cascader
          :props="{ showAllLevels: true, checkStrictly: true}"
          @mouseenter.native="viewProjectTpis"
          @mouseleave.native="visibleProjectTpis = false"
          @change="changePageSelect"
          v-model="projectSelcted"
          :options="projectList"
          :clearable="true"
          :filter="true"
          placeholder="请选择"
        ></cys-cascader>
      </div>
    </div>
    <div class="main">
      <div class="left-column">
        <div class="co">
          <h5>基础组件</h5>
          <div
            class="item move"
            dragsort="H"
            :uid="index"
            :usein="item.usein"
            v-for="(item, index) in tagsInfo.base"
            :key="index"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="co" >
          <div class="gj">过滤器 <i class="cysicon bj icon-bianji" @click="DGfilterVisble = true"></i></div>
          <div class="gj">验证器 <i class="cysicon bj icon-bianji" @click="verifyVisble = true"></i></div>
          <GFilter v-if="DGfilterVisble" />
          <Verifys v-if="verifyVisble" />
        </div>
      </div>
      <div class="middle-column move" dragsort="H" fixate="1">
        <div
          :class="[
            'cop',
            {
              aoo: item.type === 'formsearch',
              boo: item.type !== 'formsearch',
              on: pageIndex == i
            }
          ]"
          :kid="i"
          :usi="item.usi"
          v-for="(item, i) in pageTree"
          :key="'a' + i"
        >
          <div v-if="item.type === 'formsearch'" :class="item.css.name + i">
            <component
              :is="currentView({ type: 'formSearch' })"
              :data="item.list"
              :btns="item.btns"
              :direction="item.direction"
              :pointer="item.pointer"
            ></component>
            <div class="lk-f">{{ item.pointer }}</div>
          </div>
          <div v-else :class="item.css.name + i">
            <div
              class="cp-item"
              :key="'b' + ii"
              v-for="(item2, ii) in item.list"
              :style="item2.css"
            >
              <div class="cp-inline-item">
                <label class="cys-form-label" v-if="item2.label">{{ item2.label }}</label>
                <div class="cpr crb" v-if="item.type === 'modal'">
                  <Modal :optipns="item2" />
                  <!-- <component
                    v-if="item.visible"
                    :is="currentView(item2)"
                    :value="item2.value"
                    :options="item2.options || []"
                  ></component> -->
                </div>
                <div class="cpr" v-else>
                  <component
                    :is="currentView(item2)"
                    :value="item2.value"
                    :options="item2.options || []"
                  ></component>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="c-bc">
          <cys-button @click="exportVue">查看vue文件</cys-button>
          <cys-button @click="viewCreateDailog">保存页面</cys-button>
        </div>
      </div>
      <div class="right-column">
        <div :key="i" v-for="(item1, i) in pageTree">
          <div class="pl" :key="i2" v-for="(item, i2) in item1.list">
            <div v-if="pageIndex === i * 1 && spIndex === i2">
              <div class="ct">
                <span
                  :class="!item.tabIndex || item.tabIndex === 1 ? 'on' : ''"
                  @click="changeTab(item, 1)"
                  >组件属性</span
                >
                <span
                  :class="item.tabIndex === 2 ? 'on' : ''"
                  @click="changeTab(item, 2)"
                  >外观设置</span
                >
              </div>
              <div class="cm">
                <Attr
                  :pid="i + '_' + i2"
                  :attr="item"
                  :name="item1.css.name + 0"
                  :type="item1.type"
                  v-show="!item.tabIndex || item.tabIndex === 1"
                /><Exterior :attr="item" :type="item1.type" :name="item1.css.name + 0" v-show="item.tabIndex === 2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 查看vue文件弹窗 -->
    <cys-modal title="提示" v-model="vueDailogVisible" width="60%" height="60%">
      <cys-textarea v-model="vuefile" :rows="30"></cys-textarea>
      <span slot="footer">
        <cys-button @click="visible = false" plain>取 消</cys-button>
        <cys-button @click="visible = false">确 定</cys-button>
      </span>
    </cys-modal>
    <!-- 保存页面弹窗 -->
    <cys-modal title="提示" v-model="createPageDailogVisible" width="300">
      <cys-form
        class="page-form"
        ref="form"
        v-model="formData"
        :label-width="'90px'"
        :rules="rules"
      >
        <cys-form-item :label="'页面标题：'" prop="title" :label-width="'80px'">
          <cys-input
            v-model="formData.title"
            placeholder="请输入页面标题"
          ></cys-input>
        </cys-form-item>
        <cys-form-item
          :label="'页面名称：'"
          prop="filename"
          :label-width="'80px'"
        >
          <cys-input
            v-model="formData.filename"
            placeholder="请输入页面名称"
          ></cys-input>
        </cys-form-item>
        <cys-form-item :label="'页面路径：'" prop="path" :label-width="'80px'">
          <cys-input
            v-model="formData.path"
            placeholder="请输入页面路径"
          ></cys-input>
        </cys-form-item>
      </cys-form>
      <span slot="footer">
        <cys-button @click="storagePage">确 定</cys-button>
      </span>
    </cys-modal>
  </div>
</template>
<script>
import tagsInfo from '@/utils/tags.js'
import DrageSort from '@/utils/dragsort.js'
import Attr from '@/components/attr'
import Exterior from '@/components/exterior'
import GFilter from '@/components/filter'
import Modal from '@/components/modal'
import Verifys from '@/components/verify'

import generate from 'nanoid-generate'

import CysUi from 'cys-ui'

import {
  getTemplate,
  storagePage,
  getProjectList,
  projectPackage
} from '@/api/create'

console.log(Verifys, 'generate')

const components = {
  Attr: Attr,
  Exterior: Exterior,
  GFilter: GFilter,
  Modal: Modal,
  Verifys: Verifys
}
CysUi.components.forEach(element => {
  components[element.name] = element
})

const guid = () => {
  return generate.lowercase(8)
}

export default {
  components: components,
  provide () {
    return { _parent: this }
  },
  data () {
    return {
      drageSort: null,
      DGfilterVisble: false, // 过滤器显示
      verifyVisble: false, // 验证器显示
      createPageDailogVisible: false, // 创建页面弹窗
      formData: { title: '', filename: '', path: '' },
      rules: {
        title: [{ required: true, message: '请输入项目标题', trigger: 'blur' }],
        filename: [
          { required: true, message: '请输入项目名称', trigger: 'blur' }
        ],
        path: [{ required: true, message: '请输入项目路径', trigger: 'blur' }]
      },
      visibleProjectTpis: false, // 项目弹窗
      vueDailogVisible: false,
      vuefile: '',
      projectName: '',
      projectSelcted: [],
      projectInfo: {},
      projectList: [],
      tagsInfo: tagsInfo,
      tabIndex: 1, // 属性设置选项卡值
      pageIndex: 0, // 生成页面面板序号
      pageTree: {}, // 生成页面信息配置
      spIndex: 0, // 面板子组件选择第几个
      syt: '', // 组件名称
      sfPos: {}, // 搜索组件外版面位置信息
      attr: {}, // 组件属性设置
      cAttr: {}, // 组件样式设置
      pageCss: '', // 页面样式
      GFilters: [] // 过滤器
    }
  },
  watch: {
    attr: {
      handler (val, oldVal) {
        this.appendCss()
      },
      deep: true // true 深度监听
    }
  },
  methods: {
    appendCss () {
      this.pageCss = ''
      const attr = this.pageTree
      console.log('opc', attr)
      Object.keys(attr).forEach((kk, ii) => {
        const cp = attr[kk]
        const ty =
          cp.type === 'formsearch' ? ' .cys-form-search-item' : ' .cp-item'
        cp.list.forEach((r, i) => {
          Object.keys(r.css).forEach(k1 => {
            this.pageCss +=
              '.' + cp.css.name + ii + ty + ':nth-child(' + (i + 1) + ') '
            const a = r.css[k1].key
            const b = r.css[k1].c
            this.pageCss += a + ' {' + b.k + ':' + b.v + b.u + '}'
          })
        })
      })
      this.$nextTick(() => {
        const a = document.querySelector('.pgw__css')
        if (a) {
          a.innerHTML = this.pageCss
        } else {
          const b = document.createElement('style')
          b.className = 'pgw__css'
          b.innerHTML = this.pageCss
          document.head.append(b)
        }
      })
    },
    checkProjectName (rule, value, callback) {
      if (!value) {
        callback(new Error('请输入项目名称'))
      } else {
        if (value.match(/[a-zA-Z]+/gi)) {
          callback()
        } else {
          callback(new Error('项目名称必须为英文字母'))
        }
      }
    },
    viewProjectTpis () {
      if (this.projectName) {
        this.visibleProjectTpis = true
        this.projectInfo = this.projectList.filter(
          r => r.name === this.projectName
        )[0]
      }
    },
    changeTab (item, val) {
      item.tabIndex = val
      this.$forceUpdate()
    },
    interactive (el, coo, ty) {
      // 组件交互
      if (el.getAttribute('dragsort') === 'H') {
        this.create(el, coo, ty)
      } else if (el.getAttribute('dragsort') === 'S') { // 插槽回调
        this.bindSlot(el, ty)
      } else if (el.getAttribute('dragsort') === 'X') { // 验证绑定回调
        this.bindVerify(el, ty)
      } else {
        this.swap(el)
      }
    },
    bindVerify (el, k) {
      const val = el.innerHTML
      const fn = el.getAttribute('fn').replace(/\r\n/g, '')
      console.log(fn, 'fn=====')
      this.pageTree[k[0]].list[k[1]].options[k[2]].verifyText = val
      this.pageTree[k[0]].list[k[1]].options[k[2]].verifyFunc = fn
    },
    bindSlot (el, k) {
      const val = el.innerHTML
      this.pageTree[k[0]].list[k[1]].options.thead.column[k[2]].FUM = val
      this.pageTree[k[0]].list[k[1]].options.thead.column[k[2]].FUT = 1 // 过滤器配置 t=1为过滤名称 t=2添加元素
      console.log(k)
    },
    deepCopy (obj) {
      let result = Array.isArray(obj) ? [] : {}
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key] !== null) {
            result[key] = this.deepCopy(obj[key]) // 递归复制
          } else {
            result[key] = obj[key]
          }
        }
      }
      return result
    },
    create (el, coo, ty) {
      // 添加组件
      const index = el.getAttribute('uid') * 1
      const lk = el.getAttribute('lk')
      if (lk) {
        this.pageTree[coo.i].pointer = lk.split(':')[1]
        this.$forceUpdate()
        return
      }
      // const c = Object.assign({}, this.tagsInfo.base[index])
      const c = this.deepCopy(this.tagsInfo.base[index])
      this.syt = 'formsearch'
      if (Object.keys(this.sfPos).length < 1) {
        // 第一次添加搜索表单组件
        this.append(ty, c)
      } else {
        const ry = coo
        if (!ry) {
          this.spIndex = 0
          this.pageIndex++
          this.append(ty, c)
        } else {
          if (ry.c === 1) {
            this.pageIndex = ry.i * 1
            this.spIndex = this.pageTree[this.pageIndex].list.length
            this.append(ty, c)
          } else {
            this.pageIndex = ry.i * 1
            this.spIndex = this.pageTree[this.pageIndex].list.length
            this.append(ty, c)
          }
        }
      }
    },
    append (isear, c) {
      if (isear === 1) {
        this.syt = 'formsearch'
        this.initSFrom(c)
      } else {
        this.syt = c.type
        this.initBase(c)
      }
      this.attr = this.pageTree[this.pageIndex].list[this.spIndex]
      this.$forceUpdate()
      this.$nextTick(() => {
        this.setSfPos()
      })
      console.log(this.pageIndex, this.spIndex, 'tree')
    },
    initBase (c) {
      const gid = guid()
      c.field = gid
      if (!this.pageTree[this.pageIndex]) {
        this.pageTree[this.pageIndex] = {
          usi: c.usein,
          type: this.syt,
          list: [],
          css: {
            type: c.type,
            name: 'cs_' + gid,
            text: {}
          }
        }
      }
      // eslint-disable-next-line standard/computed-property-even-spacing
      this.pageTree[this.pageIndex].list = this.pageTree[
        this.pageIndex
      ].list.concat(c)
    },
    initSFrom (c) {
      // 初始化表格搜索配置
      const gid = guid()
      c.field = gid
      if (!this.pageTree[this.pageIndex]) {
        this.pageTree[this.pageIndex] = {
          usi: c.usein,
          type: this.syt,
          list: [],
          direction: 'horizontal',
          pointer: '',
          btns: [
            {
              label: '查询',
              action: 'search'
            }
          ],
          css: {
            type: c.type,
            name: 'cs_' + gid,
            text: {}
          }
        }
      }
      // eslint-disable-next-line standard/computed-property-even-spacing
      this.pageTree[this.pageIndex].list = this.pageTree[
        this.pageIndex
      ].list.concat(c)
    },
    swap (el) {
      // 交换位置
    },
    setSfPos () {
      // 添加
      console.log('22')
      const coo = document.querySelectorAll('.cop')
      for (let index = 0; index < coo.length; index++) {
        const el2 = coo[index]
        this.sfPos[index] = {
          i: el2.getAttribute('kid') * 1,
          u: el2.getAttribute('usi') * 1,
          c: el2.className.indexOf('aoo') > 0 ? 1 : 2,
          t: el2.offsetTop,
          l: el2.offsetLeft,
          r: el2.offsetLeft + el2.clientWidth,
          b: el2.offsetTop + el2.clientHeight
        }
      }
      this.drageSort.setPos(this.sfPos)
    },
    inCooPos (x, y) {
      // 判断是否在已存在表单父区域内
      let a = null
      for (const key in this.sfPos) {
        const rect = this.sfPos[key]
        if (x >= rect.l && x <= rect.r && y >= rect.t && y <= rect.b) {
          a = rect
          break
        }
      }
      return a
    },
    currentView (conf) {
      // 组件选择
      let s, e
      if (
        conf.type.indexOf('date') > -1 ||
        conf.type.indexOf('month') > -1 ||
        conf.type.indexOf('year') > -1 ||
        conf.type.indexOf('time') > -1
      ) {
        s = 'Date'
        e = 'Picker'
      } else {
        s = conf.type.substr(0, 1).toUpperCase()
        e = conf.type.substr(1, conf.type.length)
      }
      const type = 'Cys' + s + e
      return type
    },
    inCop (el) {
      let b = false
      while (el && !b) {
        if (el.className && el.className.indexOf('cop') !== -1) {
          b = true
        } else {
          el = el.parentNode
        }
      }
      const isF = el && el.className.indexOf('aoo') > -1
      return {
        el,
        b,
        isF: isF
      }
    },
    hasElmentByClassName (el, cls) {
      // 查找是否表单元素
      let b = false
      while (el && !b) {
        if (el.className && el.className.indexOf(cls) !== -1) {
          b = true
        } else {
          el = el.parentNode
        }
      }
      return {
        el,
        b
      }
    },
    getIndex (child) {
      let i = 0
      while (child.previousElementSibling != null) {
        i = i + 1
        child = child.previousElementSibling
      }
      return i
    },
    setSFromData () {
      document.addEventListener(
        'click',
        e => {
          const C = this.inCop(e.target)
          if (C.b) {
            const ii = C.el.getAttribute('kid') * 1
            this.pageIndex = ii
            const Q = this.hasElmentByClassName(
              e.target,
              C.isF ? 'cys-form-search-item' : 'cp-item'
            )

            if (Q.b) {
              this.spIndex = this.getIndex(Q.el) || 0
              this.syt = 'formsearch'
              this.setOnClass(Q.el, this.spIndex)
              this.attr = this.pageTree[ii].list[this.spIndex]
            }
          }
        },
        false
      )
    },
    setOnClass (el, i) {
      // 查询表单组件选中
      const p = el.parentNode
      const a = p.children
      for (let index = 0; index < a.length; index++) {
        const el1 = a[index]
        el1.className = el1.className.replace(/\son/i, '')
        if (index === i) {
          el1.className += ' on'
        }
      }
    },
    getTpl (conf) {
      // 组件选择
      const s = conf.type.substr(0, 1).toUpperCase()
      const e = conf.type.substr(1, conf.type.length)
      const type = 'Cys' + s + e
      return type
    },
    viewCreateDailog () {
      this.createPageDailogVisible = true
    },
    async storagePage () {
      const tfd = await this.tfd()
      const { code, message } = await storagePage({
        path: this.formData.path,
        name: this.projectName,
        filename: this.formData.filename,
        title: this.formData.title,
        data: tfd
      })
      if (code === 0) {
        this.$cysMessage({
          type: 'success',
          message: message
        })
      } else {
        this.$cysMessage({
          type: 'error',
          message: message
        })
      }
    },
    tfd () {
      return new Promise(resolve => {
        Object.keys(this.pageTree).forEach(key => {
          this.pageTree[key].list.forEach((c, i) => {
            if (c.__rd && Object.keys(c.__rd).length > 0) {
              delete c.__rd.__rd
              this.pageTree[key].list[i] = c.__rd
              console.log(this.pageTree, 'tfd1')
            }
            resolve(this.pageTree)
          })
        })
      })
    },
    async exportVue () {
      if (this.projectSelcted.length < 2) {
        this.$cysMessage({
          type: 'warning',
          message: '请选从项目下拉选择页面'
        })
        return
      }
      this.vueDailogVisible = true
      const tfd = await this.tfd()
      const { code, message, data } = await getTemplate({
        path: this.projectSelcted[this.projectSelcted.length - 1],
        info: tfd
      })
      if (code === 0) {
        this.vuefile = data
      } else {
        this.$cysMessage({
          type: 'error',
          message: message
        })
      }
    },
    async package () {
      // 打包工程
      const { code, message } = await projectPackage({
        name: this.projectName
      })
      if (code === 0) {
        this.$cysMessage({
          type: 'success',
          message: '打包成功'
        })
      } else {
        this.$cysMessage({
          type: 'error',
          message: message
        })
      }
    },
    async getProjectList () {
      const { code, data } = await getProjectList()
      if (code === 0) {
        this.projectList = data
        this.projectSelcted = [data.filter(r => r.value === this.$route.query.project)[0].value]
        console.log(this.projectSelcted, 'this.projectSelcted==')
      }
    },
    changePageSelect (val) {
      console.log('valval==', val)
    },
    toPackage () {
      this.$router.push({
        path: '/terminal',
        query: { name: this.projectName }
      })
    }
  },
  created () {
    this.getProjectList()
  },
  mounted () {
    this.drageSort = new DrageSort({
      el: document.querySelector('.create-page'),
      suc: (el, coo, ty) => {
        this.interactive(el, coo, ty)
      }
    })
    this.setSFromData()
  }
}
</script>
<style lang="stylus" scoped>
 >>> .drag-copy
      position absolute
      left 0
      top 0
      z-index 110

.item
  display inline-block
  width 120px
  height 32px
  line-height 32px
  color #333
  border 1px solid #f6f7ff
  text-align center
  background #f6f7ff
  &:hover{
    cursor move
    border 1px dashed #787be8
  }
.create-page
  height 100%
  position relative
  background #fff
  color #333
  .header
    height 68px
    border-bottom 1px solid #dedede
    .u-b
      float right
      color #409EFF
      margin 22px 10px 0
      cursor pointer
    .project-name
      display flex
      position relative
      width 288px
      float right
      margin 20px 0 0 0
      .p-ifo
        position absolute
        z-index 100
        width 280px
        left -260px
        top 0
        padding 15px
        background rgba(0,0,0,0.8);
        .ifo
          p
           height 22px
           line-height 22px
           clear both
           color #fff
           span.l
            float left
            text-align left
            width auto
           span.r
            float right
            width auto
      span
        display inline-block
        width 68px
        vertical-align top
        line-height 30px
      .l
        display inline-block
  .main
    height calc(100% - 69px)
    display flex
    .left-column
      width 300px
      border-right 1px solid #dedede
      text-align left
      .bj
        cursor pointer
      .co
        padding 10px 0 20px
        border-bottom 1px solid #dedede
      .gj {
        padding 5px 0 0 15px
        font-size 16px
        color #333
        display inline-block
      }
      h5 {
        padding 5px 0 0 15px
        font-weight normal
        font-size 16px
        color #333
      }
      .item {
        margin 10px 14px 0
      }
    .right-column
       width 450px
       border-left 1px solid #dedede
       overflow-x hidden
       overflow-y auto
       .ct {
         height 40px
         line-height 40px
         display flex
         border-bottom 1px solid #dedede
         span {
           width 50%
           border-bottom 1px solid #dedede
           &.on {
             color #409EFF
             border-bottom 2px solid #409eff
           }
           &:hover {
             color #409EFF
           }
         }
       }
    .middle-column
      position relative
      padding-bottom 68px
      flex 1
      .c-bc {
        position absolute
        bottom 0
        left 0
        width 100%
        height 68px
        line-height 68px
        border-top 1px solid #dedede
        text-align left
        button {
          margin 0 0 0 10px
        }
      }
      .crb {
        background: #fff;
      }
      >>> .dru-xmd
        border 1px dashed #409EFF
        .fm
          height 48px
          line-height 48px
          text-align center
          border-bottom: 1px dashed #409EFF
        .bs
          height 48px
          line-height 48px
          text-align center
      .cop {
        text-align left
        padding 15px
        position relative
        .lk-f {
          position absolute
          right 0
          top 0
          color #fff
          background-color rgba(255, 193, 7, 0.7)
          padding 3px
        }
        &:hover {
          background #f6f7ff
        }
        &.on {
          background #f6f7ff
        }
        .cp-item {
          display inline-block
          margin-right 10px
          .cp-inline-item {
            display flex
            align-items center
            label {
              margin-right 10px
              text-align right
            }
            .cpr {
              flex 1
            }
          }
        }
      }
</style>
