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
          <el-menu-item index="2" @click="ShowChangerUser">
            <i class="el-icon-document"></i>
            <span slot="title">我的信息</span>
          </el-menu-item>
          <el-menu-item index="3" >
            <i class="el-icon-setting"></i>
            <span slot="title">我的设置</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <IssueList v-if="showIssueList"></IssueList>
        <IssueModify v-if="showIssueModify"></IssueModify>
        <ChangeUser v-if="showChangerUser"></ChangeUser>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 导进页面模块
import IssueList from '@/views/IssueList';
import IssueModify from '@/views/IssueModify';
import ChangeUser from '@/views/ChangeUser';




export default {
  name: "MyInfo",


  // 声明导进页面模块
  components:{
    IssueList,
    IssueModify,
    ChangeUser,
  },
  
  data() {
    return {
      showIssueList:true,
      showIssueModify:false,
      showChangerUser:false,
    };
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
    },
    //展示Issue修改页面
    ShowIssueModify(){
      this.showIssueList=false
      this.showIssueModify=true
      this.showChangerUser=false
    },
    //展示用户信息页面
    ShowChangerUser(){
      this.showIssueList=false
      this.showIssueModify=false
      this.showChangerUser=true
    }

  },
};
</script>

<style>
</style>