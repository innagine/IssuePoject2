<!-- 报表组件——分页表格 -->
<template slot-scope="scope">
    <div class="ReportTable">
      <!-- userList.slice((pageIndex-1)*pagesize,pageIndex*pageSize) -->
      <!-- prop的值根据userList的key进行更改 -->
      <el-table
        ref="multipleTable"
        :data="userList"
        tooltip-effect="dark"
        border
        stripe
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <!-- 序号 -->
        <el-table-column prop="number" label="序号" width="180" :index="indexFn" type="index">
        </el-table-column>

        <!-- 用户ID -->
        <el-table-column prop="userId" label="用户ID" width="180" sortable>
        </el-table-column>

        <!-- 用户姓名 -->
        <el-table-column prop="userName" label="用户姓名"  width="180">
        </el-table-column>

        <!-- 创建issue数 -->
        <!-- 点击跳转issue列表，传递一个用户id -->
        <el-table-column prop="cNum" label="创建issue数" width="180">
          <template slot-scope="scope" >
            <a href="#" @click='gotoMyIssueList(scope.row.userId,scope.row.userName,1)'>
              {{scope.row.cNum}}
            </a>
          </template>        
        </el-table-column>

        <!-- 收到issue数 -->
        <!-- 点击跳转到issue列表 -->
        <el-table-column prop="rNum" label="收到issue数" width="180">
          <template slot-scope="scope">
            <a href="#" @click='gotoMyIssueList(scope.row.userId,scope.row.userName,2)'>
              {{scope.row.rNum}}
            </a>
          </template>  
        </el-table-column>

        <!-- 修改issue数 -->
        <el-table-column prop="aNum" label="修改issue数" width="180">
          <template slot-scope="scope">
            <a href="#" @click='gotoMyIssueList(scope.row.userId,scope.row.userName,3)'>
              {{scope.row.aNum}}
            </a>
          </template>  
        </el-table-column>

        <!-- 完成率 -->
        <el-table-column prop="rate" label="完成率" width="180">
        </el-table-column>    
      </el-table>

        <!-- 分页查询 -->
        <div id="report-pagination" >
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 20, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>        
        </div> 
        <!-- <button @click="showList">显示</button>       -->
    </div>
</template>

<script>
// import axios from 'axios';
export default {
    name:'ReportTable',
    props:['userList','total'],
    data(){
        return{
            userId:'',
            userName:'',
            pageIndex:1,    //初始页码
            pageSize:20,    //每页的长度
            multipleSelection: [],
        }        
    },
    methods:{
      /**
       * 多选处理【无用】
       */
      handleSelectionChange(val) {  
        this.multipleSelection = val;
      },
      /**
       * 变换页长
       */
      handleSizeChange(size){
        // if(this.total-this.pageIndex*this.pageSize>=size){
          this.pageSize=size;
        // }else{
        //   this.pageSize=this.total-this.pageIndex*size;
        // }
        // console.log(this.pageSize)
        console.log('页长：'+this.pageSize);    //每页下拉显示数据
        console.log('剩余条数：'+this.total-this.pageIndex*size)
        // console.log(size)
        this.sendPagination();
      },
      /**
       * 变换页码
       */
      handleCurrentChange(pageIndex){
        this.pageIndex=pageIndex;
        console.log('当前页：'+this.pageIndex);
        this.sendPagination();
      },
      /**
       * 向父组件发送分页信息
       */
      sendPagination(){
        this.$emit('sendPagination',this.pageIndex,this.pageSize);
      },
      /**
       * 处理每一页的序号
       */
      indexFn(index){
        index=(index+1)+(this.pageIndex-1)*this.pageSize;
        return index;
      },
      gotoMyIssueList(n1,n2,n3){
        console.log(n1)
        console.log(n2)
        this.$emit('showMyIssue',{userId:n1,userName:n2,n:n3})
        
      },
      
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