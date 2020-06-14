<template>
  <div>
    在一个 div 内部拖拽元素，内部元素不会超出外部 div 的范围
    <div class="wrapper" @dragover="dragover_handler($event)">
      <img
        id="src_img"
        src="../assets/red_plane.png"
        @dragstart="dragstart_handler($event)"
        @dragend="dragend_handler($event)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'DragInside',
  data() {
    return {
      img: undefined,
      offsetX: 0,
      offsetY: 0,
      wrapper: undefined,
      wrapper_left: 0,
      wrapper_right: 0,
      wrapper_top: 0,
      wrapper_bottom: 0
    };
  },
  mounted() {
    this.img = document.getElementById('src_img');
    this.wrapper = document.getElementsByClassName('wrapper')[0];
    this.wrapper_left = this.wrapper.getBoundingClientRect().left;
    this.wrapper_top = this.wrapper.getBoundingClientRect().top;
    this.wrapper_right = this.wrapper.getBoundingClientRect().right;
    this.wrapper_bottom = this.wrapper.getBoundingClientRect().bottom;
  },
  methods: {
    dragstart_handler(e) {
      console.log('开始拖动...');
      //记录刚一拖动时，鼠标的偏移量
      this.offsetX = e.offsetX + this.wrapper_left;
      this.offsetY = e.offsetY + this.wrapper_top;
    },

    dragover_handler(e) {
      console.log('在容器上面拖动...');
      console.log(e);
      let x = e.clientX;
      let y = e.clientY;
      x -= this.offsetX;
      y -= this.offsetY;

      this.img.style.left = x + 'px';
      this.img.style.top = y + 'px';
    },

    dragend_handler(e) {
      console.log('拖动结束...');
      console.log(e);

      let img_cur_left = this.img.getBoundingClientRect().left;
      let img_cur_right = this.img.getBoundingClientRect().right;
      let img_cur_top = this.img.getBoundingClientRect().top;
      let img_cur_bottom = this.img.getBoundingClientRect().bottom;

      let foo = () => {
        // 超出上边框
        if (img_cur_top < this.wrapper_top) {
          console.warn('beyond top');
          this.img.style.top = 0;
        } else if (img_cur_bottom > this.wrapper_bottom) {
          // 超出下边框
          console.warn('beyond bottom');
          this.img.style.top = 'auto';
          this.img.style.bottom = 0;
        } else {
          // 在框内
          this.img.style.top = this.img.getBoundingClientRect().top - this.wrapper_top + 'px';
        }
      };

      foo();
      // 超出右边框
      if (img_cur_right > this.wrapper_right) {
        console.warn('beyond right');
        this.img.style.left = 'auto';
        this.img.style.right = 0;
      }

      // 超出左边框
      if (img_cur_left < this.wrapper_left) {
        console.warn('beyond left');
        this.img.style.left = 0;
      }

      e.preventDefault();
      return true;
    }

    // window.onresize = () => {
    //   wrapper_left = wrapper.getBoundingClientRect().left;
    //   wrapper_top = wrapper.getBoundingClientRect().top;
    //   wrapper_right = wrapper.getBoundingClientRect().right;
    //   wrapper_bottom = wrapper.getBoundingClientRect().bottom;
    // };
    // }
  }
};
</script>

<style scoped>
.wrapper {
  width: 300px;
  height: 300px;
  position: relative;
  left: 10%;
  top: 10%;
  border: 1px solid red;
  background-color: beige;
}

.wrapper img {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
