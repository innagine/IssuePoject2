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
      <el-form-item label="登陆ID" prop="userId">
        <el-input :disabled="true">{{ userId }}</el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input
          v-model="ruleForm.userName"
          maxlength="30"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
          show-password
          maxlength="30"
          show-word-limit
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
  props: {
    userId: String,
  },
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
        userName: "",
        email: "",
        pass: "",
        checkPass: "",
      },
      rules: {
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
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
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