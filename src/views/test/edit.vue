<template>
  <div class="root">
    <el-row :gutter="20">
      <el-col :span="12">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px" style="width:600px">
          <el-form-item label="编号" prop="id">
            <el-input type="number" :disabled="true" v-model="form.id"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="userName">
            <el-input type="text" v-model="form.userName"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input type="number" v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input type="password" v-model="form.passWord"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('form')">修改</el-button>
            <el-button @click="resetForm('form')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import crud from "@/api/crud.js";
  export default {
    data() {
      return {
        form: { //表单绑定
          id: null,
          userName: '',
          age: '',
          passWord: ''
        },
        rules: {  //校验规则
          userName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'change' }
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'change' }
          ],
          passWord: [
            { required: true, message: '请输入密码', trigger: 'change' }
          ]
        }
      };
    },
    created: function() {
    },
    mounted(){
      this.form.id = this.$route.params.editParams.id;
      this.form.userName = this.$route.params.editParams.userName;
      this.form.passWord = this.$route.params.editParams.passWord;
      this.form.age = this.$route.params.editParams.age;
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            crud.editUser({
              id: this.form.id,
              userName: this.form.userName,
              age: this.form.age,
              passWord: this.form.passWord
            }).then(res => {
              console.log("api editUserData :", res);
              this.tableData = res.data;
              this.$router.push({ path: "/query"});
            },err=>{
              console.log("err :", err);
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>

<style>
</style>
