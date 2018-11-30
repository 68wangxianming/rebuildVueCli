<template>
  <div class="userInfo">
    <div class="search">
      <el-button type="primary" size="small" @click="addNew">新 增</el-button>
    </div>
    <div class="content">
      <template>
        <el-table :data="userData" style="width: 99%;" size="medium" v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="客服记录编号"><span>{{ props.row.externalNo}}</span></el-form-item>
                <el-form-item label="处理人"><span>{{ props.row.adminInfo.name}}</span></el-form-item>
                <el-form-item label="处理时间"><span>{{ props.row._updateTime}}</span></el-form-item>
                <el-form-item label="问题类型"><span>{{ props.row.type }}</span></el-form-item>
                <el-form-item label="问题描述"><span>{{ props.row.question }}</span></el-form-item>
                <el-form-item label="解决方案"><span>{{ props.row.answer }}</span></el-form-item>
                <el-form-item label="是否已解决"><span>{{ props.row.status }}</span></el-form-item>
                <el-form-item label="备注"><span>{{ props.row.note }}</span></el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="客服记录编号" prop="externalNo"></el-table-column>
          <el-table-column label="处理人" prop="adminInfo.name"></el-table-column>
          <el-table-column label="处理时间" prop="_updateTime"></el-table-column>
          <el-table-column label="问题类型" prop="type"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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


    <AddPopup PopupTitle="客户服务情况记录" :showPopUp="showPopUp" @saveForm="saveForm" @closePopup="closePopup"
              @before-close="beforeClose">
      <el-form label-width="80px">
        <el-form-item label="问题类型">
          <template>
            <el-select v-model="value" placeholder="请选择" size="small">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </template>
        </el-form-item>
        <el-form-item label="问题描述">
          <el-input
            type="textarea"
            :rows="3"
            v-model="question">
          </el-input>
        </el-form-item>
        <el-form-item label="解决方案">
          <el-input
            type="textarea"
            :rows="3"
            v-model="answer">
          </el-input>
        </el-form-item>
        <el-form-item label="是否解决">
          <template>
            <el-radio v-model="status" label="1">是</el-radio>
            <el-radio v-model="status" label="0">否</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :rows="3"
            v-model="note">
          </el-input>
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
        adminId: '',
        id: '',
        loading: false,
        showPopUp: false,
        userData: [],
        currentPage: 1,
        perPage: 10,
        totalPage: null,
        question: '',
        answer: '',
        status: '',
        note: '',
        value: '',
        options: [{
          value: '0',
          label: 'APP-注册登陆'
        }, {
          value: '1',
          label: 'APP-信息验证'
        }, {
          value: '2',
          label: 'APP-人脸识别'
        }, {
          value: '3',
          label: 'APP-借款申请'
        }, {
          value: '4',
          label: 'APP-还款支付'
        }, {
          value: '5',
          label: 'APP-其他'
        }],
        loanId: '',
        userId: '',
        createTime: '',
        externalNo: '',
        resolveTime: ''
      }
    },
    created() {
      this.loanId = this.$route.query.loanId || localStorage.getItem('loanId')
      this.userId = this.$route.query.userId || localStorage.getItem('userId')
      this.getCustomRecord()
    },
    methods: {
      getCustomRecord() {
        let para = {
          loanId: this.loanId,
          currentPage: this.currentPage,
          perPage: this.perPage,
        };
        this.$api.sendRequest('getCustomRecord', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            console.log(data);
            data.items.forEach((v) => {
              v._createTime = this.$Func.timeConversion(v.createTime)
              v._updateTime = this.$Func.timeConversion(v.updateTime)
              v.type = this.$Func.returnCustomerStatus(v.type)
              v.status = this.$Func.returnCustomerResult(v.status)
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
        this.getCustomRecord()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getCustomRecord()
      },
      addNew() {
        this.id = ''
        this.value = ''
        this.question = ''
        this.answer = ''
        this.status = ''
        this.note = ''
        this.showPopUp = true
      },
      handleEdit(index, row) {
        this.adminId = row.adminId
        this.answer = row.answer
        this.createTime = row.createTime
        this.externalNo = row.externalNo
        this.id = row.id
        this.note = row.note
        this.question = row.question
        this.resolveTime = row.resolveTime
        this.status = this.$Func.returnCustomerResultNum(row.status)
        this.value = row.type
        this.userId = row.userId
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
        if (this.id) {
          this.value = this.$Func.returnCustomerNum(this.value)
          this.$api.sendRequest('saveCustomRecord', {
            recordInfo: {
              adminId: this.adminId,
              answer: this.answer,
              createTime: this.createTime,
              externalNo: this.externalNo,
              id: this.id,
              note: this.note,
              question: this.question,
              resolveTime: this.resolveTime,
              status: this.status,
              loanId: this.loanId,
              type: this.value,
              userId: this.userId,
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
              this.getCustomRecord()
            } else {
              this.$message.error('fail');
            }
          });
        } else {
          this.$api.sendRequest('addCustomRecord', {
            recordInfo: {
              loanId: this.loanId,
              userId: this.userId,
              type: this.value,
              question: this.question,
              answer: this.answer,
              status: this.status,
              note: this.note,
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
              this.getCustomRecord()
            } else {
              this.$message.error('fail');
            }
          });
        }

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
      .el-button {
        letter-spacing: 2px;
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

    .el-textarea {
      width: 350px;
    }
  }
</style>
