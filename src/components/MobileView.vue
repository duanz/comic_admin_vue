<template>
<el-container style='height:100%"'>
  <div class="phone">
    <iframe
      src="//47.105.183.104"
      frameborder="0"
      class="demo-page"
    ></iframe>
  </div>
</el-container>
</template>
<script>
export default {
    name: 'mobileView'
}
</script>
<style>
.phone {
    margin: 0 20px 0;
    background-image: url(http://mint-ui.github.io/docs/static/img/phone.5909f66.png);
    background-repeat: no-repeat;
    background-size: 100%;
    height: 100%;
    padding: 75px 15px;
    box-sizing: border-box;
}
.demo-page {
    width: 100%;
    height: 100%;
    background-color: #fff;
}
</style>

