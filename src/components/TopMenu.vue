<template>
  <el-menu
    v-if="tabList.length>0"
    :default-active="activeIndex"
    mode="horizontal"
    router
    @select="handleSelect"
  >
    <el-menu-item index="task" :route="{name: 'system_task'}">
      <i class="el-icon-tickets"></i>
      <span slot="title">任务管理</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
export default {
  name: "topMenu",
  data: function() {
    return {
      activeIndex: "task",
      tabList: [1],
      current_tab_name: "",
      comic_tabs: [["漫画列表", "comic_list"], ["漫画详情", "comic_detail"]],
      book_tabs: [["小说列表", "book_list"], ["小说详情", "book_detail"]],
      user_tabs: [["用户列表", "user_list"]],
      system_tabs: [["任务列表", "task"], ["任务编辑", "edit"]]
    };
  },
  methods: {
    handleSelect: function(index, indexPath) {
      this.$router.push({ name: "system_task" });
    }
  }
};
</script>

