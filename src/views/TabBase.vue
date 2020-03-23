<template>
  <el-container class="height">
    <router-view v-on:userState="changeUserState"></router-view>
  </el-container>
</template>
<script>
import { Storager } from "@/utils/storage";
import LeftMenu from "@/components/LeftMenu.vue";

export default {
  name: "tabViewBase",
  components: {
    LeftMenu
  },
  data: function() {
    return {
      tabList: [],
      current_tab_name: "",
      is_auth: localStorage.getItem("token") ? true : false
    };
  },
  methods: {
    handleTabClick: function(val) {
      console.log(val);
    },
    changeUserState: function(e) {
      this.$data.is_auth = e;
      this.$emit("userState", e);
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

