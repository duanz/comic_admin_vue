<template>
  <el-container class="height">
    <el-header style="background-color:#409EFF;">
      <el-row>
        <el-col :span="4" class="text-left"></el-col>
        <el-col :span="20"></el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-aside width="auto">
        <LeftMenu></LeftMenu>
      </el-aside>

      <el-main style="background-color:#F2F6FC;">
        <router-view></router-view>
        <!-- <el-container> -->
        <!-- <el-header width="auto"> -->
        <!-- <TopMenu></TopMenu> -->
        <!-- </el-header> -->
        <!-- <el-main> -->
        <!-- <router-view></router-view> -->
        <!-- </el-main> -->
        <!-- </el-container> -->
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
      admin_view: true
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
.height {
  height: 100%;
}
.text-left {
  text-align: left;
}
.mobile_view {
  height: 123%;
}
</style>

