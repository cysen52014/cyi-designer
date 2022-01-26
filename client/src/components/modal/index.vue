<template>
  <div class="modal-view">
    <div
      class="modal-inline-item"
      v-for="(item, ii) in optipns.options"
      :key="ii"
    >
      <label class="label">{{ item.label }}</label>
      <div class="cpr">
        <cys-radio-group v-if="item.type === 'radio'" v-model="item.value">
          <cys-radio :key="ii2" v-for="(item2, ii2) in item.options" :label="item2.value">{{ item2.label }}</cys-radio>
        </cys-radio-group>
        <cys-checkbox-group v-if="item.type === 'checkbox'" v-model="item.value">
          <cys-checkbox :key="ii2" v-for="(item2, ii2) in item.options" :label="item2.value">{{ item2.label }}</cys-checkbox>
        </cys-checkbox-group>
        <cys-select v-if="item.type === 'select'" v-model="item.value">
          <cys-option
            v-for="(item, ii3) in item.options"
            :key="ii3"
            :label="item.label"
            :value="item.value">
          </cys-option>
        </cys-select>
        <component
          v-if="item.type && item.type !== 'checkbox' && item.type !== 'radio' && item.type !== 'select'"
          :label="item.label"
          v-model="item.value"
          :type="item.type"
          :options="item.options"
          :is="currentView(item)"
        />
      </div>
    </div>
    <div class="btns">
       <cys-button v-for="(item, key) in optipns.btns"
      :key="key" :plain="key === 'reset' ? true: false">{{ item.label }}</cys-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    optipns: {
      type: Object
    }
  },
  methods: {
    currentView (conf) {
      // 组件选择
      let s, e
      if (
        conf.type.indexOf('date') > -1 ||
        conf.type.indexOf('month') > -1 ||
        conf.type.indexOf('year') > -1 ||
        conf.type.indexOf('time') > -1
      ) {
        s = 'Date'
        e = 'Picker'
      } else {
        s = conf.type.substr(0, 1).toUpperCase()
        e = conf.type.substr(1, conf.type.length)
      }
      const type = 'Cys' + s + e
      return type
    }
  }
}
</script>
<style lang="scss" scoped>
>>> .cys-cascader {
  display: block;
}

.modal-view {
  border: 1px solid #ddd;
  padding: 20px;
}
.btns {
  padding:10px 3px 0 0;
  text-align: right;
  button:nth-child(1) {
    margin-right: 10px;
  }
}
.modal-inline-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
  .label {
    width: 88px;
    text-align: right;
    margin-right: 10px;
  }
  .cpr {
    flex: 1;
  }
}
</style>
