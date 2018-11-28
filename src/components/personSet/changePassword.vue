<template>
  <div class="changePassword" v-if="showChangePassword">
    <AddPopup PopupTitle="新增/修改角色" :showPopUp="showPopUp" @saveForm="saveForm" @closePopup="closePopup"
              @before-close="beforeClose">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="form.oldPassword" size="small"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="pass">
          <el-input v-model="form.pass" size="small"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="form.checkPass" size="small"></el-input>
        </el-form-item>
      </el-form>
    </AddPopup>
  </div>
</template>

<script>
  import AddPopup from '../addPopup.vue'

  export default {
    props:{
      showChangePassword:Boolean
    },
    data() {
      return {
        form: {
          name: ''
        },
        rules: {
          oldPassword: [
            {required: true, message: '旧密码不能为空', trigger: 'blur'}
          ],
          pass: [
            {required: true, message: '新密码不能为空', trigger: 'blur'}
          ],
          checkPass: [
            {required: true, message: '新密码不能为空', trigger: 'blur'}
          ],
        },
        showPopUp:true
      }
    },
    methods: {
      saveForm() {
        this.$emit('saveForm')
      },
      closePopup() {
        this.$emit('closePopup')
      },
      beforeClose() {
        this.$emit('beforeClose')
      }
    },
    components: {
      AddPopup
    }
  }
</script>

<style scoped lang="less">
  .el-input {
    width: 250px;
  }
</style>
