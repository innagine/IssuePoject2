<template>
  <div>
    <div class="IssueList" v-if="showIssueList">
      <el-container class="home-containar">
        <el-main>
          <div class="main">
            <!--  -->
            <!-- 表格属性设置 -->
            <el-table
              ref="multipleTable"
              :data="tableData"
              
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <!-- 表格内容 -->
              <el-table-column type="selection"> </el-table-column>
              <el-table-column type="index" :index="indexMethod" label="序号">
              </el-table-column>
              <el-table-column prop="issueId" label="Issue ID">
              </el-table-column>
              <el-table-column prop="createMan" label="Issue 创建人">
              </el-table-column>
              <el-table-column
                prop="createDate"
                label="创建时间"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="updateMan"
                label="修改人"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="status"
                label="Issue 状态"
                show-overflow-tooltip
                :filters="[{ text: '待修改', value: '待修改' }, { text: '待验证', value: '待验证' }, { text: '关闭', value: '关闭' }]"
                :filter-method="filterTag"
                filter-placement="bottom-end"
              >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.status === '待修改' ? 'primary' : (scope.row.status === '待验证' ? 'danger':'success') "
                  disable-transitions>{{scope.row.status}}</el-tag>
              </template>
              </el-table-column>
              <el-table-column
                prop="planDate"
                label="预计完成时间"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="finalDate"
                label="实际完成时间"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                  <el-button
                    style="background-color: #f78989 !important"
                    size="mini"
                    type="danger"
                    @click="
                      handleDelete(
                        scope.row.issueId
                      )
                        
                    "
                    >详情</el-button
                  >
                  <!-- 弹窗内容 -->
                  <el-dialog
                    title="ISSUE详情"
                    :visible.sync="dialogTableVisible"
                    destroy-on-close
                    v-if="dialogTableVisible"
                  >
                    <div class="Detail">
                      <el-form
                        ref="ruleForm"
                        label-width="100px"
                        class="demo-ruleForm"
                        style="align-self: center"
                      >
                        <el-row>
                          <el-col :span="12"
                            ><el-form-item label="Issue题目">
                              <el-input readonly v-model="issue_name">{{
                                issue_name
                              }}</el-input>
                            </el-form-item>
                          </el-col>

                          <el-col :span="11">
                            <el-form-item label="Issue No.">
                              <el-input readonly v-model="issue_id">{{
                                issue_id
                              }}</el-input>
                            </el-form-item></el-col
                          >
                        </el-row>
                        <el-row>
                          <el-col :span="12"
                            ><el-form-item label="指派人">
                              <el-input readonly v-model="create_man">{{
                                create_man
                              }}</el-input></el-form-item
                            ></el-col
                          >
                          <el-col :span="11">
                            <el-form-item
                              label="影响版本"
                              prop="version"
                              :inline="true"
                            >
                              <el-input readonly v-model="beta">{{
                                beta
                              }}</el-input>
                            </el-form-item></el-col
                          >
                        </el-row>

                        <el-form-item label="创建时间">
                          <el-col :span="11">
                            <el-form-item>
                              <el-date-picker
                                type="date"
                                style="width: 100%"
                                readonly
                                v-model="create_date"
                                >{{ create_date }}</el-date-picker
                              >
                            </el-form-item>
                          </el-col>
                        </el-form-item>
                        <el-form-item label="修改时间">
                          <el-col :span="11">
                            <el-form-item>
                              <el-date-picker
                                type="date"
                                readonly
                                style="width: 100%"
                                v-model="update_date"
                                >{{ update_date }}</el-date-picker
                              >
                            </el-form-item>
                          </el-col>
                        </el-form-item>
                        <el-form-item label="完成时间">
                          <el-col :span="11">
                            <el-form-item>
                              <el-date-picker
                                type="date"
                                readonly
                                v-model="final_date"
                                style="width: 100%"
                                >{{ final_date }}</el-date-picker
                              >
                            </el-form-item>
                          </el-col>
                        </el-form-item>
                        <el-form-item label="步骤重现">
                          <el-input
                            type="textarea"
                            autosize
                            readonly
                            v-model="step"
                            >{{ step }}</el-input
                          >
                        </el-form-item>
                        <el-form-item label="Issue等级">
                          <el-col :span="11">
                            <el-input readonly v-model="level">{{
                              level
                            }}</el-input>
                          </el-col>
                        </el-form-item>
                        <el-form-item label="修改方案">
                          <el-input
                            type="textarea"
                            autosize
                            readonly
                            v-model="modifyA"
                            >{{ modifyA }}</el-input
                          >
                        </el-form-item>
                      </el-form>
                      <IMG2 :ISSUEID="IMG"></IMG2>
                    </div>
                  </el-dialog>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
        <el-footer>
          <!-- 分页栏目设置 -->
          <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="currentPage"
            :page-size="PageSize"
            :page-sizes="[20, 40, 60, 80]"
            layout="total, prev, pager, next , sizes, jumper"
            :total="totalCount"
          >
          </el-pagination>
        </el-footer>
      </el-container>
    </div>
    <IssueModify v-if="showMotify" :modifyId="modifyId" v-on:childByValue="childByValue"></IssueModify>
  </div>
