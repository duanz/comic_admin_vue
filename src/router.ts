import Vue from 'vue';
import VueRouter from 'vue-router';
import MobileView from './components/MobileView.vue';
// import TaskEdit from './components/TaskEdit.vue';
import TaskList from './components/TaskList.vue';
import ComicList from './components/ComicList.vue';
import ComicDetail from './components/ComicDetail.vue';
import ComicChapterDetail from './components/ComicChapterDetail.vue';
import BookList from './components/BookList.vue';
import BookChapterList from './components/BookChapterList.vue';
import IndexBlock from './components/IndexBlock.vue';
import TabBase from './views/TabBase.vue';
import Base from './views/Base.vue';
import Login from './components/Login.vue';
import Storager from './utils/storage';

Vue.use(VueRouter);

const Router = new VueRouter({
  // mode: 'history',
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      component: TabBase,
      children: [
        { path: '', name: 'do_login', component: Login, meta: { requireAuth: false } },
      ],
    },
    {
      path: '/comic',
      component: TabBase,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        { path: '', name: 'comic_list', component: ComicList, meta: { requireAuth: true } },
        { path: ':id', name: 'comic_detail', component: ComicDetail, meta: { requireAuth: true } },
        { path: 'chapter/:id', name: 'comic_chapter_detail', component: ComicChapterDetail, meta: { requireAuth: true } },
      ],
    },
    {
      path: '/book',
      component: TabBase,
      meta: {
        requireAuth: true,
      },
      children: [
        { path: '', name: 'book_list', component: BookList, meta: { requireAuth: true } },
        { path: ':id', name: 'book_detail', component: BookChapterList, meta: { requireAuth: true } },
      ],
    },
    {
      path: '/mobile/index',
      name: 'mobile_index',
      component: MobileView,
    },
    {
      path: '/login',
      name: 'login',
      component: TabBase,
      children: [
        { path: '', name: 'do_login', component: Login, meta: { requireAuth: false } },
      ],
    },
    {
      path: '/system',
      component: TabBase,
      meta: {
        requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
      },
      children: [
        {
          path: '', name: 'task_list', component: TaskList, meta: {requireAuth: true} },
        { path: 'index_block', name: 'index_block', component: IndexBlock },
      ],
    },
  ],

});


Router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth || from.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (Storager.isAuth()) {  // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});


export default Router;
