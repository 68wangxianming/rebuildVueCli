<template>
  <div class="userInfo">
    <div class="search">
      <div class="item">
        <el-input size="small" placeholder="userId" suffix-icon="el-icon-date" v-model="userId"></el-input>
      </div>
      <div class="item">
        <el-input size="small" placeholder="订单ID" suffix-icon="el-icon-date" v-model="loanNo"></el-input>
      </div>
      <div class="item">
        <el-input size="small" placeholder="电话" suffix-icon="el-icon-date" v-model="phone"></el-input>
      </div>
      <div class="item">
        <el-input size="small" placeholder="身份证" suffix-icon="el-icon-date" v-model="idNumber"></el-input>
      </div>
      <div class="item">
        <el-select v-model="value1" placeholder="请选择" size="small">
          <el-option
            v-for="item in options1"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="block item">
        <el-date-picker
          size="small"
          v-model="time"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="item">
        <el-button type="primary" size="small" @click="getLoanList">查询</el-button>
      </div>
      <div class="item">
        <el-button type="primary" size="small" @click="empty">清空</el-button>
      </div>

    </div>
    <div class="content">
      <template>
        <el-table :data="userData" style="width: 99%;" size="medium" v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="订单ID"><span>{{ props.row.loanNo }}</span></el-form-item>
                <el-form-item label="userId"><span>{{ props.row.userId }}</span></el-form-item>
                <el-form-item label="姓名"><span>{{ props.row.profileInfo.name }}</span></el-form-item>
                <el-form-item label="手机号"><span>{{ props.row.userInfo.phone }}</span></el-form-item>
                <el-form-item label="身份证号"><span>{{ props.row.profileInfo.idNumber }}</span></el-form-item>
                <el-form-item label="借款金额"><span>{{ props.row.amount }}</span></el-form-item>
                <el-form-item label="借款期数"><span>{{ props.row.period }}</span></el-form-item>
                <el-form-item label="提交时间"><span>{{ props.row._submitTime }}</span></el-form-item>
                <el-form-item label="放款时间"><span>{{ props.row._paidOffTime }}</span></el-form-item>
                <el-form-item label="取消时间"><span>{{ props.row._cancelTime }}</span></el-form-item>
                <el-form-item label="状态"><span>{{ props.row.status }}</span></el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="订单ID"  width="150">
            <template slot-scope="scope">
              <a style="color: #409EFF" @click="goDetails(scope.$index, scope.row)">{{scope.row.loanNo}}</a>
            </template>
          </el-table-column>
          <el-table-column label="姓名" prop="profileInfo.name"></el-table-column>
          <el-table-column label="手机号" prop="userInfo.phone"></el-table-column>
          <el-table-column label="借款金额" prop="amount"></el-table-column>
          <el-table-column label="借款期数" prop="period" width="150"></el-table-column>
          <el-table-column label="状态" prop="status" width="100"></el-table-column>
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
  </div>
</template>

<script>

  export default {
    data() {
      return {
        loading: false,
        showPopUp: false,
        phone: '',
        idNumber: '',
        time: null,
        loanNo: '',
        userId: '',
        userData: [],
        currentPage: 1,
        perPage: 10,
        totalPage: null,
        value1: '',
        options1: [{
          value: '0',
          label: '创建'
        }, {
          value: '1',
          label: '提交'
        }, {
          value: '2',
          label: '取消'
        }, {
          value: '3',
          label: '待审核'
        }, {
          value: '4',
          label: '审核拒绝'
        }, {
          value: '5',
          label: '待电核'
        }, {
          value: '6',
          label: '待放款'
        }, {
          value: '7',
          label: '放款中'
        }, {
          value: '8',
          label: '放款失败'
        }, {
          value: '9',
          label: '放款成功'
        }, {
          value: '10',
          label: '已逾期'
        }, {
          value: '11',
          label: '逾期还清'
        }, {
          value: '12',
          label: '正常还清'
        }],
      }
    },
    created() {
      this.getLoanList()
    },
    methods: {
      getLoanList() {
        if (this.time != null) {
          this.time = new Date(this.time[0]).getTime() + "~" + new Date(this.time[1]).getTime();
        }
        let para = {
          phone: this.phone,
          idNumber: this.idNumber,
          time: this.time,
          status: this.value1,
          loanNo: this.loanNo,
          userId: this.userId,
          currentPage: this.currentPage,
          perPage: this.perPage,
        };
        this.$api.sendRequest('getLoanList', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            data.items.forEach((v) => {
              v._createTime = this.$Func.timeConversion(v.createTime)
              v._updateTime = this.$Func.timeConversion(v.updateTime)
              v._submitTime = this.$Func.timeConversion(v.submitTime)
              v._paidOffTime = this.$Func.timeConversion(v.paidOffTime)
              v._cancelTime = this.$Func.timeConversion(v.cancelTime)
              v.status = this.$Func.returnOrderStatus(v.status)
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
        this.getLoanList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getLoanList()
      },
      empty() {
        this.phone = ''
        this.idNumber = ''
        this.time = null
        this.loanNo = ''
        this.userId = ''
      },

      goDetails(index, row) {
        this.$router.push({
          path: 'loan-details',
          query: {loanNo: row.loanNo,userId:row.userId,loanId:row.id}
        })
      },
      saveForm() {
      },
      handleDelete(index, row) {
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
