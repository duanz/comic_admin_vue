<template>
  <el-menu
    :default-active="menuActive"
    mode="horizontal"
    class="el-menu-demo"
    background-color="#545c64"
    active-text-color="rgb(116, 235, 255)"
    @select="handleSelect"
    router
  >
    <el-row>
      <el-col class="bgcolor" :span="2">
        <div class="block height">
          <i class="logo-size el-icon-magic-stick"></i>
        </div></el-col>
      <el-col :span="5">
        <el-menu-item index="comic_list" route="/comic">
          <i class="el-icon-picture"></i>
          <span slot="title">漫画管理</span>
        </el-menu-item>
      </el-col>
      <el-col :span="5">
        <el-menu-item index="book_list" route="/book">
          <i class="el-icon-tickets"></i>
          <span slot="title">小说管理</span>
        </el-menu-item>
      </el-col>
      <el-col :span="5">
        <el-menu-item index="user" route="/user">
          <i class="el-icon-service"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-col>
      <el-col :span="5">
        <el-menu-item index="task_list" route="/system">
          <i class="el-icon-setting"></i>
          <span slot="title">系统管理</span>
        </el-menu-item>
      </el-col>
      <el-col v-if="isAuth" :span="2">
        <el-dropdown>
          <span class="el-dropdown-link" style="color:chartreuse;">
            {{userInfo.username}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <a @click="dologout()">
              <el-dropdown-item>退出</el-dropdown-item>
            </a>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </el-menu>
</template>
<script>
import Storager from "../utils/storage";
import { logout } from "../api/memberApi";
export default {
  name: "topMenu",
  inject: ["reload"],
  props: {
    isAuth: Storager.isAuth()
  },
  data: function() {
    return {
      userInfo: Storager.isAuth() ? Storager.getUserInfo() : {},
      userState: Storager.isAuth(),
      menuActive: this.$route.path
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
      this.$data.menuActive = key;
      console.log(this.$data.menuActive)
    },
    dologout() {
      Storager.clear();
      logout();
      this.resetVal();
      // this.reload()
      this.$router.go(0);
    },
    resetVal() {
      this.$data.userInfo = Storager.isAuth() ? Storager.getUserInfo() : {};
      this.$data.userState = Storager.isAuth();
    }
  },
  mounted(){
    console.log(this.$route.name)
    this.$data.menuActive = this.$route.name;
  },
  watch: {
    isAuth: function(news, old) {
      if (!news) {
        this.$router.push({ path: "/login" });
      } else {
        this.$data.userInfo = Storager.getUserInfo();
      }
    }
  }
};
</script>
<style scoped>
.bgcolor {
  background-color: cadetblue;
}
</style>
