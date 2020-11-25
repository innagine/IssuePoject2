<!-- issue报表页面 -->
<!-- created:调用handleUserList(),发送userId=''&userName=''&pageIndex=1&pageSize=20 -->
<!-- 使用模糊查询时，应该将pageIndex=1 -->
<template>
  <div class="ReportIssue">
      <!-- 表单——模糊查询 -->
      <!-- 从父组件中获取【页码：pageIndex】和【页长：pageSize】 -->
      <ReportForm @getQueryData='getQueryData' :pageIndex="pageIndex" 
      :pageSize="pageSize" :userId="userId" :userName="userName" v-show="!showIssue">
      </ReportForm>
      <!-- 表格——issue报表 -->
      <!-- 获取数据 & 返回【页码】和【页长】-->
      <!-- 表格子组件不做查询，ReportTable(pageIndex,pageSize)流=>ReportIssue=>ReportForm(userList)流=>ReportIssue=>ReportTable -->
      <ReportTable :userList="userList" :total="total" @showMyIssue="showMyIssue" 
        @sendPagination='getPagination' v-show="showReportTable">
      </ReportTable>
      <!-- !showIssue -->
      <!-- <MyIssueList v-if="showIssue" :userId="issueId"></MyIssueList> -->
      <ReportMyIssueList v-if="showIssue" :userId="issueId" ></ReportMyIssueList>
      <ReportTastIssueList v-if="showTastIssue" :userName="userName" ></ReportTastIssueList>
      <ReportFinish v-if="showFinish" :userName="userName" ></ReportFinish>
      <el-button type="success" icon="el-icon-search" @click="hideIssue" v-if="showButton" >返回</el-button>
  </div>
</template>

<script>
import ReportForm from '@/components/ReportForm.vue'
import ReportTable from '@/components/ReportTable.vue'
import ReportMyIssueList from '@/views/ReportMyIssueList.vue'
import ReportTastIssueList from '@/views/ReportTastIssueList.vue'
import ReportFinish from '@/views/ReportFinish.vue'

import axios from 'axios';

export default {
    components:{
        ReportForm,     //表单
        ReportTable,    //分页表格
        ReportMyIssueList,
        ReportTastIssueList,
        ReportFinish
    },
    data(){
        return{
            /**
             * 用于传递到后端的参数
             */
            userId:'',    // 用户ID
            userName:'',  // 用户名
            pageIndex:'1',    // 页码
            pageSize:'20',    // 页长

            // 获取userList的url
            url:'http://localhost:8999/searchIssueByuser',

            // 用于存储一页数据的数组
            userList:[], 
            total:0,
            //
            issueId:'',
            User:{},
            showIssue:false,
          showTastIssue:false,
          showReportTable:true,
          showButton:false,
          showFinish:false
            // showReport:false
        }
    },
    methods:{
      /**
       * 初始化表格数据和表格模糊查询
       */
      handleUserList(){         
        axios({                   // 发送ajax请求数据
          method:'post',
          url:'http://localhost:8999/searchIssueByuser',
          data:{
            userId:this.userId,
            userName:this.userName,
            pageIndex:this.pageIndex,
            pageSize:this.pageSize
          }
        }).then(res=>{
          this.total=res.data.total;
          this.userList=res.data.statistics;
          this.formatRate()
        }).catch(Error=>{
          console.log(Error);
        })
      }, 
      /**
       * 获取模糊查询的结果
       * @params(userlist,total,userId,userName)
       */
      getQueryData(userList,total,userId,userName){       //获取查询数据
          if(userList!=[])
          this.userList=userList;
          this.total=total;
          this.userId=userId;
          this.userName=userName;
          this.pageIndex=1;
          console.log(this.userList)
          this.formatRate()
      },
      /**
       * 从子组件中获取分页信息：
       * @params(pageIndex,pageSize)
       */  
      getPagination(pageIndex,pageSize){
        this.pageIndex=pageIndex;
        this.pageSize=pageSize;
        console.log(this.pageSize)
        this.handleUserList();
      },
      showMyIssue(user){
        console.log(user.n);
        if(user.n==1){
          this.showButton=true
          this.showTastIssue=false;
          this.showIssue=true;
          this.showReportTable=false
          this.showFinish=false
          }else
        if(user.n==2){
          this.showButton=true
          this.showTastIssue=true;
          this.showIssue=false;
          this.showReportTable=false
          this.showFinish=false
        }
        else if(user.n==3){
          this.showButton=true
          this.showTastIssue=false;
          this.showIssue=false;
          this.showReportTable=false
          this.showFinish=true
        }
        this.issueId=user.userId;
        this.userName=user.userName;
        // this.showTastIssue=false;
        // this.showIssue=true;
        console.log("BBBBBBBBBBBBBBBBB"+user.userId)
        // this.showReport=true
      },
      
      hideIssue(){
        this.showIssue=false;
        this.showReportTable=true
        this.showTastIssue=false;
        this.showButton=false
        this.showFinish=false
      },

      formatRate(){
        for(var i=0;i<this.userList.length;i++){
          if(this.userList[i].rate=='NaN'){
            this.userList[i].rate=0
          }
          this.userList[i].rate=Math.round(this.userList[i].rate*10000)/100+"%"
        }
      }


    },
    created(){
        //在被创建后获取初始数据                      
        this.handleUserList();      
    }
}
</script>
<style lang="scss" scoped>
.ReportIssue{
    padding: 0;
    margin: 0;
    height: 100%;
    text-align: center;
}
</style>
