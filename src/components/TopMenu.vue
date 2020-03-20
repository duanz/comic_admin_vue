<template>
  <el-menu
    :default-active="$route.path"
    mode="horizontal"
    class="el-menu-demo"
    background-color="#545c64"
    @select="handleSelect"
    router
  >
    <el-row>
      <el-col class="bgcolor" :span="2">
        <div class="block height">
          <i class="logo-size el-icon-magic-stick"></i>
        </div>
      </el-col>
      <el-col :span="5">
        <el-menu-item index="/comic" route="/comic">
          <i class="el-icon-picture"></i>
          <span slot="title">漫画管理</span>
        </el-menu-item>
      </el-col>
      <el-col :span="5">
        <el-menu-item index="/book" route="/book">
          <i class="el-icon-tickets"></i>
          <span slot="title">小说管理</span>
        </el-menu-item>
      </el-col>
      <el-col :span="5">
        <el-menu-item index="/user" route="/user">
          <i class="el-icon-service"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </el-col>
      <el-col :span="5">
        <el-menu-item index="/system" route="/system">
          <i class="el-icon-setting"></i>
          <span slot="title">系统管理</span>
        </el-menu-item>
      </el-col>
      <el-col v-if="userInfo" :span="1">

          <i class="el-icon-user"></i>
          <span slot="title">{{userInfo.username}}</span>
      </el-col>
    </el-row>
  </el-menu>
</template>
<script>
import {Storager} from "../utils/storage"
export default {
  name: "topMenu",
  data: function() {
    return {
      isCollapse: true,
      userInfo: Storager.isAuth()? Storager.getUserInfo(): {} 
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
.bgcolor{
  background-color: cadetblue;
}
</style>
