<template>
  <div class="wrapper">
    <div class="view-tip">选择左侧的缩略图进行预览...</div>
    <div class="chart"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
import { viewByBus } from '../assets/js/theBus';
export default {
  name: 'ShowView',
  data() {
    return {};
  },
  mounted() {
    let myChart = echarts.init(document.querySelector('.chart'), null, { renderer: 'svg' });
    viewByBus.$on('option', param => {
      console.log('show view, on option...');
      if (param.type === 'chart') {
        document.querySelector('.chart').style.display = 'block';
        document.querySelector('.view-tip').style.display = 'none';
        myChart.clear();
        myChart.setOption(param.data);
      } else {
        document.querySelector('.chart').style.display = 'none';
        document.querySelector('.view-tip').style.display = 'block';
        document.querySelector('.view-tip').innerHTML = '抱歉,暂时无法预览此图表';
      }
    });
  },
  methods: {},
  destroyed() {
    viewByBus.$off('option');
  }
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.wrapper .chart {
  width: 100%;
  height: 100%;
}

.wrapper .view-tip {
  position: absolute;
  top: 50%;
  left: 30%;
  font-size: 20px;
}
</style>
