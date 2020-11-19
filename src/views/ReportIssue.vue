<!-- issue报表页面 -->
<template>
  <div class="ReportIssue">
      <ReportForm @getQueryList='getQueryList'></ReportForm>
      <ReportTable :userList="userList"></ReportTable>
  </div>
</template>

<script>
import ReportForm from '@/components/ReportForm.vue'
import ReportTable from '@/components/ReportTable.vue'
import axios from 'axios';
export default {
    components:{
        ReportForm,     //表单
        ReportTable,    //分页表格
    },
    data(){
        return{
            userList:[] //页数据
        }
    },
    methods:{
      handleUserList(){             //获取初始数据
        // ajax请求数据
        axios.get('/data/userlist.json',{
          params:{
          }
        }).then((response)=>{
          console.log(response.data);
          this.userList=response.data;
        }).catch(function(error){
          console.log(error);
        })
      }, 
      getQueryList(userlist){       //获取查询数据
          this.userList=userlist;
      }       
    },
    created(){                      
        this.handleUserList();      //在被创建后获取初始数据
    }
}
</script>
<style lang="scss" scoped>
.ReportIssue{
    padding: 0;
    margin: 0;
    height: 100%;
    text-align: center;
}
</style>
