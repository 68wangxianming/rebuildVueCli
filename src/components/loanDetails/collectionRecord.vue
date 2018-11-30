<template>
  <div class="collectionRecord">
    <template>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="width: 98.5%;">
        <el-tab-pane label="短信" name="first">
          <el-button type="primary" size="small" @click="sendSms">发送短信</el-button>

          <template>
            <el-table :data="userData1" style="width: 99%;" size="medium" v-loading="loading">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="短信编号"><span>{{ props.row.id }}</span></el-form-item>
                    <el-form-item label="发送者"><span>{{ props.row.sendName }}</span></el-form-item>
                    <el-form-item label="发送者内容"><span>{{ props.row.content }}</span></el-form-item>
                    <el-form-item label="发送时间"><span>{{ props.row.createTime }}</span></el-form-item>
                    <el-form-item label="类型"><span>{{ props.row.type }}</span></el-form-item>
                    <el-form-item label="渠道"><span>{{ props.row.code }}</span></el-form-item>
                    <el-form-item label="发送状态"><span>{{ props.row.status }}</span></el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="短信编号" prop="id"></el-table-column>
              <el-table-column label="发送者" prop="sendName"></el-table-column>
              <el-table-column label="发送者内容" prop="content"></el-table-column>
              <el-table-column label="发送时间" prop="createTime"></el-table-column>
              <el-table-column label="类型" prop="type"></el-table-column>
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
        </el-tab-pane>


        <el-tab-pane label="电话" name="second">
          <el-button type="primary" size="small" @click="callPhone">拨打电话</el-button>
          <template>
            <el-table :data="userData2" style="width: 99%;" size="medium" v-loading="loading">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="电话编号"><span>{{ props.row.id }}</span></el-form-item>
                    <el-form-item label="拨打电话"><span>{{ props.row.calledPhone }}</span></el-form-item>
                    <el-form-item label="操作者"><span>{{ props.row.sendName }}</span></el-form-item>
                    <el-form-item label="联系状态"><span>{{ props.row.contactStatus }}</span></el-form-item>
                    <el-form-item label="操作时间"><span>{{ props.row.createTime }}</span></el-form-item>
                    <el-form-item label="承诺还款时间"><span>{{ props.row.promisePaidOffTime }}</span></el-form-item>
                    <el-form-item label="逾期原因"><span>{{ props.row.reason }}</span></el-form-item>
                    <el-form-item label="备注"><span>{{ props.row.note }}</span></el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="电话编号" prop="id"></el-table-column>
              <el-table-column label="拨打电话" prop="calledPhone"></el-table-column>
              <el-table-column label="操作者" prop="sendName"></el-table-column>
              <el-table-column label="联系状态" prop="contactStatus"></el-table-column>
              <el-table-column label="操作时间" prop="createTime"></el-table-column>
              <el-table-column label="逾期原因" prop="reason"></el-table-column>
            </el-table>
          </template>
          <!--分页Start-->
          <template>
            <div class="block">
              <el-pagination
                background
                @size-change="handleSizeChange2"
                @current-change="handleCurrentChange2"
                :current-page="currentPage2"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="perPage2"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalPage2">
              </el-pagination>
            </div>
          </template>
          <!--分页End-->
        </el-tab-pane>
      </el-tabs>
    </template>

    <AddPopup PopupTitle="发送短信" :showPopUp="showPopUp" @saveForm="saveForm" @closePopup="closePopup"
              @before-close="beforeClose">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item label="发送内容" prop="content">
          <el-input v-model="form.content" size="small" type="textarea"></el-input>
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
        activeName: 'first',
        loading: false,
        showPopUp: false,
        userData1: [],
        userData2: [],
        currentPage: 1,
        perPage: 10,
        totalPage: null,
        currentPage2: 1,
        perPage2: 10,
        totalPage2: null,
        userId: '',
        loanId: '',
        type: 'OVERDUE_REMIND',
        form: {
          content: ''
        },
        rules: {
          content: [
            {required: true, message: this.$t('m.label28'), trigger: 'blur'}
          ],
        },
      };
    },
    created() {
      this.userId = this.$route.query.userId || localStorage.getItem('userId')
      this.loanId = this.$route.query.loanId || localStorage.getItem('loanId')
      this.getSmsRecord()
      this.getCollectRecord()
    },
    methods: {
      getSmsRecord() {
        let para = {
          type: this.type,
          userId: this.userId, //用户名/邮箱
          loanId: this.loanId, //姓名
          currentPage: this.currentPage,
          perPage: this.perPage,
        };
        this.$api.sendRequest('getSmsRecord', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            data.items.forEach((v) => {
              v.createTime = this.$Func.timeConversion(v.createTime)
              v.updateTime = this.$Func.timeConversion(v.updateTime)
              v.status = this.$Func.returnSendSmsStatus(v.status)
              v.sendName = v.adminInfo&& v.adminInfo.name || v.operatorType
            })
            this.totalPage = data.pagination.totalCount;
            this.userData1 = data.items;
          } else {
            this.$alert('请求失败')
          }
        })
      },
      getCollectRecord() {
        let para = {
          loanId: this.loanId,
          currentPage: this.currentPage2,
          perPage: this.perPage2,
        };
        this.$api.sendRequest('getCollectRecord', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            data.items.forEach((v) => {
              v.createTime = this.$Func.timeConversion(v.createTime)
              v.updateTime = this.$Func.timeConversion(v.updateTime)
              v.promisePaidOffTime = this.$Func.timeConversion(v.promisePaidOffTime)
              v.contactStatus = this.$Func.returnCollectionStatus(v.contactStatus)
              v.reason = this.$Func.returnCollectionReasonStatus(v.reason)
              v.sendName = v.adminInfo&& v.adminInfo.name || v.operatorType
            })
            this.totalPage2 = data.pagination.totalCount;
            this.userData2 = data.items;
          } else {
            this.$alert('请求失败')
          }
        })
      },
      sendSms() {
        this.showPopUp = true
      },
      beforeClose(done) {
        this.showPopUp = false;
        done && done();
      },
      saveForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$api.sendRequest('sendCollectSms', {
              loanId: this.loanId,
              content: this.form.content
            }, {}, true, "loading", this).then(res => {
              if (res.code == 200) {
                let data = res.data;
                this.showPopUp = false
                this.$message({
                  message: 'success',
                  type: 'success'
                });
                this.getSmsRecord()
              } else {
                this.$alert('请求失败')
              }
            })
          }
        })
      },
      handleClick(tab, event) {
      },
      handleSizeChange(val) {
        this.perPage = val
        this.getSmsRecord()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getSmsRecord()
      },
      handleSizeChange2(val) {
        this.perPage2 = val
        this.getSmsRecord()
      },
      handleCurrentChange2(val) {
        this.currentPage2 = val
        this.getSmsRecord()
      },
      callPhone() {
        this.$router.push({
          path:'telephoneCollection',
          query:{loanId:this.loanId}
        })
      },
      closePopup() {
        this.showPopUp = false
      },
    },
    components: {
      AddPopup,
    }
  };
</script>

<style scoped lang="less">
  .collectionRecord {
    .block {
      text-align: right;
      margin-top: 20px;
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
