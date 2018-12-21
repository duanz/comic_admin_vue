<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
    background-color="#545c64"
    router
  >
    <el-menu-item :index="$route.path" @click="handleisCollapse" style="background-color:#ffd04b">
      <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></i>
      <span slot="title">{{isCollapse?'展开':'收起'}}导航</span>
    </el-menu-item>

    <el-menu-item index="/mobile/index" style="background-color:#67C23A">
      <i class="el-icon-view"></i>
      <span slot="title">移动预览</span>
    </el-menu-item>

    <el-menu-item index="/comic" route="/comic">
      <i class="el-icon-picture"></i>
      <span slot="title">漫画管理</span>
    </el-menu-item>
    <el-menu-item index="/book" route="/book">
      <i class="el-icon-tickets"></i>
      <span slot="title">小说管理</span>
    </el-menu-item>
    <el-menu-item index="/user" route="/user">
      <i class="el-icon-service"></i>
      <span slot="title">用户管理</span>
    </el-menu-item>
    <el-menu-item index="/system" route="/system">
      <i class="el-icon-setting"></i>
      <span slot="title">系统管理</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "leftMenu",
  data: function() {
    return {
      isCollapse: true
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleisCollapse() {
      this.$data.isCollapse = this.$data.isCollapse ? false : true;
    }
  }
};
</script>

