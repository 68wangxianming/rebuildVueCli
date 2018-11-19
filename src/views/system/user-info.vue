<template>
  <div class="index">
    <template>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="width: 98.5%;">
        <el-tab-pane label="用户信息" name="first">
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
                <el-table :data="userData" style="width: 99%;" size="medium">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="用户名"><span>{{ props.row.email }}</span></el-form-item>
                        <el-form-item label="姓名"><span>{{ props.row.name }}</span></el-form-item>
                        <el-form-item label="角色"><span>{{ props.row.roleName }}</span></el-form-item>
                        <el-form-item label="状态"><span>{{ props.row.status }}</span></el-form-item>
                        <el-form-item label="创建时间"><span>{{ props.row.createTime }}</span></el-form-item>
                        <el-form-item label="更新时间"><span>{{ props.row.updateTime }}</span></el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column label="用户名" prop="email"></el-table-column>
                  <el-table-column label="姓名" prop="name"></el-table-column>
                  <el-table-column label="角色" prop="roleName"></el-table-column>
                  <el-table-column label="状态" prop="status"></el-table-column>
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
          </div>
        </el-tab-pane>
        <el-tab-pane label="角色设置" name="second">
          <div class="roleSet">
            <div class="search">
              <el-button type="primary" size="small" @click="addUserRole">新增</el-button>
            </div>
            <div class="content">
              <template>
                <el-table :data="roleData" border style="width: 99%;">
                  <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
                  <el-table-column prop="description" label="角色描述" align="center"></el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button size="mini" @click="userRoleHandleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button size="mini" type="danger" @click="userRolehandleDelete(scope.$index, scope.row)">删除
                      </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </template>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>

    <AddPopup PopupTitle="新增/修改角色" :showPopUp="showPopUpfirst" @saveForm="saveForm('first')" @closePopup="closePopup"
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
    </AddPopup>
    <AddPopup PopupTitle="新增/修改角色" :showPopUp="showPopUpsecond" @saveForm="saveForm('second')" @closePopup="closePopup"
              @before-close="beforeClose">
      <el-form :model="roleModel" label-width="80px" :rules="roleRules" ref="roleModel">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleModel.name" size="small"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="roleModel.description" size="small"></el-input>
        </el-form-item>
      </el-form>

      <el-tree
        :props="authTreeProps"
        :data="authTree"
        :default-expanded-keys="roleAuthList"
        :default-checked-keys="roleAuthList"
        node-key="id"
        show-checkbox
        @check="handleCheckChange">
      </el-tree>
    </AddPopup>
  </div>
</template>

<script>
  import AddPopup from '../../components/addPopup.vue'

  export default {
    data() {
      return {
        showPopUpfirst: false,
        showPopUpsecond: false,
        email: '',
        name: '',
        activeName: 'second',
        userData: [],
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
        },
        roleRules: {
          name: [
            {required: true, message: '角色名称不能为空', trigger: 'blur'}
          ],
          description: [
            {required: true, message: '角色描述不能为空', trigger: 'blur'}
          ],
        },
        //角色设置
        roleData: [],
        showUserRole: false,
        roleform: {
          name: '',
          description: ''
        },
        authTree: [],
        authTreeProps: {
          label: (data) => this.$t('message.' + data.title),
          children: 'children'
        },
        count: 1,
        roleAuthList: [],
        roleModel: {
          name: '', description: '', authList: ''
        }
      };
    },
    created() {
      this.getAdminList()
      this.getRoleData()
      this.getAuthTree()//获取权限树
    },
    methods: {
      getAdminList() {
        let para = {
          email: this.email, //用户名/邮箱
          name: this.name, //姓名
          currentPage: this.currentPage,
          perPage: this.perPage,
        };
        this.$api.sendRequest('getAdminList', para).then(res => {
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
      handleClick(tab, event) {
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
        this.showPopUpfirst = true
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
      beforeClose(done) {
        this.showPopUpfirst = false;
        this.showPopUpsecond = false;
        done && done();
      },
      handleEdit(index, row) {
        this.getRoleList()
        this.value1 = row.roleId
        this.form = row
        this.showPopUpfirst = true
      },
      saveForm(num) {
        if (num == 'first') {
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
                    this.userData = data.items;
                    this.$message({
                      message: 'success',
                      type: 'success'
                    });
                    this.showPopUpfirst = false;
                    this.getAdminList()
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
                    this.userData = data.items;
                    this.$message({
                      message: 'success',
                      type: 'success'
                    });
                    this.showPopUpfirst = false;
                    this.getAdminList()
                  } else {
                    this.$message.error('fail');
                  }
                });
              }
            }
          })
        } else {
          this.$refs.roleModel.validate((valid) => {
            if (valid) {
              //保存用户
              this.$api.sendRequest('saveRole', {roleInfo: this.roleModel}).then(res => {
                if (res.code == 200) {
                  this.$message({
                    message: 'success',
                    type: 'success'
                  });
                  this.showPopUpsecond = false;
                  this.getRoleData()
                } else {
                  this.$message.error('fail');
                }
              });

            }
          })
        }

      },
      closePopup() {
        this.showPopUpfirst = false
        this.showPopUpsecond = false
      },
      handleDelete(index, row) {
        let para = {
          adminId: row.id
        }
        this.$api.sendRequest('deleteAdmin', para).then(res => {
          if (res.code == 200) {
            this.$message({
              message: 'success',
              type: 'success'
            });
            this.getAdminList()
          } else {
            this.$message.error('fail');
          }
        });
      },

      //角色设置
      getRoleData() {
        let para = {
          currentPage: 1,
          perPage: this.perPage
        };
        this.$api.sendRequest('getRoleList', para).then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.roleData = data.items;
          } else {
            this.$alert('fail')
          }
        });
      },
      addUserRole() {
        // this.showPopUpsecond = true
        this.roleAuthList = [];
        this.getAuthTree();
        this.roleModel = {
          name: '',
          description: '',
          authList: ''
        };
        this.openRoleModelDialog();

      },

      //打开编辑/新增角色弹窗
      openRoleModelDialog(role) {
        role && (this.roleModel = role);
        this.roleAuthList = this.roleModel.authList.split("|");
        this.showPopUpsecond = true
      },
      userRoleHandleEdit(index, row) {
        this.openRoleModelDialog(row);
      },
      userRolehandleDelete(index, row) {
        //todo 弹窗确认  prompt
        this.$confirm('此操作将永久删除用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.sendRequest("removeRole", {id: row.id}).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getRoleData()
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
      handleCheckChange(node, tree) {
        this.roleModel.authList = tree.checkedKeys.join('|')
      },
      handleNodeClick(data) {
        console.log(data);
      },
      getAuthTree() {
        this.$api.sendRequest('getAuthTree').then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.authTree = data.authTree;
            console.log('权限书', data);
          } else {
            this.$alert('fail')
          }
        });
      }
    },
    components: {
      AddPopup
    }
  };
</script>

<style scoped lang="less">
  .index {
    padding: 8px;
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
    }
    .roleSet {
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
          padding: 8px 25px;
        }
      }
      .content {

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
