<template>
  <div class="cp-attr">
    <Base />
  </div>
</template>
<script>
import Base from './base'
export default {
  components: {
    Base
  },
  inject: ['_parent', '_this'],
  provide () {
    return { _parent: this._parent, _this: this }
  },
  props: {
    css: {
      type: Object
    }
  },
  data () {
    return {}
  }
}
</script>
