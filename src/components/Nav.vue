<template>
  <div id="nav">
    <div><router-link to="/">首页</router-link></div>
    <div><router-link to="/dragInside">在 div 内部拖拽</router-link></div>
    <div><router-link to="/dragToTarget">普通拖拽</router-link></div>
    <div><router-link to="/viewPDF">PDF.js</router-link></div>
    <div><router-link to="/sheet">spreadsheet demo</router-link></div>
    <div><router-link to="/canvastoimage">Canvas2Image</router-link></div>
    <div><router-link to="/echartstosvg">Echarts2SVG</router-link></div>
    <div><router-link to="/viewecharts">ViewEcharts</router-link></div>
    <div><router-link to="/css3basedstyleandlinkage">CSS3BasedStyleAndLinkage</router-link></div>
  </div>
</template>

<script>
export default {
  name: 'Nav',
  components: {}
};
</script>

<style scoped>
#nav {
  height: 100%;
  /* flex-basis: 15%; */
  width: 260px;
  border-right: 1px solid #eaecef;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  display: block;
}

#nav div {
  margin: 10px;
  font-size: 16px;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
