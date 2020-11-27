<template>
<div class="IMg2">
<h3>修改截图：</h3>
<img class="AAA" :src="URL"/>
</div>
</template>

<script>
// 导入axios
import axios from "axios";


export default {
props:['ISSUEID'],
name:'IMG2',
created() {
    // 发送post请求，请求注册
      axios({
        method: "post",
        url: "http://localhost:8999/downloadImage",
        data: {
          issueId:this.ISSUEID,
        },
      })
        .then((res) => {
          console.log("data..", res.data);
         
          // console.log(typeof(res.data))
          if(res.data!="-1"){
          this.URL='http://localhost:8999/image/'+res.data
          }
        //   console.log(this.URL)
        })
        .catch((err) => {
          console.log("error...", err);
        });

},

    data() {
        return {
            URL:''
        }
    },
}
</script>

<style >
.IMg2{
    padding: 25px;
}
.AAA{
    width: 400px;
}

    
</style>