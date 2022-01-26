<template>
  <div>
    <div class="page-seach-wrap cs_fozjxoah0">
      <cys-form-search
        :data="cs_fozjxoah0.list"
        :btns="cs_fozjxoah0.btns"
        :direction="cs_fozjxoah0.direction"
      ></cys-form-search>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cs_fozjxoah0: {
        list: [
          {
            type: "input",
            name: "Input组件",
            label: "单行文本",
            field: "fozjxoah",
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
    };
  },
};
</script>
<style lang="stylus" scoped>
>>>.cs_fozjxoah {
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
