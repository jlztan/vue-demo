<template>
  <div>
    <!-- <div>spreadsheet demo</div> -->
    <div class="pb-sheet-container">
      <div class="left">
        <div class="tool-bar">self toolbar</div>
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
export default {
  name: 'Sheet',
  data() {
    return {
      instance: undefined,
      sheetWrapper: undefined
    };
  },
  mounted() {
    window.onresize = () => {
      console.log('resizing...');
      this.sheetWrapper.innerHTML = '';
      this.initSheet(this.instance.getData());
    };

    this.sheetWrapper = document.querySelector('.sheet-wrapper');
    this.load();
  },
  methods: {
    load() {
      const rows10 = { len: 100000 };
      for (let i = 0; i < 10; i += 1) {
        rows10[i] = {
          cells: {
            0: { text: 'A-' + i },
            1: { text: 'B-' + i },
            2: { text: 'C-' + i },
            3: { text: 'D-' + i },
            4: { text: 'E-' + i },
            5: { text: 'F-' + i }
          }
        };
      }
      const rows = {
        len: 80,
        1: {
          cells: {
            0: { text: 'testingtesttestetst' },
            2: { text: 'testing' }
          }
        },
        2: {
          cells: {
            0: { text: 'render', style: 0 },
            1: { text: 'Hello' },
            2: { text: 'haha', merge: [1, 1] }
          }
        },
        8: {
          cells: {
            8: { text: 'border test', style: 0 }
          }
        }
      };

      let data = [
        {
          freeze: 'B3',
          styles: [
            {
              bgcolor: '#f4f5f8',
              textwrap: true,
              color: '#900b09',
              border: {
                top: ['thin', '#0366d6'],
                bottom: ['thin', '#0366d6'],
                right: ['thin', '#0366d6'],
                left: ['thin', '#0366d6']
              }
            }
          ],
          merges: ['C3:D4'],
          cols: {
            // len: 10,
            2: { width: 200 }
          },
          rows
        },
        { name: 'sheet-test', rows: rows10 }
      ];
      this.initSheet(data);
    },
    initSheet(data) {
      let wrapper_size = this.getWrapperSize();
      // x_spreadsheet.locale('zh-cn');
      this.instance = new xspreadsheet(this.sheetWrapper, {
        showToolbar: false,
        showGrid: true,
        view: {
          width: () => wrapper_size.wrapper_width,
          height: () => wrapper_size.wrapper_height
        }
      })
        .loadData(data)
        .change(cdata => {
          console.log(cdata);
          console.log('>>>', this.instance.getData());
        });

      this.instance
        .on('cell-selected', (cell, ri, ci) => {
          console.log('cell:', cell, ', ri:', ri, ', ci:', ci);
        })
        .on('cell-edited', (text, ri, ci) => {
          console.log('text:', text, ', ri: ', ri, ', ci:', ci);
        });

      setTimeout(() => {
        // xs.loadData([{ rows }]);
        this.instance.cellText(14, 3, 'cell-text').reRender();
        console.log('cell(8, 8):', this.instance.cell(8, 8));
        console.log('cellStyle(8, 8):', this.instance.cellStyle(8, 8));
      }, 500);

      // 去掉 bottombar 和打印页面
      let sheetEle = document.querySelector('.x-spreadsheet');
      sheetEle.removeChild(document.querySelector('.x-spreadsheet-bottombar'));
      sheetEle.removeChild(document.querySelector('.x-spreadsheet-print'));
      sheetEle.style.height += 40;
    },

    getWrapperSize() {
      let computedStyle = window.getComputedStyle(this.sheetWrapper, null);
      let wrapper_width = computedStyle.width;
      let wrapper_height = computedStyle.height;
      wrapper_width = wrapper_width.substr(0, wrapper_width.length - 2);
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
