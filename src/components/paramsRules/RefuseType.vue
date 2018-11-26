<template>
  <div class="userInfo">
    <div class="search">
      <el-input
        size="small"
        placeholder="类型"
        suffix-icon="el-icon-date"
        v-model="name">
      </el-input>
      <el-button type="primary" size="small" @click="getRejectConfig">查询</el-button>
      <el-button type="primary" size="small" @click="empty">清空</el-button>
      <el-button type="primary" size="small" @click="addNew">新增</el-button>
    </div>
    <div class="content">
      <template>
        <el-table :data="userData" style="width: 99%;" size="medium" v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="id"><span>{{ props.row.id }}</span></el-form-item>
                <el-form-item label="拒绝类型"><span>{{ props.row.name }}</span></el-form-item>
                <el-form-item label="备注"><span>{{ props.row.note }}</span></el-form-item>
                <el-form-item label="创建时间"><span>{{ props.row._createTime }}</span></el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="id" prop="id"></el-table-column>
          <el-table-column label="拒绝类型" prop="name"></el-table-column>
          <el-table-column label="备注" prop="note"></el-table-column>
          <el-table-column label="创建时间" prop="_createTime"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
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

    <AddPopup PopupTitle="新增/修改拒绝类型" :showPopUp="showPopUp" @saveForm="saveForm" @closePopup="closePopup"
              @before-close="beforeClose">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="拒绝类型" prop="name">
          <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input v-model="form.note" size="small"></el-input>
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
        loading:false,
        showPopUp: false,
        name: '',
        userData: [],
        currentPage: 1,
        perPage: 10,
        totalPage: null,
        rules: {
          name: [
            {required: true, message: '拒绝类型不能为空', trigger: 'blur'}
          ],
          note: [
            {required: true, message: '备注不能为空', trigger: 'blur'}
          ],
        },
        form: {
          id: '',
          email: '',
          name: '',
        },
      }
    },
    created() {
      this.getRejectConfig()
    },
    methods: {
      getRejectConfig() {
        let para = {
          name: this.name,
          currentPage: this.currentPage,
          perPage: this.perPage,
        };
        this.$api.sendRequest('getRejectConfig', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            data.items.forEach((v) => {
              v._createTime = this.$Func.timeConversion(v.createTime)
            })
            this.totalPage = data.pagination.totalCount;
            this.userData = data.items;
          } else {
            this.$alert('请求失败')
          }
        })
      },
      handleSizeChange(val) {
        this.perPage = val
        this.getRejectConfig()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getRejectConfig()
      },
      empty() {
        this.email = "";
        this.name = "";
      },
      addNew() {
        this.showPopUp = true
        this.form = {
          id: '',
          email: '',
          name: '',
        }
        this.openRoleModelDialog();
      },
      closePopup() {
        this.showPopUp = false
      },
      beforeClose(done) {
        this.showPopUp = false;
        done && done();
      },
      handleEdit(index, row) {
        this.form = row
        this.showPopUp = true
        this.openRoleModelDialog(row);
      },
      //打开编辑/新增角色弹窗
      openRoleModelDialog(role) {
        role && (this.form = role);
        this.showPopUp = true
      },
      saveForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            //保存用户
            this.$api.sendRequest('saveRejectConfig', {configInfo: this.form}).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: 'success',
                  type: 'success'
                });
                this.showPopUp = false;
                this.getRejectConfig()
              } else {
                this.$message.error('fail');
              }
            });
          }
        })
      },
      handleDelete(index, row) {
        this.$confirm('此操作将删除拒绝类型是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.sendRequest("removeRejectConfig", {id: row.id}).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getRejectConfig()
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
    .addNew {
      .el-input {
        width: 250px;
      }
    }
  }
</style>
