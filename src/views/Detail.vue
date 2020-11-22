<template>
  <div class="Detail">
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
          ><el-form-item label="Issue题目" prop="name">
            <el-input v-model="ruleForm.name" readonly disabled></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="Issue No." prop="id">

            <el-input v-model="ruleForm.id" readonly></el-input> </el-form-item
        ></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"
          ><el-form-item label="指派人" prop="person">
            <el-input v-model="ruleForm.person" readonly></el-input> </el-form-item
        ></el-col>
        <el-col :span="12">
          <el-form-item label="影响版本" prop="version" :inline="true">
            <el-input v-model="ruleForm.version" readonly></el-input> </el-form-item
        ></el-col>
      </el-row>

      <el-form-item label="创建时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker
              type="date"
              v-model="ruleForm.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="修改时间" required>
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
      </el-form-item>
      <el-form-item label="完成时间" required>
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
      </el-form-item>
      <el-form-item label="步骤重现" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="Issue等级" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择Issue等级">
          <el-option label="最高" value="highest"></el-option>
          <el-option label="较高" value="hight"></el-option>
          <el-option label="一般" value="normal"></el-option>
          <el-option label="低" value="low"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "CreateIssue",
  data() {
    return {
      readonly: true,
      ruleForm: {
        name: "",
        id: "",
        person: "",
        version: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {},
};
</script>


<style>
.Detail {
  height: 100%;
  width: 80%;
  margin: 50px auto;
}
</style>