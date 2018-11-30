<template>
  <div class="userInfo">
    <div class="search">
      <el-button type="primary" size="small" @click="callRecord">电 核</el-button>
    </div>
    <div class="content">
      <template>
        <el-table :data="userData" style="width: 99%;" size="medium" v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="userId"><span>{{ props.row.userId }}</span></el-form-item>
                <el-form-item label="处理编号"><span>{{ props.row.externalNo }}</span></el-form-item>
                <el-form-item label="处理人"><span>{{ props.row.adminInfo.name }}</span></el-form-item>
                <el-form-item label="处理时间"><span>{{ props.row.updateTime }}</span></el-form-item>
                <el-form-item label="处理结果"><span>{{ props.row.result }}</span></el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="处理编号" prop="externalNo"></el-table-column>
          <el-table-column label="处理人" prop="adminInfo.name"></el-table-column>
          <el-table-column label="处理时间" prop="updateTime"></el-table-column>
          <el-table-column label="处理结果" prop="result"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">电核详情
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
        loanId: '',
        loading: false,
        showPopUp: false,
        userData: [],
        currentPage: 1,
        perPage: 10,
        totalPage: null,
      }
    },
    created() {
      this.loanId = this.$route.query.loanId || localStorage.getItem("loanId")
      this.getTelResultList()
    },
    methods: {
      callRecord() {
        this.$router.push({
          path: 'telFilling',
          query: {loanId: this.loanId}
        })
      },
      getTelResultList() {
        let para = {
          loanId: this.loanId,
          time: '',
          currentPage: this.currentPage,
          perPage: this.perPage,
        };
        this.$api.sendRequest('getTelResultList', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            data.items.forEach((v) => {
              v.createTime = this.$Func.timeConversion(v.createTime)
              v.updateTime = this.$Func.timeConversion(v.updateTime)
              v.status = this.$Func.returnUserStatus(v.status)
              v.result = this.$Func.returnCallRecordStatus(v.result)
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
        this.getTelResultList()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getTelResultList()
      },
      handleDelete(index, row) {
        localStorage.setItem("externalNo", row.externalNo);
        localStorage.setItem("loanId", row.loanId);
        this.$router.push({
          path: 'telRecord',
          query: {externalNo: row.externalNo, loanId: row.id}
        })
      }
    },
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
  }
</style>
