<template>
  <div class="echart">
    <!--为echarts准备一个具备大小的容器dom-->
    <div id="main" style="width: 600px; height: 400px"></div>
  </div>
</template>


<script>
import axios from "axios";
import echarts from "echarts";
export default {
  name: "",
  props: ["User"],
  //   created() {
  //     axios({
  //       method: "post",
  //       url: "http://localhost:8999/searchIssue",
  //       data: {
  //         userId: this.User.userId,
  //         issueId: 0,
  //         status: null,
  //         createMan: null,
  //         updateMan: null,
  //         createDate: null,
  //         updateDate: null,
  //         date2: null,
  //         date4: null,
  //         pageIndex: 1,
  //         pageSize: 20,
  //       },
  //     })
  //       .then((res) => {
  //         // console.log(data);
  //         // 将数据赋值给tableData
  //         // res.data.issue[i].status
  //         this.userlist=res.data;
  //         this.taskList=this.userlist.issue;
  //         console.log(this.userlist);
  //         console.log(this.taskList);
  //         console.log(this.i);
  //         for(;this.i<this.userlist.total;this.i++){
  //             if(res.data.issue[this.i].status=="已完成"){
  //                 this.finish++

  //             }
  //             if(res.data.issue[this.i].status=="待修改"){
  //                 this.unfinish++

  //             }
  //             if(res.data.issue[this.i].status=="待验证"){
  //                 this.check++
  //             }

  //         }
  //         console.log(this.unfinish)
  //         console.log(this.finish)
  //         console.log(this.check)

  //         // 将数据的长度赋值给totalCount

  //         // console.log(this.tableData);
  //         // console.log(this.totalCount);

  //       })
  //       .catch((err) => {
  //         console.log("error...", err);
  //       });
  //   },

  data() {
    return {
      i: 0,
      userlist: {},
      unfinish: 1,
      create: 1,
      finish: 1,
      taskList: [
        {beta:'',
        createDate:'',
        createMan:'',
        finalDate:'',
        issueId:'',
        issueName:'',
        level:'',
        planDate:'',
        solution:'',
        status:'',
        step:'',
        type:'',
        updateDate:'',
        updateMan:'',
        userId:'',
        }
        ],
      charts: "",
      opinion: ["创建的任务", "收到的任务", "完成的任务"],
      opinionData: [
        { value: this.create, name: "创建的任务" },
        { value: this.unfinish, name: "收到的任务" },
        { value: this.finish, name: "完成的任务" },
      ],
    };
  },
  methods: {
    drawPie(id) {
      this.charts = echarts.init(document.getElementById(id));
      this.charts.setOption({
        title: {
          text: "个人ISSUE任务进度",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          top: "bottom",
          data: this.opinion,
        },
        color: ["#6DD5FA", "#bdc3c7", "#1fa2ff"],
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
            },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "半径模式",
            type: "pie",
            radius: [20, 110],

            roseType: "radius",
            label: {
              show: true,
            },
            emphasis: {
              label: {
                show: true,
              },
            },
            data: [
        { value: this.create, name: "创建的任务" },
        { value: this.unfinish, name: "收到的任务" },
        { value: this.finish, name: "完成的任务" },
      ],
          },
        ],
      });
    },
    loadData() {
      // //请求接口，假设接口返回的数据我们用tableData接收了

      axios({
        method: "post",
        url: "http://localhost:8999/searchIssueByuser",
        data: {
          userId: this.User.userId,
          userName:this.User.userName,
          pageIndex: 1,
          pageSize: 20,
        },
      })
        .then((res) => {
          console.log(res.data.statistics[0])
          console.log("创建"+res.data.statistics[0].cNum)
          console.log("收到"+res.data.statistics[0].rNum)
          console.log("完成"+res.data.statistics[0].aNum)
          this.create=res.data.statistics[0].cNum
          this.unfinish=res.data.statistics[0].rNum
          this.finish=res.data.statistics[0].aNum
          console.log(this.create)
              this.$nextTick(function () {
      this.drawPie("main");
    });

        })
        .catch((err) => {
          console.log("error...", err);
        });
    },
  },

  mounted() {
    this.loadData()
  },
};
</script>

<style>
.echart {
  display: flex;
  margin: 30px 30px;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>