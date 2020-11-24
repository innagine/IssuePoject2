<template>
    <div class="Search">
    <el-collapse-transition>
    <div v-show="show3">
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
          ><el-form-item label="Issue NO" prop="issueId">
            <el-input v-model="ruleForm.issueId"></el-input> </el-form-item
        ></el-col>
        <el-col :span="12">
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12"
          ><el-form-item label="创建人" prop="createMan">
            <el-input v-model="ruleForm.createMan"></el-input> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="修改人" prop="updateMan" :inline="true">
            <el-input v-model="ruleForm.updateMan"></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-form-item label="创建时间" >
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2" style=" text-align: center;">至</el-col>
        <el-col :span="11">
        <el-form-item prop="date2">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date2"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="修改时间" >
               <el-col :span="11">
          <el-form-item prop="date3">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date3"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2" style=" text-align: center;">至</el-col>
        <el-col :span="11">
        <el-form-item prop="date4">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="ruleForm.date4"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="Issue状态" prop="status">
        <el-select v-model="ruleForm.status" placeholder="请选择Issue状态">
          <el-option label="待修改" value="待修改"></el-option>
          <el-option label="已完成" value="已完成"></el-option>
          <el-option label="待验证" value="待验证"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即搜索</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="show3 = !show3" >收起</el-button>
      </el-form-item>
    </el-form>
    </div>
    </el-collapse-transition>
     <el-button @click="show3 = !show3" v-if="!show3"  style="margin: 0 20px">展开</el-button>
    <IssueList :issueObj="issueObj" ref="child" v-if="showIssueList"></IssueList>
    </div>
</template>

<script>
import IssueList from '@/views/IssueList'
// 导入axios
// import axios from "axios";


export default {
    name:'Search',
    components:{
      IssueList,
    },
    data() {
    return {
      issueObj:{},
      show3: true,
      showIssueList:false,
      ruleForm: {
        
        iusseId:'',
        createMan: null,
        updateMan: null,
        date1: null,
        date2: null,
        date3: null,
        date4: null,
        status:null,
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      rules: {
        date1: [
          {
            type: "date",
            // required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            // required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
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
      this.showIssueList=true;
      //   data: {
      //     issueId:this.ruleForm.issueId,
      //     status:this.ruleForm.status,
      //     createMan:this.ruleForm.createMan,
      //     updateMan:this.ruleForm.updateMan,
      //     createDate:this.ruleForm.date1,
      //     updateDate:this.ruleForm.date3,
      //     date2:this.ruleForm.date2,
      //     date4:this.ruleForm.date4,
      //     pageIndex:1,
      //     pageSize:20        
      //     }

      //       // 发送post请求
      //     axios({
      //   method: "post",
      //   url: "http://localhost:8999/searchIssue",
      //   data: {
      //     issueId:this.ruleForm.issueId,
      //     status:this.ruleForm.status,
      //     createMan:this.ruleForm.createMan,
      //     updateMan:this.ruleForm.updateMan,
      //     createDate:this.ruleForm.date1,
      //     updateDate:this.ruleForm.date3,
      //     date2:this.ruleForm.date2,
      //     date4:this.ruleForm.date4,
      //     pageIndex:1,
      //     pageSize:20        
      //     }
      // })
      //   .then((res) => {
      //     console.log("data..", res.data);
      //     console.log(typeof(res.data));
      //     this.issueObj=res.data;
      //   })
      //   .catch((err) => {
      //     console.log("error...", err);
      //   });




      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.issueObj=this.ruleForm;
          this.$refs.child.getData();
          this.$notify({
           title: "消息",
           message: "搜索完成",
           type: "success",
           });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      // this.$refs.child.getData();
      this.resetForm(formName);
    },
    
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
}
</script>

<style>
.Search {
  height: 100%;
  width: 80%;
  margin: 50px auto;
  
}
</style>