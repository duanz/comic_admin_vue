<template>
  <el-container direction="vertical">
    <el-dialog
      title="内容"
      :visible.sync="detailDialog"
      width="60%"
      heigth="80%"
      @close="closeDialog"
    >
      <div>{{dialogContent}}</div>
    </el-dialog>

    <el-dialog title="任务编辑" :visible.sync="taskDialog" width="30%" @close="closeDialog">
      <TaskEdit :is_clear="!taskDialog" @close="closeDialog" :content="taskContent"/>
    </el-dialog>

    <el-form :inline="true" class="form-inline" size="mini">
      <el-form-item label="书名">
        <el-input v-model="filter.title__icontains" placeholder="书名"></el-input>
      </el-form-item>
      <el-form-item label="原始地址">
        <el-input v-model="filter.origin_addr__icontains" placeholder="原始地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="doSearch">搜索</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="get_chapter_list(book_id, filter)">刷新</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="chapterTable"
      :data="tableData"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="title" label="章节名" width="180"></el-table-column>
      <el-table-column prop="origin_addr" label="原始地址" width="550"></el-table-column>
      <el-table-column prop="update_at" label="更新时间"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row, 'detail')" type="text" size="small">查看</el-button>
          <el-button @click="handleClick(scope.row, 'refresh')" type="text" size="small">更新</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageination.current"
      :background="true"
      :page-sizes="[30, 100, 200]"
      :page-size="filter.limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pageination.total"
    ></el-pagination>
  </el-container>
</template>
<script>
import TaskEdit from "../components/TaskEdit";
import { getUtilsTask } from "../api/utilsApi";
import { TASK_TYPE, TASK_STATUS } from "../config/commentData";
import { getBookChapterList, getBookChapterDetail } from "../api/bookApi";

export default {
  name: "bookChapterList",
  components: { TaskEdit },
  data: function() {
    return {
      book_id: this.$route.params.id,
      tableData: [],
      chapterTable: [],
      pageination: { current: 0, total: 0 },
      detailDialog: false,
      taskDialog: false,
      dialogContent: "",
      taskContent: "",
      filter: {
        active: true,
        limit: 30,
        number: "",
        offset: "",
        origin_addr__icontains: "",
        title__icontains: ""
      }
    };
  },
  methods: {
    refreshTable: function(res) {
      this.$data.tableData = res.results;
      this.$data.pageination.total = res.count;
    },
    get_chapter_list: function(book_id, filter) {
      getBookChapterList(book_id, filter).then(res => {
        this.refreshTable(res);
      });
    },
    get_chapter_detail: function(chapter_id) {
      getBookChapterDetail(chapter_id).then(res => {
        this.$data.dialogContent = res.content;
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
        this.get_chapter_detail(row.id);
        this.$data.detailDialog = true;
      } else if (type === "refresh") {
        let temp = {
          book_id: this.$data.book_id,
          chapter_id: row.id,
          url: row.origin_addr
        };
        this.$data.taskContent = JSON.stringify(temp);
        this.$data.taskDialog = true;
      }
    },
    handleSizeChange(val) {
      this.$data.filter.limit = val;
      this.get_chapter_list(this.$data.book_id, this.$data.filter);
    },
    handleCurrentChange(val) {
      this.$data.filter.offset = this.$data.filter.limit * (val - 1);
      this.get_chapter_list(this.$data.book_id, this.$data.filter);
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
      this.$data.dialogContent = "";
      this.$data.detailDialog = false;
    }
  },
  mounted: function() {
    this.get_chapter_list(this.$data.book_id);
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

