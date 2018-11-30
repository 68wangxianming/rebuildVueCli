<template>
  <div class="userInfo">
    <div class="search">
      <el-input
        size="small"
        :placeholder="$t('m.label46')"
        suffix-icon="el-icon-date"
        v-model="configKey">
      </el-input>
      <el-input
        size="small"
        :placeholder="$t('m.label47')"
        suffix-icon="el-icon-date"
        v-model="description">
      </el-input>
      <el-button type="primary" size="small" @click="getSysConfig" v-text="$t('m.label5')">查询</el-button>
      <el-button type="primary" size="small" @click="empty" v-text="$t('m.label6')">清空</el-button>
    </div>
    <div class="content">
      <template>
        <el-table :data="userData" style="width: 99%;" size="medium" v-loading="loading">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="id"><span>{{ props.row.id }}</span></el-form-item>
                <el-form-item :label="$t('m.label46')"><span>{{ props.row.configKey }}</span></el-form-item>
                <el-form-item :label="$t('m.label48')"><span>{{ props.row.configValue }}</span></el-form-item>
                <el-form-item :label="$t('m.label47')"><span>{{ props.row.description }}</span></el-form-item>
                <el-form-item :label="$t('m.label12')"><span>{{ props.row._createTime }}</span></el-form-item>
                <el-form-item :label="$t('m.label13')"><span>{{ props.row._updateTime }}</span></el-form-item>
              </el-form>
            </template>
          </el-table-column>
          <el-table-column :label="$t('m.label46')" prop="configKey"></el-table-column>
          <el-table-column :label="$t('m.label48')" prop="configValue"></el-table-column>
          <el-table-column :label="$t('m.label47')" prop="description"></el-table-column>
          <el-table-column :label="$t('m.label12')" prop="_createTime"></el-table-column>
          <el-table-column :label="$t('m.label14')">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)" v-text="$t('m.label15')">编辑
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

    <AddPopup :PopupTitle="$t('m.label49')" :showPopUp="showPopUp" @saveForm="saveForm" @closePopup="closePopup"
              @before-close="beforeClose">
      <el-form :rules="rules" ref="form" :model="form" label-width="80px">
        <el-form-item :label="$t('m.label46')">
          <el-input v-model="form.configKey" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.label48')" prop="configValue">
          <el-input v-model="form.configValue" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.label47')" prop="description">
          <el-input v-model="form.description" size="small"></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.label12')">
          <el-input v-model="form._createTime" size="small" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('m.label13')">
          <el-input v-model="form._updateTime" size="small" disabled></el-input>
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
        configKey: '',
        description: '',
        name: '',
        userData: [],
        currentPage: 1,
        perPage: 10,
        totalPage: null,
        rules: {
          configValue: [
            {required: true, message: this.$t('m.label50'), trigger: 'blur'}
          ],
          description: [
            {required: true, message: this.$t('m.label51'), trigger: 'blur'}
          ],
        },
        form: {
          configValue: '',
          description: '',
        },
      }
    },
    created() {
      this.getSysConfig()
    },
    methods: {
      getSysConfig() {
        let para = {
          description: this.description,
          configKey: this.configKey,
          currentPage: this.currentPage,
          perPage: this.perPage,
        };
        this.$api.sendRequest('getSysConfig', para, {}, true, "loading", this).then(res => {
          if (res.code == 200) {
            let data = res.data;
            data.items.forEach((v) => {
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
        this.getSysConfig()
      },
      handleCurrentChange(val) {
        this.currentPage = val
        this.getSysConfig()
      },
      empty() {
        this.configKey = ''
        this.description = ''
      },
      closePopup() {
        this.showPopUp = false
      },
      beforeClose(done) {
        this.showPopUp = false;
        done && done();
      },
      handleEdit(index, row) {
        this.form = row
        this.showPopUp = true
      },
      saveForm() {
        this.$refs.form.validate((valid) => {
          if (valid) {

            //修改用户
            this.$api.sendRequest('saveSysConfig', {configInfo: this.form}).then(res => {
              if (res.code == 200) {
                let data = res.data;
                this.userData = data.items;
                this.$message({
                  message: 'success',
                  type: 'success'
                });
                this.showPopUp = false;
                this.getSysConfig()
              } else {
                this.$message.error(this.$t('m.label30'));
              }
            });
          }
        })
      },
      handleDelete(index, row) {
        let para = {
          adminId: row.id
        }
        this.$api.sendRequest('deleteAdmin', para).then(res => {
          if (res.code == 200) {
            this.$message({
              message: 'success',
              type: 'success'
            });
            this.getSysConfig()
          } else {
            this.$message.error(this.$t('m.label30'));
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
    .el-input {
      width: 250px;
    }
  }
</style>
