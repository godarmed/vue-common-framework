<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column prop="id" label="编号" width="180"></el-table-column>
    <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
    <el-table-column prop="age" label="年龄"></el-table-column>
    <el-table-column prop="passWord" label="密码"></el-table-column>
  </el-table>
</template>

<script>
import { getTableData, addUser } from "@/api/crud.js";
export default {
  data() {
    return {
      tableData: []
    };
  },
  mounted: function() {
    //网络请求统一处理
    getTableData({
        "page": 0,
        "size": 10,
        "userName": null
      }).then(res => {
      console.log("api tableData :", res);
      this.tableData = res.data;
    },err=>{
      console.log("err :", err);
    });
  },
  methods: {}
};
</script>

<style>
</style>
