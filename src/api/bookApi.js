import { get } from '../config/axiosConfig';

// 小说列表
export const getBookList = () => get('/api/book/', {});

// 小说详情
export const getBookDetail = (book_id) => get('/api/book/' + book_id + '/');
export const getBookChapterList = (book_id, filter) => get('/api/book/chapter/list/' + book_id + '/', filter);
export const getBookChapterDetail = (chapter_id) => get('/api/book/chapter/' + chapter_id + '/');
