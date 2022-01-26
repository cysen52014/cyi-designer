<template>
    <div>
        <div class="page-row cs_stolldda0">
            <div class="cys-form-label">单行文本</div>
            <div class="cys-form-content">
                <cys-input :placeholder="cs_stolldda0.placeholder" v-model="cs_stolldda0.value" :clearable="cs_stolldda0.clearable">
                </cys-input>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            "cs_stolldda0": {
                "type": "input",
                "name": "Input组件",
                "label": "单行文本",
                "field": "stolldda",
                "value": "",
                "placeholder": "",
                "clearable": true
            },
            "cs_hnpqlmnc0": {
                "type": "select",
                "name": "Select组件",
                "label": "下拉选择",
                "field": "hnpqlmnc",
                "value": "",
                "placeholder": "",
                "options": [],
                "clearable": true,
                "__rd": {
                    "type": "select",
                    "name": "Select组件",
                    "label": "下拉选择",
                    "field": "hnpqlmnc",
                    "value": "",
                    "placeholder": "",
                    "options": [],
                    "clearable": true,
                    "css": {
                        "labelWidth": {
                            "key": ".cys-form-label",
                            "c": {
                                "k": "width",
                                "u": "px",
                                "v": "80"
                            }
                        },
                        "height": {
                            "key": ".cys-input--inner",
                            "c": {
                                "k": "height",
                                "u": "px",
                                "v": "30"
                            }
                        },
                        "lineHeight": {
                            "key": ".cys-input--inner",
                            "c": {
                                "k": "line-height",
                                "u": "px",
                                "v": "30"
                            }
                        },
                        "inputWidth": {
                            "key": ".cys-input--inner",
                            "c": {
                                "k": "width",
                                "u": "px",
                                "v": "210"
                            }
                        },
                        "inputBorderColor": {
                            "key": ".cys-input--inner",
                            "c": {
                                "k": "border-color",
                                "u": "",
                                "v": " #ccc"
                            }
                        }
                    },
                    "optionType": 2,
                    "apiType": "get",
                    "apiUrl": "/test/fist",
                    "optionLabel": "a",
                    "optionValue": "b"
                }
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
>>>.cs_stolldda0 {
    .cp-item:nth-child:nth-child(1) .cys-form-label {
        width: 80px;
    }

    .cp-item:nth-child:nth-child(1) .cys-input--inner {
        height: 30px;
        line-height: 30px;
        width: 210px;
        border-color: #ccc;
    }
}

>>>.cs_hnpqlmnc0 {
    .cp-item:nth-child:nth-child(1) .cys-form-label {
        width: 80px;
    }

    .cp-item:nth-child:nth-child(1) .cys-input--inner {
        height: 30px;
        line-height: 30px;
        width: 210px;
        border-color: #ccc;
    }
}
</style>