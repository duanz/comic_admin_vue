import Vue from 'vue';
import Router from 'vue-router';
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
        { path: ':id', name: "comic_detail", component: ComicDetail },
        { path: 'chapter/:id', name: "comic_chapter_detail", component: ComicChapterDetail },
      ]
    },
    {
      path: '/book',
      component: TabBase,
      children: [
        { path: '', name: "book_list", component: BookList },
        { path: ':id', name: "book_detail", component: BookChapterList },
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
        { path: 'index_block', name: "index_block", component: IndexBlock },
      ]
    },
  ],
});
