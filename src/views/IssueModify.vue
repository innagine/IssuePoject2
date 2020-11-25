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
    <!-- <IssueList v-if="showIssueList" ></IssueList> -->
  </div>
</template>

<script>
// import IssueList from "@/views/IssueList.vue";
import axios from "axios";

export default {
  
  props: ['modifyId'],
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
      this.$emit('childByValue', {showIssueList:this.showIssueList,showMotify:this.showMotify})
      
    },
    //修改Issue
    submitForm(formName) {
      console.log(this.ruleForm.desc);
      console.log(this.modifyId);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios({
            method: "post",
            url: "http://localhost:8999/updateSolotion",
            data: {solution :this.ruleForm.desc,issueId:this.modifyId},
      })
        .then((res) => {
          console.log(res.data);
          this.$parent.getData(1,20);
          this.$message('提交修改成功');
          this.back();
        })
        .catch((Error) => {
          console.log(Error);
        });
          
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