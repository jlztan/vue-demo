<template>
  <div>
    <div>spreadsheet demo</div>
    <div id="sheet"></div>
  </div>
</template>

<script>
import xspreadsheet from 'x-data-spreadsheet';
export default {
  name: 'Sheet',
  data() {
    return {
      sheet: undefined
    };
  },
  mounted() {
    this.sheet = new xspreadsheet(document.getElementById('sheet'));
    this.foo();
  },
  methods: {
    foo() {
      //   this.sheet.on('cell-selected', (cell, ri, ci) => {
      //     console.log(cell);
      //     console.log(ri);
      //     console.log(ci);
      //   });
      this.sheet.on('cells-selected', (cell, { sri, sci, eri, eci }) => {
        console.log(cell);
        console.log(sri);
        console.log(sci);
        console.log(eri);
        console.log(eci);
      });
    }
  },
  components: {}
};
</script>

<style scoped>
#sheet {
  position: absolute;
}
</style>
