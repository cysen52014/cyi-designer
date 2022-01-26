<template>
  <div>
    <div class="cp-attr-line">
      <div class="label">字段名</div>
      <div class="cr">
        <cys-input
          v-model="_parent.attr.field"
          @change="change"
          type="text"
          placeholder="请输入字段名"
        ></cys-input>
      </div>
    </div>
    <div class="cp-attr-line">
      <div class="label">标题</div>
      <div class="cr">
        <cys-input
          v-model="_parent.attr.label"
          @change="change"
          type="text"
          placeholder="请输入标题"
        ></cys-input>
      </div>
    </div>
    <div class="cp-attr-line">
      <div class="label">默认值</div>
      <div class="cr">
        <cys-input
          v-model="_parent.attr.value"
          @change="change"
          type="text"
          placeholder="请输入默认值"
        ></cys-input>
      </div>
    </div>
    <div class="cp-attr-line">
      <div class="label">占位提示</div>
      <div class="cr">
        <cys-input
          v-model="_parent.attr.placeholder"
          @change="change"
          type="text"
          placeholder="请输入占位提示"
        ></cys-input>
      </div>
    </div>
    <div class="cp-attr-line">
      <div class="label">可清除</div>
      <div class="cr">
          <cys-radio-group
            v-model="_parent.attr.clearable"
            @change="change"
          >
            <cys-radio :label="true">是</cys-radio>
            <cys-radio :label="false">否</cys-radio>
          </cys-radio-group>
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
