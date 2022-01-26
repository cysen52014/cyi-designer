<template>
  <div>
    <div class="page-seach-wrap cs_zwevjctz0">
      <cys-form-search
        :data="cs_zwevjctz0.list"
        :btns="cs_zwevjctz0.btns"
        :direction="cs_zwevjctz0.direction"
      ></cys-form-search>
    </div>
    <div class="page-row cs_oqesdpab0">
      <div class="cys-form-label">单行文本</div>
      <div class="cys-form-content">
        <cys-input
          :placeholder="cs_oqesdpab0.placeholder"
          v-model="cs_oqesdpab0.value"
          :clearable="cs_oqesdpab0.clearable"
        >
        </cys-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cs_zwevjctz0: {
        list: [
          {
            type: "input",
            name: "Input组件",
            label: "单行文本",
            field: "zwevjctz",
            value: "",
            placeholder: "",
            clearable: true,
          },
        ],
        btns: [
          {
            label: "查询",
            action: "search",
          },
        ],
        direction: "horizontal",
      },
      cs_oqesdpab0: {
        type: "input",
        name: "Input组件",
        label: "单行文本",
        field: "oqesdpab",
        value: "",
        placeholder: "",
        clearable: true,
      },
      cs_vwcuwmgk0: {
        type: "select",
        name: "Select组件",
        label: "下拉选择",
        field: "vwcuwmgk",
        value: "",
        placeholder: "",
        options: [],
        clearable: true,
      },
    };
  },
};
</script>
<style lang="stylus" scoped>
>>>.cs_zwevjctz0 {
    .cys-form-label {
        width: 80px;
    }

    .cys-input--inner {
        line-height: 30px;
        width: 210px;
        border-color: #ccc;
    }
}

>>>.cs_oqesdpab0 {
    .cys-form-label {
        width: 80px;
    }

    .cys-input--inner {
        line-height: 30px;
        width: 210px;
        border-color: #ccc;
    }
}

>>>.cs_vwcuwmgk0 {
    .cys-form-label {
        width: 80px;
    }

    .cys-input--inner {
        line-height: 30px;
        width: 210px;
        border-color: #ccc;
    }
}
</style>
