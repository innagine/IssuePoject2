<template>
  <div class="Upload">
    <el-upload
      class="upload-demo"
      action="http://localhost:8999/uploadImage"
      multiple
      :limit="3"
      :before-upload="before"
      :data="issue"
      :name="name"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "Upload",
  props:['ISSUEID'],
  data() {
      return {
          name:"image",
          issue:{
              issueId:this.ISSUEID
          }
      }
  },
  methods: {
   
    before(){
        alert("上传成功！")
    }
  },
};
</script>