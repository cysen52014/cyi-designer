<template>
  <div>
    <div class="cp-cattr-line">
      <div class="label">标题宽度</div>
      <div class="cr">
        <cys-input
          v-model="_this.css.labelWidth.c.v"
          type="text"
          placeholder="请输入标题宽度"
        ></cys-input>
      </div>
    </div>
    <div class="cp-cattr-line">
      <div class="label">高度</div>
      <div class="cr">
        <cys-input
          v-model="_this.css.height.c.v"
          type="text"
          placeholder="请输入高度"
        ></cys-input>
      </div>
    </div>
    <div class="cp-cattr-line">
      <div class="label">行高</div>
      <div class="cr">
        <cys-input
          v-model="_this.css.lineHeight.c.v"
          type="text"
          placeholder="请输入行高"
        ></cys-input>
      </div>
    </div>
    <div class="cp-cattr-line">
      <div class="label">文本宽度</div>
      <div class="cr">
        <cys-input
          v-model="_this.css.inputWidth.c.v"
          type="text"
          placeholder="请输入文本颜色"
        ></cys-input>
      </div>
    </div>
    <div class="cp-cattr-line">
      <div class="label">文本颜色</div>
      <div class="cr">
        <cys-input
          v-model="_this.css.inputBorderColor.c.v"
          type="text"
          placeholder="请输入文本颜色"
        ></cys-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ['_parent', '_this'],
  methods: {
    change (val) {
      this._this.change(val)
    }
  }
}
</script>
