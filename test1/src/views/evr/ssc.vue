<template>
    <div>
        <div class="page-seach-wrap cs_eqfbluqa0">
            <cys-form-search :data="cs_eqfbluqa0.list" :btns="cs_eqfbluqa0.btns" :direction="cs_eqfbluqa0.direction"></cys-form-search>
        </div>
        <div class="page-row cs_uaibjfnd0">
            <div class="cys-form-label">级联</div>
            <div class="cys-form-content">
                <cys-cascader v-model="cs_uaibjfnd0.value" :options="cs_uaibjfnd0.options" :clearable="true" :filter="true" :props="{ checkStrictly: 1, label: a, value: b }" placeholder="请选择"></cys-cascader>
            </div>
        </div>
    </div>
</template>
<script>
import {
    CcRr
} from "@/api/evr/ssc.js";
export default {
    data() {
        return {
            "cs_eqfbluqa0": {
                "list": [{
                    "type": "cascader",
                    "name": "Cascader组件",
                    "label": "级联",
                    "field": "eqfbluqa",
                    "value": "",
                    "options": [],
                    "placeholder": "",
                    "clearable": true,
                    "apiType": "get",
                    "checkStrictly": 1,
                    "filter": false,
                    "apiUrl": "/cc/ii",
                    "optionLabel": "c",
                    "optionValue": "d"
                }],
                "btns": [{
                    "label": "查询",
                    "action": "search"
                }],
                "direction": "horizontal"
            },
            "cs_uaibjfnd0": {
                "type": "cascader",
                "name": "Cascader组件",
                "label": "级联",
                "field": "uaibjfnd",
                "value": "",
                "options": [],
                "placeholder": "",
                "clearable": true,
                "apiType": "get",
                "checkStrictly": 1,
                "filter": false,
                "apiUrl": "/cc/rr",
                "optionLabel": "a",
                "optionValue": "b"
            }
        }
    },
    methods: {
        async CcRr() {
            const {
                code,
                data
            } = await CcRr();
            if (errorCode === 0) {
                this.cs_uaibjfnd0.options = data;
            }
        },
    },
    created() {
        this.CcRr();
    }
}
</script>
<style lang="stylus" scoped>
>>>.cs_eqfbluqa0 {
    .cys-form-search-item:nth-child(1) .cys-form-label {
        width: 80px;
    }

    .cys-form-search-item:nth-child(1) .cys-input--inner {
        height: 30px;
        line-height: 30px;
        width: 195px;
        border-color: #ccc;
    }
}

>>>.cs_uaibjfnd0 {
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