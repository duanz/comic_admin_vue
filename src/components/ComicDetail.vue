<template>
  <el-container direction="vertical">
    <el-dialog title="内容" :visible.sync="detailDialog" width="100%" @close="closeDialog">
      <div>{{dialogContent}}</div>
    </el-dialog>

    <el-table
      ref="chapterTable"
      :data="tableData"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="title" label="章节名" width="180"></el-table-column>
      <el-table-column prop="origin_addr" label="原始地址" width="180"></el-table-column>
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
import { TASK_TYPE, TASK_STATUS } from "../config/commentData";
import { getComicDetail, getComicChapterDetail } from "../api/comicApi";

export default {
  name: "comicDetail",
  data: function() {
    return {
      comic_id: this.$route.params.id,
      search_title: "",
      search_time: "",
      tableData: [],
      chapterTable: [],
      pageination: { current: 0, total: 0 },
      detailDialog: false,
      dialogContent: ""
    };
  },
  methods: {
    refreshTable: function(res) {
      this.$data.tableData = res.chapter;
      this.$data.pageination.total = res.chapter.length;
    },
    get_comic_detail: function(comic_id) {
      getComicDetail(comic_id).then(res => {
        this.refreshTable(res);
      });
    },
    get_chapter_detail: function(chapter_id) {
      getComicChapterDetail(chapter_id).then(res => {
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
        this.$router.push({ name: "comic_chapter_detail", params: { id: row.id } });
      } else {
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
    this.get_comic_detail(this.$data.comic_id);
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

