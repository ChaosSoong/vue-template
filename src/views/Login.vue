<template>
  <div class="login">
    <h3>声影星迹后台管理系统</h3>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// @ is an alias to /src
import { post } from "../utils/index";
export default {
  name: "login",
  components: {},
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submit() {
      if (!this.form.username) {
        return;
      }
      if (!this.form.password) {
        return;
      }
      post("login", {
        username: this.form.username,
        password: this.form.password
      })
        .then(res => {
          console.log(res);
          if (res.successful) {
            localStorage.setItem("token", res.data.token);
            this.$router.push("/home");
          } else {
            this.$message(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="stylus" scoped>
.login {
  h3 {
    text-align: center;
  }

  width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 50px;
}
</style>
