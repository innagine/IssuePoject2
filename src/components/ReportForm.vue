<!-- 报表组件——表单 -->
<template>
    <div class="ReportForm">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
              <!-- 用户ID查询 -->
              <el-col :span="7">
                <el-form-item label="用户ID" prop="userId" style="width:400px">
                    <el-input v-model="ruleForm.userId" autocomplete="off" maxlength="30" show-word-limit placeholder="请输入用户ID"></el-input>
                </el-form-item>                
              </el-col>
              <!-- 用户姓名查询 -->
              <el-col :span="5">
                <el-form-item label="用户姓名" prop="userName" style="width:400px">
                    <el-input v-model="ruleForm.userName" autocomplete="off" maxlength="30" show-word-limit placeholder="请输入用户姓名"></el-input>
                </el-form-item>              
              </el-col>
              <!-- 按钮组 -->
              <el-col :span="7">
                <el-form-item>
                    <!-- 查询按钮 -->
                    <el-button type="success" icon="el-icon-search" @click="submitForm('ruleForm')">查询</el-button>
                    <!-- 重置按钮 -->
                    <el-button @click="resetForm('ruleForm')">清空</el-button>
                </el-form-item>
              </el-col>
            </el-row>
        </el-form>        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'ReportForm',
    props:{
        
    },
    data(){
        var validateUserId = (rule, value, callback) => {     //用户ID验证方法
            if (value.length>30) {
                callback(new Error("用户ID不能超过30个字符"));
            }
            else{
                callback();
            }
        };
        var validateUserName = (rule, value, callback) => {   //用户姓名验证方法
            if (value.length>30) {
            callback(new Error("用户姓名不能超过30个字符"));
            } else {
            callback();
            }
        };
        return{
            ruleForm:{      //表单数据
                userId:'',
                userName:''
            },
            rules: {        //设置表单验证规则
                userId: [
                    { validator: validateUserId, trigger: 'blur' }
                ],
                userName: [
                    { validator: validateUserName, trigger: 'blur' }
                ]
            },
            queryUri:'',    //资源标识
            userList:[],    //页数据
        }
    },
    methods:{
      //重置表单项
      resetForm(formName) {         
        this.$refs[formName].resetFields();
      },
      //提交方法——模糊查询
      submitForm(formName) {          
        if (this.ruleForm.userId === ''&&this.ruleForm.userName==='') {   //检查表单是否为空
          alert('空条件查询，顺序返回所有数据！')
          this.handleUserList()
          return;
        } 
        this.$refs[formName].validate((valid) => {    //进行表单验证
          if (valid) {
            axios.post(this.queryUri,{
              userId:this.ruleForm.userId,      //用户id
              userName:this.ruleForm.userName,  //用户姓名
              currentPage:this.currentPage,     //获取页
              pageSize:this.pagesize,           //页长

            }).then((response)=>{
              this.userList=response.data;
              this.$emit('getQueryList',this.userList);

            }).catch((error)=>{
              console.log(error)

            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },        
    }
}
</script>

<style lang="scss" scoped>
.ReportForm{
  margin: 20px 60px;
  margin-bottom: 20px;
  // display: inline-block;
}    
</style>