<template>
  <el-container direction="vertical">
    <el-form :model="search_form" :inline="true" class="form-inline" size="mini">
      <el-form-item label="书名">
        <el-input v-model="search_form.title__icontains" placeholder="书名"></el-input>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-date-picker v-model="search_form.update_at__lte" type="date" placeholder="更新时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="get_task_list">搜索</el-button>
        <el-button type="success" @click="get_task_list">刷新</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="editDialog = !editDialog">添加任务</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="任务编辑" :visible.sync="editDialog" width="30%" @close="closeDialog">
      <TaskEdit
        :task_id="edit_task_id"
        :edit_type="edit_type"
        :is_clear="!editDialog"
        @close="closeDialog"
      />
    </el-dialog>

    <el-table
      ref="taskTable"
      :data="tableData"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column fixed prop="task_status" label="任务状态" width="150"></el-table-column>
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="task_type" label="任务类型" width="150"></el-table-column>
      <el-table-column prop="content" label="内容" width="300"></el-table-column>
      <el-table-column prop="update_at" label="更新时间"></el-table-column>
      <el-table-column prop="active" label="是否生效" width="100"></el-table-column>
      <el-table-column fixed="right" label="操作" width="250">
        <template slot-scope="scope">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-view"
            @click="handleClick(scope.row, 'detail')"
            circle
          ></el-button>
          <el-button
            size="small"
            type="primary"
            icon="el-icon-edit"
            @click="handleClick(scope.row, 'edit')"
            circle
          ></el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            @click="handleClick(scope.row, 'delete')"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageination.current"
      :background="true"
      :page-sizes="[30, 1]"
      :page-size="30"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageination.total"
    ></el-pagination>
  </el-container>
</template>
<script>
import { getUtilsTask, deleteUtilsTask } from "../api/utilsApi";
import TaskEdit from "../components/TaskEdit";
import { TASK_TYPE, TASK_STATUS } from "../config/commentData";

export default {
  name: "taskList",
  components: {
    TaskEdit
  },
  data: function() {
    return {
      editDialog: false,
      edit_task_id: 0,
      edit_type: "",
      search_form: {
        title__icontains: "",
        update_at__lte: ""
      },
      tableData: [],
      taskTable: [],
      pageination: { current: 0, total: 0 }
    };
  },
  methods: {
    refreshTable: function(res) {
      this.$data.tableData = res.results;
      this.$data.pageination.total = res.count;
    },
    get_task_list: function() {
      getUtilsTask(this.$data.search_form).then(res => {
        this.refreshTable(res);
      });
    },
    tableRowClassName: function({ row }) {
      if (row.task_status === "FINISH") {
        return "success-row";
      } else if (row.task_status === "FAILD") {
        return "warning-row";
      }
      return "";
    },
    handleClick(row, type) {
      if(type === 'delete'){
        deleteUtilsTask(row.id).then(res => {
          this.get_task_list();
      });
      }else if(type==="detail"||type==="edit"){
        this.$data.edit_task_id = row.id;
        this.$data.edit_type = type;
        this.$data.editDialog = true;
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    toggleSelection(rows) {
      console.log(22);
      if (rows) {
        rows.forEach(row => {
          this.$refs.taskTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.taskTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.taskTable = val;
    },
    closeDialog: function() {
      this.$data.edit_task_id = 0;
      this.$data.editDialog = false;
    }
  },
  mounted: function() {
    this.get_task_list();
  }
};
</script>
<style>
.form-inline {
  text-align: left;
  line-height: normal;
}
.warning-row {
  background: #e77373 !important;
}

.success-row {
  background: #9ce773 !important;
}
.el-main .el-table {
  line-height: normal;
}
</style>


