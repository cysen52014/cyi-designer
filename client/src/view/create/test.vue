<template>
    <div>
        <div class="page-seach-wrap cs_gihvlwoy">
            <cys-form-search :data="cs_gihvlwoy.list" :btns="cs_gihvlwoy.btns" :direction="cs_gihvlwoy.direction"></cys-form-search>
        </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      'cs_gihvlwoy': {
        'list': [{
          'type': 'input',
          'name': 'Input组件',
          'label': '单行文本',
          'field': 'gihvlwoy',
          'value': '',
          'placeholder': '',
          'clearable': true
        }, {
          'type': 'select',
          'name': 'Select组件',
          'label': '下拉选择',
          'field': 'amnwdkaa',
          'value': '',
          'placeholder': '',
          'options': [],
          'clearable': true
        }],
        'btns': [{
          'label': '查询',
          'action': 'search'
        }],
        'direction': 'horizontal'
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
>>>.cs_gihvlwoy {
    .cys-form-label {
        width: 80px;
    }

    .cys-input--inner {
        line-height: 30px;
    }

    .cys-input--inner {
        width: 210px;
    }

    .cys-input--inner {
        border: 1px solid #00;
    }

    .cys-form-label {
        width: 80px;
    }

    .cys-input--inner {
        line-height: 30px;
    }

    .cys-input--inner {
        width: 210px;
    }

    .cys-input--inner {
        border: 1px solid #00;
    }
}
</style>
