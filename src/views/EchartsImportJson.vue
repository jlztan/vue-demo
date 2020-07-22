<template>
  <div>
    <div>Echarts 从 JSON 文件加载 Option</div>
    <!-- <div id="main" style="width: 600px; height: 400px;"></div> -->
    <div class="container">
      <div class="left">
        <div v-for="item in leftTitles" :key="item.title" class="item" tabindex="0" @click="viewChart(item.title)">
          {{ item.title }}
        </div>
      </div>
      <div class="right">
        <ShowView></ShowView>
      </div>
    </div>
  </div>
</template>

<script>
import leftTitlesJson from '../assets/json/left_titles.json';
import ShowView from '../components/ShowView';
import { viewByBus } from '../assets/js/theBus';
export default {
  name: 'EchartsImportJson',
  data() {
    return {
      leftTitles: leftTitlesJson
    };
  },
  mounted() {},
  methods: {
    /**
     * 预览图表
     *
     * @param title 图表名称
     */
    viewChart(title) {
      import('../assets/js/' + title)
        .then(module => {
          console.log(module.option);
          viewByBus.$emit('option', { data: module.option, type: 'chart' });
        })
        .catch(error => {
          viewByBus.$emit('option', { type: 'error' });
          Promise.reject(error);
        });
    }
  },
  components: {
    ShowView
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 600px;
  display: flex;
}

.container .left {
  width: 200px;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  margin: 0 auto;
}
.container .left .item {
  box-sizing: border-box;
  background-color: white;
  flex: 0 1 25%;
  height: 50px;
  border: 1px solid black;
  border-radius: 4px;
  margin: 5px;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
}

.container .left .item:focus {
  border: 2px solid yellow;
}

.container .right {
  flex-grow: 1;
}
</style>
