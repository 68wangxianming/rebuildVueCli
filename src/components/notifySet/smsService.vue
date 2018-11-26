<template>
  <div class="userInfo">
    <div class="search">
      <el-input
        size="small"
        placeholder="编号"
        suffix-icon="el-icon-date"
        v-model="name">
      </el-input>
      <el-button type="primary" size="small" @click="getSmsConfig">查询</el-button>
      <el-button type="primary" size="small" @click="empty">清空</el-button>
    </div>
    <div class="content">
      <template>
        <el-table :data="userData" style="width: 99%;" size="medium" v-loading="loading">
          <el-table-column label="id" prop="id"></el-table-column>
          <el-table-column label="编号" prop="code"></el-table-column>
          <el-table-column label="是否启用" prop="status"></el-table-column>
          <el-table-column label="更新时间" prop="_updateTime"></el-table-column>
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

    <AddPopup PopupTitle="新增/修改拒绝类型" :showPopUp="showPopUp" @saveForm="saveForm" @closePopup="closePopup"
              @before-close="beforeClose">
      <el-form label-width="80px">
        <el-form-item :label="item" v-for="item in configKeys" :key="item">
          <el-input v-model="config[item]" size="small"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-switch
            v-model="value2"
            active-text="用户状态">
          </el-switch>
        </el-form-item>
        <!--<el-form-item label="密码" prop="password">-->
        <!--<el-input v-model="form.password" size="small"></el-input>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="sender" prop="sender">-->
        <!--<el-input v-model="form.sender" size="small"></el-input>-->
        <!--</el-form-item>-->
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
        name: '',
        userData: [],
        currentPage: 1,
        perPage: 10,
        totalPage: null,
        configInfo: {},
        config: {},
        configKeys: [],
        value2: true,
      }
    },
    created() {
      this.getSmsConfig()
    },
    methods: {
      getSmsConfig() {
        let para = {
          code: this.name,
          currentPage: this.currentPage,
          perPage: this.perPage,
        };
        this.$api.sendRequest('getSmsConfig', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            data.items.forEach((v) => {
              v.status = v.status && '启用' || '禁用'
              v._createTime = this.$Func.timeConversion(v.createTime)
              v._updateTime = this.$Func.timeConversion(v.updateTime)
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
        this.getSmsConfig()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getSmsConfig()
      },
      empty() {
        this.name = "";
      },
      closePopup() {
        this.showPopUp = false
      },
      beforeClose(done) {
        this.showPopUp = false;
        done && done();
      },
      handleEdit(index, row) {
        this.value2 = this.$Func.returnSmsNum(row.status) && true || false
        this.configInfo = row;
        this.config = JSON.parse(JSON.parse(row.config));
        this.configKeys = Object.keys(this.config);
        this.showPopUp = true
        this.openRoleModelDialog(row);
      },
      //打开编辑/新增角色弹窗
      openRoleModelDialog(role) {
        role && (this.form = role);
        this.showPopUp = true
      },
      saveForm() {
        this.configInfo.status = this.value2 && 1 || 0
        this.configInfo.config = JSON.stringify(this.config);
        //保存用户
        this.$api.sendRequest('saveSmsConfig', {configInfo: this.configInfo}).then(res => {
          if (res.code == 200) {
            this.$message({
              message: 'success',
              type: 'success'
            });
            this.showPopUp = false;
            this.getSmsConfig()
          } else {
            this.$message.error('fail');
          }
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
