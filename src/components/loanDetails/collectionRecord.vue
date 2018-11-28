<template>
  <div class="collectionRecord">
    <template>
      <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="width: 98.5%;">
        <el-tab-pane label="短信" name="first">
          <el-button type="primary" size="small">发送短信</el-button>

          <template>
            <el-table :data="userData" style="width: 99%;" size="medium" v-loading="loading">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="短信编号"><span>{{ props.row.email }}</span></el-form-item>
                    <el-form-item label="发送者"><span>{{ props.row.name }}</span></el-form-item>
                    <el-form-item label="发送时间"><span>{{ props.row.roleInfo.name }}</span></el-form-item>
                    <el-form-item label="类型"><span>{{ props.row.status }}</span></el-form-item>
                    <el-form-item label="渠道"><span>{{ props.row.createTime }}</span></el-form-item>
                    <el-form-item label="发送状态"><span>{{ props.row.updateTime }}</span></el-form-item>
                    <el-form-item label="抵达状态"><span>{{ props.row.updateTime }}</span></el-form-item>
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column label="短信编号" prop="email"></el-table-column>
              <el-table-column label="发送者" prop="name"></el-table-column>
              <el-table-column label="发送时间" prop="roleInfo.name"></el-table-column>
              <el-table-column label="类型" prop="status"></el-table-column>
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

        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        activeName: 'first',
        loading: false,
        showPopUp: false,
        userData: [],
        currentPage: 1,
        perPage: 10,
        totalPage: null,
      };
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
      callPhone() {
        this.$router.push('telephoneCollection')
      }
    },
  };
</script>

<style scoped lang="less">
  .collectionRecord {
    .block{
      text-align: right;
      margin-top: 20px;
    }
  }
</style>
