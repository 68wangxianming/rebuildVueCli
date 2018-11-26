<template>
  <div class="userInfo">
    <div class="search">
      <div class="item">
        <el-input size="small" placeholder="电话" suffix-icon="el-icon-date" v-model="email"></el-input>
      </div>
      <div class="item">
        <el-input size="small" placeholder="身份证" suffix-icon="el-icon-date" v-model="email"></el-input>
      </div>
      <div class="item">
      </div>
      <div class="item">
        <el-select v-model="value2" placeholder="请选择" size="small">
          <el-option
            v-for="item in options2"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="block item">
        <el-date-picker
          size="small"
          v-model="value4"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </div>
      <div class="item">
        <el-button type="primary" size="small" @click="getAdminList">查询</el-button>
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
                <el-form-item label="用户名"><span>{{ props.row.email }}</span></el-form-item>
                <el-form-item label="姓名"><span>{{ props.row.name }}</span></el-form-item>
                <el-form-item label="角色"><span>{{ props.row.roleInfo.name }}</span></el-form-item>
                <el-form-item label="状态"><span>{{ props.row.status }}</span></el-form-item>
                <el-form-item label="创建时间"><span>{{ props.row.createTime }}</span></el-form-item>
                <el-form-item label="更新时间"><span>{{ props.row.updateTime }}</span></el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column label="用户ID" prop="email"></el-table-column>
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="手机号" prop="roleInfo.name"></el-table-column>
          <el-table-column label="状态" prop="status"></el-table-column>
          <el-table-column label="是否绑卡" prop="status"></el-table-column>
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
          label: '禁用'
        }, {
          value: '1',
          label: '正常'
        }],
        value2: '1',
        value4: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
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
      empty() {
        this.email = "";
        this.name = "";
      },

      handleEdit(index, row) {
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
      flex-wrap:wrap;
      padding-bottom: 20px;
      .item{
        margin: 8px 12px;
        .el-input {
          width: 200px;
        }
        .el-select{
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
