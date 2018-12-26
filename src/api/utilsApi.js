import { get, post } from '../config/axiosConfig';

// 任务列表
export const getUtilsTask = () => get('/api/utils/task/', {});
// 新增任务表单
export const createUtilsTask = (formData) => post('/api/utils/task/', formData);

// 任务详情
export const getUtilsTaskDetail = (task_id) => get('/api/utils/task/' + task_id + '/', {});
// 修改任务表单
export const editUtilsTask = (task_id, formData) => post('/api/utils/task/' + task_id + '/', formData);

//首页列表
export const getIndexBlockList = () => get('/api/index/block/', {});
//新增首页块
export const createIndexBlock = (formData) => post('/api/index/block/', formData);
//修改首页块
export const getIndexBlockDetail = (id) => get('/api/index/block/' + id + '/');
export const updateIndexBlock = (id, formData) => post('/api/index/block/' + id + '/', formData);