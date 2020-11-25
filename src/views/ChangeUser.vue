<template>
  <div class="ChangeUser">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="登陆ID" prop="userId" >
        <el-input :disabled="true" v-model="userId" >{{ userId }}</el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input
          v-model="ruleForm.userName"
          maxlength="30"
          show-word-limit
          @keyup.native="$event.target.value = $event.target.value.replace(/^\s+|\s+$/gm,'')"
        ></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="ruleForm.email"
         @keyup.native="$event.target.value = $event.target.value.replace(/^\s+|\s+$/gm,'')"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          show-password
          maxlength="30"
          show-word-limit
          @keyup.native="$event.target.value = $event.target.value.replace(/^\s+|\s+$/gm,'')"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input
          type="password"
          v-model="ruleForm.checkPass"
          autocomplete="off"
          show-password
          maxlength="30"
          show-word-limit
          @keyup.native="$event.target.value = $event.target.value.replace(/^\s+|\s+$/gm,'')"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交修改</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
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
  name: "ChangeUser",
  props:['User'],
  data() {
    var validatePass = (rule, value, callback) => {
      var specialKey = "!@#$%^&*()_+~";     //特殊字符
      var hasSpecialKey=/[!@#$%^&*()_+~]/;  //含有特殊字符
      var illegalKey=/[^0-9a-zA-Z!@#$%^&*()_+~]/; //出现不在合法字符集中的非法字符
      var hasLower=/[a-z]/;  //含有小写字母
      var hasUpper=/[A-Z]/;  //含有大写字母
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length < 8) {
          callback(new Error("最少八位密码"));
        } else if (!hasSpecialKey.test(value)) {
          callback(new Error("密码必须包含" + specialKey + "等特殊字符"));
        } else if(!hasLower.test(value)||!hasUpper.test(value)){
          callback(new Error("密码必须包含大小写字母"))
        } 
        else if(illegalKey.test(value)){
          callback(new Error("密码包含非法字符"))
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
    var validateName=(rule,value,callback)=>{
      var reg=/[^a-zA-Z0-9\u4E00-\u9FA5]/g;
      if(reg.test(value)){
        callback(new Error("用户姓名包含非法字符"))
      }
      callback()
    };
    return {
      ruleForm: {
        userName: "",
        email: "",
        pass: "",
        checkPass: "",
      },
      userId:this.User.userId,
      rules: {
        userName: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { validator: validateName, trigger:'blur'},
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
    };
  },
  methods: {
    submitForm(formName) {
      console.log("------------------"+this.ruleForm.userName)
        this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            method: "post",
            url: "http://localhost:8999/updateUser",
            data: {
              userId:this.User.userId,
              userName:this.ruleForm.userName,
              email:this.ruleForm.email,
              pwd1:this.ruleForm.pass,
              pwd2:this.ruleForm.checkPass,
              }
          })
            .then((res) => {
              console.log("data.._________", res.data);
            console.log('验证通过')
            this.$notify({
              title: "消息",
              message: "用户修改成功",
              type: "success",
              });
              
            })
            .catch((err) => {
              console.log(err)

            });          
        } else {
          console.log("error submit!!");
          this.$notify({
              title: "消息",
              message: "请正确填写用户信息",
              type: "error",
              });          
        }
      });

    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.ChangeUser {
  display: flex;
  margin: 30px 30px;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>