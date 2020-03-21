<template>
  <el-container class="height">
    <el-header style="background-color:#409EFF;padding: 0 !important;">
      <top-menu :isAuth="is_auth"></top-menu>
    </el-header>
    <el-container>
      <el-aside v-if="is_auth" width="auto">
        <LeftMenu></LeftMenu>
      </el-aside>
      <el-main>
        <TabBase v-on:userState="changeUserState" />
      </el-main>
    </el-container>
    <el-footer style="background-color:#909399;"></el-footer>
  </el-container>
</template>

<script>
import TopMenu from "@/components/TopMenu.vue";
import LeftMenu from "@/components/LeftMenu";
import MobileView from "@/components/MobileView.vue";
import TabBase from "@/views/TabBase";

export default {
  name: "Base",
  components: {
    MobileView,
    TopMenu,
    LeftMenu,
    TabBase
  },
  data: function() {
    return {
      admin_view: true,
      is_auth: localStorage.getItem("token") ? true : false
    };
  },
  methods: {
    handleMobileView: function() {
      this.$data.admin_view = this.$data.admin_view ? false : true;
    },
    changeUserState: function(e) {
      this.$data.is_auth = e;
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

