import Vue from 'vue';
import Router from 'vue-router';
import MobileView from './components/MobileView.vue';
import TaskEdit from './components/TaskEdit.vue';
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
      name: 'comic_index',
      component: TabBase,
      children: [
        { path: 'list', name: "comic_list", components: { default: ComicList } },
      ]
    },
    {
      path: '/book',
      name: 'book_index',
      component: TabBase,
      children: [
        { path: 'list', name: "book_list", components: { default: BookList, book_detail: BookDetail } },
      ]
    },
    {
      path: '/mobile/index',
      name: 'mobile_index',
      component: MobileView,
    },
    {
      path: '/system',
      name: 'system_index',
      component: TabBase,
      children: [
        { path: 'task', name: "task", components: { default: TaskList, edit: TaskEdit } },
      ]
    }
  ],
});
