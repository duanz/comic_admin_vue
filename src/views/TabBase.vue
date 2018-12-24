<template>
  <el-container class="height" direction="vertical">
    <el-header>

    <TopMenu></TopMenu>
    </el-header>
    <el-main>
    
    <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import TopMenu from "@/components/TopMenu.vue";
export default {
  name: "tabViewBase",
  components: {
    TopMenu
  },
  data: function() {
    return {
      tabList: [],
      current_tab_name: ""
    };
  },
  methods: {
    handleTabClick: function(val) {
      console.log(val);
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
</style>

