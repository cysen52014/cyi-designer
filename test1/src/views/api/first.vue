<template>
    <div>
        <div class="page-row cs_buyvicvl0">
            <div class="cys-form-label">单行文本</div>
            <div class="cys-form-content">
                <cys-input :placeholder="cs_buyvicvl0.placeholder" v-model="cs_buyvicvl0.value" :clearable="cs_buyvicvl0.clearable">
                </cys-input>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            "cs_buyvicvl0": {
                "type": "input",
                "name": "Input组件",
                "label": "单行文本",
                "field": "buyvicvl",
                "value": "",
                "placeholder": "",
                "clearable": true
            },
            "cs_tfnaohwe0": {
                "type": "select",
                "name": "Select组件",
                "label": "下拉选择",
                "field": "tfnaohwe",
                "value": "",
                "placeholder": "",
                "options": [],
                "clearable": true,
                "optionType": 2,
                "apiUrl": "/apitest/one",
                "optionLabel": "a",
                "optionValue": "b",
                "apiType": "get"
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
>>>.cs_buyvicvl0 {
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

>>>.cs_tfnaohwe0 {
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