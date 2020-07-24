<template>
  <div>
    <!-- <div>spreadsheet demo</div> -->
    <div class="pb-sheet-container">
      <div class="left">
        <div class="tool-bar">
          <button @click="numFixed">取位</button>
          <el-input-number v-model="accuracy" controls-position="right" :min="1" :max="10" size="small">
          </el-input-number>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            @keyup.enter.native="search"
            v-model="target"
            style="width:250px"
          >
          </el-input>
          <div class="curpos">{{ curPos }}</div>
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
      curPos: 'A1', // 当前选中的表格坐标
      colLen: 0, // 原始数据中列数的最大值
      accuracy: 10, // 取位的精度
      target: '' // 搜索内容
    };
  },
  mounted() {
    // 浏览器窗口改变时，对表格进行自适应
    window.onresize = () => {
      console.log('resizing...');
      console.log(this.instance.getData());
      if (this.$route.name === 'Sheet') {
        console.log('yes, sheet');
        this.initSheet(this.instance.getData());
      }
    };

    this.sheetWrapper = document.querySelector('.sheet-wrapper');
    this.load();
  },
  methods: {
    /**
     * 查找并高亮
     */
    search() {
      /* 查找 开始 */
      console.log('search...');
      if (this.target.trim().length === 0) {
        return;
      }

      let target = this.target;
      let res = [];
      let data = this.instance.getData();
      let ci = data[0].cols.len;
      // 为提高效率，只取有数据的行
      let nonEmptyRows = Object.keys(data[0].rows);
      // rows 的最后一个属性为 len，去掉
      nonEmptyRows.pop();
      nonEmptyRows.forEach(i => {
        for (let j = 0; j < ci; j++) {
          let cell = data[0].rows[i].cells[j];
          if (cell === null || cell === undefined) {
            continue;
          }
          // 重置样式
          cell.style = 0;
          let tmp = this.instance.cell(i, j);
          if (tmp === null) {
            continue;
          }
          if (tmp.text.indexOf(target) > -1) {
            res.push({ i, j });
          }
        }
      });
      /* 查找 结束 */
      this.$message({ duration: 1000, message: '共查询到' + res.length + '个内容' });
      /* 数据处理 开始 */
      data[0].styles.push({ bgcolor: 'yellow' });
      res.forEach(item => {
        data[0].rows[item.i].cells[item.j].style = 1;
      });
      this.initSheet(data);
      /* 数据处理 结束 */
    },

    /**
     * 取位
     *
     * 支持单个单元格取位；拖动选择取位；按行取位；按列取位；
     * 待支持：一键全选取位：按住 ctrl 选择多个区域取位
     */
    numFixed() {
      console.log('accuart:' + this.accuracy);
      let context = this;
      console.log('fixed:', this.curSelect);
      // 页面加载之后，默认选中第一个单元格，此时点击“取位”会对第一个单元格进行操作
      if (Object.keys(this.curSelect).length === 0) {
        cellFixedHandler(0, 0, 0, 0);
        return;
      }

      if (this.curSelect.mode === 'single') {
        // 选择整列
        if (this.curSelect.ri < 0) {
          let sri = 0;
          let sci = this.curSelect.ci; // eci
          let eri = this.instance.getData()[0].rows.len - 1;
          cellFixedHandler(sri, sci, eri, sci);
        } else if (this.curSelect.ci < 0) {
          // 选择整行
          let sri = this.curSelect.ri; // eri
          let sci = 0;
          let eci = this.instance.getData()[0].cols.len - 1;
          cellFixedHandler(sri, sci, sri, eci);
        } else {
          cellFixedHandler(this.curSelect.ri, this.curSelect.ci, this.curSelect.ri, this.curSelect.ci);
        }
      } else if (this.curSelect.mode === 'drag') {
        cellFixedHandler(this.curSelect.sri, this.curSelect.sci, this.curSelect.eri, this.curSelect.eci);
      }

      /**
       *遍历单元格进行取位
       *
       * @param sri 取位区域左上角行坐标
       * @param sci 取位区域左上角列坐标
       * @param eri 取位区域右下角行坐标
       * @param eci 取位区域右下角列坐标
       */
      function cellFixedHandler(sri, sci, eri, eci) {
        for (let ri = sri; ri <= eri; ri++) {
          for (let ci = sci; ci <= eci; ci++) {
            if (context.instance.cell(ri, ci) === null) {
              continue;
            }
            let num = Number(context.instance.cell(ri, ci).text);
            if (Number.isNaN(num)) {
              continue;
            }
            context.instance.cellText(ri, ci, parseFloat(num).toFixed(context.accuracy)).reRender();
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
        rows[index] = {
          cells: {
            0: { text: item.date + '' },
            1: { text: item.value + '' },
            2: { text: item.l + '' },
            3: { text: item.u + '' }
          }
        };
      });

      let data = [
        {
          name: 'sheet1',
          styles: [
            {
              bgcolor: '#ffffff'
            }
          ],
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
      console.log('initsheet...');
      this.sheetWrapper.innerHTML = '';
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

          // toFix：潜在 bug：最多 26 列，如果存在更多列需要进一步扩展
          let alphabet = [
            'A',
            'B',
            'C',
            'D',
            'E',
            'F',
            'G',
            'H',
            'I',
            'J',
            'K',
            'L',
            'M',
            'N',
            'O',
            'P',
            'Q',
            'R',
            'S',
            'T',
            'U',
            'V',
            'W',
            'X',
            'Y',
            'Z'
          ];
          if (ci < 0) {
            this.curPos = 'Line' + (ri + 1);
          } else if (ri < 0) {
            this.curPos = 'Column' + alphabet[ci];
          } else {
            this.curPos = '' + alphabet[ci] + (ri + 1);
          }
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
      // toFix:需要修改源码，不渲染 bottombar
      let sheetEle = document.querySelector('.x-spreadsheet');
      sheetEle.removeChild(document.querySelector('.x-spreadsheet-bottombar'));
      sheetEle.removeChild(document.querySelector('.x-spreadsheet-print'));
    },

    /**
     *获取表格的父元素，在浏览器窗口大小改变时进行表格的自适应
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
  height: 70px;
  background-color: chocolate;
}
.pb-sheet-container .left .tool-bar .curpos {
  width: 70px;
  text-align: center;
  background: #ffffff;
  border-radius: 3px;
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
