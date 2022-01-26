<template>
    <div>
        <cys-modal title="cs_dnkluaxw0.label" v-model="cs_dnkluaxw0.visible">
            <cys-form ref="modal-form" v-model="cs_dnkluaxw0.options" :label-width="'80px'">
                <cys-form-item :label="输入框" :label-width="'80px'" :prop="'cs_dnkluaxw0.options.0.value'" :rules="[{ required: true, message: '输入框不能为空', trigger: 'blur, change' }]">
                    <cys-select v-model="cs_dnkluaxw0.options[0].value" :clearable="true" :placeholder="'请输入输入框'"></cys-select>
                </cys-form-item>
                <cys-form-item :label="输入框" :label-width="'80px'" :prop="'cs_dnkluaxw0.options.1.value'" :rules="[{ required: true, validator: this['verifyPhone'], trigger: 'blur, change' }]">
                    <cys-input :clearable="true" v-model="cs_dnkluaxw0.options[1].value" :placeholder="'请输入输入框'"></cys-input>
                </cys-form-item>
                <cys-form-item :label="输入框" :label-width="'80px'" :prop="'cs_dnkluaxw0.options.2.value'" :rules="[{ required: true, message: '输入框不能为空', trigger: 'blur, change' }]">
                    <cys-checkbox-group v-model="cs_dnkluaxw0.options[2].value">
                        <cys-checkbox :key="ii2" v-for="(item2, ii2) in item.options" :label="item2.value"></cys-checkbox>
                    </cys-checkbox-group>
                </cys-form-item>
            </cys-form>
            <span slot="footer">
                <cys-button plain>取消</cys-button>
                <cys-button @click="dnkluaxw0ModalSubmit">确定</cys-button>
            </span>
        </cys-modal>
        <div class="page-seach-wrap cs_qbrmeiym0">
            <cys-form-search :data="cs_qbrmeiym0.list" :btns="cs_qbrmeiym0.btns" :direction="cs_qbrmeiym0.direction" :pointer="cs_qbrmeiym0.pointer"></cys-form-search>
        </div>
        <div class="page-table-wrap cs_bsxheebo0">
            <cys-table ref="cs_bsxheebo0" :options="cs_bsxheebo0.options" :striped="true" :border="true">
                <span slot-scope="scope">
                    {{ scope.row['item.slotName'] }}
                </span>
                <span :slot="dr" slot-scope="scope">
                    {{ scope.row['item.slotName'] |  cer  }}
                </span>
                <span slot-scope="scope">
                    {{ scope.row['item.slotName'] }}
                </span>

            </cys-table>
        </div>
    </div>
