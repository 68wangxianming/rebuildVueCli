<template>
  <div class="userInfo">
    <div class="search">
      <el-input
        size="small"
        :placeholder="this.$t('m.label3')"
        suffix-icon="el-icon-date"
        v-model="email">
      </el-input>
      <el-input
        size="small"
        :placeholder="this.$t('m.label4')"
        suffix-icon="el-icon-date"
        v-model="name">
      </el-input>
      <el-button type="primary" size="small" @click="getAdminList">{{this.$t('m.label5')}}</el-button>
      <el-button type="primary" size="small" @click="empty">{{this.$t('m.label6')}}</el-button>
      <el-button type="primary" size="small" @click="addNew">{{this.$t('m.label7')}}</el-button>
    </div>
    <div class="content">
      <template>
        <el-table :data="userData" style="width: 99%;" size="medium" v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item :label="$t('m.label8')"><span>{{ props.row.email }}</span></el-form-item>
                <el-form-item :label="$t('m.label9')"><span>{{ props.row.name }}</span></el-form-item>
                <el-form-item :label="$t('m.label11')"><span>{{ props.row.status }}</span></el-form-item>
                <el-form-item :label="$t('m.label12')"><span>{{ props.row.createTime }}</span></el-form-item>
                <el-form-item :label="$t('m.label13')"><span>{{ props.row.updateTime }}</span></el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column :label="$t('m.label8')" prop="email"></el-table-column>
          <el-table-column :label="$t('m.label9')" prop="name"></el-table-column>
          <el-table-column :label="$t('m.label10')" prop="roleInfo.name"></el-table-column>
          <el-table-column :label="$t('m.label11')" prop="status"></el-table-column>
          <el-table-column :label="$t('m.label14')">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-text="$t('m.label15')">编辑
              </el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"
                         v-if="scope.row.id!= 1" v-text="$t('m.label16')">删除
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

    <AddPopup :PopupTitle="$t('m.label18')" :showPopUp="showPopUp" @saveForm="saveForm" @closePopup="closePopup"
              @before-close="beforeClose">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item :label="$t('m.label19')" prop="email">
          <el-input v-model="form.email" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.label20')" prop="name">
          <el-input v-model="form.name" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.label21')" prop="password">
          <el-input v-model="form.password" size="small" type="password"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.label22')">
          <el-select v-model="value1" placeholder="" size="small" :disabled="adminEditStatus">
            <el-option :label="item.name" :key="item.value" :value="item.id" v-for="item in options1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('m.label23')">
          <el-select v-model="value2" placeholder="" size="small" :disabled="adminEditStatus">
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
      let validcodeName = (rule, value, callback) => {
        let reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
        if (!reg.test(value)) {
          callback(new Error(this.$t('m.label24')))
        } else {
          callback()
        }
      };
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
          label: this.$t('m.label25')
        }, {
          value: '1',
          label: this.$t('m.label26')
        }],
        value2: '1',
        rules: {
          email: [
            {required: true, message: this.$t('m.label27'), trigger: 'blur'},
            {validator: validcodeName, trigger: 'blur'}
          ],
          name: [
            {required: true, message: this.$t('m.label28'), trigger: 'blur'}
          ],
          password: [
            {required: true, message: this.$t('m.label29'), trigger: 'blur'}
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
            this.$alert(this.$t('m.label30'))
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
            this.$alert(this.$t('m.label30'))
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
                    message: this.$t('m.label31'),
                    type: 'success'
                  });
                  this.showPopUp = false;
                  this.getAdminList()
                } else {
                  this.$message.error(this.$t('m.label30'));
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
                    message: this.$t('m.label31'),
                    type: 'success'
                  });
                  this.showPopUp = false;
                  this.getAdminList()
                } else {
                  this.$message.error(this.$t('m.label30'));
                }
              });
            }
          }
        })
      },
      handleDelete(index, row) {
        this.$confirm(this.$t('m.label32'), this.$t('m.label33'), {
          confirmButtonText: this.$t('m.label34'),
          cancelButtonText: this.$t('m.label35'),
          type: 'warning'
        }).then(() => {
          this.$api.sendRequest("deleteAdmin", {adminId: row.id}).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: this.$t('m.label36')
              });
              this.getAdminList()
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
