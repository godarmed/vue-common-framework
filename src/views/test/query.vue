<template>
  <div class="root">
    <!--查询条件-->
    <div class="search">
      <el-input type="text" placeholder="请输入用户名称" v-model="searchParams.userName" clearable class="input-with-select" prefix-icon="el-icon-search" style="width:240px"/>
      <el-input type="number" placeholder="年龄" v-model.number="searchParams.age" clearable class="input-with-select" prefix-icon="el-icon-search" style="width:240px"/>
      <el-input type="password" placeholder="密码" v-model="searchParams.passWord" clearable class="input-with-select" prefix-icon="el-icon-search" style="width:240px"/>
      <el-button @click="searchByCondition" slot="append" icon="el-icon-search"></el-button>
    </div>
    <!--展示数据-->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="180"></el-table-column>
      <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <el-table-column prop="passWord" label="密码"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" plain @click = "editUser(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页参数-->
    <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchParams.page"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="searchParams.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="searchParams.totalItems">
       </el-pagination>
  </div>
</template>

<script>
import crud from "@/api/crud.js";
export default {
  data() {
    return {
      //分页参数
      searchParams:{
        userName: '',
        age: null,
        passWord: '',
        page: 1,
        size: 10,
        totalItems: 0
      },
      tableData: []
    };
  },
  mounted: function() {
    //网络请求统一处理
    let that = this;
    that.searchByCondition();
  },
  methods: {
    //每页大小改变事件
    handleSizeChange(val) {
      this.searchParams.size = val;
      this.searchByCondition();
      console.log(`每页 ${val} 条`);
    },
    //每页页码改变事件
    handleCurrentChange(val) {
      this.searchParams.page = val;
      this.searchByCondition();
      console.log(`当前页: ${val}`);
    },
    //查询方法
    searchByCondition() {
      crud.getTableData(this.proxyRequest(this.searchParams)).then(res => {
        console.log("api tableData :", res);
        res = this.proxyResponse(res);
        this.tableData = res.data;
        this.searchParams.page = res.pageInfo.page;
        this.searchParams.size = res.pageInfo.size;
        this.searchParams.totalItems = res.pageInfo.total;
      },err=>{
        console.log("err :", err);
      });
    },
    proxyRequest(request){
      let proxyRequest = JSON.parse(JSON.stringify(request));
      proxyRequest.page = proxyRequest.page - 1;
      return proxyRequest;
    },
    proxyResponse(response){
      response.pageInfo.page = response.pageInfo.page + 1;
      return response;
    },
    //修改方法
    editUser(params){
      console.log('before router:' + JSON.stringify(params))
      this.$router.push({ name: "edit", params:{editParams:params} });
    }
  }
};
</script>

<style>
</style>
