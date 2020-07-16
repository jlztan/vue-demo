<template>
  <div>
    <div>Echarts 导出为 svg</div>
    <button @click="export2SVG">导出</button>
    <div id="main" style="width: 600px; height: 400px;"></div>
  </div>
</template>

<script>
import echarts from 'echarts';
export default {
  name: 'EchartsToSVG',
  mounted() {
    this.initChart();
  },
  methods: {
    export2SVG() {
      console.log('export2SVG...');
      let triggerDownload = document.createElement('a');
      const content = document.querySelector('svg').outerHTML;
      const blob = new Blob([content], { type: 'xml/svg' });
      triggerDownload.href = URL.createObjectURL(blob);
      triggerDownload.download = 'test.svg';
      document.body.appendChild(triggerDownload);
      triggerDownload.click();
      document.body.removeChild(triggerDownload);
    },
    initChart() {
      var symbolSize = 20;
      var data = [
        [15, 0],
        [-50, 10],
        [-56.5, 20],
        [-46.5, 30],
        [-22.1, 40]
      ];

      let cusCircleData = [[30, 30]];

      var myChart = echarts.init(document.getElementById('main'), null, { renderer: 'svg' });

      myChart.setOption({
        tooltip: {
          triggerOn: 'none',
          formatter: function(params) {
            return 'X: ' + params.data[0].toFixed(2) + '<br>Y: ' + params.data[1].toFixed(2);
          }
        },
        xAxis: {
          min: -100,
          max: 80,
          type: 'value',
          axisLine: { onZero: false }
        },
        yAxis: {
          min: -30,
          max: 60,
          type: 'value',
          axisLine: { onZero: false }
        },
        series: [
          {
            id: 'a',
            type: 'line',
            smooth: true,
            symbolSize: symbolSize,
            data: data
          },
          {
            type: 'custom',
            id: 'cusCircle',
            renderItem: function(params, api) {
              console.log(params);
              console.log(api);
              return {
                type: 'circle',
                shape: {
                  // cx: 200, // x 位置永远为 100
                  cx: api.coord([api.value(0), api.value(1)])[0],
                  cy: api.coord([api.value(0), api.value(1)])[1],
                  r: 10
                },
                style: {
                  fill: 'blue',
                  stroke: 'red'
                }
              };
            },
            encode: {
              // 这样这个系列就不会被 x 轴以及 x
              // 轴上的 dataZoom 控制了。
              x: -1,
              y: 1
            },
            data: cusCircleData
          }
        ]
      });

      myChart.setOption({
        graphic: echarts.util.map(cusCircleData, function(item, dataIndex) {
          return {
            type: 'circle',
            position: myChart.convertToPixel('grid', item),
            shape: {
              r: symbolSize / 2
            },
            invisible: true,
            draggable: true,
            ondrag: echarts.util.curry(onPointDragging, dataIndex),
            onmousemove: echarts.util.curry(showTooltip, dataIndex),
            onmouseout: echarts.util.curry(hideTooltip, dataIndex),
            z: 100
          };
        })
      });

      window.addEventListener('resize', function() {
        myChart.setOption({
          graphic: echarts.util.map(cusCircleData, function(item) {
            return {
              position: myChart.convertToPixel('grid', item)
            };
          })
        });
      });

      function showTooltip(dataIndex) {
        console.log('onmousemove...');
        // myChart.dispatchAction({
        //   type: 'showTip',
        //   seriesIndex: 0,
        //   dataIndex: dataIndex
        // });
        cusCircleData[dataIndex] = myChart.convertFromPixel('grid', this.position);
        myChart.setOption({
          series: [
            {
              id: 'cusCircle',
              data: cusCircleData
            }
          ]
        });
      }

      function hideTooltip() {
        myChart.dispatchAction({
          type: 'hideTip'
        });
      }

      function onPointDragging(dataIndex) {
        console.log('ondrag...');
        cusCircleData[dataIndex] = myChart.convertFromPixel('grid', this.position);
        myChart.setOption({
          series: [
            {
              id: 'cusCircle',
              data: cusCircleData
            }
          ]
        });
      }
    }
  }
};
</script>
