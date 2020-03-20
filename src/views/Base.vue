<template>
  <el-container class="height">
    <el-header style="background-color:#409EFF;padding: 0 !important;">
      <top-menu></top-menu>
    </el-header>

    <el-container>
      <el-aside v-if="is_auth" width="auto">
        <left-menu></left-menu>
      </el-aside>
      <el-main style="background-color:#F2F6FC;">
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-footer style="background-color:#909399;"></el-footer>
  </el-container>
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";
import TopMenu from "@/components/TopMenu.vue";
import MobileView from "@/components/MobileView.vue";

export default {
  name: "Base",
  components: {
    MobileView,
    LeftMenu,
    TopMenu
  },
  data: function() {
    return {
      admin_view: true,
      is_auth: localStorage.getItem('token')?true:false
    };
  },
  methods: {
    handleMobileView: function() {
      this.$data.admin_view = this.$data.admin_view ? false : true;
    }
  }
};
</script>

<style scoped>
/* @import url("//unpkg.com/element-ui@2.13.0/lib/theme-chalk/index.css"); */
.height {
  height: 100%;
}
.text-left {
  text-align: left;
}
.mobile_view {
  height: 123%;
}
.logo-size {
  font-size: 60px;
}
</style>

