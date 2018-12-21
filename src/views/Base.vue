<template>
  <el-container class="height">
    <el-header style="background-color:#409EFF;">
      <el-row>
        <el-col :span="4" class="text-left"></el-col>
        <el-col :span="20"></el-col>
      </el-row>
    </el-header>

    <el-container>
      <el-container>
        <el-aside width="auto">
          <!-- <el-button
            type="success"
            icon="el-icon-view"
            style="margin-top: 10px;"
            circle
            @click="handleMobileView"
          ></el-button>-->
          <LeftMenu></LeftMenu>
        </el-aside>

        <el-main style="background-color:#F2F6FC;">
          <!-- <el-container
            class="admin_view height"
            v-if="admin_view"
          >-->
          <router-view></router-view>
          <!-- </el-container> -->
          <!-- <el-container
            class="mobile_view"
            v-if="!admin_view"
          >-->
          <!-- <MobileView class="mobile_view" v-if="!admin_view" /> -->
          <!-- </el-container> -->
        </el-main>
      </el-container>

      <el-footer style="background-color:#909399;"></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import LeftMenu from "@/components/LeftMenu.vue";
import MobileView from "@/components/MobileView.vue";

export default {
  name: "Base",
  components: {
    MobileView,
    LeftMenu
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

