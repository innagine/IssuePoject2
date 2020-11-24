<template>
  <div class="content">
    <div class="register">
      <el-card class="box-card">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="0px"
          class="demo-ruleForm"
        >
          <el-form-item prop="userId">
            <el-input v-model="ruleForm.userId" placeholder="请输入ID"></el-input>
          </el-form-item>
          <el-form-item  prop="userName">
            <el-input
              v-model="ruleForm.userName"
              maxlength="30"
              show-word-limit
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item prop="email" >
            <el-input v-model="ruleForm.email" placeholder="请输入邮箱"></el-input>
          </el-form-item>
          <el-form-item  prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
              show-password
              maxlength="30"
              show-word-limit
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item  prop="checkPass">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
              show-password
              maxlength="30"
              show-word-limit
              placeholder="请确认密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" class="btn">注册</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
// 导入axios
import axios from "axios";

//特殊字符检验
export function checkSpecificKey(str, specialKey) {
  for (var i = 0; i < str.length; i++) {
    if (specialKey.indexOf(str.substr(i, 1)) != -1) {
      return true;
    }
  }
  return false;
}

export default {
  name: "Register",

  data() {
    var validatePass = (rule, value, callback) => {
      var specialKey = "!@#$%^&*()_+";
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length <= 8) {
          callback(new Error("最少八位密码"));
        } else if (!checkSpecificKey(value, specialKey)) {
          callback(new Error("密码必须包含" + specialKey + "等特殊字符"));
        } else {
          if (this.ruleForm.checkPass !== "") {
            this.$refs.ruleForm.validateField("checkPass");
          }
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        userId:"",
        userName: "",
        email: "",
        pass: "",
        checkPass: "",
      },
      rules: {
        userId:[
          { required: true, message: "请输入ID", trigger: "blur" },
        ],
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {},
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        pass: [{ required: true, validator: validatePass, trigger: "blur" }],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    
      formLabelAlign: {
        name: "",
        region: "",
        type: "",
      },
    };
  },

  methods: {
    submitForm() {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert("submit!");
      //   } else {
      //     console.log("error submit!!");
      //     return false;
      //   }
      // });

      // 发送post请求，请求注册
      axios({
        method: "post",
        url: "http://localhost:8999/regist",
        data: {
          userId: this.ruleForm.userId,
          userName: this.ruleForm.userName,
          email: this.ruleForm.email,
          password: this.ruleForm.checkPass,
        },
      })
        .then((res) => {
          console.log("data..", res.data);
          // console.log(typeof(res.data))

          if (res.data == "1") {
            //转跳到登录页面
           this.$notify({
           title: "消息",
           message: "注册成功，请登录",
           type: "success",
           });
            this.$router.push({
              path: "/",
              query: {
                user: res.data,
              },
            });
          } 
          else if(res.data == "2"){
                       this.$notify({
           title: "消息",
           message: "注册失败",
           type: "warning",
           });
          }
          else if(res.data == "0"){
                       this.$notify({
           title: "消息",
           message: "用户ID已存在",
           type: "warning",
           });
          }
          
          else {
          this.$notify({
           title: "消息",
           message: "注册失败",
           type: "warning",
           });
          }
        })
        .catch((err) => {
          console.log("error...", err);
        });


    },
    
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

.register .el-input {
  padding: 5px 0;
}

.btn {
  font-size: 16px;
  margin: 15px auto;
  padding: 10px 0;
  text-align: center;
  width: 100%;
  background-image: linear-gradient(to right, #51a4db, #a8e4fa);
  color: #fff;
  border: #fff none;
  border-radius: 0%;
}

.btn:hover {
  background: #a8e4fa !important;
}
</style>
