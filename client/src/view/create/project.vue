<template>
  <div class="create-project">
    <h3>创建项目</h3>
    <cys-form
      class="project-form"
      ref="form"
      v-model="formData"
      :label-width="'90px'"
      :rules="rules"
    >
      <cys-form-item :label="'项目名称：'" prop="name" :label-width="'80px'">
        <cys-input
          v-model="formData.name"
          placeholder="请输入项目名称"
        ></cys-input>
      </cys-form-item>
      <cys-form-item :label="'域名：'" prop="name" :label-width="'80px'">
        <cys-input
          v-model="formData.hostname"
          placeholder="请输入域名"
        ></cys-input>
      </cys-form-item>
      <cys-form-item :label="'端口号：'" :label-width="'80px'">
        <cys-input
          v-model="formData.port"
          placeholder="请输入端口号"
        ></cys-input>
      </cys-form-item>
      <cys-form-item :label="'接口地址：'" prop="apiurl" :label-width="'80px'">
        <cys-textarea
          v-model="formData.apiurl"
          placeholder="如http://www.aa.com(多个地址用;隔开依次为开发，预生产，测试环境！)"
        ></cys-textarea>
      </cys-form-item>
    </cys-form>
    <cys-button class="btn" @click="create">确认</cys-button>
  </div>
</template>
<script>
import { createProject } from '@/api/create'
export default {
  data () {
    return {
      formData: { name: '', hostname: '' },
      rules: {
        name: [
          { required: true, validator: this.checkProjectName, trigger: 'blur' }
        ],
        hostname: [{ required: true, message: '请输入域名', trigger: 'blur' }],
        port: [{ required: true, message: '请输入端口号', trigger: 'blur' }],
        apiurl: [{ required: true, message: '请输入端口号', trigger: 'blur' }]
      }
    }
  },
  methods: {
    checkProjectName (rule, value, callback) {
      if (!value) {
        callback(new Error('请输入项目名称'))
      } else {
        if (value.match(/[a-zA-Z]+/gi)) {
          callback()
        } else {
          callback(new Error('项目名称必须为英文字母'))
        }
      }
    },
    create () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.saveProject()
        }
      })
    },
    async saveProject () {
      const { code, message, data } = await createProject({
        name: this.formData.name,
        hostname: this.formData.hostname,
        port: this.formData.port,
        apiurl: this.formData.apiurl
      })
      if (code === 0) {
        this.$cysMessage({
          type: 'success',
          message: '项目创建成功'
        })
        this.$router.push({path: '/create/page', query: { project: data.name }})
      } else {
        this.$cysMessage({
          type: 'error',
          message: message
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
.create-project
  width 400px
  text-align left
  margin 150px auto 0
  border 1px solid #dddddd
  padding 20px
  h3
    text-align center
    margin 0 0 20px
  .btn
    margin-left 95px
</style>
