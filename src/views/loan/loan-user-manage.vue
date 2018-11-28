<template>
  <div class="userInfo">
    <div class="search">
      <div class="item">
        <el-input size="small" placeholder="ID" suffix-icon="el-icon-date" v-model="id"></el-input>
      </div>
      <div class="item">
        <el-input size="small" placeholder="手机" suffix-icon="el-icon-date" v-model="phone"></el-input>
      </div>
      <div class="item">
        <el-input size="small" placeholder="姓名" suffix-icon="el-icon-date" v-model="name"></el-input>
      </div>
      <div class="item">
        <el-input size="small" placeholder="版本号" suffix-icon="el-icon-date" v-model="version"></el-input>
      </div>
      <div class="item">
        <el-select v-model="value1" placeholder="用户状态" size="small">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <el-select v-model="value2" placeholder="是否绑卡" size="small">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="item">
        <el-button type="primary" size="small" @click="getUser">查询</el-button>
      </div>
      <div class="item">
        <el-button type="primary" size="small" @click="empty">清空</el-button>
      </div>
      <div class="item">
        <el-button type="primary" size="small" @click="exportUser">导出Excel</el-button>
      </div>

    </div>
    <div class="content">
      <template>
        <el-table :data="userData" style="width: 99%;" size="medium" v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="用户ID"><span>{{ props.row.id }}</span></el-form-item>
                <el-form-item label="姓名"><span>{{ props.row.profileInfo.name }}</span></el-form-item>
                <el-form-item label="手机号"><span>{{ props.row.phone }}</span></el-form-item>
                <el-form-item label="email"><span>{{ props.row.profileInfo.email }}</span></el-form-item>
                <el-form-item label="idNumber"><span>{{ props.row.profileInfo.idNumber }}</span></el-form-item>
                <el-form-item label="状态"><span>{{ props.row._status }}</span></el-form-item>
                <el-form-item label="个人信息"><span>{{ props.row.verifyProfile }}</span></el-form-item>
                <el-form-item label="联系人信息"><span>{{ props.row.verifyContact }}</span></el-form-item>
                <el-form-item label="工作信息"><span>{{ props.row.verifyJob }}</span></el-form-item>
                <el-form-item label="身份证"><span>{{ props.row.verifyIdCard }}</span></el-form-item>
                <el-form-item label="银行卡"><span>{{ props.row.verifyBankCard }}</span></el-form-item>
                <el-form-item label="是否黑名单"><span>{{ props.row._isBlack }}</span></el-form-item>
                <el-form-item label="创建时间"><span>{{ props.row._createTime }}</span></el-form-item>

              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="用户ID" prop="id"></el-table-column>
          <el-table-column label="姓名" prop="profileInfo.name"></el-table-column>
          <el-table-column label="手机号" prop="phone"></el-table-column>
          <el-table-column label="状态" prop="_status"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="forbiddenUser(scope.$index, scope.row)"
                         v-if="scope.row.status==1">禁用
              </el-button>
              <el-button size="mini" type="danger" @click="enableUser(scope.$index, scope.row)"
                         v-if="scope.row.status!= 1">启用
              </el-button>
              <el-button size="mini" type="danger" @click="blockUser(scope.$index, scope.row)"
                         v-if="scope.row.isBlack!= 1">拉黑
              </el-button>
              <el-button size="mini" type="danger" @click="unblockUser(scope.$index, scope.row)"
                         v-if="scope.row.isBlack== 1">取消拉黑
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
  </div>
</template>

<script>

  export default {
    data() {
      return {
        loading: false,
        showPopUp: false,
        id: '',
        name: '',
        phone: '',
        version: '',
        value1: '',
        options1: [{
          value: '0',
          label: '禁用'
        }, {
          value: '1',
          label: '正常'
        }],
        options2: [{
          value: '0',
          label: '否'
        }, {
          value: '1',
          label: '是'
        }],
        value2: '',
        userData: [],
        currentPage: 1,
        perPage: 10,
        totalPage: null,
      }
    },
    created() {
      this.getUser()
    },
    methods: {
      getUser() {
        let para = {
          id: this.id,
          name: this.name,
          phone: this.phone,
          version: this.version,
          status: this.value1,
          verifyBankCard: this.value2,
          currentPage: this.currentPage,
          perPage: this.perPage,
        };
        this.$api.sendRequest('getUser', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            console.log('getUser', data);
            data.items.forEach((v) => {
              v._createTime = this.$Func.timeConversion(v.createTime)
              v._status = this.$Func.returnUserStatus(v.status)
              v._isBlack = this.$Func.returnIsblackStatus(v.isBlack)
              v.verifyProfile = this.$Func.returnIdentifyStatus(v.verifyProfile)
              v.verifyContact = this.$Func.returnIdentifyStatus(v.verifyContact)
              v.verifyJob = this.$Func.returnIdentifyStatus(v.verifyJob)
              v.verifyIdCard = this.$Func.returnIdentifyStatus(v.verifyIdCard)
              v.verifyBankCard = this.$Func.returnIdentifyStatus(v.verifyBankCard)
            })
            this.totalPage = data.pagination.totalCount;
            this.userData = data.items;
          } else {
            this.$alert('请求失败')
          }
        })
      },
      exportUser() {
        this.$store.dispatch('FLASH_ADMIN_TOKEN');
        let accessToken = this.$store.state.adminToken;
        window.open(`${this.$baseUrl}/api/exportUser?id=${this.id}&name=${this.name}&phone=${this.phone}&version=${this.version}&status=${this.value1}&verifyBankCard=${this.value2}&token=Bearer ${accessToken}`);
      },
      handleSizeChange(val) {
        this.perPage = val
        this.getUser()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getUser()
      },
      empty() {
        this.id = "";
        this.name = "";
        this.phone = "";
        this.version = "";
        this.value1 = "";
        this.value2 = "";
      },

      forbiddenUser(index, row) {
        this.$confirm('此操作将禁用用户是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.sendRequest("forbiddenUser", {id: row.id}).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '成功!'
              });
              this.getUser()
            }
          }).catch(e => {
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      enableUser(index, row) {
        this.$confirm('此操作将启用是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.sendRequest("enableUser", {id: row.id}).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '成功!'
              });
              this.getUser()
            }
          }).catch(e => {
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      blockUser(index, row) {
        this.$confirm('此操作将拉黑用户是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.sendRequest("blockUser", {id: row.id}).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '成功!'
              });
              this.getUser()
            }
          }).catch(e => {
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      unblockUser(index, row) {
        this.$confirm('此操作将取消拉黑是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.sendRequest("unblockUser", {id: row.id}).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '成功!'
              });
              this.getUser()
            }
          }).catch(e => {
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    },
    components: {}
  }
</script>

<style scoped lang="less">
  .userInfo {
    padding: 8px;
    .search {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding-bottom: 20px;
      .item {
        margin: 8px 12px;
        .el-input {
          width: 200px;
        }
        .el-select {
          width: 200px;
        }
        .el-button {
          letter-spacing: 2px;
        }
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
  }
</style>
