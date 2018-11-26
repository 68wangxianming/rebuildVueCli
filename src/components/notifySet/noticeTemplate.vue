<template>
  <div class="userInfo">
    <div class="search">
      <el-button type="primary" size="small" @click="addNew">新增</el-button>
    </div>
    <div class="content">
      <template>
        <el-table :data="userData" style="width: 99%;" size="medium" v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="模板ID"><span>{{ props.row.id }}</span></el-form-item>
                <el-form-item label="模板内容"><span>{{ props.row.content }}</span></el-form-item>
                <el-form-item label="是否开启站内信"><span>{{ props.row._msgStatus }}</span></el-form-item>
                <el-form-item label="是否开启短信"><span>{{ props.row._smsStatus }}</span></el-form-item>
                <el-form-item label="类型"><span>{{ props.row.type }}</span></el-form-item>
                <el-form-item label="修改时间"><span>{{ props.row._updateTime }}</span></el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="模板ID" prop="id"></el-table-column>
          <el-table-column label="模板内容" prop="content"></el-table-column>
          <el-table-column label="是否开启站内信" prop="_msgStatus"></el-table-column>
          <el-table-column label="是否开启短信" prop="_smsStatus"></el-table-column>
          <el-table-column label="类型" prop="type"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!--分页Start-->
      <template>
        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="perPage"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalPage">
          </el-pagination>
        </div>
      </template>
      <!--分页End-->
    </div>
    <AddPopup PopupTitle="新增/修改通知模版" :showPopUp="showPopUp" @saveForm="saveForm" @closePopup="closePopup"
              @before-close="beforeClose">
      <el-form label-width="80px">
        <el-form-item label="选择类型">
          <el-select v-model="value1" placeholder="" size="small" @change="typeChange">
            <el-option :label="$t(`notice.${item.name}`)" :key="item.id" :value="item.name"
                       v-for="item in notifyType"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择标签">
          <div class="el-tag" v-for="item in tagList" @click="tagChoose(item)">{{$t(`notice.${item}`)}}</div>
        </el-form-item>
        <el-form-item label="生成模版">
          <el-input
            id="tarea"
            type="textarea"
            :rows="10"
            v-model="textarea">
          </el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="value2"
            active-text="站内信">
          </el-switch>
          <el-switch
            style="display: inline-block;margin-left: 15px;"
            v-model="value3"
            active-text="短信">
          </el-switch>
        </el-form-item>
      </el-form>
    </AddPopup>
  </div>
</template>

<script>
  import AddPopup from '../addPopup.vue'

  export default {
    data() {
      return {
        loading: false,
        showPopUp: false,
        tempNo: '',
        userData: [],
        currentPage: 1,
        perPage: 10,
        totalPage: null,
        value1: '',
        notifyType: [],
        tagList: [],
        textarea: '',
        value2: true,
        value3: true,
        id: null
      }
    },
    created() {
      this.getNotifyTemplate()
      this.getNotifyType()
    },
    methods: {
      getNotifyTemplate() {
        let para = {
          currentPage: this.currentPage,
          perPage: this.perPage,
        };
        this.$api.sendRequest('getNotifyTemplate', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            data.items.forEach((v) => {
              v._updateTime = this.$Func.timeConversion(v.updateTime)
              v._msgStatus = v.msgStatus && '开启' || '关闭'
              v._smsStatus = v.smsStatus && '开启' || '关闭'
            })
            this.totalPage = data.pagination.totalCount;
            this.userData = data.items;
          } else {
            this.$alert('请求失败')
          }
        })
      },
      getNotifyType() {
        return new Promise((resolve, reject) => {
          this.$api.sendRequest('getNotifyType').then(res => {
            if (res.code == 200) {
              let data = res.data.notifyType;
              this.notifyType = data
              resolve({});
            } else {
              this.$alert('请求失败')
              reject({});
            }
          })
        })

      },
      typeChange() {
        this.tagList = this.notifyType.filter(v => v.name == this.value1)[0].allowedChars.split('|')
      },
      tagChoose(val) {
        let tarea = this.$el.querySelector("#tarea");
        let start = tarea.selectionStart;
        let end = tarea.selectionEnd;
        this.textarea = this.textarea.substring(0, start) + val + this.textarea.substring(end);
      },
      handleSizeChange(val) {
        this.perPage = val
        this.getNotifyTemplate()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getNotifyTemplate()
      },
      addNew() {
        this.textarea = ''
        this.value2 = true
        this.value3 = true
        this.id = null;
        this.showPopUp = true
      },
      handleEdit(index, row) {
        this.textarea = row.content
        this.value2 = row.msgStatus && true || false;
        this.value3 = row.smsStatus && true || false;
        this.value1 = row.type
        this.id = row.id
        this.tagList = this.notifyType.filter(v => v.name == this.value1)[0].allowedChars.split('|')
        this.showPopUp = true
      },
      closePopup() {
        this.showPopUp = false
      },
      beforeClose(done) {
        this.showPopUp = false;
        done && done();
      },
      saveForm() {
        this.$api.sendRequest('saveNotifyTemplate', {
          templateInfo: {
            msgStatus: this.value2 && 1 || 0,
            smsStatus: this.value3 && 1 || 0,
            content: this.textarea,
            type: this.value1,
            id: this.id
          }
        }).then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.userData = data.items;
            this.$message({
              message: 'success',
              type: 'success'
            });
            this.showPopUp = false;
            this.getNotifyTemplate()
          } else {
            this.$message.error('fail');
          }
        });
      },
      handleDelete(index, row) {
        this.$confirm('此操作将删除模版是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.sendRequest("removeNotifyTemplate", {id: row.id}).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getNotifyTemplate()
            }
          }).catch(e => {
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
    },
    components: {
      AddPopup,
    }
  }
</script>

<style scoped lang="less">
  .userInfo {
    .search {
      display: flex;
      justify-content: flex-start;
      padding-bottom: 20px;
      :not(:first-child) {
        margin-left: 20px;
      }
      .el-input {
        width: 200px;
      }
      .el-button {
        letter-spacing: 2px;
        padding: 0 25px;
      }
    }
    .content {
      .block {
        text-align: right;
        padding-top: 20px;
      }

    }
    .demo-table-expand {
      font-size: 0;
    }
    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 50%;
    }
    .el-input {
      width: 250px;
    }
    .search .el-button {
      padding: 8px 20px;
    }
    .el-tag {
      cursor: pointer;
      margin: 5px;
    }
  }
</style>
