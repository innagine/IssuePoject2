<!-- 报表组件——分页表格 -->
<template>
    <div class="ReportTable">
      <el-table
        ref="multipleTable"
        :data="userList.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        tooltip-effect="dark"
        style="width: 1320px"
        border
        stripe
        height="500"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <!-- 序号 -->
        <el-table-column prop="number" label="序号" width="180">
        </el-table-column>

        <!-- 用户ID -->
        <el-table-column prop="userId" label="用户ID" width="180" sortable>
        </el-table-column>

        <!-- 用户姓名 -->
        <el-table-column prop="userName" label="用户姓名"  width="180">
        </el-table-column>

        <!-- 创建issue数 -->
        <el-table-column prop="createdNum" label="创建issue数" width="180">
          <template slot-scope="scope">
            <a href="http://www.baidu.com">
              {{scope.row.createdNum}}
            </a>
          </template>        
        </el-table-column>

        <!-- 收到issue数 -->
        <el-table-column prop="receivedNum" label="收到issue数" width="180">
          <template slot-scope="scope">
            <a href="http://www.baidu.com">
              {{scope.row.receivedNum}}
            </a>
          </template>  
        </el-table-column>

        <!-- 修改issue数 -->
        <el-table-column prop="alterNum" label="修改issue数" width="180">
          <template slot-scope="scope">
            <a href="http://www.baidu.com">
              {{scope.row.alterNum}}
            </a>
          </template>  
        </el-table-column>

        <!-- 完成率 -->
        <el-table-column prop="finishRate" label="完成率" width="180">
        </el-table-column>    
      </el-table>

        <!-- 分页查询 -->
        <div id="report-pagination" >
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userList.length">
            </el-pagination>        
        </div>        
    </div>
</template>

<script>
// import axios from 'axios';
export default {
    name:'ReportTable',
    props:['userList'],
    data(){
        return{
            currentPage:1,  //初始页
            pagesize:20,    //每页的长度
            // userList:[],    //每页的数据
            multipleSelection: [],
        }        
    },
    methods:{
      handleSelectionChange(val) {  
        this.multipleSelection = val;
      },
      handleSizeChange:function(size){
        this.pagesize=size;
        console.log(this.currentPage);    //每页下拉显示数据
      },
      handleCurrentChange:function(currentPage){
        this.currentPage=currentPage;
        console.log(this.currentPage);
      },
    //   handleUserList(){
    //     axios.get('/data/userlist.json',{
    //       params:{
    //       }
    //     }).then((response)=>{
    //       console.log(response.data);
    //       this.userList=response.data;
    //       console.log(this.userList)
    //     }).catch(function(error){
    //       console.log(error);
    //     })          
    //   }        
    },
    created(){
        // this.handleUserList()
    }
}
</script>
<style lang="scss" scope>
.ReportTable{
  background: #fff;
  display: inline-block;
}
#report-pagination{
  // position: fixed;    //固定分页栏到浏览器底部
  // bottom: 0;
  // left: 0;
  // right: 0;
  margin: 20px auto;
  background-color: #fff;
}    
</style>