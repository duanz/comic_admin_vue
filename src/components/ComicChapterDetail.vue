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
      <el-table-column
        label="日期">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        width="150">
        <template slot-scope="scope">
          <!-- <i class="el-icon-time"></i> -->
          <img src="https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=1559121849,1979113738&fm=85&s=C7B839C51643035D9F1961B70300D000" class="icon_image">
          <!-- <img :src="scope.row" class="icon_image"> -->
        </template>
      </el-table-column>
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
  name: "comicChapterDetail",
  data: function() {
    return {
      chapter_id: this.$route.params.id,
      tableData: [],
      chapterTable: [],
      pageination: { current: 0, total: 0 },
      detailDialog: false,
      dialogContent: ""
    };
  },
  methods: {
    refreshTable: function(res) {
      this.$data.tableData = res.image_url_list;
      this.$data.pageination.total = res.image_url_list.length;
    },
    get_chapter_detail: function(chapter_id) {
      getComicChapterDetail(chapter_id).then(res => {
        this.refreshTable(res);
      });
    },
    handleClick(row, type) {
      if (type === "detail") {
        this.get_chapter_detail(row.id);
        this.$data.detailDialog = true
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
    this.get_chapter_detail(this.$data.chapter_id);
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

.icon_image {
  width: 105px;
}
</style>

