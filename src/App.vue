<template>
  <el-container id="app">
    <Base v-if="isRouterAlive" />
  </el-container>
</template>

<script>
import Base from "./views/Base.vue";

export default {
  name: "app",
  provide() {
    return {
      reload: this.reload
    };
  },
  components: {
    Base
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
}
</style>
