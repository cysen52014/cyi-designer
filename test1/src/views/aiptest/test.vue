<template>
    <div>
        <div class="page-seach-wrap cs_epakkksu0">
            <cys-form-search :data="cs_epakkksu0.list" :btns="cs_epakkksu0.btns" :direction="cs_epakkksu0.direction"></cys-form-search>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            "cs_epakkksu0": {
                "list": [{
                    "type": "input",
                    "name": "Input组件",
                    "label": "单行文本",
                    "field": "epakkksu",
                    "value": "",
                    "placeholder": "",
                    "clearable": true
                }, {
                    "type": "select",
                    "name": "Select组件",
                    "label": "下拉选择",
                    "field": "zuepsima",
                    "value": "",
                    "placeholder": "",
                    "options": [],
                    "clearable": true,
                    "tabIndex": 1,
                    "__rd": {
                        "type": "select",
                        "name": "Select组件",
                        "label": "下拉选择",
                        "field": "zuepsima",
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
                        "tabIndex": 1,
                        "optionType": 2,
                        "apiType": "get",
                        "apiUrl": "/first/index",
                        "optionLabel": "a",
                        "optionValue": "b"
                    }
                }],
                "btns": [{
                    "label": "查询",
                    "action": "search"
                }],
                "direction": "horizontal"
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
>>>.cs_epakkksu0 {
    .cys-form-search-item:nth-child(1) .cys-form-label {
        width: 80px;
    }

    .cys-form-search-item:nth-child(1) .cys-input--inner {
        height: 30px;
        line-height: 30px;
        width: 210px;
        border-color: #ccc;
    }

    .cys-form-search-item:nth-child(2) .cys-form-label {
        width: 80px;
    }

    .cys-form-search-item:nth-child(2) .cys-input--inner {
        height: 30px;
        line-height: 30px;
        width: 210px;
        border-color: #ccc;
    }
}
</style>