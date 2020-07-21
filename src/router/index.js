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
    path: '/echartsimportjson',
    name: 'EchartsImportJson',
    component: () => import('../views/EchartsImportJson.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
