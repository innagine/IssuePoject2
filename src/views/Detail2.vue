<template>
  <div>
    弹窗显示
    {{ tagid }}
    <!-- Table  @click="dialogTableVisible = true" -->
    <el-button type="text" @click="getTagDetail((tagId = 2))">详情</el-button>

    <el-dialog title="标签详情" :visible.sync="dialogTableVisible">
      <el-table :data="gridData">
        <el-table-column
          property="tagId"
          prop="tagId"
          label="序号"
          width="50"
        ></el-table-column>
        <el-table-column
          property="tag"
          prop="tag"
          label="标签编码"
          width="100"
        ></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
 
 <script>
export default {
  data() {
    return {
      tagId: "",
      tag: "",
      gridData: [
        {
          tagId: "",
          tag: "",
        },
      ],

      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  methods: {
    getTagDetail: function () {
      // eslint-disable-next-line no-undef
      this.dialogTableVisible = true;
      this.$axios({
        method: "post",
        url: "http://xxx。xxx",
        data: {
          data: {
            tagId: this.tagId,
          },
        },
      }).then((response) => {
        console.log(response.data.data);
        this.tagId = response.data.data.tagId;
        // console.log(this.tagId)
        this.gridData[0].tagId = this.tagId;
        this.tag = response.data.data.tag; // 第一种方法
        this.gridData[0].tag = this.tag;
        // 第二种方法. this.gridData[0].tag= response.data.data.dataSchema
      });
    },
  },
};
</script>