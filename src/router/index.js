import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dragInside',
    name: 'DragInside',
    component: () => import('../views/DragInside.vue')
  },
  {
    path: '/dragToTarget',
    name: 'DragToTarget',
    component: () => import('../views/DragToTarget.vue')
  },
  {
    path: '/viewPDF',
    name: 'PDFJsDemo',
    component: () => import('../views/PDFJsDemo.vue')
  },
  {
    path: '/sheet',
    name: 'Sheet',
    component: () => import('../views/Sheet.vue')
  },
  {
    path: '/canvastoimage',
    name: 'CanvasToImage',
    component: () => import('../views/CanvasToImage.vue')
  },
  {
    path: '/echartstosvg',
    name: 'EchartsToSVG',
    component: () => import('../views/EchartsToSVG.vue')
  },
  {
    path: '/viewecharts',
    name: 'ViewEcharts',
    component: () => import('../views/ViewEcharts.vue')
  },
  {
    path: '/css3basedstyleandlinkage',
    name: 'CSS3BasedStyleAndLinkage',
    component: () => import('../views/CSS3BasedStyleAndLinkage.vue')
  },
  {
    path: '/svgpath',
    name: 'SVGPath',
    component: () => import('../views/SVGPath.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
