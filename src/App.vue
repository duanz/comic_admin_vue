<template>
  <div id="app">
    <Base />
  </div>
</template>

<script>
import Base from "./views/Base.vue";

export default {
  name: "app",
  components: {
    Base
  },
  data() {
    return {
    };
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
