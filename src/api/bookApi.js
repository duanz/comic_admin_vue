import { get } from '../config/axiosConfig';

// 小说列表
export const getBookList = () => get('/api/book/', {});

// 漫画详情
export const getBookDetail = (book_id) => get('/api/book/' + book_id);
export const getBookChapterDetail = (chapter_id) => get('/api/book/chapter/' + chapter_id);
