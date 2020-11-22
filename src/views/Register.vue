<template>
<div class="content">
<div class="register">
    <el-card class="box-card">
        <h1>账号注册</h1>
        <el-input placeholder="请输入登陆ID" v-model="userId"    clearable></el-input>
        <el-input placeholder="请输入姓名"   v-model="userName"  clearable></el-input>
        <el-input placeholder="请输入邮箱"   v-model="email"     clearable></el-input>
        <el-input placeholder="请输入密码"   v-model="password1" show-password></el-input>
        <el-input placeholder="请确认密码"   v-model="password2" show-password></el-input>
        <div class="btn" @click="SUBMIT">
            <span ref="point" v-if="showpoint"></span>注册
        </div>
    </el-card>
</div>
</div>
</template>

<script>
// 导入axios
import axios from "axios";
export default {
    name: "Register",

    data() {
        return {
        userId: '', 
        userName:'',
        email: '',
        password1:'',
        password2:'',

       showpoint: false,
        account: "",
        password: "",
        formLabelAlign: {
                name: "",
                region: "",
                type: "",
            },
        };
    },

    methods: {
        SUBMIT(){
      // 发送get请求，请求用户匹配
      axios({
        method: "post",
        url: "http://localhost:8999/regist",
        data: {
        userId: this.userId, 
        userName: this.userName,
        email: this.email,
        password:this.password1,
               }
      })
        .then((res) => {
          console.log("data..", res.data);
          // console.log(typeof(res.data))

          if(res.data=='1'){
            //转跳到登录页面
            alert("注册成功")
          this.$router.push({
          path: "/",
          query:{
              user:res.data
            }
          });
          }else{
            alert("注册失败")
          }

          
        })
        .catch((err) => {
          console.log("error...", err);
        });
        }
    },
};
</script>

<style>
.content {
  margin: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #51a4db, #a8e4fa);
}

.register {
    height: 100%;
    display: flex;
    width: 20%;
    margin: 0 auto;
}

.el-card {
    align-self: center;
    /* padding: 30px; */
}

.el-card h1 {
    text-align: center;
    padding: 20px;
}

.register .el-input {
    padding: 15px 0;
}

.btn {
    margin: 15px auto;
    padding: 10px 0;
    text-align: center;
    width: 100%;
    background-image: linear-gradient(to right, #51a4db, #a8e4fa);
    color: #fff;
}

.btn:hover {
    background: #a8e4fa;
}


</style>
