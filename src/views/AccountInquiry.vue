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
              <el-button type="info" @click="empty" >清空</el-button>
            </el-form-item>
          </div>
        </el-form>
        <!-- 搜索 -->
      </div>     
      <el-main >
        <div class="main">
          <!--  -->
          <!-- 表格属性设置 -->
          <el-table
            ref="multipleTable"
            :data="tableData.slice((currentPage - 1) * PageSize,currentPage * PageSize)"
            tooltip-effect="dark"
            style="width: 100%">
          <!-- @selection-change="handleSelectionChange" -->
            <!-- 表格内容 -->
            <el-table-column type="selection" width="60"> </el-table-column>
            <el-table-column type="index" :index="indexMethod"  label="序号">
            </el-table-column>
            <el-table-column prop="user_id" label="用户ID" width="120">
            </el-table-column>
            <el-table-column prop="user_name" label="用户姓名" width="120">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" show-overflow-tooltip>
            </el-table-column>
            <el-table-column
              prop="create_date"
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
            >
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  style="background-color: #f78989 !important"
                  size="mini"
                  type="danger"
                  @click="handleDelete(indexMethod(scope.$index), scope.row.user_id)"
                  v-if='scope.row.status!=="注销"'
                  >注销</el-button>
                  
                <el-button 
                  size="mini"
                  @click="handleEdit(indexMethod(scope.$index), scope.row)"
                  v-if='(scope.row.identity!=="经理")&&(scope.row.status!=="注销")'
                  >经理</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <el-footer>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="PageSize"
          layout="total, prev, pager, next, jumper"
          :total="tableData.length">
        </el-pagination>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import axios from "axios";
// 随机数据
// let tableData = [];
// for (let i = 0; i < 30; i++) {
//   tableData.push({
//     user_id: Math.random() ,
//     user_name: "畅畅",
//     email: "xxxxx@qq.com",
//     create_date: "2020.02.01",
//     identity: "程序员",
//     status: "激活",
//   });
// }

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
      tableData:[], //随机数据
      currentPage: 1, //当前页数 ，默认为1
      //获取数据长度(注意：这里不能为空)
      totalCount: 1,
      pageSize: 20, // 每页显示数量
      multipleSelection: [],
      // 默认每页显示的条数（可修改）
      PageSize: 20,
      show: [],
    };
  },
  
  methods: {
    
    //清空用户输入的内容
    empty(){
      this.form.user_id=""
      this.form.user_name=""
    },
    //翻页改变索引
    indexMethod(index) {
        return ((this.currentPage-1)*20+index+1);
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
        console.log(res);
      });
      console.log("submit!");
      console.log(this.form);


    },

    getData() {
      // 这里使用axios，使用时请提前引入
      // axios
      //   .post(
      //     "http://localhost:8080",
      //     {
      //       orgCode: 1,
      //       // 显示第几页
      //       currentPage: n1,
      //     },
      //     { emulateJSON: true },
      //     {
      //       headers: {
      //         "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      //       },
      //     }
      //   )
      //   .then((reponse) => {
      //     console.log(reponse);
      //     // 将数据赋值给tableData
      //     this.tableData = reponse;
      //     // 将数据的长度赋值给totalCount
      //     this.totalCount = reponse.length;
      //   });
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
          // for(let i=0;i<this.tableData.length;i++){
          //   // console.log(this.tableData[i]);
          //   if(this.tableData[i].identity=="经理"){
          //     this.show[i]=false;
          //     // document.getElementsByClassName("jingling")[i].style.display="none";
          //   }
          //   else{
          //     this.show[i]=true;
          //   }   
          // }
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

    //经理取数据
    handleEdit(index, row) {
        console.log(index, row);
      },
    //注销取数据
    handleDelete(index, row) {
        console.log(index, row);
      }
  },
  created: function () {
    this.getData(this.currentPage);
  },
};
</script>

<style >
  .main{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);   
  }
  .AccountInquiry{
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