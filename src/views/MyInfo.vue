<template>
  <div class="myInfo">
    <el-row>
      <el-col :span="3">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1" @click="ShowIssueList">
            <i class="el-icon-menu"></i>
            <span slot="title">ISSUE列表</span>
          </el-menu-item>
          <el-menu-item index="2" @click="ShowTastIssueList">
            <i class="el-icon-document"></i>
            <span slot="title">我的任务</span>
          </el-menu-item>
          <el-menu-item index="3" @click="ShowChangerUser">
            <i class="el-icon-setting"></i>
            <span slot="title">我的信息</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <MyIssueList v-if="showIssueList" :User="this.User"></MyIssueList>
        <IssueModify v-if="showIssueModify"></IssueModify>
        <ChangeUser v-if="showChangerUser" :User="this.User"></ChangeUser>
        <TastIssueList v-if="showTastIssueList" :User="this.User"></TastIssueList>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导进页面模块
import MyIssueList from '@/views/MyIssueList';
import IssueModify from '@/views/IssueModify';
import ChangeUser from '@/views/ChangeUser';
import TastIssueList from '@/views/TastIssueList';




export default {
  name: "MyInfo",

  props:['User'],
  // 声明导进页面模块
  components:{
    MyIssueList,
    IssueModify,
    ChangeUser,
    TastIssueList
  },
  
  data() {
    return {
      showIssueList:true,
      showIssueModify:false,
      showChangerUser:false,
      showTastIssueList:false
    };
  },


  created() {
    console.log("1287313817313+++++++"+this.User.userId)
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    // 展示Issue列表页面
    ShowIssueList(){
      this.showIssueList=true
      this.showIssueModify=false
      this.showChangerUser=false
      this.showTastIssueList=false
      // console.log("---------------------------------"+this.User)
    },
    //展示Issue修改页面
    ShowIssueModify(){
      this.showIssueList=false
      this.showIssueModify=true
      this.showChangerUser=false
      this.showTastIssueList=false
    },
    //展示用户信息页面
    ShowChangerUser(){
      this.showIssueList=false
      this.showIssueModify=false
      this.showChangerUser=true
      this.showTastIssueList=false
    },
    ShowTastIssueList(){
      this.showIssueList=false
      this.showIssueModify=false
      this.showChangerUser=false
      this.showTastIssueList=true
    }
  },
};
</script>

<style>
</style>