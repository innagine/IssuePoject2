<template>
  <div class="AccountInquiry">
    <el-container class="home-containar">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <div class="inputid">
            <el-form-item label="用户ID">
              <el-input
                type="text"
                placeholder="请输入内容"
                v-model="form.user_id"
                maxlength="30"
                show-word-limit
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="inputname">
            <el-form-item label="用户姓名">
              <el-input
                type="text"
                placeholder="请输入内容"
                v-model="form.user_name"
                maxlength="30"
                show-word-limit
              >
              </el-input>
            </el-form-item>
          </div>
          <div class="search">
            <el-form-item>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="onSubmit('from')"
                >搜索</el-button
              >
              <el-button type="info" @click="empty" class="gap">清空</el-button>
            </el-form-item>
          </div>
        </el-form>
        <!-- 搜索 -->
      </div>
      <el-main>
        <div class="main">
          <!--  -->
          <!-- 表格属性设置 -->
          <el-table
            ref="multipleTable"
            :data="
              tableData
            "
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
          <!-- .slice(
                (currentPage - 1) * PageSize,
                currentPage * PageSize
              ) -->
            <!-- 表格内容 -->
            <el-table-column type="selection" width="60"> </el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号">
            </el-table-column>
            <el-table-column prop="userId" label="用户ID" width="120" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="userName" label="用户姓名" width="120">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="createDate"
              label="注册时间"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="identity"
              label="用户身份"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="status"
              label="账户状态"
              show-overflow-tooltip
              :filters="[{ text: '激活', value: '激活' }, { text: '注销', value: '注销' }]"
              :filter-method="filterTag"
              filter-placement="bottom-end"
            >
            <template slot-scope="scope">
                <el-tag
                  :type="scope.row.status === '激活' ? 'success' : 'danger'"
                  disable-transitions>{{scope.row.status}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  style="background-color: #f78989 !important"
                  size="mini"
                  type="danger"
                  @click="
                    OhandleDelete(scope.row)
                  "
                  v-if="scope.row.status !== '注销'"
                  >注销</el-button
                >
                <el-button
                  size="mini"
                  @click="OhandleEdit(scope.row)"
                  v-if="
                    scope.row.identity !== '经理' && scope.row.status !== '注销'
                  "
                  >经理</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <!-- @size-change="handleSizeChange" -->
      <el-footer>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="PageSize"
          layout="total, prev, pager, next, jumper"
          :total="totalCount"
        >
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";

//表格
export default {
  data() {
    return {
      //搜索数据
      form: {
        user_id: "",
        user_name: "",
      },
      textname: "",
      textid: "",
      //数据接收
      tableData: [],
      //当前页数 ，默认为1
      currentPage: 1,
      //获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 每页显示数量
      pageSize: 20,
      // 默认每页显示的条数（可修改）
      PageSize: 20,
      //查询数据
      FormJsons: {
        userId: null,
        userName: null,
        pageIndex: 1,
        pageSize: 20,
      },
      //缓存查询数据
      userId: "",
      userName: "",
      multipleSelection: [],
      //分页数据
      Paging: {
        userId: null,
        userName: null,
        pageIndex: 1,
        pageSize: 20,
      },
      //经理数据---操作"经理"
      manager: {
        userId: null,
        identity: null,
        pageIndex: null,
        pageSize: 20,
      },
      //注销数据---操作"注销"
      logout: {
        userId: null,
        status: null,
        pageIndex: null,
        pageSize: 20,
      },
    };
  },

  methods: {
    //多选框取值
    handleSelectionChange(val) {
      this.checkIds = val;
      console.log("选中", val);
    },
    //清空用户输入的内容
    empty() {
      this.form.user_id = "";
      this.form.user_name = "";
    },
    //翻页改变索引
    indexMethod(index) {
      return (this.currentPage - 1) * 20 + index + 1;
    },
    //查询提交
    onSubmit() {
      /* json格式提交： */
      //判断搜索用户ID和用户姓名是否为空
      this.currentPage=1
      if (this.form.user_id) {
        this.FormJsons.userId = this.form.user_id;
        //缓存搜索得用户id
        this.userId = this.form.user_id;
      }
      if (this.form.user_name) {
        this.FormJsons.userName = this.form.user_name;
        //缓存搜索得用户姓名
        this.userName = this.form.user_name;
      }
      // axios post请求
      axios({
        method: "post",
        url: "http://localhost:8999/searchUser",
        data: this.FormJsons,
      })
        .then((...res) => {
          console.log("++++++++++++"+res[0].data);
          this.tableData = res[0].data.users;
          this.totalCount = res[0].data.total;
          console.log("__________________"+this.tableData);
          
        })
        .catch((Error) => {
          console.log(Error);
        });
        // this.getData();
      //值置为空
      this.FormJsons.userId = null;
      this.FormJsons.userName = null;
      console.log("submit!");
    },

    getData(n) {
      // 这里使用axios，使用时请提前引入
      this.Paging.userId=this.userId;
      this.Paging.userName=this.userName;
      this.Paging.pageIndex=n;
      console.log("&&&&&&&&&&&&"+this.Paging.pageIndex);
      axios({
        method: "post",
        url: "http://localhost:8999/searchUser",
        data:this.Paging,
      })
        .then((...res) => {
          console.log(res);
          this.tableData = res[0].data.users;
          this.totalCount = res[0].data.total;
          this.currentPage=n;
        })
        .catch((err) => {
          console.log(err);
        });

    },
    // 分页
    // 每页显示的条数
    // handleSizeChange(val) {
    //   // 改变每页显示的条数
    //   this.PageSize = val;
    //   // 点击每页显示的条数时，显示第一页
    //   this.getData(val, 1);
    //   // 注意：在改变每页显示的条数时，要将页码显示到第一页
    //   this.currentPage = 1;
    // },
    // 显示第几页
    handleCurrentChange(val) {
      // 改变默认的页数
      this.currentPage = val;
      // 切换页码时，要获取每页显示的条数
      this.getData(this.currentPage);
    },
    //确认是否将该员工提升为经理
    OhandleEdit(row){
        this.$confirm('此操作将该员工设为经理, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleEdit(row);
          this.$message({
            type: 'success',
            message: '已将员工设为经理'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消设为经理'
          });          
        });
      },
    //修改员工身份数据
    handleEdit(row) {
      axios({
        method: "post",
        url: "http://localhost:8999/UpdateAuthority",
        data: {userId:row.userId}
      })
        .then((res) => {
          console.log(res);
          // this.tableData = res.data;
          // this.totalCount = res.data.length;
           this.getData(this.currentPage);
        })
        .catch((err) => {
          console.log(err);
        });
      
    },
    //确认是否注销账号
    OhandleDelete(row){
        this.$confirm('此操作将注销此账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.handleDelete(row);
          this.$message({
            type: 'success',
            message: '账号注销成功'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消注销'
          });          
        });
      },
    //注销账号
    handleDelete(row) {
      axios({
        method: "post",
        url: "http://localhost:8999/cancellationUser",
        data: {userId:row.userId}
      })
        .then((res) => {
          console.log(res);
          // this.tableData = res.data;
          // this.totalCount = res.data.length;
          this.getData(this.currentPage);
        })
        .catch((err) => {
          console.log(err);
        });
        
    },
    //标签
    filterTag(value, row) {
        return row.status === value;
    },
  },
  created: function () {
    this.getData(this.currentPage);
  },
};
</script>

<style >
.gap {
  margin: 0 40px !important;
}
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
  margin-right: 80px;
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