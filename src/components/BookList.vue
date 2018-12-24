<template>
  <el-container direction="vertical">
    <el-form :inline="true" class="form-inline" size="mini">
      <el-form-item label="书名">
        <el-input v-model="search_title" placeholder="书名"></el-input>
      </el-form-item>
      <el-form-item label="更新时间">
        <el-date-picker v-model="search_time" type="date" placeholder="更新时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSearch">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="editDialog = !editDialog">添加小说</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="编辑小说" :visible.sync="editDialog" width="30%" @close="closeDialog">
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
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column fixed prop="title" label="书名" width="180"></el-table-column>
      <el-table-column prop="update_at" label="更新时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row, 'detail')" type="text" size="small">查看</el-button>
          <!-- <el-button @click="handleClick(scope.row, 'edit')" type="text" size="small">编辑</el-button> -->
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
import { getBookList } from "../api/bookApi";
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
      search_title: "",
      search_time: "",
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
    get_book_list: function() {
      getBookList().then(res => {
        this.refreshTable(res);
      });
    },
    tableRowClassName: function({ row }) {
      if (row.task_status === "FINISH") {
        console.log(1);
        return "success-row";
      } else if (row.task_status === "FAILD") {
        console.log(2);
        return "warning-row";
      }
      return "";
    },
    handleClick(row, type) {
      this.$data.edit_task_id = row.id;
      this.$data.edit_type = type;
      this.$data.editDialog = true;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    doSearch(row) {
      console.log(row);
    },
    toggleSelection(rows) {
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
    this.get_book_list();
  }
};
</script>
<style>
.form-inline {
  text-align: left;
}
.warning-row {
  background: #e77373 !important;
}

.success-row {
  background: #9ce773 !important;
}
</style>


