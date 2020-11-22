<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#FFFFFF"
      text-color="#6fb7ff"
      active-text-color="#409EFF"
      @select="selectMenu"
    >
      <el-menu-item index="1" @click="indexShow" >ISSUE首页</el-menu-item>
      <el-menu-item index="2" @click="JudgeIssue" v-if="indexlisyt[0].index">issue创建</el-menu-item>
      <el-menu-item index="3" @click="JudgeChart" v-if="indexlisyt[1].index">issue报表</el-menu-item>
      <el-menu-item index="4" @click="JudgeUser" v-if="indexlisyt[2].index">账号管理</el-menu-item>
      <el-menu-item index="5" @click="Search">高级检索</el-menu-item>
      <el-menu-item index="6" class="prevent">
        <el-input
          v-model="input"
          placeholder="请输入搜索内容"
          class="changestyle"
        ></el-input>
        <el-button size="small">搜索</el-button>
      </el-menu-item>

      <el-menu-item index="7" style="float: right">
        <el-button size="small" @click="Login">注销</el-button>
      </el-menu-item>
      <el-menu-item index="8" style="float: right" @click="myInfo">{{ name }}</el-menu-item>
      <el-menu-item index="9" style="float: right" @click="myInfo">
          <div>
            <el-avatar :src="url"></el-avatar>
          </div>
      </el-menu-item>
    </el-menu>
    <RotationChart v-if="show"></RotationChart>
    <Choose v-if="show" @son="FromSon"></Choose>
    <CreateIssue v-if="showCreateIssue"></CreateIssue>
    <AccountInquiry v-if="showAccountInquiry"></AccountInquiry>
    <ReportIssue v-if="showReportIssue"></ReportIssue>
    <MyInfo v-if="showMyInfo"></MyInfo>
    <Search v-if="showSearch"></Search>
  </div>
</template>

<script>
// @ is an alias to /src
import RotationChart from "@/components/RotationChart.vue";
import Choose from "@/components/Choose.vue";
import CreateIssue from "@/views/CreateIssue.vue";
import AccountInquiry from "@/views/AccountInquiry.vue";
import ReportIssue from "@/views/ReportIssue.vue";
import MyInfo from "@/views/MyInfo.vue";
import Search from "@/views/Search.vue";

// 导入axios
// import axios from "axios";

