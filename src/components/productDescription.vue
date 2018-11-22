<template>
  <div class="productDescription">
    <el-form :rules="rules" ref="form" :model="form" label-width="150px" label-position="right">
      <el-form-item label="产品名称">
        <el-input v-model="form.name" size="small" :disabled="inputStatus"></el-input>
      </el-form-item>
      <el-form-item label="申请年龄">
        <el-input v-model="form.age" size="small" :disabled="inputStatus"></el-input>
      </el-form-item>
      <el-form-item label="借款额度">
        <el-input v-model="form.loan" size="small" :disabled="inputStatus"></el-input>
      </el-form-item>
      <el-form-item label="借款期限">
        <el-input v-model="form.day" size="small" :disabled="inputStatus"></el-input>
      </el-form-item>
      <el-form-item label="借款利息">
        <el-input v-model="form.fees" size="small" :disabled="inputStatus"></el-input>
      </el-form-item>
      <el-form-item label="快速信审费">
        <el-input v-model="form.risk" size="small" :disabled="inputStatus"></el-input>
      </el-form-item>
      <el-form-item label="支付交易费用">
        <el-input v-model="form.transaction" size="small" :disabled="inputStatus"></el-input>
      </el-form-item>
      <el-form-item label="平台账户管理费用">
        <el-input v-model="form.platform" size="small" :disabled="inputStatus"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="medium">保存</el-button>
        <el-button type="danger" size="medium" @click="edit">编辑</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          age: '',
          loan: '',
          day: '',
          fees: '',
          risk: '',
          transaction: '',
          platform: '',
        },
        inputStatus: true,
        rules: {
          name: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          age: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          loan: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          day: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          fees: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          risk: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          transaction: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          platform: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.getProductConfig()
    },
    methods: {
      getProductConfig() {
        this.$api.sendRequest('getProductConfig').then(res => {
          if(res.code == 200) {
            this.form = res.data.productConfig
          }
        })
      },
      onSubmit() {
        this.$refs.form.validate((valid) => {
          if(valid) {
            this.$api.sendRequest('saveProductConfig',{productConfig:this.form}).then(res => {
              if(res.code == 200) {
                this.$message({
                  message: 'success',
                  type: 'success'
                });
                this.getProductConfig()
                this.inputStatus = true
              }
            })
          }
        })
      },
      edit() {
        this.inputStatus = false
      }
    },
    components: {}
  }
</script>

<style scoped lang="less">
  .productDescription {
    margin: 20px;
  }

  .el-input {
    width: 250px;
  }
</style>
