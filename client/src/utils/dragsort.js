export default class DragSort {
  constructor (opt) {
    this.oEl = opt.el ? opt.el : ''
    this.dEl = this.oEl.getElementsByClassName('move')
    this.cEl = this.oEl.getElementsByClassName('middle-column')[0]
    this.sX = 0
    this.sY = 0
    this.cX = 0
    this.cY = 0
    this.dX = 0
    this.dY = 0
    this.pos = []
    this.verifyPos = [] // 校验位置
    this.slotPos = [] // 插槽位置
    this.sfPos = {} // 组件元素位置
    this.incp = false // 已经存在class cop div
    this.cpd = null
    this.suc = opt.suc ? opt.suc : null
    this.getCoordinate()
    this.bindEvent()
  }
  getCoordinate () {
    // 拖拽元素x，y值
    this.pos = []
    this.slotPos = []
    this.verifyPos = []
    for (let index = 0; index < this.dEl.length; index++) {
      const el = this.dEl[index]
      if (el.getAttribute('mid')) {
        this.slotPos.push({
          index: index,
          e: el,
          t: el.offsetTop,
          l: el.offsetLeft,
          r: el.offsetLeft + el.clientWidth,
          b: el.offsetTop + el.clientHeight,
          f: el.getAttribute('fixate')
        })
      } else if (el.getAttribute('vid')) {
        this.verifyPos.push({
          index: index,
          e: el,
          t: el.offsetTop,
          l: el.offsetLeft,
          r: el.offsetLeft + el.clientWidth,
          b: el.offsetTop + el.clientHeight,
          f: el.getAttribute('fixate')
        })
      } else {
        this.pos.push({
          index: index,
          e: el,
          t: el.offsetTop,
          l: el.offsetLeft,
          r: el.offsetLeft + el.clientWidth,
          b: el.offsetTop + el.clientHeight,
          f: el.getAttribute('fixate')
        })
      }
    }
  }
  getDragTarget (el) {
    let p = el
    let a = false
    let root = false
    while (!p.getAttribute('dragsort')) {
      p = p.parentNode
      if (p === document.body) {
        root = true
        break
      }
    }
    a = !root && p.getAttribute('dragsort') ? p : false
    return a
  }
  bindEvent () {
    document.onmousedown = e => {
      const target = this.getDragTarget(e.target)
      if (!target) return
      this.getCoordinate()
      const fn = () => {
        this.target = target
        this.dragStart(e)
        document.onmousemove = e => {
          this.dragMove(e)
        }
        document.onmouseup = e => {
          this.dragEnd(e)
        }
      }
      if (
        target.getAttribute('dragsort') === 'V' &&
        target.getAttribute('fixate') !== '1'
      ) {
        fn()
      } else if (
        target.getAttribute('dragsort') === 'H' &&
        target.getAttribute('fixate') !== '1'
      ) {
        fn()
      } else if (
        target.getAttribute('dragsort') === 'S' &&
        target.getAttribute('fixate') !== '1'
      ) {
        fn()
      } else if (
        target.getAttribute('dragsort') === 'X' &&
        target.getAttribute('fixate') !== '1'
      ) {
        fn()
      }
    }
  }
  createMoveDom () {
    const l = this.getOffset(this.target).l
    const t = this.getOffset(this.target).t
    if (!this.cpd) {
      this.cpd = document.createElement('div')
      this.cpd.className = 'drag-copy'
      this.cpd.appendChild(this.target.cloneNode(true))
      this.cpd.style.cssText =
        'position: absolute; top: 0; left: 0; z-index: 110; transform: translate3d(' +
        l +
        'px, ' +
        t +
        'px, 0); height: ' +
        this.target.clientHeight +
        'px; width: ' +
        this.target.clientWidth +
        'px'
      document.body.appendChild(this.cpd)
    } else {
      this.cpd.innerHTML = ''
      this.cpd.appendChild(this.target.cloneNode(true))
      this.cpd.style.cssText =
        'position: absolute; top: 0; left: 0; z-index: 110; transform: translate3d(' +
        l +
        'px, ' +
        t +
        'px, 0); height: ' +
        this.target.clientHeight +
        'px; width: ' +
        this.target.clientWidth +
        'px'
    }
  }
  dragStart (e) {
    this.cX = e.clientX
    this.cY = e.clientY
    this.dX = 0
    this.dY = 0
    this.createMoveDom()
    if (e && e.preventDefault) {
      e.preventDefault()
    } else {
      window.event.returnValue = false
    }
  }
  getOffset (el) {
    // 获取某元素以浏览器左上角为原点的坐标
    let t = 0 // 获取该元素对应父容器的上边距
    let l = 0 // 对应父容器的上边距
    // 判断是否有父容器，如果存在则累加其边距
    while (el && el.tagName !== 'BODY') {
      t += el.offsetTop
      l += el.offsetLeft
      el = el.offsetParent
    }
    return {
      l: l,
      t: t
    }
  }
  dragMove (e) {
    this.dX = e.clientX - this.cX + this.getOffset(this.target).l
    this.dY = e.clientY - this.cY + this.getOffset(this.target).t
    this.cpd.style.cssText =
      'position: absolute; top: 0; left: 0; z-index: 110; transform: translate3d(' +
      this.dX +
      'px, ' +
      this.dY +
      'px, 0); height: ' +
      this.target.clientHeight +
      'px; width: ' +
      this.target.clientWidth +
      'px'
    this.createXmd()
  }
  dragEnd () {
    document.onmouseup = null
    document.onmousemove = null
    document.body.removeChild(this.cpd)
    this.cpd = null
    this.increase()
  }
  getBindRect (el) {
    if (!el) return false
    return {
      l: el.offsetLeft - el.clientWidth / 2,
      r: el.offsetLeft + el.clientWidth,
      t: el.offsetTop,
      b: el.offsetTop + el.clientHeight
    }
  }
  setPos (pos) {
    this.sfPos = pos
  }
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
  }
  inPosByName (x, y, name) {
    // 判断那个插槽区域
    let a = null
    for (const key in name) {
      const rect = name[key]
      if (x >= rect.l && x <= rect.r && y >= rect.t && y <= rect.b) {
        a = rect
        break
      }
    }
    return a
  }
  createXmd () {
    const ds = this.target.getAttribute('dragsort')
    const lk = this.target.getAttribute('lk')
    if (ds === 'H') {
      const etarget = this.pos.filter(r => r.f === '1')[0]
      if (this.dX > etarget.l && this.dY > etarget.t) {
        this.incp = this.inCooPos(this.dX, this.dY)
        if (lk) return
        if (!this.incp) {
          const dxm = this.oEl.querySelector('.dru-xmd')
          if (!dxm) {
            const usein = this.target.getAttribute('usein') * 1
            const d = document.createElement('div')
            d.className = 'dru-xmd'
            d.innerHTML =
              usein === 1
                ? '<div class="fm">搜索表单</div><div class="bs">基础组件</div>'
                : '<div class="bs">基础组件</div>'
            this.cEl.appendChild(d)
          }
        } else {
          this.rmXmd()
        }
      }
    }
  }
  rmXmd () {
    const dxm = this.oEl.querySelector('.dru-xmd')
    if (dxm) {
      this.cEl.removeChild(dxm)
    }
  }
  inXmd () {
    const dxm = this.oEl.querySelector('.dru-xmd')
    if (dxm) {
      const usein = this.target.getAttribute('usein') * 1
      if (usein !== 3) {
        const a = this.getBindRect(dxm.children[0])
        const b = this.getBindRect(dxm.children[1])
        if (this.dX > a.l && this.dX < a.r && this.dY > a.t && this.dY < a.b) {
          return 1
        } else if (
          this.dX > b.l &&
          this.dX < b.r &&
          this.dY > b.t &&
          this.dY < b.b
        ) {
          return 2
        }
      } else {
        const b = this.getBindRect(dxm.children[0])
        if (this.dX > b.l && this.dX < b.r && this.dY > b.t && this.dY < b.b) {
          return 2
        }
      }
    }
  }
  increase () {
    const ds = this.target.getAttribute('dragsort')
    if (ds === 'H') {
      const etarget = this.pos.filter(r => r.f === '1')[0]
      if (
        this.dX > etarget.l - this.target.clientWidth / 2 &&
        this.dY > etarget.t
      ) {
        const ty = this.inXmd()
        if (this.suc) {
          if (ty === 1) {
            this.suc(this.target, this.incp, ty)
          } else if (ty === 2) {
            this.suc(this.target, this.incp, ty)
          } else {
            if (this.incp && this.incp.u !== 3) {
              this.suc(this.target, this.incp, this.incp.c)
            }
          }
          this.rmXmd()
        }
      }
    } else if (ds === 'S') { // 在插槽区域
      const etarget = this.inPosByName(this.dX, this.dY, this.slotPos)
      if (etarget) {
        if (
          this.dX > etarget.l - this.target.clientWidth / 2 &&
        this.dY > etarget.t
        ) {
          const ks = etarget.e.getAttribute('mid').split('_')
          this.suc(this.target, false, ks)
        }
      }
    } else if (ds === 'X') { // 在验证区域
      const etarget = this.inPosByName(this.dX, this.dY, this.verifyPos)
      if (etarget) {
        if (
          this.dX > etarget.l - this.target.clientWidth / 2 &&
        this.dY > etarget.t
        ) {
          const ks = etarget.e.getAttribute('vid').split('_')
          this.suc(this.target, false, ks)
        }
      }
    }
  }
}
