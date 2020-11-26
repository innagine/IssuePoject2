<template>
  <div class="CIcontent">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      style="align-self: center"
    >
      <el-row>
        <el-col :span="12"
          ><el-form-item label="Issue题目" prop="name">
            <el-input v-model="ruleForm.name" maxlength="80"
              show-word-limit></el-input> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="Issue No." prop="id" >
            <el-input v-model="ruleForm.id" :disabled="true" maxlength="30"
              show-word-limit></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"
          ><el-form-item label="指派人" prop="person">
            <el-input v-model="ruleForm.person" maxlength="30"
              show-word-limit></el-input> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="影响版本" prop="version" :inline="true" v-model="ruleForm.version">
            <el-input v-model="ruleForm.version" maxlength="30"
              show-word-limit></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="ISSUE类型" prop="type2">
            <el-input v-model="ruleForm.type2" maxlength="30"
              show-word-limit></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-form-item label="创建时间">
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
            :disabled="true"
              type="date1"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="修改时间" required>
        <el-col :span="11">
          <el-form-item prop="date">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date"
              :picker-options="pickerOptions"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="完成时间">
        <el-col :span="11">
          <el-form-item prop="date3">
            <el-date-picker
            :disabled="true"
              type="date3"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="步骤重现" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" maxlength="2000"
              show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="Issue等级" prop="grade">
        <el-select v-model="ruleForm.grade" placeholder="请选择Issue等级">
          <el-option label="最高" value="4"></el-option>
          <el-option label="较高" value="3"></el-option>
          <el-option label="一般" value="2"></el-option>
          <el-option label="低" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即创建</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// 导入axios
import axios from "axios";

export default {
  name: "CreateIssue",
  props:['User'],
  data() {
    return {
       pickerOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          },
      },

      ruleForm: {
        name: "",
        id: "",
        person: "",
        type2:'',
        version: "",
        grade: "",
        date: "",
        date2: "",
        date3: "",
        solution:"",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        person:[ { required: true, message: "请输入指派人姓名", trigger: "blur" },
                 {  max: 30, message: "长度最多 30 个字符", trigger: "blur" },
        ],
        version:[ 
                 {  max: 30, message: "长度最多 30 个字符", trigger: "blur" },
        ],
        type2:[ 
                 {  max: 30, message: "长度最多 30 个字符", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入ISSUE题目", trigger: "blur" },
          { min: 8, max: 80, message: "长度在 8 到 80 个字符", trigger: "blur" },
        ],
        region: [
          { required: true, message: "请填写步骤重现", trigger: "change" },
        ],
        date: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        // date2: [
        //   {
        //     type: "date",
        //     required: true,
        //     message: "请选择时间",
        //     trigger: "change",
        //   },
        // ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写步骤重现", trigger: "blur" }],
      },
    };
  },
  methods: {

    submitForm(formName) {
      
      this.$refs[formName].validate((valid) => {
        if (valid) {

          console.log("AAAAAAAAAAAA"+this.User.userId);
      // 发送post请求
          axios({
        method: "post",
        url: "http://192.168.1.57:8999/createIssue",
        data: {
          issueName:this.ruleForm.name,
          createMan:this.User.userName,
          level:this.ruleForm.grade,
          type:this.ruleForm.type2,
          beta:this.ruleForm.version,
          userId:this.User.userId,
          updateMan:this.ruleForm.person,
          step:this.ruleForm.desc,
          solution:this.ruleForm.solution,
          planDate:this.ruleForm.date
        }
      })
        .then((res) => {
          console.log("data..", res.data);
          if(res.data==1){
          this.$notify({
           title: "消息",
           message: "IUSSUE创建成功，可以继续创建",
           type: "success",
           });
          }
          else{
            this.$notify({
           title: "消息",
           message: "IUSSUE创建失败,指派人不存在",
           type: "warning",
           });
          }
        })
        .catch((err) => {
          console.log("error...", err);
        });


        } else {
          console.log("error submit!!");
          this.$notify({
           title: "消息",
           message: "请将信息填写完整",
           type: "warning",
           });
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
.CIcontent {
  height: 100%;
  width: 80%;
  margin: 50px auto;
}
</style>