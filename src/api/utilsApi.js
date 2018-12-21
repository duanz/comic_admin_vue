import { get, post } from '../config/axiosConfig';

// 任务列表
export const getUtilsTask = () => get('/api/utils/task/', {});
// 新增任务表单
export const createUtilsTask = (formData) => post('/api/utils/task/', formData);

// 任务详情
export const getUtilsTaskDetail = (task_id) => get('/api/utils/task/'+task_id+'/', {});
// 修改任务表单
export const editUtilsTask = (task_id, formData) => post('/api/utils/task/' + task_id + '/', formData);