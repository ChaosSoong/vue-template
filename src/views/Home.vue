<template>
  <div class="Home">
    <el-container>
      <el-header>声影星迹</el-header>
      <el-container>
        <el-aside width="202px">
          <el-menu
            default-active="1"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :collapse="isCollapse"
          >
            <router-link to="/home/player">
              <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span slot="title">选手管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/home/judge">
              <el-menu-item index="2">
                <i class="el-icon-document"></i>
                <span slot="title">评委管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/home/account">
              <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">账号管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/home/area">
              <el-menu-item index="4">
                <i class="el-icon-document"></i>
                <span slot="title">赛区管理</span>
              </el-menu-item>
            </router-link>
            <router-link to="/home/vote">
              <el-menu-item index="5">
                <i class="el-icon-document"></i>
                <span slot="title">投票管理</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style lang="stylus" scoped>
.Home {
  .el-header {
    text-align: center;
    line-height: 60px;
    border: 1px solid #eeeeee;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 92vh;
  }
}
</style>
