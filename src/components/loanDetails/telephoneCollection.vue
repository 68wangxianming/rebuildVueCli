<template>
  <div class="telephoneCollection">
    <div class="main">
      <template>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="用户联系方式" name="first">
            <div class="contactInfo">
              <h4>个人信息</h4>
              <div class="content">
                <div class="item">
                  <p><span class="label">姓名：</span><span>Matthew  Snow</span></p>
                  <p><span class="label">手机号：</span><span>8201809020</span></p>
                </div>
                <div class="item">
                  <el-checkbox v-model="checked">备选项</el-checkbox>
                </div>
              </div>
            </div>
            <div class="contactInfo">
              <h4>联系人信息</h4>
              <div class="content">
                <div class="item">
                  <p><span class="label">联系人1：</span><span>Matthew  Snow</span></p>
                  <p><span class="label">亲属关系：</span><span>兄弟姐妹</span></p>
                  <p><span class="label">联系电话：</span><span>8201809280</span></p>
                </div>
                <div class="item">
                  <el-checkbox v-model="checked">是否催收</el-checkbox>
                </div>
              </div>

              <div class="content">
                <div class="item">
                  <p><span class="label">联系人1：</span><span>Matthew  Snow</span></p>
                  <p><span class="label">亲属关系：</span><span>兄弟姐妹</span></p>
                  <p><span class="label">联系电话：</span><span>8201809280</span></p>
                </div>
                <div class="item">
                  <el-checkbox v-model="checked">是否催收</el-checkbox>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="联系人通话Top10" name="second">
            <div class="content" style="padding-bottom: 200px;">
              <template>
                <el-table
                  ref="multipleTable"
                  :data="tableData3"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    label="日期"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
                  </el-table-column>
                </el-table>
                <div style="margin-top: 20px">
                  <el-button @click="toggleSelection([tableData3[1], tableData3[2]])">切换第二、第三行的选中状态</el-button>
                  <el-button @click="toggleSelection()">取消选择</el-button>
                </div>
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
          </el-tab-pane>
          <el-tab-pane label="通讯录" name="third">
            <div class="content" style="padding-bottom: 200px;">
              <template>
                <el-table
                  ref="multipleTable"
                  :data="tableData3"
                  tooltip-effect="dark"
                  style="width: 100%"
                  @selection-change="handleSelectionChange">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    label="日期"
                    width="120">
                    <template slot-scope="scope">{{ scope.row.date }}</template>
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="姓名"
                    width="120">
                  </el-table-column>
                  <el-table-column
                    prop="address"
                    label="地址"
                    show-overflow-tooltip>
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
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>

    <div class="submitGroup">
      <h4 class="title">逾期原因</h4>
      <el-form label-width="120px">
        <el-form-item label="联系状态" prop="email">
          <el-radio-group v-model="radio2">
            <el-radio :label="3">备选项</el-radio>
            <el-radio :label="6">备选项</el-radio>
            <el-radio :label="9">备选项</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="承诺还款时间" prop="name">
          <template>
            <div class="time">
              <el-date-picker
                size="small"
                v-model="value1"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="备注信息" prop="name">
          <el-input
            type="textarea"
            size="small"
            placeholder="请输入内容"
            v-model="textarea3">
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-button type="primary" size="small">保存</el-button>
          <el-button size="small">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentPage: 1,
        perPage: 10,
        totalPage: null,
        value1:'',
        checked: true,
        activeName: 'first',
        radio2: 3,
        textarea3: '',
        tableData3: [
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
          {date: '2016-05-03', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'},
        ],
        multipleSelection: []
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.perPage = val
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
    }
  }
</script>

<style lang="less">
  .telephoneCollection {
    width: 100%;
    .main {
      margin: 8px;
      .contactInfo {
        width: 98%;
        height: auto;
        margin: 10px auto;
        h4 {
          border-bottom: 2px solid #F5F5F5;
          line-height: 40px;
        }
        .content {
          display: flex;
          .item {
            margin-right: 70px;
            line-height: 40px;
            letter-spacing: 1px;
            color: rgba(0, 0, 0, 0.65);
            .label {
              display: inline-block;
              min-width: 100px;
            }
          }
        }
      }
    }
    .submitGroup {
      position: fixed;
      z-index: 2;
      bottom: 0;
      width: 83%;
      height: 250px;
      background-color: #EBF6FE;
      .title{
        padding-top: 10px;
        text-indent: 20px;
      }
      .el-input {
        width: 200px;
      }
      .el-textarea__inner{
        width: 400px;
      }
      .el-form-item{
        margin-bottom: 10px;
      }
    }
    .block{
      text-align: right;
      margin: 10px 10px 0 0;
    }

  }
</style>
