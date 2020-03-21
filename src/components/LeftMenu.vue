<template>
  <el-menu v-if="tabList.length>0" :default-active="activeIndex" router>
    <el-menu-item
      v-for="item in tabList"
      :key="item[1]"
      :index="item[1]"
      :route="{name: item[1]}"
      :disabled="item[1].indexOf('detail')>0&&item[1]!=activeIndex"
    >
      <span slot="title">{{item[0]}}</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "leftMenu",
  data: function() {
    return {
      activeIndex: "",
      tabList: [["漫画列表", "comic_list"], ["小说列表", "book_list"], ["任务列表", "task_list"]],
      comic_tabs: [["漫画列表", "comic_list"], ["漫画详情", "comic_detail"], ["章节详情", "comic_chapter_detail"]],
      book_tabs: [["小说列表", "book_list"], ["小说详情", "book_detail"]],
      user_tabs: [["用户列表", "user_list"]],
      system_tabs: [["任务列表", "task_list"], ["首页设置", "index_block"]]
    };
  },
  methods: {
    handleSelect: function(index, indexPath) {
      // this.$router.push({ name: "system_task" });
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
      this.$data.activeIndex = this.$route.name;
    }
  },
  mounted: function() {
    this.set_tabList_data();
  },
  watch: {
    $route: function() {
      this.set_tabList_data();
      // this.$data.activeIndex = this.$route.name;
    }
  }
};
</script>

