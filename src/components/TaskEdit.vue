<template>
  <el-container style="height:100%">
    <el-form :model="form" :disabled="edit_type=='detail'" ref="editTaskForm" label-width="80px">
      <el-form-item label="任务类型" prop="task_type">
        <el-select v-model="form.task_type" placeholder="请选择任务类型">
          <el-option v-for="(val, key) in selector.task_type" :key="key" :label="val" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否生效" prop="active">
        <el-switch v-model="form.active"></el-switch>
      </el-form-item>
      <el-form-item label="任务状态" prop="task_status">
        <el-select v-model="form.task_status" placeholder="请选择任务状态">
          <el-option
            v-for="(val, key) in selector.task_status"
            :key="key"
            :label="val"
            :value="key"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务内容" prop="content">
        <el-input type="textarea" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item label="任务备注" prop="markup">
        <el-input type="textarea" v-model="form.markup"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script>
import { TASK_TYPE, TASK_STATUS } from "../config/commentData";
import {
  createUtilsTask,
  getUtilsTaskDetail,
  editUtilsTask
} from "../api/utilsApi";

export default {
  name: "taskEdit",
  data() {
    return {
      form: {
        task_type: "",
        active: false,
        task_status: "",
        content: "",
        markup: ""
      },
      selector: {
        task_type: TASK_TYPE,
        task_status: TASK_STATUS
      }
    };
  },
  props: {
    task_id: { default: 0, type: Number },
    edit_type: "",
    is_clear: { default: true, type: Boolean }
  },
  methods: {
    close: function() {
      this.$emit("close");
    },
    handleFormRes: function(res) {
      console.log(res);
      if (res.code == 200 || res.code == undefined) {
        this.close();
        this.$notify({ title: "通知", message: "处理成功" });
      } else {
        this.$notify({ title: "通知", message: "处理失败, " + res.msg });
      }
    },
    update_task: function(task_id, form) {
      editUtilsTask(task_id, form).then(res => {
        this.handleFormRes(res);
      });
    },
    create_task: function(form) {
      createUtilsTask(form).then(res => {
        this.handleFormRes(res);
      });
    },
    onSubmit() {
      if (this.$props.task_id != 0) {
        this.update_task(this.$props.task_id, this.$data.form);
      } else {
        this.create_task(this.$data.form);
      }
    },
    refreshData: function(task_id) {
      getUtilsTaskDetail(task_id).then(res => {
        this.$data.form.task_type = res.task_type;
        this.$data.form.active = res.active;
        this.$data.form.task_status = res.task_status;
        this.$data.form.content = res.content;
        this.$data.form.markup = res.markup;
      });
    }
  },
  mounted: function() {
    if (this.$props.task_id != 0) {
      this.refreshData(this.$props.task_id);
    }
  },
  watch: {
    task_id: function(val) {
      immediate: true;
      if (val != 0) {
        this.refreshData(val);
      }
    },
    is_clear: function(val) {
      if (val) {
        this.$refs.editTaskForm.resetFields();
      }
    }
  }
};
</script>
<style>
</style>

