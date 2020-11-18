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
      <el-menu-item index="1" @click="indexShow">ISSUE首页</el-menu-item>
      <el-menu-item index="2" @click="JudgeIssue">issue创建</el-menu-item>
      <el-menu-item index="3" @click="JudgeChart">issue报表</el-menu-item>
      <el-menu-item index="4" @click="JudgeUser">账号管理</el-menu-item>
      <el-menu-item index="5" class="prevent">
        <el-input
          v-model="input"
          placeholder="请输入搜索内容"
          class="changestyle"
        ></el-input>
        <el-button size="small">搜索</el-button>
      </el-menu-item>

      <el-menu-item index="6" style="float: right">
        <el-button size="small" @click="Login">注销</el-button>
      </el-menu-item>
      <el-menu-item index="7" style="float: right">{{ name }}</el-menu-item>
      <el-menu-item style="float: right">
        <router-link to="/">
          <div>
            <el-avatar :src="url"></el-avatar>
          </div>
        </router-link>
      </el-menu-item>
    </el-menu>
    <RotationChart v-if="show"></RotationChart>
    <Choose v-if="show" @son="FromSon"></Choose>
    <CreateIssue v-if="showCreateIssue"></CreateIssue>
    <AccountInquiry v-if="showAccountInquiry"></AccountInquiry>
  </div>
</template>

<script>
// @ is an alias to /src
import RotationChart from "@/components/RotationChart.vue";
import Choose from "@/components/Choose.vue";
import CreateIssue from "@/views/CreateIssue.vue";
import AccountInquiry from "@/views/AccountInquiry.vue";

// 导入axios
import axios from "axios";

export default {
  name: "Home",
  components: {
    RotationChart,
    Choose,
    CreateIssue,
    AccountInquiry
    
  },
  data() {
    return {
      list: [],
      url: "",
      name: "",
      role: "",
      input: "",
      activeIndex: "",
      show: true,
      showCreateIssue: false,
      showAccountInquiry: false,
    };
  },

  //获取用户名
  created() {
    // 发送get请求，请求用户匹配
    axios({
      method: "get",
      url: "/data/person.json",
    })
      .then((data) => {
        console.log("data..", data);
        //处理用户数据
        this.handle(data);
      })
      .catch((err) => {
        console.log("error...", err);
      });
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
    },

    // 创建ISSUE
    createIssue() {
      this.showCreateIssue = true;
      this.show = false;
    },

    // 展示首页
    indexShow() {
      this.showCreateIssue = false;
      this.show = true;
      this.showAccountInquiry=false;
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
    handle(data) {
      this.list = data.data;
      this.name = this.list[2].name;
      this.url = this.list[2].header_url;
      this.role = this.list[2].role;
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
      if (this.role == "staff") {
        console.log("这是员工");
        return 1;
      }
      // 如果是经理
      if (this.role == "manager") {
        console.log("这是经理");
        return 2;
      }
      // 如果是超级管理员
      if (this.role == "administrator") {
        console.log("这是管理员");
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
