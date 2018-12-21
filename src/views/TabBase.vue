<template>
  <el-container class="height" direction="vertical">
    <el-tabs v-if="tabList" class="height" type="border-card" v-model="current_tab_name">
      <el-tab-pane
        v-for="(tab, index) in tabList"
        :label="tab[0]"
        v-bind:key="index"
        :name="tab[1]"
      >
        <!-- <el-container class="height" direction="vertical">
        <el-main>-->
        <router-view v-if="index===0"></router-view>
        <router-view v-else-if="index!==0" :name="tab[1]"></router-view>
        <!-- <router-view></router-view> -->
        <!-- </el-main>
        </el-container>-->
      </el-tab-pane>
    </el-tabs>
  </el-container>
</template>
<script>
export default {
  name: "tabViewBase",
  data: function() {
    return {
      tabList: [],
      current_tab_name: "",
      comic_tabs: [["漫画列表", "comic_list"], ["漫画详情", "comic_detail"]],
      book_tabs: [["小说列表", "book_list"], ["小说详情", "book_detail"]],
      user_tabs: [["用户列表", "user_list"]],
      system_tabs: [["任务列表", "task"], ["任务编辑", "edit"]]
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
    this.set_tabList_data();
  },
  watch: {
    tabList: function() {
      this.set_current_tab_name();
    },
    $route: function() {
      this.set_tabList_data();
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

