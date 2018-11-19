<template>
  <div class="dialog">
    <el-dialog :title="PopupTitle" :visible="showPopUp" class="addNew" width="45%" :before-close="beforeClose">
      <slot></slot>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveForm" size="medium">确 定</el-button>
        <el-button @click="closePopup" size="medium">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props: {
      showPopUp: Boolean,
      PopupTitle: {
        type: String,
        default: function () {
          return ""
        }
      }
    },
    data() {
      return {
        dialogFormVisible: true,
      }
    },
    methods: {
      closePopup() {
        this.$emit('closePopup')
      },
      saveForm() {
        this.$emit("saveForm")
      },
      beforeClose(done){
        this.$emit('before-close',done);
      }
    }
  }
</script>

<style scoped>

</style>
