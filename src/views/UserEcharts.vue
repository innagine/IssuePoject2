<template>
  <div class="echart">
    <!--为echarts准备一个具备大小的容器dom-->
    <div id="main" style="width: 100%; height: 400px"></div>
  </div>
</template>


<script>
import axios from "axios";
import echarts from "echarts";
export default {
  name: "UserEcharts",
  props: ["User"],


  data() {
    return {
      i: 0,
      userlist: {},
      activeTotal: 0,
      cancelTotal: 0,
      cancelpublicUser: 0,
      cancelmanagerUser: 0,
      canceladminUser: 0,
      activepublicUser: 0,
      activemanagerUser: 0,
      activeadminUser: 0,
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
        text: 'ISSUE系统用户总量',
        // subtext: '数据来自网络'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    color: ["#6DD5FA", "#bdc3c7"],
    legend: {
        data: ['激活状态', '注销状态']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    yAxis: {
        type: 'category',
        data: ['管理员', '经理', '普通用户', '用户总量']
    },
    series: [
        {
            name: '激活状态',
            type: 'bar',
            data: [this.activeadminUser, this.activemanagerUser, this.activepublicUser, this.activeTotal]
        },
        {
            name: '注销状态',
            type: 'bar',
            data: [this.canceladminUser, this.cancelmanagerUser, this.cancelpublicUser, this.cancelTotal]
        }
    ]
      });
    },
    loadData() {
      // //请求接口，假设接口返回的数据我们用tableData接收了

      axios({
        method: "post",
        url: "http://192.168.1.57:8999/searchUser",
        data: {
          userId: null,
          userName:null,
          pageIndex: 1,
          pageSize: 80,
        },
      })
        .then((res) => {
          console.log(res.data)
          this.userlist=res.data.users
          console.log(this.userlist)
          for(let i = 0; i<res.data.total;i++){
            if(this.userlist[i].status=="激活"){
              this.activeTotal++
              if(this.userlist[i].identity=="普通用户") this.activepublicUser++;
              else if(this.userlist[i].identity=="经理") this.activemanagerUser++;
              else if(this.userlist[i].identity=="超级Admin") this.activeadminUser++;
            }
            else if(this.userlist[i].status=="注销"){
              this.cancelTotal++
              if(this.userlist[i].identity=="普通用户") this.cancelpublicUser++;
              else if(this.userlist[i].identity=="经理") this.cancelmanagerUser++;
              else if(this.userlist[i].identity=="超级Admin") this.canceladminUser++;
            }
          }
          console.log(this.activeTotal)
          console.log(this.cancelTotal)
          console.log(this.activepublicUser)
          console.log(this.activemanagerUser)
          console.log(this.activeadminUser)
          console.log(this.cancelpublicUser)
          console.log(this.cancelmanagerUser)
          console.log(this.canceladminUser)
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
    this.$nextTick(function () {
      this.drawPie("main");
    });
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