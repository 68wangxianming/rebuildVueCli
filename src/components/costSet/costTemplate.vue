<template>
  <div class="userInfo">
    <div class="search">
      <el-input
        size="small"
        placeholder="模版标号"
        suffix-icon="el-icon-date"
        v-model="tempNo">
      </el-input>
      <el-button type="primary" size="small" @click="getFeeTemplate">查询</el-button>
      <el-button type="primary" size="small" @click="empty">清空</el-button>
      <el-button type="primary" size="small" @click="addNew">新增</el-button>
    </div>
    <div class="content">
      <template>
        <el-table :data="userData" style="width: 99%;" size="medium" v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="模板ID"><span>{{ props.row.id }}</span></el-form-item>
                <el-form-item label="模板编号"><span>{{ props.row.tempNo }}</span></el-form-item>
                <el-form-item label="模板级别"><span>{{ props.row.tempLevel }}</span></el-form-item>
                <el-form-item label="借款额度下限（Rp）"><span>{{ props.row.moneyMin }}</span></el-form-item>
                <el-form-item label="借款额度上限（Rp）"><span>{{ props.row.moneyMax }}</span></el-form-item>
                <el-form-item label="借款期限下限（day）"><span>{{ props.row.dayMin }}</span></el-form-item>
                <el-form-item label="借款期限上限（day）"><span>{{ props.row.dayMax }}</span></el-form-item>
                <el-form-item label="日利率（‱）"><span>{{ props.row.dailyInterest }}</span></el-form-item>
                <el-form-item label="到期应还本息"><span>{{ props.row.money }}</span></el-form-item>
                <el-form-item label="交易费用"><span>{{ props.row.transactionCost }}</span></el-form-item>
                <el-form-item label="平台服务费"><span>{{ props.row.serviceCost }}</span></el-form-item>
                <el-form-item label="平台管理费用"><span>{{ props.row.platformCost }}</span></el-form-item>
                <el-form-item label="快速信审费"><span>{{ props.row.riskCost }}</span></el-form-item>
                <el-form-item label="交易费利率（‱）"><span>{{ props.row.priorFee }}</span></el-form-item>
                <el-form-item label="平台服务费日利率（‱）"><span>{{ props.row.platformFee }}</span></el-form-item>
                <el-form-item label="风控服务费日利率（‱）"><span>{{ props.row.riskFee }}</span></el-form-item>
                <el-form-item label="模版说明"><span>{{ props.row.note }}</span></el-form-item>
                <el-form-item label="状态"><span>{{ props.row._status }}</span></el-form-item>
                <el-form-item label="还款方式"><span>{{ props.row._type }}</span></el-form-item>
                <el-form-item label="创建时间"><span>{{ props.row._createTime }}</span></el-form-item>
                <el-form-item label="修改时间"><span>{{ props.row._updateTime }}</span></el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="模板ID" prop="id"></el-table-column>
          <el-table-column label="模板编号" prop="tempNo"></el-table-column>
          <el-table-column label="创建时间" prop="_createTime"></el-table-column>
          <el-table-column label="修改时间" prop="_updateTime"></el-table-column>
          <el-table-column label="状态" prop="_status"></el-table-column>
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

    <AddPopup PopupTitle="新增/修改角色" :showPopUp="showPopUp" @saveForm="saveForm" @closePopup="closePopup"
              @before-close="beforeClose">
      <el-form :rules="rules" ref="form" :model="form" label-width="180px">
        <el-form-item label="模板编号" prop="tempNo">
          <el-input v-model="form.tempNo" size="small"></el-input>
        </el-form-item>
        <el-form-item label="模板级别" prop="tempLevel">
          <el-input v-model="form.tempLevel" size="small"></el-input>
        </el-form-item>
        <el-form-item label="借款额度下限（Rp）" prop="moneyMin">
          <el-input v-model="form.moneyMin" size="small"></el-input>
        </el-form-item>
        <el-form-item label="借款额度上限（Rp）" prop="moneyMax">
          <el-input v-model="form.moneyMax" size="small"></el-input>
        </el-form-item>
        <el-form-item label="借款期限下限（day）" prop="dayMin">
          <el-input v-model="form.dayMin" size="small"></el-input>
        </el-form-item>
        <el-form-item label="借款期限上限（day）" prop="dayMax">
          <el-input v-model="form.dayMax" size="small"></el-input>
        </el-form-item>
        <el-form-item label="日利率（‱）" prop="dailyInterest">
          <el-input v-model="form.dailyInterest" size="small"></el-input>
        </el-form-item>
        <el-form-item label="到期应还本息" prop="money">
          <el-input v-model="form.money" size="small"></el-input>
        </el-form-item>
        <el-form-item label="交易费用" prop="transactionCost">
          <el-input v-model="form.transactionCost" size="small"></el-input>
        </el-form-item>
        <el-form-item label="平台服务费" prop="serviceCost">
          <el-input v-model="form.serviceCost" size="small"></el-input>
        </el-form-item>
        <el-form-item label="平台账户管理费" prop="platformCost">
          <el-input v-model="form.platformCost" size="small"></el-input>
        </el-form-item>
        <el-form-item label="快速信审费" prop="riskCost">
          <el-input v-model="form.riskCost" size="small"></el-input>
        </el-form-item>
        <el-form-item label="模板说明" prop="note">
          <el-input v-model="form.note" size="small"></el-input>
        </el-form-item>
        <el-form-item label="还款方式" prop="type">
          <el-select v-model="value1" placeholder="" size="small">
            <el-option :label="item.label" :key="item.value" :value="item.value" v-for="item in options1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="value2" placeholder="" size="small">
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
        tempNo: '',
        userData: [],
        currentPage: 1,
        perPage: 10,
        totalPage: null,
        value1: '0',
        options1: [{
          value: '0',
          label: '一次性'
        }, {
          value: '1',
          label: '分期付'
        }],
        value2: '1',
        options2: [{
          value: '0',
          label: '禁用'
        }, {
          value: '1',
          label: '正常'
        }],
        rules: {
          tempNo: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          tempLevel: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          moneyMin: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          moneyMax: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          dayMin: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          dayMax: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          dailyInterest: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          money: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          transactionCost: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          serviceCost: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          platformCost: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          riskCost: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ],
          note: [
            {required: true, message: '不能为空', trigger: 'blur'}
          ]
        },
        form: {
          tempNo: '',
          tempLevel: '',
          moneyMin: '',
          moneyMax: '',
          dayMin: '',
          dayMax: '',
          dailyInterest: '',
          money: '',
          transactionCost: '',
          serviceCost: '',
          platformCost: '',
          riskCost: '',
          note: '',
        },
      }
    },
    created() {
      this.getFeeTemplate()
    },
    methods: {
      getFeeTemplate() {
        let para = {
          tempNo: this.tempNo,
          currentPage: this.currentPage,
          perPage: this.perPage,
        };
        this.$api.sendRequest('getFeeTemplate', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            data.items.forEach((v) => {
              v._createTime = this.$Func.timeConversion(v.createTime)
              v._updateTime = this.$Func.timeConversion(v.updateTime)
              v._status = this.$Func.returnUserStatus(v.status)
              v._type = this.$Func.returnPayMoneyStatus(v.type)
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
        this.getFeeTemplate()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getFeeTemplate()
      },
      empty() {
        this.tempNo = "";
      },
      addNew() {
        this.form = {
          tempNo: '',
          tempLevel: '',
          moneyMin: '',
          moneyMax: '',
          dayMin: '',
          dayMax: '',
          dailyInterest: '',
          money: '',
          transactionCost: '',
          serviceCost: '',
          platformCost: '',
          riskCost: '',
          note: '',
        }
        this.openRoleModelDialog();
      },
      handleEdit(index, row) {
        this.value1 = this.$Func.returnPayMoneyStatus(row.type)
        this.value2 = this.$Func.returnUserStatus(row.status)
        this.openRoleModelDialog(row);
        console.log(row);
      },
      openRoleModelDialog(role) {
        role && (this.form = role);
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
        this.form.type = this.$Func.returnPayMoneyNum(this.value1)
        this.form.status = this.$Func.returnUserStatusNum(this.value2)
        this.$refs.form.validate((valid) => {
          if (valid) {
            //修改用户
            this.$api.sendRequest('saveFeeTemplate', {templateInfo: this.form}).then(res => {
              if (res.code == 200) {
                let data = res.data;
                this.userData = data.items;
                this.$message({
                  message: 'success',
                  type: 'success'
                });
                this.showPopUp = false;
                this.getFeeTemplate()
              } else {
                this.$message.error('fail');
              }
            });
          }
        })
      },
      handleDelete(index, row) {
        this.$confirm('此操作将删除模版是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.sendRequest("removeFeeTemplate", {id: row.id}).then(res => {
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getFeeTemplate()
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