</template>
<script>
import {
    AopEwi,
    EscEe
} from "@/api/eftest/index.js";
export default {
    data() {
        return {
            "cs_dnkluaxw0": {
                "type": "modal",
                "name": "Modal组件",
                "label": "弹窗",
                "usein": 3,
                "field": "dnkluaxw",
                "value": "",
                "apiType": "get",
                "options": [{
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
                    "apiUrl": "/aop/ewi",
                    "optionLabel": "lab",
                    "optionValue": "val"
                }, {
                    "type": "input",
                    "label": "输入框",
                    "field": "",
                    "value": "",
                    "verify": true,
                    "verifyText": "手机号验证",
                    "verifyFunc": "verifyPhone",
                    "options": [],
                    "optionType": ""
                }, {
                    "type": "checkbox",
                    "label": "输入框",
                    "field": "",
                    "value": [],
                    "verify": true,
                    "verifyText": "验证",
                    "verifyFunc": "",
                    "options": [{
                        "label": "e",
                        "value": "f"
                    }, {
                        "label": "a",
                        "value": "b"
                    }, {
                        "label": "c",
                        "value": "d"
                    }],
                    "optionType": 1
                }],
                "visible": false,
                "btns": {
                    "reset": {
                        "label": "取消",
                        "visible": true,
                        "fn": "dnkluaxw0ModalReset"
                    },
                    "confirm": {
                        "label": "确定",
                        "apiType": "get",
                        "apiUrl": "/esc/ee",
                        "visible": true,
                        "fn": "dnkluaxw0ModalSubmit"
                    }
                }
            },
            "cs_qbrmeiym0": {
                "list": [{
                    "type": "select",
                    "name": "Select组件",
                    "label": "下拉选择",
                    "usein": 1,
                    "field": "qbrmeiym",
                    "value": "d",
                    "placeholder": "",
                    "options": [{
                        "index": 0,
                        "label": "a",
                        "value": "b"
                    }, {
                        "index": 1,
                        "label": "c",
                        "value": "d"
                    }],
                    "apiType": "get",
                    "optionType": 1,
                    "filter": false,
                    "clearable": true
                }, {
                    "type": "input",
                    "name": "Input组件",
                    "label": "单行文本",
                    "usein": 1,
                    "field": "ywdzdaer",
                    "value": "",
                    "placeholder": "",
                    "clearable": true
                }],
                "btns": [{
                    "label": "查询",
                    "action": "search"
                }],
                "direction": "horizontal",
                "pointer": ""
            },
            "cs_bsxheebo0": {
                "type": "table",
                "name": "Table组件",
                "field": "bsxheebo",
                "usein": 3,
                "apiType": "get",
                "options": {
                    "isLoading": false,
                    "isPagination": false,
                    "thead": {
                        "column": [{
                            "label": "列一",
                            "prop": "aa",
                            "FUT": "",
                            "FUM": "",
                            "slotName": "",
                            "sort": false,
                            "shadowLeft": false,
                            "shadowRight": false,
                            "width": ""
                        }, {
                            "label": "列二",
                            "prop": "bb",
                            "FUT": 1,
                            "FUM": "cer",
                            "slotName": "dr",
                            "sort": false,
                            "shadowLeft": false,
                            "shadowRight": false
                        }, {
                            "label": "列三",
                            "prop": "dd",
                            "FUT": "",
                            "FUM": "",
                            "slotName": "",
                            "sort": false,
                            "shadowLeft": false,
                            "shadowRight": false
                        }],
                        "show": true
                    },
                    "method": {
                        "cVal": "0",
                        "cKey": "errorCode",
                        "dKey": "data",
                        "tKey": "total",
                        "lKey": "list",
                        "pageNumKey": "pageNum",
                        "pageSizeKey": "pageSize"
                    },
                    "tbody": {
                        "total": 0,
                        "data": []
                    }
                }
            }
        }
    },
    methods: {
        async AopEwi() {
            const {
                errorCode,
                data,
                message
            } = await AopEwi();
            if (errorCode === 0) {
                this.cs_dnkluaxw0.visibel = false;
            } else {
                this.$cysMessage({
                    type: "error",
                    message: message
                });
            }
        },
        verifyPhone(rule, value, callback) {
            // 手机号码验证
            if (!/^1[3456789]d{9}$/.test(value)) {
                callback(new Error('请输入正确的手机号码！'));
            } else {
                callback();
            }
        },
        dnkluaxw0ModalReset = () => {
            this.dnkluaxw0.visible = false;
        },
        async EscEe() {
            const {
                errorCode,
                data,
                message
            } = await EscEe();
            if (errorCode === 0) {
                this.cs_dnkluaxw0.visibel = false;
            } else {
                this.$cysMessage({
                    type: "error",
                    message: message
                });
            }
        },
        dnkluaxw0ModalSubmit = async valid => {
            if (valid) {
                const {
                    errorCode,
                    data,
                    message
                } = await this.EscEe({
                    "": []
                });
                if (errorCode === 0) {
                    this.cs_dnkluaxw0.visible = false;
                } else {
                    this.$cysMessage({
                        type: "error",
                        message: message
                    });
                }
            }
        },
    },
    created() {
        this.AopEwi();
    }
}
</script>
<style lang="stylus" scoped>
>>>.cs_dnkluaxw0 {}

>>>.cs_qbrmeiym0 {
    .cys-form-search-item:nth-child(1) .cys-form-label {
        width: 80px;
    }

    .cys-form-search-item:nth-child(1) .cys-input--inner {
        height: 30px;
        line-height: 30px;
        width: 195px;
        border-color: #ccc;
    }

    .cys-form-search-item:nth-child(2) .cys-form-label {
        width: 80px;
    }

    .cys-form-search-item:nth-child(2) .cys-input--inner {
        height: 30px;
        line-height: 30px;
        width: 195px;
        border-color: #ccc;
    }
}

>>>.cs_bsxheebo0 {
    .cp-item:nth-child:nth-child(1) .cys-form-label {
        width: 80px;
    }

    .cp-item:nth-child:nth-child(1) .cys-input--inner {
        height: 30px;
        line-height: 30px;
        width: 195px;
        border-color: #ccc;
    }
}
</style>