export default {
  name: "Home",
  components: {
    RotationChart,
    Choose,
    CreateIssue,
    AccountInquiry,
    ReportIssue,
    MyInfo,
    Search
    
  },
  data() {
    return {
      // 按钮显示
      indexlisyt:[{index:false},{index:false},{index:false}],


      list: [],
      url: "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      name: "",
      role: "",
      input: "",
      activeIndex: "",
      show: true,
      showCreateIssue: false,
      showAccountInquiry: false,
      showReportIssue:false,
      showMyInfo:false,
      showSearch:false,
    };
  },

  //获取用户名
  created() {

    // 获取传参
    console.log(this.$route.query.user);
    //处理用户数据
    // var user=JSON.parse(this.$route.query.user)
    this.handle(this.$route.query.user);
    // this.role= user.iden
    // this.name= user.name

    //判断用户
    this.judge()

    // console.log("name"+this.name)
    // console.log("role"+this.role)
    // // 发送get请求，请求用户匹配
    // axios({
    //   method: "get",
    //   url: "/data/person.json",
    // })
    //   .then((data) => {
    //     console.log("data..", data);
    //     //处理用户数据
    //     this.handle(data);
    //     //判断用户
    //     this.judge()
    //   })
    //   .catch((err) => {
    //     console.log("error...", err);
    //   });
  },

  methods: {
    // 注册
    Register() {
      this.$router.push({
        path: "/register",
      });
    },

    // 重新登陆
    Login() {
      this.$router.push({
        path: "/",
      });
    },

    //账号管理
    accountInquiry() {
      this.showAccountInquiry = true;
      this.showCreateIssue = false;
      this.show = false;
      this.showReportIssue=false;
      this.showMyInfo=false;
      this.showSearch=false;
    },
    // 创建ISSUE
    createIssue() {
      this.showCreateIssue = true;
      this.show = false;
      this.showReportIssue=false;
      this.showAccountInquiry=false;
      this.showMyInfo=false;
      this.showSearch=false;
    },
    // 展示首页
    indexShow() {
      this.showCreateIssue = false;
      this.show = true;
      this.showAccountInquiry=false;
      this.showReportIssue=false;
      this.showMyInfo=false;
      this.showSearch=false;
    },
    //查看ISSUE报表
    reportIssue(){
      this.showReportIssue=true;
      this.show=false;
      this.showCreateIssue=false;
      this.showAccountInquiry=false;
      this.showMyInfo=false;
      this.showSearch=false;
    },
    //展示个人页面
    myInfo(){
      this.showReportIssue=false;
      this.show=false;
      this.showCreateIssue=false;
      this.showAccountInquiry=false;
      this.showMyInfo=true;
      this.showSearch=false;
    },
    //展示高级检索页面
    Search(){
      this.showReportIssue=false;
      this.show=false;
      this.showCreateIssue=false;
      this.showAccountInquiry=false;
      this.showMyInfo=false;
      this.showSearch=true;
    },


    // 选择回传，子传父值，传回选择的事项
    FromSon(data) {
      if (data == 1) {
        this.createIssue();
        this.activeIndex = "2";
        console.log(this.activeIndex);
        this.JudgeIssue();
      }
      if (data == 2) {
        this.reportIssue();
        this.activeIndex = "3";
        console.log(this.activeIndex);
        this.JudgeChart();
      }
      if (data == 3) {
        this.activeIndex = "4";
        console.log(this.activeIndex);
        this.JudgeUser();
      }
    },
    // 重置选择的导航栏index
    selectMenu(index) {
      this.activeIndex = index;
    },

    // 用户数据设置
    handle(user) {
      // this.list = data.data;
      this.name = user.userName;
      // this.url = this.list[2].header_url;
      this.role = user.identity;
    },

    //操作通知
    open() {
      this.$notify({
        title: "消息",
        message: "缺乏权限，请向管理员申请权限",
        type: "warning",
      });
    },

    // 用户操作权限判断
    judge() {
      // 如果是员工
      if (this.role =="普通用户") {
        console.log("普通用户");
        this.indexlisyt[0].index=true;
        return 1;
      }
      // 如果是经理
      if (this.role =="经理") {
        console.log("这是经理");
        this.indexlisyt[1].index=true;
        return 2;
      }
      // 如果是超级管理员
      if (this.role =="超级Admin") {
        console.log("这是管理员");
        this.indexlisyt[2].index=true;
        return 3;
      } else return;
    },

    // 账号管理按钮权限设置
    JudgeUser() {
      // 如果是管理员
      if (this.judge() == 3) {
        console.log("可以操作");
        this.accountInquiry();
      }
      // 不是管理员
      else {
        console.log("不可以操作");
        this.open();

        // 强制返回首页
        this.indexShow();
      }
    },

    //issue报表按钮权限设置
    JudgeChart() {
      // 如果是经理
      if (this.judge() == 2) {
        console.log("可以操作");
        this.reportIssue();
      }
      // 不是经理
      else {
        console.log("不可以操作");
        this.open();

        // 强制返回首页
        this.indexShow();
      }
    },

    //创建issue按钮权限设置
    JudgeIssue() {
      // 如果是员工
      if (this.judge() == 1) {
        console.log("可以操作");
        this.createIssue();
      }
      // 不是员工
      else {
        console.log("不可以操作");
        this.open();

        // 强制返回首页
        this.indexShow();
      }
    },
  },
};
</script>

<style>
/* 防止搜索框点击之后背景变黑 */
.prevent:hover {
  background-color: #fff !important;
}

/* 调节导航栏字体大小 */
.el-menu-item,
.template {
  font-size: 16px !important;
}

/* 搜索框长度长度变换 */
.changestyle {
  padding-right: 10px;
  transition: all 0.5s;
}

.changestyle:hover {
  width: 400px !important;
}

.el-button {
  background-color: #409eff !important;
  color: white !important;
}
</style>
