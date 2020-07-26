<template>
  <div class="container">
    <div class="title">
      <a href="https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial/Paths" target="_blank">MDN svg 路径--path</a>
    </div>

    <div class="wrapper">
      <div class="item">
        <svg width="100%" class="leftOne">
          <!-- C ：三次贝塞尔曲线 + S命令 开始-->
          <path d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80" stroke="black" fill="transparent" />

          <!-- 显示控制线，下同 -->
          <circle cx="10" cy="80" r="2" fill="red" stroke-width="2" />
          <circle cx="40" cy="10" r="2" fill="red" stroke-width="2" />
          <line x1="10" x2="40" y1="80" y2="10" stroke="red" stroke-width="1" />

          <circle cx="65" cy="10" r="2" fill="red" stroke-width="2" />
          <circle cx="95" cy="80" r="2" fill="red" stroke-width="2" />
          <line x1="65" x2="95" y1="10" y2="80" stroke="red" stroke-width="1" />

          <circle cx="95" cy="80" r="2" fill="red" stroke-width="2" />
          <circle cx="125" cy="150" r="2" fill="red" stroke-width="2" />
          <line x1="125" x2="95" y1="150" y2="80" stroke="red" stroke-width="1" />

          <circle cx="150" cy="150" r="2" fill="red" stroke-width="2" />
          <circle cx="180" cy="80" r="2" fill="red" stroke-width="2" />
          <line x1="150" x2="180" y1="150" y2="80" stroke="red" stroke-width="1" />
          <!-- C ：三次贝塞尔曲线 + S命令 结束-->

          <!-- S 命令单独使用 开始-->
          <!--等价的 C 命令写法 <path d="M10 180 C 10 180, 50 230,80 190" stroke="black" fill="transparent" /> -->
          <path d="M10 180 S 50 230,80 190" stroke="black" fill="transparent" />
          <!-- S 命令单独使用 结束-->
        </svg>
        <svg
          style="
              left: 1px;
              top: 1px;
              width: 32px;
              height: 30px;
              display: block;
              position: relative;
              overflow: hidden;
            "
        >
          <g>
            <g></g>
            <g>
              <g transform="translate(0.5,0.5)" style="visibility: visible;">
                <path
                  d="M 5.04 25.2 L 24.15 6.09"
                  fill="none"
                  stroke="white"
                  stroke-width="9.3"
                  stroke-miterlimit="10"
                  pointer-events="stroke"
                  visibility="hidden"
                ></path>
                <path
                  d="M 5.04 25.2 L 24.15 6.09"
                  fill="none"
                  stroke="#000000"
                  stroke-width="1.3"
                  stroke-miterlimit="10"
                  pointer-events="stroke"
                ></path>
                <path
                  d="M 25.71 4.53 L 24.67 7.65 L 24.15 6.09 L 22.59 5.57 Z"
                  fill="#000000"
                  stroke="#000000"
                  stroke-width="1.3"
                  stroke-miterlimit="10"
                  pointer-events="all"
                ></path>
              </g>
            </g>
            <g></g>
            <g></g>
          </g>
        </svg>
      </div>
      <div class="item">
        <!-- Q ：二次贝塞尔曲线 开始-->
        <svg width="100%" height="200px">
          <path d="M10 80 Q 95 10 180 80" stroke="black" fill="transparent" />

          <circle cx="10" cy="80" r="2" fill="red" stroke-width="2" />
          <circle cx="95" cy="10" r="2" fill="red" stroke-width="2" />
          <line x1="10" x2="95" y1="80" y2="10" stroke="red" stroke-width="1" />

          <circle cx="95" cy="10" r="2" fill="red" stroke-width="2" />
          <circle cx="180" cy="80" r="2" fill="red" stroke-width="2" />
          <line x1="180" x2="95" y1="80" y2="10" stroke="red" stroke-width="1" />
        </svg>
        <!-- Q ：二次贝塞尔曲线 结束-->
        <!-- Q ：二次贝塞尔曲线 + T 命令 开始-->
        <svg width="100%" height="200px">
          <path d="M10 80 Q 52.5 10, 95 80 T 180 80" stroke="black" fill="transparent" />
        </svg>
        <!-- Q ：二次贝塞尔曲线 + T 命令 结束-->
      </div>
      <div class="item" style="width: 320px;">
        <svg width="100%" height="320px">
          <path
            d="M10 315
                         L 110 215
                         A 30 50 0 0 1 162.55 162.45
                         L 172.55 152.45
                         A 30 50 -45 0 1 215.1 109.9
                         L 315 10"
            stroke="black"
            fill="green"
            stroke-width="2"
            fill-opacity="0.5"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SVGPath',
  components: {}
};
</script>

<style scoped>
.container {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
}

.container .title {
  flex-basis: 5%;
  display: flex;
  align-items: center;
  font-size: 20px;
}

.wrapper {
  display: flex;
  flex-basis: 95%;
}

.wrapper .item {
  width: 200px;
  border: 1px red solid;
  margin: 0 5px;
}

.wrapper .item .leftOne {
  background-color: blue;
}
</style>
