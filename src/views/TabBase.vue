<template>
  <el-container class="height" direction="vertical">
    <TopMenu></TopMenu>
    <router-view></router-view>
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
    },
    set_current_tab_name: function() {
      if (this.$data.tabList === this.$data.comic_tabs) {
        this.$data.current_tab_name = this.$data.comic_tabs[0][1];
      } else if (this.$data.tabList === this.$data.book_tabs) {
        this.$data.current_tab_name = this.$data.book_tabs[0][1];
      } else if (this.$data.tabList === this.$data.user_tabs) {
        this.$data.current_tab_name = this.$data.user_tabs[0][1];
      } else if (this.$data.tabList === this.$data.system_tabs) {
        this.$data.current_tab_name = this.$data.system_tabs[0][1];
      }
    },
    set_tabList_data: function() {
      const route_name = this.$route.path;
      if (route_name.indexOf("comic") !== -1) {
        this.$data.tabList = this.$data.comic_tabs;
      } else if (route_name.indexOf("book") !== -1) {
        this.$data.tabList = this.$data.book_tabs;
      } else if (route_name.indexOf("user") !== -1) {
        this.$data.tabList = this.$data.user_tabs;
      } else if (route_name.indexOf("system") !== -1) {
        this.$data.tabList = this.$data.system_tabs;
      }
      this.$router.push({ name: this.$data.tabList[0][1] });
    }
  },
  mounted: function() {
    // this.set_tabList_data();
  },
  watch: {
    tabList: function() {
      // this.set_current_tab_name();
    },
    $route: function() {
      // this.set_tabList_data();
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

