<template>
  <div class="verify-box">
    <div class="verify-m">
      <!-- <div class="ad-verify" @click="adVerify">
        <i class="cysicon icon-anonymous"></i>新增
      </div>
      <div class="save" @click="createVerify">保存</div> -->
      <i
        class="cysicon icon-guanbi close"
        @click="_parent.verifyVisble = false"
      ></i>
      <div class="si">
        <span class="cyii" dragsort="X" :fn="String(verifyPhone)">手机号验证</span>
        <span class="cyii" dragsort="X" :fn="String(verifyEmail)">邮箱验证</span>
        <span class="cyii" dragsort="X" :fn="String(verifyUrl)">url验证</span>
        <span class="cyii" dragsort="X" :fn="String(verifyIdCard)">身份证验证</span>
      </div>
    </div>
  </div>
</template>
<script>
import {
  verifyPhone,
  verifyEmail,
  verifyUrl,
  verifyIdCard
} from '@/utils/verify'
export default {
  inject: ['_parent'],
  data () {
    return {
      verifyPhone,
      verifyEmail,
      verifyUrl,
      verifyIdCard
    }
  },
  methods: {
    adVerify () {},
    createVerify () {}
  }
}
</script>
<style lang="scss" scoped>
.cyii {
    background-color: #ecf5ff;
    display: inline-block;
    height: 26px;
    padding: 0 10px;
    line-height: 24px;
    font-size: 12px;
    color: #409eff;
    border: 1px solid #d9ecff;
    border-radius: 4px;
    box-sizing: border-box;
    white-space: nowrap;
}
.verify-box {
  position: absolute;
  padding: 60px 20px 20px 20px;
  top: 60px;
  left: 300px;
  z-index: 100;
  box-shadow: 3px 2px 8px 3px rgb(0 0 0 / 10%);
  background: #fff;
  width: 760px;
  height: 800px;
  .save {
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    left: 120px;
    top: 15px;
    background: #409eff;
    color: #fff;
    padding: 5px 20px;
    font-size: 14px;
  }
  .ad-verify {
    font-size: 20px;
    cursor: pointer;
    position: absolute;
    left: 20px;
    top: 15px;
    background: #409eff;
    color: #fff;
    padding: 5px 20px;
    font-size: 14px;
  }
  .close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
}
</style>
