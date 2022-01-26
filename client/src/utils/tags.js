// usein 1:可为搜索表单组件，基础组件，组件组合，2:基础组件，组件组合, 3: 基础组件
const tagsInfo = {
  base: [
    {
      type: 'input',
      name: 'Input组件',
      label: '单行文本',
      usein: 1,
      field: '',
      value: '',
      placeholder: '',
      clearable: true,
      css: {}
    },
    {
      type: 'select',
      name: 'Select组件',
      label: '下拉选择',
      usein: 1,
      field: '',
      value: '',
      placeholder: '',
      options: [],
      apiType: 'get',
      optionType: 1,
      filter: false,
      clearable: true,
      css: {}
    },
    {
      type: 'date',
      name: 'Date组件',
      label: '日期组件',
      usein: 1,
      field: '',
      value: '',
      placeholder: '',
      clearable: true,
      css: {}
    },
    {
      type: 'cascader',
      name: 'Cascader组件',
      label: '级联',
      usein: 1,
      field: '',
      value: '',
      options: [],
      placeholder: '',
      clearable: true,
      apiType: 'get',
      checkStrictly: true,
      filter: false,
      css: {}
    },
    {
      type: 'table',
      name: 'Table组件',
      field: '',
      usein: 3,
      css: {},
      apiType: 'get',
      parmas: {},
      options: {
        isLoading: true,
        isPagination: false,
        thead: {
          column: []
        },
        method: {
          interface: () => {
            return {
              errorCode: '0',
              data: []
            }
          },
          parmas: {},
          cVal: '0', // 接口返回参数值 默认0
          cKey: 'errorCode', // 接口返回参数key 默认errorCode
          failed: () => {}, // 接口失败回调
          success: () => {} // 接口成功回调
        }
      }
    },
    {
      type: 'modal',
      name: 'Modal组件',
      label: '弹窗',
      usein: 3,
      field: '',
      value: '',
      apiType: 'get',
      options: [],
      visible: false,
      btns: {
        reset: {
          label: '取消',
          visible: true
        },
        confirm: {
          label: '确定',
          apiType: 'get',
          apiUrl: '',
          visible: true
        }
      },
      css: {}
    }
  ]
}
export default tagsInfo
