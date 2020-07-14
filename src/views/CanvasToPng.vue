<template>
  <div class="home">
    <div>canvas 导出 png <button class="export-bt" @click="clickToExport">导出</button></div>
    <div class="export-area">
      导出此区域的内容
      <div class="plane"><img src="../assets/red_plane.png" alt="" /></div>
      <div id="echarts-main"></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts';
import h2c from 'html2canvas';
export default {
  name: 'CanvasToPng',
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      let chart = echarts.init(document.getElementById('echarts-main'));
      var option = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
          }
        ]
      };
      chart.setOption(option);
    },
    clickToExport() {
      console.log('开始导出。。。');
      let exportOption = {
        dpi: 600,
        scale: 1,
        useCORS: true
      };
      h2c(document.querySelector('.export-area'), exportOption).then(canvas => {
        // document.body.appendChild(canvas);

        var triggerDownload = document.createElement('a');
        triggerDownload.setAttribute('href', canvas.toDataURL('image/png', 1.0));
        triggerDownload.setAttribute('download', '1.png');
        document.body.appendChild(triggerDownload);
        triggerDownload.click();
        document.body.removeChild(triggerDownload);
        // };
      });
    }
  }
};
</script>

<style scoped>
.export-area {
  width: 500px;
  position: relative;
}

.plane {
  position: absolute;
  top: 232px;
  left: 150px;
  transform: rotate(45deg);
}

#echarts-main {
  width: 400px;
  height: 400px;
}
</style>
