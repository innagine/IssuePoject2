<template>
  <div>
    <div class="IssueList" v-if="showIssueList">
      <el-container class="home-containar">
        <el-main>
          <div class="main">
            <!--  -->
            <!-- 表格属性设置 -->
            <el-table
              ref="multipleTable"
              :data="
                tableData.slice(
                  (currentPage - 1) * PageSize,
                  currentPage * PageSize
                )
              "
              tooltip-effect="dark"
              style="width: 100%"
            >
              <!-- @selection-change="handleSelectionChange" -->
              <!-- 表格内容 -->
              <el-table-column type="selection" width="60"> </el-table-column>
              <el-table-column type="index" :index="indexMethod" label="序号">
              </el-table-column>
              <el-table-column prop="issue_id" label="Issue ID" width="120">
              </el-table-column>
              <el-table-column
                prop="create_man"
                label="Issue 创建人"
                width="120"
              >
              </el-table-column>
              <el-table-column
                prop="create_date"
                label="创建时间"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="update_man"
                label="修改人"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="Issue 状态"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="plan_date"
                label="预计完成时间"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="final_date"
                label="实际完成时间"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button
                    style="background-color: #f78989 !important"
                    size="mini"
                    type="danger"
                    @click="
                      handleDelete(
                        indexMethod(scope.$index),
                        scope.row.issue_id
                      )
                    "
                    >详情</el-button
                  >
                  <el-button
                    size="mini"
                    @click="
                      handleModify(
                        indexMethod(scope.$index),
                        scope.row.issue_id
                      )
                    "
                    >修改</el-button
                  >
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
        <el-footer>
          <!-- 分页栏目设置 -->
          <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="currentPage"
            :page-size="PageSize"
            :page-sizes="[20, 40, 60, 80]"
            layout="total, prev, pager, next , sizes, jumper"
            :total="tableData.length"
          >
          </el-pagination>
        </el-footer>
      </el-container>
    </div>
    <IssueModify v-if="showMotify"></IssueModify>
  </div>
</template>

<script>
import axios from "axios";
import IssueModify from "@/views/IssueModify.vue";

//表格
export default {
  name: "IssueList",
  components: {
    IssueModify,
  },
  data() {
    return {
      //搜索数据
      form: {
        user_id: "",
        user_name: "",
      },
      textname: "",
      textid: "",
      //随机数据
      tableData: [],
      //当前页数 ，默认为1
      currentPage: 1,
      //获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 每页显示数量
      pageSize: 20,
      multipleSelection: [],
      // 默认每页显示的条数（可修改）
      PageSize: 20,
      showIssueList: true,
      showMotify: false,
    };
  },

  methods: {
    //清空用户输入的内容
    empty() {
      this.form.user_id = "";
      this.form.user_name = "";
    },
    //翻页改变索引
    indexMethod(index) {
      return (this.currentPage - 1) * this.PageSize + index + 1;
    },
    //查询提交
    onSubmit() {
      /* json格式提交： */
      let formData = JSON.stringify(this.form);
      axios({
        method: "post",
        url: "xxxxxxx",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        data: formData,
      }).then((res) => {
        this.tableData = res.data;
        console.log(res);
      });
      console.log("submit!");
      console.log(this.form);
    },

    getData() {
      axios({
        method: "get",
        url: "/data/tabledate.json",
      })
        .then((data) => {
          console.log(data);
          // 将数据赋值给tableData
          this.tableData = data.data;
          // 将数据的长度赋值给totalCount
          this.totalCount = data.data.length;
          console.log(this.tableData);
          console.log(this.totalCount);
        })
        .catch((err) => {
          console.log("error...", err);
        });
    },
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      // 改变每页显示的条数
      this.PageSize = val;
      // 点击每页显示的条数时，显示第一页
      this.getData(val, 1);
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
    },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      // 切换页码时，要获取每页显示的条数
      this.getData(this.PageSize, val * this.pageSize);
    },
    //修改页面跳转
    modify() {
      this.showIssueList = false;
      this.showMotify = true;
    },
    //取修改按钮的数据
    handleModify(index, row) {
      this.modify();
      console.log(index, row);
    },
    //取详情按钮的数据
    handleDelete(index, row) {
      console.log(index, row);
    },
  },
  created: function () {
    this.getData(this.currentPage);
  },
};
</script>

<style >
.main {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.AccountInquiry {
  margin: 30px 30px;
}

.inputid,
.inputname,
.search {
  display: inline-block;
}

/* 头部样式 底部样式*/
.header {
  height: 5px;
  text-indent: 20px;
  line-height: 5px;
  text-align: left;
}

.el-footer {
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-pagination {
  text-align: center;
}
</style>