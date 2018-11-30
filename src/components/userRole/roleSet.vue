<template>
  <div class="roleSet">
    <div class="search">
      <el-button type="primary" size="small" @click="addUserRole" v-text="$t('m.label7')">新增</el-button>
    </div>
    <div class="content">
      <template>
        <el-table :data="roleData" border style="width: 99%;" v-loading="loading">
          <el-table-column prop="name" :label="$t('m.label39')" align="center"></el-table-column>
          <el-table-column prop="description" :label="$t('m.label40')" align="center"></el-table-column>
          <el-table-column :label="$t('m.label14')" align="center">
            <template slot-scope="scope">
              <el-button size="mini" @click="userRoleHandleEdit(scope.$index, scope.row)" v-text="$t('m.label15')">编辑
              </el-button>
              <el-button size="mini" type="danger" @click="userRolehandleDelete(scope.$index, scope.row)"
                         v-text="$t('m.label16')">删除
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
    <AddPopup :PopupTitle="$t('m.label38')" :showPopUp="showPopUp" @saveForm="saveForm()" @closePopup="closePopup"
              @before-close="beforeClose">
      <el-form :model="roleModel" label-width="80px" :rules="roleRules" ref="roleModel">
        <el-form-item :label="$t('m.label39')" prop="name">
          <el-input v-model="roleModel.name" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.label40')" prop="description">
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
  import AddPopup from '../addPopup.vue'

  export default {
    data() {
      return {
        loading: false,
        showPopUp: false,
        currentPage: 1,
        perPage: 10,
        totalPage: null,
        roleData: [],
        roleRules: {
          name: [
            {required: true, message: this.$t('m.label41'), trigger: 'blur'}
          ],
          description: [
            {required: true, message: this.$t('m.label42'), trigger: 'blur'}
          ],
        },
        authTree: [],
        authTreeProps: {
          label: (data) => this.$t('message.' + data.title),
          children: 'children'
        },
        roleAuthList: [],
        roleModel: {
          name: '', description: '', authList: ''
        }
      }
    },
    created() {
      this.getRoleList()
      this.getAuthTree()
    },
    methods: {
      addUserRole() {
        this.roleAuthList = [];
        this.getAuthTree();
        this.roleModel = {
          name: '',
          description: '',
          authList: ''
        };
        this.openRoleModelDialog();
      },
      //角色设置
      getRoleList() {
        let para = {
          currentPage: this.currentPage,
          perPage: this.perPage,
        };
        this.$api.sendRequest('getRoleList', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.totalPage = data.pagination.totalCount;
            this.roleData = data.items;
          } else {
            this.$alert(this.$t('m.label30'))
          }
        });
      },
      getAuthTree() {
        this.$api.sendRequest('getAuthTree').then(res => {
          if (res.code == 200) {
            let data = res.data;
            this.authTree = data.authTree;
          } else {
            this.$alert(this.$t('m.label30'))
          }
        });
      },
      closePopup() {
        this.showPopUp = false
      },
      beforeClose(done) {
        this.showPopUp = false;
        done && done();
      },
      handleCheckChange(node, tree) {
        console.log('======checkedKeys', tree.checkedKeys);
        console.log('====treee', tree);
        this.roleModel.authList = [...tree.halfCheckedKeys, ...tree.checkedKeys].join('|')
      },
      //打开编辑/新增角色弹窗
      openRoleModelDialog(role) {
        role && (this.roleModel = role);
        this.roleAuthList = this.roleModel.authList.split("|");
        this.showPopUp = true
      },
      userRoleHandleEdit(index, row) {
        this.openRoleModelDialog(row);
      },
      saveForm() {
        this.$refs.roleModel.validate((valid) => {
          if (valid) {
            //保存用户
            this.$api.sendRequest('saveRole', {roleInfo: this.roleModel}).then(res => {
              if (res.code == 200) {
                this.$message({
                  message: this.$t('m.label31'),
                  type: 'success'
                });
                this.showPopUp = false;
                this.getRoleList()
              } else {
                this.$message.error(this.$t('m.label30'));
              }
            });
          }
        })
      },
      userRolehandleDelete(index, row) {
        this.$confirm(this.$t('m.label43'), this.$t('m.label33'), {
          confirmButtonText: this.$t('m.label34'),
          cancelButtonText: this.$t('m.label35'),
          type: 'warning'
        }).then(() => {
          this.$api.sendRequest("removeRole", {id: row.id}).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: this.$t('m.label36')
              });
              this.getRoleList()
            }
          }).catch(e => {
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('m.label37')
          });
        });
      },
      handleSizeChange(val) {
        this.perPage = val
        this.getRoleList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getRoleList()
      },
    },
    components: {
      AddPopup,
    }
  }
</script>

<style scoped lang="less">
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
      .block {
        text-align: right;
        padding-top: 20px;
      }
    }
  }

  .addNew {
    .el-input {
      width: 250px;
    }
  }
</style>
