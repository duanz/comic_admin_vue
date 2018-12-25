import Vue from 'vue';
import Router from 'vue-router';
import MobileView from './components/MobileView.vue';
// import TaskEdit from './components/TaskEdit.vue';
import TaskList from './components/TaskList.vue';
import ComicList from './components/ComicList.vue';
import BookList from './components/BookList.vue';
import BookDetail from './components/BookDetail.vue';
import TabBase from './views/TabBase.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/comic',
      component: TabBase,
      children: [
        { path: '', name: "comic_list", component: ComicList },
      ]
    },
    {
      path: '/book',
      component: TabBase,
      children: [
        { path: '', name: "book_list", component: BookList },
        { path: ':id', name: "book_detail", component: BookDetail },
      ]
    },
    {
      path: '/mobile/index',
      name: 'mobile_index',
      component: MobileView,
    },
    {
      path: '/system',
      component: TabBase,
      children: [
        { path: '', name: "task_list", component: TaskList },
      ]
    },
  ],
});
