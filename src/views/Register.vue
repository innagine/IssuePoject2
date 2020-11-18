<template>
<div class="content">
<div class="register">
    <el-card class="box-card">
        <h1>账号注册</h1>
        <el-input placeholder="请输入登陆ID" v-model="account" clearable></el-input>
        <el-input placeholder="请输入姓名" v-model="account" clearable></el-input>
        <el-input placeholder="请输入邮箱" v-model="account" clearable></el-input>
        <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
        <el-input placeholder="请确认密码" v-model="password" show-password></el-input>
        <div class="btn">
            <span ref="point" v-if="showpoint"></span>注册
        </div>
    </el-card>
</div>
</div>
</template>

<script>
export default {
    name: "Register",

    data() {
        return {
            showpoint: false,
            account: "",
            password: "",
            formLabelAlign: {
                name: "",
                region: "",
                type: "",
            },
        };
    },

    methods: {
        // btn(event) {
        //   this.showpoint = !this.showpoint;
        //   // let x = event.clientX ;
        //   // let y = event.clientY ;
        //   let x = event.offsetX;
        //   let y = event.offsetY;

        //   this.$nextTick(() => {
        //     this.$refs.point.style.left = x + "px";
        //     this.$refs.point.style.top = y + "px";
        //   });
        //   console.log(x);
        //   console.log(y);
        //   var _this = this;
        //   var timer = setTimeout(() => {
        //     _this.showpoint = !_this.showpoint;
        //     clearTimeout(timer);
        //   }, 1000);
        // },
    },
};
</script>

<style>
.content {
  margin: 0;
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #51a4db, #a8e4fa);
}

.register {
    height: 100%;
    display: flex;
    width: 20%;
    margin: 0 auto;
}

.el-card {
    align-self: center;
    /* padding: 30px; */
}

.el-card h1 {
    text-align: center;
    padding: 20px;
}

.register .el-input {
    padding: 15px 0;
}

.btn {
    margin: 15px auto;
    padding: 10px 0;
    text-align: center;
    width: 100%;
    background-image: linear-gradient(to right, #51a4db, #a8e4fa);
    color: #fff;
}

.btn:hover {
    background: #a8e4fa;
}

/* 按钮涟漪动画实现
span {
  position: absolute;
  background: #fff;
  transform: translate(-50%, -50%);
  pointer-events: none;
  border-radius: 50%;
  animation: animate 1s linear infinite;
}
@keyframes animate {
  0% {
    width: 0px;
    height: 0px;
    opacity: 0.5;
  }
  100% {
    width: 700px;
    height: 700px;
    opacity: 0;
  }
} */
</style>
