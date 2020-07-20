<template>
  <div>
    <!-- <div>spreadsheet demo</div> -->
    <div class="pb-sheet-container">
      <div class="left">
        <div class="tool-bar">
          <button @click="numFixed">取位</button>
        </div>
        <div class="sheet-wrapper"></div>
      </div>
      <div class="right">
        right
      </div>
    </div>
  </div>
</template>

<script>
import xspreadsheet from 'x-data-spreadsheet';
import sampleData from '../assets/json/sample_data.json';
export default {
  name: 'Sheet',
  data() {
    return {
      instance: undefined, // 表格实例
      sheetWrapper: undefined, // 表格父元素
      curSelect: {}, //当前选中的单元格
      colLen: 0 // 原始数据中列数的最大值
    };
  },
  mounted() {
    // 浏览器窗口改变时，对表格进行自适应
    window.onresize = () => {
      console.log('resizing...');
      if (this.$route.name === 'Sheet') {
        console.log('yes, sheet');
        this.sheetWrapper.innerHTML = '';
        this.initSheet(this.instance.getData());
      }
    };

    this.sheetWrapper = document.querySelector('.sheet-wrapper');
    this.load();
  },
  methods: {
    /**
     * 取位
     *
     * 支持单个单元格取位；拖动选择取位；按行取位；按列取位；
     * 待支持：一键全选取位：按住 ctrl 选择多个区域取位
     */
    numFixed() {
      console.log('fixed:', this.curSelect);
      console.log(this.instance.getData());
      // 页面加载之后，默认选中第一个单元格，此时点击“取位”会对第一个单元格进行操作
      if (Object.keys(this.curSelect).length === 0) {
        let num = Number(this.instance.cell(0, 0).text);
        if (Number.isNaN(num)) {
          return;
        }
        this.instance.cellText(0, 0, parseFloat(num).toFixed(3)).reRender();
        return;
      }

      if (this.curSelect.mode === 'single') {
        let num = Number(this.instance.cell(this.curSelect.ri, this.curSelect.ci).text);
        if (Number.isNaN(num)) {
          return;
        }
        this.instance.cellText(this.curSelect.ri, this.curSelect.ci, parseFloat(num).toFixed(3)).reRender();
      } else if (this.curSelect.mode === 'drag') {
        for (let ri = this.curSelect.sri; ri <= this.curSelect.eri; ri++) {
          for (let ci = this.curSelect.sci; ci <= this.curSelect.eci; ci++) {
            // console.log(this.instance.cell(ri, ci));
            if (this.instance.cell(ri, ci) === null) {
              continue;
            }
            let num = Number(this.instance.cell(ri, ci).text);
            if (Number.isNaN(num)) {
              continue;
            }
            this.instance.cellText(ri, ci, parseFloat(num).toFixed(3)).reRender();
          }
        }
      }
    },

    /**
     * 加载用于初始化的数据
     *
     * 这里直接用的本地的 json 文件，也可以请求服务端的数据
     */
    load() {
      let rows = {};

      // 数据映射，将 json 文件的每一项映射到表格的每一行，需要提前规定 json 文件的格式
      // 数据值要转换成字符串，否则某些操作会报错
      sampleData.map((item, index) => {
        this.colLen = Math.max(this.colLen, Object.keys(item).length);
        rows[index] = { cells: { 0: { text: item.date + '' }, 1: { text: item.value + '' } } };
      });

      let data = [
        {
          name: 'sheet1',
          rows
        }
      ];
      this.initSheet(data);
    },

    /**
     * 表格初始化
     *
     * @param data 表格数据
     */
    initSheet(data) {
      let wrapper_size = this.getWrapperSize();
      this.instance = new xspreadsheet(this.sheetWrapper, {
        showToolbar: false,
        view: {
          width: () => wrapper_size.wrapper_width,
          height: () => wrapper_size.wrapper_height
        },
        row: {
          // 由于某些情况下需要对整个表格进行遍历，出于性能的考虑，初始化的时候表格的行列只比原始数据各多一个
          len: sampleData.length + 1
        },
        col: {
          len: this.colLen + 1
        }
      })
        .loadData(data)
        .change(cdata => {
          console.log(cdata);
          console.log('>>>', this.instance.getData());
        });

      // 单元格的单选和多选
      // 说明：在一个单元格内移动鼠标也会触发多选事件
      // 多选的参数：(sri,sci)-->当前所选区域左上角的坐标，(eri,rci)-->当前所选区域右下角的坐标
      this.instance
        .on('cell-selected', (cell, ri, ci) => {
          console.log('cell:', cell, ', ri:', ri, ', ci:', ci);
          this.curSelect.mode = 'single';
          this.curSelect.ri = ri;
          this.curSelect.ci = ci;
        })
        .on('cells-selected', (cell, { sri, sci, eri, eci }) => {
          console.log('cells...');
          this.curSelect.mode = 'drag';
          this.curSelect.sri = sri;
          this.curSelect.sci = sci;
          this.curSelect.eri = eri;
          this.curSelect.eci = eci;
        });

      // 去掉 bottombar 和打印页面
      let sheetEle = document.querySelector('.x-spreadsheet');
      sheetEle.removeChild(document.querySelector('.x-spreadsheet-bottombar'));
      sheetEle.removeChild(document.querySelector('.x-spreadsheet-print'));
    },

    /**
     *获取表格 dom 的父元素，在浏览器窗口大小改变时进行表格的自适应
     */
    getWrapperSize() {
      let computedStyle = window.getComputedStyle(this.sheetWrapper, null);
      let wrapper_width = computedStyle.width;
      let wrapper_height = computedStyle.height;
      wrapper_width = wrapper_width.substr(0, wrapper_width.length - 2);
      // +40 是一个 trick，因为表格（貌似？）无法直接配置不显示底部的 bottombar，所以 initSheet 中 remove 掉了 bottombar
      // 这样底部会空出来，所以要加上 bottombar 的高度
      // 更好的做法应该是改一下 xspreadsheet 的源码，不渲染 bottombar
      wrapper_height = parseInt(wrapper_height.substr(0, wrapper_height.length - 2)) + 40;
      return { wrapper_width, wrapper_height };
    }
  },
  components: {}
};
</script>

<style scoped>
.pb-sheet-container {
  display: flex;
  height: 100%;
}

.pb-sheet-container .left {
  flex-basis: 80%;
  display: flex;
  flex-direction: column;
}

.pb-sheet-container .left .tool-bar {
  height: 50px;
  background-color: chocolate;
}

.pb-sheet-container .left .sheet-wrapper {
  flex-grow: 1;
  background-color: darkseagreen;
}

.pb-sheet-container .right {
  flex-grow: 1;
  background-color: antiquewhite;
}
</style>
