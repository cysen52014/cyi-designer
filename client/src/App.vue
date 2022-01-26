<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus">
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
  width: 100%;
  background: #f1f3f6
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.page-seach-wrap {
  background: #fff;
  padding: 15px 15px 5px
  border-radius: 15px;
  margin: 20px 0
}

.cys-form-search {
  text-align: left;
  .cys-form-label {
    width: 80px
    text-align: right;
    margin-right: 10px;
  }
  .cys-form-search-item {
    padding: 0;
    border: 1px dashed transparent;
  }
  .cys-form-search-item.on {
    border: 1px dashed #409eff
  }
}
.page-row {
  display: flex;
  text-align: left;
  padding 15px 15px
  .cys-form-label {
    width: 80px
    text-align: right;
    margin-right: 10px;
  }
  .cys-form-content {
    flex: 1
  }
}
</style>
