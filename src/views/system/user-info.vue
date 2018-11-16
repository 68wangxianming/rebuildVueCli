<template>
  <div class="index">
    <template>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="width: 98.5%;">
        <el-tab-pane label="用户信息" name="first">
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
            <el-button type="primary" size="small" @click="searchAdminList">查询</el-button>
            <el-button type="primary" size="small" @click="empty">清空</el-button>
            <el-button type="primary" size="small" @click="addNew">新增</el-button>
          </div>
          <div class="content">
            <template>




              <el-table
                :data="tableData"
                style="width: 99%;"
                size="medium"
              >
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                      <el-form-item label="用户名"><span>{{ props.row.email }}</span></el-form-item>
                      <el-form-item label="姓名"><span>{{ props.row.name }}</span></el-form-item>
                      <el-form-item label="角色"><span>{{ props.row.roleName }}</span></el-form-item>
                      <el-form-item label="状态"><span>{{ props.row.status }}</span></el-form-item>
                      <el-form-item label="创建时间"><span>{{ props.row.createdAt }}</span></el-form-item>
                      <el-form-item label="更新时间"><span>{{ props.row.updatedAt }}</span></el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column label="用户名" prop="email"></el-table-column>
                <el-table-column label="姓名" prop="name"></el-table-column>
                <el-table-column label="角色" prop="roleName"></el-table-column>
                <el-table-column label="状态" prop="status"></el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)"
                    >编辑
                    </el-button>
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)">删除
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
        </el-tab-pane>
        <el-tab-pane label="角色设置" name="second">角色</el-tab-pane>
      </el-tabs>
    </template>


    <el-dialog title="新增用户" :visible.sync="dialogFormVisible" id="addNew" width="45%">

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
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="form.mobile" size="small"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="value1" placeholder="请选择活动区域" size="small">
            <el-option :label="item.name" :key="item.value" :value="item.id" v-for="item in options1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="value2" placeholder="请选择活动区域" size="small">
            <el-option :label="item.label" :key="item.value" :value="item.value" v-for="item in options2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveForm" size="medium">确 定</el-button>
        <el-button @click="closePopup" size="medium">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        email: '',
        name: '',
        activeName: 'first',
        tableData: [],
        currentPage: 1,
        perPage: 10,
        totalPage: null,
        dialogFormVisible: false,
        form: {
          id: '',
          email: '',
          name: '',
          mobile: '',
          password: '',
          roleId: '',
          roleName: '',
          status: '',
        },
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
          mobile: [
            {required: true, message: '手机号不能为空', trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      this.searchAdminList()
    },
    methods: {
      searchAdminList() {
        let para = {
          email: this.email, //用户名/邮箱
          name: this.name, //姓名
          currentPage: this.currentPage,
          perPage: this.perPage,
        };
        this.$api.sendRequest('searchAdminList', para).then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.totalPage = data.pagination.totalCount;
            this.tableData = data.items;
          } else {
            this.$alert('请求失败')
          }
        })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleSizeChange(val) {
        this.perPage = val
        this.searchAdminList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.searchAdminList()
      },
      empty() {
        this.email = "";
        this.name = "";
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
      addNew() {
        this.dialogFormVisible = true
        this.form = {
          id: '',
          email: '',
          name: '',
          mobile: '',
          password: '',
          roleId: '',
          roleName: '',
          status: '',
        }
        this.getRoleList()
      },
      handleEdit(index, row) {
        this.getRoleList()
        this.value1 = row.roleId
        this.form = row
        this.dialogFormVisible = true
      },
      saveForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            if (this.form.id) {
              let para = {
                id: this.form.id,
                email: this.form.email, //用户名/邮箱
                name: this.form.name, //姓名
                mobile: this.form.mobile, //手机号
                password: this.form.password,
                roleId: this.value1,
                status: this.value2,
              };
              //修改用户
              this.$api.sendRequest('updateAdmin', para).then(res => {
                if (res.code == 200) {
                  let data = res.data;
                  this.tableData = data.items;
                  this.$message({
                    message: 'success',
                    type: 'success'
                  });
                  this.dialogFormVisible = false;
                  this.searchAdminList()
                } else {
                  this.$message.error('fail');
                }
              });
            } else {
              let para = {
                email: this.form.email, //用户名/邮箱
                name: this.form.name, //姓名
                mobile: this.form.mobile, //手机号
                password: this.form.password,
                roleId: this.value1,
                status: this.value2,
              };
              //新增用户
              this.$api.sendRequest('addAdmin', para).then(res => {
                if (res.code == 200) {
                  let data = res.data;
                  this.tableData = data.items;
                  this.$message({
                    message: 'success',
                    type: 'success'
                  });
                  this.dialogFormVisible = false;
                  this.searchAdminList()
                } else {
                  this.$message.error('fail');
                }
              });
            }
          }
        })
      },
      closePopup() {
        this.dialogFormVisible = false
      },
      //删除用户
      handleDelete(index, row) {
        console.log(row,'dsafasfasfasfas');
        let para ={
          adminId: row.id
        }
        this.$api.sendRequest('deleteAdmin', para).then(res => {
          console.log(res,'aaaaaaaaaa');
          if (res.code == 200) {
            this.$message({
              message: 'success',
              type: 'success'
            });
            this.searchAdminList()
          } else {
            this.$message.error('fail');
          }
        });
      }
    }
  };
</script>

<style scoped lang="less">
  .index {
    padding: 8px;
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
    #addNew {
      .el-input {
        width: 250px;
      }
    }
  }
</style>
