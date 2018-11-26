<template>
  <div class="userInfo">
    <div class="search">
      <el-input
        size="small"
        placeholder="请输入用户名"
        suffix-icon="el-icon-date"
        v-model="email">
      </el-input>
      <el-input
        size="small"
        placeholder="请输入姓名"
        suffix-icon="el-icon-date"
        v-model="name">
      </el-input>
      <el-button type="primary" size="small" @click="getAdminList">查询</el-button>
      <el-button type="primary" size="small" @click="empty">清空</el-button>
      <el-button type="primary" size="small" @click="addNew">新增</el-button>
    </div>
    <div class="content">
      <template>
        <el-table :data="userData" style="width: 99%;" size="medium" v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="用户名"><span>{{ props.row.email }}</span></el-form-item>
                <el-form-item label="姓名"><span>{{ props.row.name }}</span></el-form-item>
                <el-form-item label="角色"><span>{{ props.row.roleInfo.name }}</span></el-form-item>
                <el-form-item label="状态"><span>{{ props.row.status }}</span></el-form-item>
                <el-form-item label="创建时间"><span>{{ props.row.createTime }}</span></el-form-item>
                <el-form-item label="更新时间"><span>{{ props.row.updateTime }}</span></el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="用户名" prop="email"></el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="角色" prop="roleInfo.name"></el-table-column>
          <el-table-column label="状态" prop="status"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                         v-if="scope.row.id!= 1">删除
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

    <AddPopup PopupTitle="新增/修改角色" :showPopUp="showPopUp" @saveForm="saveForm" @closePopup="closePopup"
              @before-close="beforeClose">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="email">
          <el-input v-model="form.email" size="small"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" size="small" type="password"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="value1" placeholder="请选择活动区域" size="small" :disabled="adminEditStatus">
            <el-option :label="item.name" :key="item.value" :value="item.id" v-for="item in options1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="value2" placeholder="请选择活动区域" size="small" :disabled="adminEditStatus">
            <el-option :label="item.label" :key="item.value" :value="item.value" v-for="item in options2"></el-option>
          </el-select>
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
        email: '',
        name: '',
        userData: [],
        currentPage: 1,
        perPage: 10,
        totalPage: null,
        options1: [],
        value1: '',
        options2: [{
          value: '0',
          label: '禁用'
        }, {
          value: '1',
          label: '正常'
        }],
        value2: '1',
        rules: {
          email: [
            {required: true, message: '邮箱不能为空', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '名字不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
        },
        form: {
          id: '',
          email: '',
          name: '',
          password: '',
          roleId: '',
          roleName: '',
          status: '',
        },
        adminEditStatus: false
      }
    },
    created() {
      this.getAdminList()
    },
    methods: {
      getAdminList() {
        let para = {
          email: this.email, //用户名/邮箱
          name: this.name, //姓名
          currentPage: this.currentPage,
          perPage: this.perPage,
        };
        this.$api.sendRequest('getAdminList', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            data.items.forEach((v) => {
              v.createTime = this.$Func.timeConversion(v.createTime)
              v.updateTime = this.$Func.timeConversion(v.updateTime)
              v.status = this.$Func.returnUserStatus(v.status)
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
        this.getAdminList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getAdminList()
      },
      empty() {
        this.email = "";
        this.name = "";
      },
      addNew() {
        this.showPopUp = true
        this.rules.password[0].required = true;
        this.form = {
          id: '',
          email: '',
          name: '',
          password: '',
          roleId: '',
          roleName: '',
          status: '',
        }
        this.getRoleList()
      },
      closePopup() {
        this.showPopUp = false
      },
      beforeClose(done) {
        this.showPopUp = false;
        done && done();
      },
      getRoleList() {
        let para = {
          currentPage: 1,
          perPage: this.perPage
        };
        this.$api.sendRequest('getRoleList', para).then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.options1 = data.items;
          } else {
            this.$alert('fail')
          }
        });
      },
      handleEdit(index, row) {
        row.password = ''
        this.rules.password[0].required = false;
        this.getRoleList()
        this.value1 = row.roleId
        this.value2 = row.status
        this.form = row
        if (row.id == '1') {
          this.adminEditStatus = true
        } else {
          this.adminEditStatus = false
        }
        this.showPopUp = true
      },
      saveForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.form.id) {
              let para = {
                id: this.form.id,
                email: this.form.email, //用户名/邮箱
                name: this.form.name, //姓名
                password: this.form.password,
                roleId: this.value1,
                status: this.$Func.returnUserStatusNum(this.value2),
              };
              //修改用户
              this.$api.sendRequest('updateAdmin', para).then(res => {
                if (res.code == 200) {
                  let data = res.data;
                  this.userData = data.items;
                  this.$message({
                    message: 'success',
                    type: 'success'
                  });
                  this.showPopUp = false;
                  this.getAdminList()
                } else {
                  this.$message.error('fail');
                }
              });
            } else {
              let para = {
                email: this.form.email, //用户名/邮箱
                name: this.form.name, //姓名
                password: this.form.password,
                roleId: this.value1,
                status: this.value2,
              };
              //新增用户
              this.$api.sendRequest('addAdmin', para).then(res => {
                if (res.code == 200) {
                  let data = res.data;
                  this.userData = data.items;
                  this.$message({
                    message: 'success',
                    type: 'success'
                  });
                  this.showPopUp = false;
                  this.getAdminList()
                } else {
                  this.$message.error('fail');
                }
              });
            }
          }
        })
      },
      handleDelete(index, row) {
        this.$confirm('此操作将删除用户是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.sendRequest("deleteAdmin", {adminId: row.id}).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getAdminList()
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
