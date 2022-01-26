<template>
    <div>
        <cys-modal title="cs_rskpyzol0.label" v-model="cs_rskpyzol0.visible">
            <cys-form ref="modal-form" v-model="cs_rskpyzol0.options" :label-width="'80px'">

            </cys-form>
            <span slot="footer">
                <cys-button v-for="(item, key) in cs_rskpyzol0.btns" :key="key" :plain="key === 'reset' ? true: false"></cys-button>
            </span>
        </cys-modal>
    </div>
</template>
<script>
export default {
    data() {
        return {
            "cs_rskpyzol0": {
                "type": "modal",
                "name": "Modal组件",
                "label": "弹窗",
                "usein": 3,
                "field": "rskpyzol",
                "value": "",
                "apiType": "get",
                "options": [{
                    "type": "input",
                    "label": "输入框",
                    "field": "",
                    "value": "",
                    "verify": true,
                    "verifyText": "验证",
                    "verifyFunc": "",
                    "options": [],
                    "optionType": ""
                }, {
                    "type": "select",
                    "label": "输入框",
                    "field": "",
                    "value": "",
                    "verify": true,
                    "verifyText": "验证",
                    "verifyFunc": "",
                    "options": [],
                    "optionType": 2,
                    "apiType": "get",
                    "apiUrl": "/aa/ui",
                    "optionLabel": "a",
                    "optionValue": "b"
                }],
                "visible": false,
                "btns": {
                    "reset": {
                        "label": "取消",
                        "visible": true
                    },
                    "confirm": {
                        "label": "确定",
                        "apiType": "get",
                        "apiUrl": "",
                        "visible": true
                    }
                }
            }
        }
    },
    methods: {},
    created() {}
}
</script>
<style lang="stylus" scoped>
>>>.cs_rskpyzol0 {}
</style>