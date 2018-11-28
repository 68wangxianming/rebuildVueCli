<template>
  <div class="userInfo">
    <div class="search">
      <el-button type="primary" size="small">新 增</el-button>
    </div>
    <div class="content">
      <template>
        <el-table :data="userData" style="width: 99%;" size="medium" v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="客服记录编号"><span>{{ props.row.email }}</span></el-form-item>
                <el-form-item label="处理人"><span>{{ props.row.name }}</span></el-form-item>
                <el-form-item label="处理时间"><span>{{ props.row.roleInfo.name }}</span></el-form-item>
                <el-form-item label="问题类型"><span>{{ props.row.status }}</span></el-form-item>
                <el-form-item label="问题描述"><span>{{ props.row.createTime }}</span></el-form-item>
                <el-form-item label="解决方案"><span>{{ props.row.updateTime }}</span></el-form-item>
                <el-form-item label="是否已解决"><span>{{ props.row.updateTime }}</span></el-form-item>
                <el-form-item label="备注"><span>{{ props.row.updateTime }}</span></el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="客服记录编号" prop="email"></el-table-column>
          <el-table-column label="处理人" prop="name"></el-table-column>
          <el-table-column label="处理时间" prop="roleInfo.name"></el-table-column>
          <el-table-column label="问题类型" prop="status"></el-table-column>
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
        userData: [],
        currentPage: 1,
        perPage: 10,
        totalPage: null,
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
            this.$alert('请求失败')
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
