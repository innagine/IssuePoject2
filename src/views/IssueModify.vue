<template>
  <div class="IssueModify">
    <div class="Modify" v-if="showMotify">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="解决方案" prop="desc">
          <el-input type="textarea" rows=10 v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交验证</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
          <el-button @click="back()">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
    <IssueList v-if="showIssueList"></IssueList>
  </div>
</template>

<script>
import IssueList from "@/views/IssueList.vue";

export default {
  name: "issuemodify",
  components: {
    IssueList,
  },
  data() {
    return {
      showIssueList:false,
      showMotify:true,
      ruleForm: {
        desc: "",
      },
      rules: {
        desc: [{ required: true, message: "请修改Issue", trigger: "blur" }],
      },
    };
  },
  methods: {
    back() {
      console.log(1111);
      this.showIssueList = true;
      this.showMotify = false;
    },
    //修改Issue
    submitForm(formName) {
      console.log(formName);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log();
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

<style>
    .Modify{
        margin: 30px 30px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        padding: 40px;
    }
</style>