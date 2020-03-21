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
        <el-button type="primary" @click="get_comic_list">搜索</el-button>
        <el-button type="success" @click="get_comic_list">刷新</el-button>
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
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="title" label="书名" width="200"></el-table-column>
      <el-table-column prop="author" label="作者" width="100"></el-table-column>
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
          <el-button @click="handleClick(scope.row, 'index')" type="success" size="small">添加首页</el-button>
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
import { getComicList, deleteComic } from "../api/comicApi";
import TaskEdit from "../components/TaskEdit";
import IndexBlockEdit from "../components/IndexBlockEdit";
import { TASK_TYPE, TASK_STATUS } from "../config/commentData";

export default {
  name: "comicList",
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
        block_type: "COMIC"
      },
      task: { edit_task_id: 0, edit_type: "", editDialog: false }
    };
  },
  methods: {
    refreshTable: function(res) {
      this.$data.tableData = res.results;
      this.$data.pageination.total = res.count;
    },
    get_comic_list: function() {
      getComicList(this.$data.search_form).then(res => {
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
      if (type === "detail") {
        this.$router.push({ name: "comic_detail", params: { id: row.id } });
      } else if (type === "index") {
        this.$data.block.content_id = row.id;
        this.$data.block.editDialog = true;
      } else if (type === "delete") {
        this.$confirm("删除后不可恢复,坚决要删除吗", "删除" + row.title, {
          confirmButtonText: "确定",
          cancelButtonText: "放弃",
          callback: action => {
            if (action == "confirm") {
              deleteComic(row.id);
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
      Object.assign(this.$data.block, this.$options.data("block"));
      Object.assign(this.$data.task, this.$options.data("task"));
    }
  },
  mounted: function() {
    this.get_comic_list();
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
.el-main {
  line-height: normal !important;
}

.success-row {
  background: #9ce773 !important;
}
</style>


