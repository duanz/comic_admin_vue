import { get, post, remove } from '../config/axiosConfig';

// 小说列表
export const getBookList = (data) => get('/api/book/', data, false);

// 小说详情
export const getBookDetail = (book_id) => get('/api/book/' + book_id + '/', {}, false);
export const deleteBook = (book_id) => remove('/api/book/' + book_id + '/', {}, false);
export const getBookChapterList = (book_id, filter) => get('/api/book/chapter/list/' + book_id + '/', filter, false);
export const getBookChapterDetail = (chapter_id) => get('/api/book/chapter/' + chapter_id + '/', {}, false);
