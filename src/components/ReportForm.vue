<!-- 报表组件——表单 -->
<template>
    <div class="ReportForm">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
              <!-- 用户ID查询 -->
                <el-form-item label="用户ID" prop="userId" style="width:400px;display:inline-block">
                    <el-input v-model="ruleForm.userId" autocomplete="off" maxlength="30" show-word-limit placeholder="请输入用户ID"></el-input>
                </el-form-item>                

              <!-- 用户姓名查询 -->
                <el-form-item label="用户姓名" prop="userName" style="width:400px;display:inline-block">
                    <el-input v-model="ruleForm.userName" autocomplete="off" maxlength="30" show-word-limit placeholder="请输入用户姓名"></el-input>
                </el-form-item>              

              <!-- 按钮组 -->
                <el-form-item style="display:inline-block">
                    <!-- 查询按钮 -->
                    <el-button type="success" icon="el-icon-search" @click="submitForm('ruleForm')">查询</el-button>
                    <!-- 重置按钮 -->
                    <el-button @click="resetForm('ruleForm')">清空</el-button>
                </el-form-item>

            </el-row>
        </el-form>        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name:'ReportForm',
    props:['pageIndex','pageSize'],
    data(){
        //下面的表单验证方法应该用不到
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
            //表单数据
            ruleForm:{      
                userId:'',
                userName:''
            },
            //表单验证规则
            rules: {        
                userId: [
                    { validator: validateUserId, trigger: 'blur' }
                ],
                userName: [
                    { validator: validateUserName, trigger: 'blur' }
                ]
            },
            url:'http://localhost:8999/searchIssueByuser',    //资源标识
            userList:[],    //页数据
            total:0,
        }
    },
    methods:{
      /**
       * 重置表单项
       */
      resetForm(formName) {         
        this.$refs[formName].resetFields();
      },
      /**
       * 提交方法——模糊查询
       */
      submitForm(formName) {       
        console.log('-------------------------提交')   
        console.log(this.ruleForm.userId+" "+this.ruleForm.userName+" "+this.pageIndex+" "+this.pageSize)
        if (this.ruleForm.userId ==''&&this.ruleForm.userName=='') {   //检查表单是否为空
          console.log('空条件查询，顺序返回所有数据！')
          this.fuzzyQuery();
        } 
        else{
           this.$refs[formName].validate((valid) => {    //进行表单验证
          if (valid) {
            console.log('模糊查询')
            this.fuzzyQuery();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
             }
        // this.fuzzyQuery()
      },
      /**
       * 请求后端进行模糊查询
       */
      fuzzyQuery(){
        axios({
          method:'post',
          url:this.url,
          data:{
            userId:this.ruleForm.userId,
            userName:this.ruleForm.userName,
            pageIndex:1,
            pageSize:this.pageSize 
          }
        }).then(res=>{
          console.log(res);
          this.userList=res.data.statistics;   //获取模糊查询结果
          this.total=res.data.total;
          console.log(this.userList)
        }).then(()=>{
          //异步请求的局部同步，防止发送的列表为空
          console.log('发送数据')
          this.sendData();          //发送数据
        }).catch(Error=>{
          console.log(Error);
        })
      },
      /**
       * 将数据传递给父组件
       */    
      sendData() {
        this.$emit('getQueryData',this.userList,this.total,this.ruleForm.userId,this.ruleForm.userName);
      }   
    }
}
</script>

<style lang="scss" scoped>
.ReportForm{
  margin: 20px 60px;
  margin-bottom: 20px;
  width: 1200px;;
  // display: inline-block;
}    
</style>