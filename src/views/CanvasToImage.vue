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
import { getCurTimestamp } from '../assets/js/utils';
export default {
  name: 'CanvasToImage',
  mounted() {
    this.initChart();
  },
  methods: {
    /**
     * 初始化 Echarts
     */
    initChart() {
      let chart = echarts.init(document.getElementById('echarts-main'), null, { renderer: 'svg' });
      let option = {
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
      window.addEventListener(
        'resize',
        function() {
          chart.resize();
        }.bind(this)
      );
    },
    /**
     * 将 html 元素导出为 canvas，然后将此 canvas 保存为图片并下载
     */
    clickToExport() {
      console.log('convert2canvas...');

      let exportEle = document.querySelector('.export-area');
      let width = exportEle.offsetWidth;
      let height = exportEle.offsetHeight;
      let canvas = document.createElement('canvas');
      let scale = 2; //定义任意放大倍数 支持小数，越大导出的图片大小更大，尺寸也更大，同时也更清晰
      canvas.width = width * scale;
      canvas.height = height * scale;
      canvas.getContext('2d').scale(scale, scale); //获取context,设置scale
      let opts = {
        canvas: canvas, //自定义 canvas
        // logging: true, //日志开关，便于查看html2canvas的内部执行流程
        width: width,
        height: height,
        useCORS: true // 【重要】开启跨域配置
      };

      h2c(exportEle, opts).then(canvas => {
        let context = canvas.getContext('2d');
        // 【重要】关闭抗锯齿
        context.mozImageSmoothingEnabled = false;
        context.webkitImageSmoothingEnabled = false;
        context.msImageSmoothingEnabled = false;
        context.imageSmoothingEnabled = false;

        // 定义一个 a 标签用来触发图片的下载
        let triggerDownload = document.createElement('a');
        triggerDownload.setAttribute('href', canvas.toDataURL('image/jpeg', 1.0));
        triggerDownload.setAttribute('download', getCurTimestamp() + '-export.jpeg');
        document.body.appendChild(triggerDownload);
        triggerDownload.click();
        document.body.removeChild(triggerDownload);
      });
    }
  }
};
</script>

<style scoped>
.export-area {
  width: 500px;
  height: 450px;
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
