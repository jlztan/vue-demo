<template>
  <div>
    <div>预览 Echarts</div>
    <!-- <div id="main" style="width: 600px; height: 400px;"></div> -->
    <div class="container">
      <div class="left">
        <div v-for="item in leftTitles" :key="item.title" class="item" @click="viewChart($event, item.title)">
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
  name: 'ViewEcharts',
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
    viewChart(event, title) {
      let activeEle = document.querySelector('.active');
      if (activeEle !== null) {
        activeEle.classList.remove('active');
      }
      event.target.classList.add('active');

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

.container .left .active {
  border: 2px solid yellow;
}

.container .right {
  flex-grow: 1;
}
</style>
