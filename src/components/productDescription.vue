<template>
  <div class="productDescription">
    <el-form ref="form" :model="form" label-width="150px" label-position="right">
      <el-form-item label="申请年龄">
        <el-input v-model="form.name" size="small" :disabled="inputStatus"></el-input>
      </el-form-item>
      <el-form-item label="借款额度">
        <el-input v-model="form.name" size="small" :disabled="inputStatus"></el-input>
      </el-form-item>
      <el-form-item label="借款期限">
        <el-input v-model="form.name" size="small" :disabled="inputStatus"></el-input>
      </el-form-item>
      <el-form-item label="借款利息">
        <el-input v-model="form.name" size="small" :disabled="inputStatus"></el-input>
      </el-form-item>
      <el-form-item label="快速信审费">
        <el-input v-model="form.name" size="small" :disabled="inputStatus"></el-input>
      </el-form-item>
      <el-form-item label="支付交易费用">
        <el-input v-model="form.name" size="small" :disabled="inputStatus"></el-input>
      </el-form-item>
      <el-form-item label="平台账户管理费用">
        <el-input v-model="form.name" size="small" :disabled="inputStatus"></el-input>
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
          name:'',
        },
        inputStatus:true

      }
    },
    created() {

    },
    methods: {
      onSubmit() {
        console.log('submit!');
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