</template>

<script>
import axios from "axios";
import IssueModify from "@/views/IssueModify.vue";
import IMG2 from '@/components/IMG2';


//表格
export default {
  props:['ruleForm'],

  name: "issuelist",
  components: {
    IssueModify,
    IMG2
  },
  
  data() {
    return {
      IMG:'',
      //搜索数据
      form: {
        user_id: "",
        user_name: "",
      },
      textname: "",
      textid: "",
      //随机数据
      tableData: [],
      //当前页数 ，默认为1
      currentPage: 1,
      //获取数据长度(注意：这里不能为空)
      totalCount: 1,
      // 每页显示数量
      pageSize: 20,
      multipleSelection: [],
      // 默认每页显示的条数（可修改）
      PageSize: 20,
      showIssueList: true,
      showMotify: false,
      //弹窗tagId: "",
      issue_name: "",
      issue_id: "",
      create_man: "",
      beta: "",
      create_date: "",
      update_date: "",
      final_date: "",
      step:"",
      level: "",
      modifyA:"",
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      //缓存修改issue的id
      modifyId:"",
      issueObjlist:this.issueObj,

      //搜索数据
      search:{
          userId:null,
          issueId:null,
          status:null,
          createMan:null,
          updateMan:null,
          createDate:null,
          updateDate:null,
          date2:null,
          date4:null,
          pageIndex:null,
          pageSize:null 
      }
    };
  },


  methods: {
    //多选框取值
    handleSelectionChange(val) {
      this.checkIds = val;
      console.log("选中", val);
    },
    //标签
    filterTag(value, row) {
        return row.status === value;
    },
    //清空用户输入的内容
    empty() {
      this.form.user_id = "";
      this.form.user_name = "";
    },
    //翻页改变索引
    indexMethod(index) {
      return (this.currentPage - 1) * this.PageSize + index + 1;
    },
    

    getData(n1,n2) {
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"+this.ruleForm.issueId);
      if(!this.ruleForm.issueId){
        this.ruleForm.issueId=null;
        console.log("++++++"+this.ruleForm.issueId);
      }
      // console.log("N1@@@@@@@@@@@@@@@@@@@@----"+n1);
      // console.log("N2@@@@@@@@@@@@@@@@@@@@@@@@@----"+n2);
      if(n1==undefined){
          n1=20;
      }
      if(n2==undefined){
          n2=1
      }
      // console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@"+this.issueObj.createMan);
      this.search.issueId=this.ruleForm.issueId,
      // console.log("N999@@@@@@@@@@@@@@@@@@@@@@@@@----"+this.search.issueId);
      this.search.status=this.ruleForm.status,
      this.search.createMan=this.ruleForm.createMan,
      this.search.updateMan=this.ruleForm.updateMan,
      this.search.createDate=this.ruleForm.date1,
      this.search.updateDate=this.ruleForm.date3,
      this.search.date2=this.ruleForm.date2,
      this.search.date4=this.ruleForm.date4,
      axios({
        method: "post",
        url: "http://localhost:8999/searchIssue",
        data:{
          userId:null,
          issueId:this.ruleForm.issueId,
          status:this.ruleForm.status,
          createMan:this.ruleForm.createMan,
          updateMan:this.ruleForm.updateMan,
          createDate:this.ruleForm.date1,
          updateDate:this.ruleForm.date3,
          date2:this.ruleForm.date2,
          date4:this.ruleForm.date4,
          pageIndex:n2,
          pageSize:n1   
        }
      })
        .then((res) => {
          // 将数据赋值给tableData
          this.tableData = res.data.issue;
          // 将数据的长度赋值给totalCount
          this.totalCount = res.data.total;
        })
        .catch((err) => {
          console.log("error...", err);
        });

    
        
    },

    getDataA(n1,n2) {
      console.log("N4@@@@@@@@@@@@@@@@@@@@@@@@@----"+this.search.issueId);
      if(n1==undefined){
          n1=20;
      }
      if(n2==undefined){
          n2=1
      }

      axios({
        method: "post",
        url: "http://localhost:8999/searchIssue",
        data:{
          userId:null,
          issueId:this.search.issueId,
          status:this.search.status,
          createMan:this.search.createMan,
          updateMan:this.search.updateMan,
          createDate:this.search.createDate,
          updateDate:this.search.updateDate,
          date2:this.search.date2,
          date4:this.search.date4,
          pageIndex:n2,
          pageSize:n1   
        }
      })
        .then((res) => {
          // 将数据赋值给tableData
          this.tableData = res.data.issue;
          // 将数据的长度赋值给totalCount
          this.totalCount = res.data.total;
        })
        .catch((err) => {
          console.log("error...", err);
        });

    
        
    },
    
    // 分页
    // 每页显示的条数
    handleSizeChange(val) {
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$"+val);
      // 改变每页显示的条数
      this.PageSize = val;
      // 点击每页显示的条数时，显示第一页
      this.getDataA(val, 1);
      // 注意：在改变每页显示的条数时，要将页码显示到第一页
      this.currentPage = 1;
      
    },
    // 显示第几页
    handleCurrentChange(val) {
      console.log(val);
      // 改变默认的页数
      this.currentPage = val;
      // 切换页码时，要获取每页显示的条数
      this.getDataA(this.PageSize, this.currentPage);
    },
    //修改页面跳转
    modify() {
      this.showIssueList = false;
      this.showMotify = true;
    },
    //取修改按钮的数据
    handleModify(index, row) {
      this.modify();
      this.modifyId=row,
      console.log(index, row);
    },
    //取详情按钮的数据index, row
    handleDelete(n) {
      this.IMG=n;
      console.log(n);
      this.getTagDetail(n);
    // console.log("++++++++++++++++++++++++++++++++++++++++++++++"+this.issueObj.issueId);

    },
    //弹窗
    getTagDetail(n) {
      
      this.dialogTableVisible = true;
      axios({
        method: "post",
        url: "http://localhost:8999/searchIssue",
        data:{
            
          issueId: n,
          status:null,
          createMan:null,
          updateMan:null,
          createDate:null,
          updateDate:null,
          date2:null,
          date4:null,
          pageIndex:1,
          pageSize:20  
        }
      })
        .then((res) => {
          this.issue_name = res.data.issue[0].issueName;
          this.issue_id = res.data.issue[0].issueId;
          this.create_man = res.data.issue[0].createMan;
          this.beta = res.data.issue[0].beta;
          this.create_date = res.data.issue[0].createDate;
          this.update_date = res.data.issue[0].planDate;
          this.final_date = res.data.issue[0].finalDate;
          this.step = res.data.issue[0].step;
          this.modifyA = res.data.issue[0].solution;
          if(res.data.issue[0].level==1){
            res.data.issue[0].level="低";
          }else if(res.data.issue[0].level==2){
            res.data.issue[0].level="一般";
          }else if(res.data.issue[0].level==3){
            res.data.issue[0].level="较高";
          }else if(res.data.issue[0].level==4){
            res.data.issue[0].level="最高";
          }
          this.level = res.data.issue[0].level;
        })
        .catch((err) => {
          console.log("error...", err);
        });
    },
    //隐藏
    childByValue(show){
      // console.log("@@@@@@@@@@"+show+"*********");
      this.showIssueList = show.showIssueList;
      this.showMotify = show.showMotify;
    }
  },
  // created: function () {
  //   this.getData();
  // },
};
</script>

<style >
.main {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.AccountInquiry {
  margin: 30px 30px;
}

.inputid,
.inputname,
.search {
  display: inline-block;
}

/* 头部样式 底部样式*/
.header {
  height: 5px;
  text-indent: 20px;
  line-height: 5px;
  text-align: left;
}

.el-footer {
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-pagination {
  text-align: center;
}

/* 弹窗的样式 */
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.text {
  line-height: 23px;
}
</style>