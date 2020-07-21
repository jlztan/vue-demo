<template>
  <div>
    <div>Echarts 从 JSON 文件加载 Option</div>
    <div id="main" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'EchartsImportJson',
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      var myChart = echarts.init(document.getElementById('main'), null, { renderer: 'svg' });
      import('../assets/js/option1').then(module => {
        // console.log(module.getCurTimestamp());
        myChart.setOption(module.option);
      });
    }
  }
};
</script>
