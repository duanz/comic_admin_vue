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
        <el-button type="primary" @click="get_book_list">搜索</el-button>
        <el-button type="success" @click="get_book_list">刷新</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="task.editDialog = !task.editDialog">添加任务</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="编辑小说" :visible.sync="block.editDialog" width="30%" @close="closeDialog">
      <IndexBlockEdit :block="block" :is_clear="!block.editDialog" @close="closeDialog" />
    </el-dialog>

    <el-dialog title="任务编辑" :visible.sync="task.editDialog" width="30%" @close="closeDialog">
      <TaskEdit
        :task_id="task.edit_task_id"
        :edit_type="task.edit_type"
        :is_clear="!task.editDialog"
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
      <el-table-column prop="author" label="作者" width="100"></el-table-column>
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
          <a
            class="el-button el-button--success el-button--small is-circle"
            :href="scope.row.download_url"
            v-if="scope.row.is_download"
          >
            <i class="el-icon-download"></i>
          </a>
          <el-button
            size="small"
            type="success"
            icon="el-icon-share"
            @click="handleClick(scope.row, 'sendKindle')"
            circle
          ></el-button>
          <el-button
            v-if="false"
            size="small"
            type="success"
            icon="el-icon-share"
            @click="handleClick(scope.row, 'index')"
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
import { getBookList, deleteBook } from "../api/bookApi";
import { createUtilsTask } from "../api/utilsApi";
import TaskEdit from "../components/TaskEdit";
import IndexBlockEdit from "../components/IndexBlockEdit";
import { TASK_TYPE, TASK_STATUS } from "../config/commentData";

export default {
  name: "taskList",
  components: {
    IndexBlockEdit,
    TaskEdit
  },
  data: function() {
    return {
      search_form: {
        title__icontains: "",
        update_at__lte: ""
      },
      tableData: [],
      taskTable: [],
      pageination: { current: 0, total: 0 },
      block: {
        id: 0,
        content_id: 0,
        desc_type: "",
        editDialog: false,
        edit_type: "",
        block_type: "BOOK"
      },
      task: { edit_task_id: 0, edit_type: "", editDialog: false }
    };
  },
  methods: {
    close: function() {
      this.$emit("close");
    },
    handleFormRes: function(res) {
      console.log(res);
      if (res.code == 200 || res.code == undefined) {
        this.close();
        this.$notify({ title: "通知", message: "处理成功", duration:1000 });
      } else {
        this.$notify({ title: "通知", message: "处理失败, " + res.msg, duration:1000 });
      }
    },
    refreshTable: function(res) {
      this.$data.tableData = res.results;
      this.$data.pageination.total = res.count;
    },
    get_book_list: function() {
      getBookList(this.$data.search_form).then(res => {
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
      if (type === "detail") {
        this.$router.push({ name: "book_detail", params: { id: row.id } });
      } else if (type === "index") {
        this.$data.block.content_id = row.id;
        this.$data.block.editDialog = true;
      } else if (type === "sendKindle") {
        let form = {
          task_type: "SEND_TO_KINDLE",
          active: true,
          task_status: "WAIT",
          content: '{"content_id": ' + row.id + ', "content_type":"book"}',
          markup: ""
        };
        this.create_task(form);
      } else if (type === "delete") {
        this.$confirm("删除后不可恢复,坚决要删除吗", "删除" + row.title, {
          confirmButtonText: "确定",
          cancelButtonText: "放弃",
          callback: action => {
            if (action == "confirm") {
              deleteBook(row.id);
            }
          }
        });
      }
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
    create_task: function(form) {
      createUtilsTask(form).then(res => {
        this.handleFormRes(res);
      });
    },
    closeDialog: function() {
      Object.assign(this.$data.block, this.$options.data("block"));
      Object.assign(this.$data.task, this.$options.data("task"));
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


