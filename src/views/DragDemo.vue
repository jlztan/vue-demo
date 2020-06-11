<template>
  <div>
    <div id="to" class="drag-box">
      <Tag closable @on-close="tagClose($event)" v-for="tag in tags" :key="tag">{{ tag }}</Tag>
    </div>
    <div id="from" class="drag-box">
      <span>队长</span>
      <span>铁人</span>
      <span>浩克</span>
      <span>雷神</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DragDemo',
  data() {
    return {
      tags: []
    };
  },
  mounted() {
    this.leftClick();
  },
  methods: {
    leftClick() {
      this.dragula([document.getElementById('from'), document.getElementById('to')], {
        copy: (el, source) => {
          return source === document.getElementById('from');
        },
        moves: (el, source) => {
          return source === document.getElementById('from');
        },
        accepts: (el, target) => {
          return target === document.getElementById('to');
        }
      })
        .on('drag', el => {
          console.log('drag...');
          console.log(el);
          el.className = el.className.replace('ex-moved', '');
        })
        .on('drop', el => {
          let text = el.innerText.trim();
          console.log('before drop...');
          console.log(this.tags);
          console.log(text);
          console.log('index: ' + this.tags.indexOf(text));
          if (!this.tags.includes(text)) {
            this.tags.push(text);
          }
          el.style.display = 'none';
          console.log('after drop...');
          console.log(this.tags);
        });
    },
    tagClose(e) {
      console.log('close 3');
      let parent = e.currentTarget.parentNode;
      let draged = parent.children[0].innerText;
      this.tags.splice(this.tags.indexOf(draged), 1);
      console.log(this.tags);
    }
  },
  components: {}
};
</script>

<style scoped src="../assets/dragula.css" />

<style scoped>
.drag-box {
  width: 50%;
  display: flex;
  align-items: center;
  margin: 10px;
  background-color: #f4f3f0;
  height: 50px;
  border-radius: 3px;
}

.drag-box span {
  width: 50px;
  margin: 5px;
  display: inline-block;
  border-radius: 3px;
  background-color: red;
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}
</style>
