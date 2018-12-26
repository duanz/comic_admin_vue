<template>
  <el-container direction="vertical">
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
        <el-button type="success" @click="block.editDialog = !block.editDialog">添加元素</el-button>
        <el-button type="info" @click="get_block_list">刷新</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="编辑小说" :visible.sync="block.editDialog" width="30%" @close="closeDialog">
      <IndexBlockEdit :block="block" :is_clear="!block.editDialog" @close="closeDialog"/>
    </el-dialog>

    <el-table
      ref="taskTable"
      :data="tableData"
      @selection-change="handleSelectionChange"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="id" label="ID" width="50"></el-table-column>
      <el-table-column prop="title" label="内容主题" width="150"></el-table-column>
      <el-table-column prop="content_id" label="内容ID" width="100"></el-table-column>
      <el-table-column prop="block_type" label="模块类型" width="100"></el-table-column>
      <el-table-column prop="desc_type" label="模块类型" width="100"></el-table-column>
      <el-table-column prop="update_at" label="更新时间"></el-table-column>
      <el-table-column prop="active" label="是否生效" width="100"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row, 'detail')" type="text" size="small">查看</el-button>
          <el-button @click="handleClick(scope.row, 'edit')" type="text" size="small">编辑</el-button>
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
import {
  getIndexBlockList,
  createIndexBlock,
  getComicChapterDetail
} from "../api/utilsApi";
import { BLOCK_TYPE_CHOICES, BLOCK_DESC_CHOICES } from "../config/commentData";
import IndexBlockEdit from "../components/IndexBlockEdit";

export default {
  name: "indexBlock",
  components: {
    IndexBlockEdit
  },
  data: function() {
    return {
      block: {
        id: 0,
        content_id: 0,
        desc_type: "",
        editDialog: false,
        edit_type: ""
      },
      tableData: [],
      taskTable: [],
      pageination: { current: 0, total: 0 },
      filter: {
        active: true,
        limit: 30,
        offset: ""
      }
    };
  },
  methods: {
    refreshTable: function(res) {
      this.$data.tableData = res.results;
      this.$data.pageination.total = res.count;
    },
    get_block_list: function() {
      getIndexBlockList().then(res => {
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
        this.$data.block.id = row.id;
        this.$data.block.edit_type = type;
        this.$data.block.editDialog = true;
      } else if (type === "edit") {
        this.$data.block.id = row.id;
        this.$data.block.edit_type = type;
        this.$data.block.editDialog = true;
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
      this.$data.block = {
        block_id: 0,
        content_id: 0,
        desc_type: "",
        editDialog: false,
        edit_type: ""
      };
    }
  },
  mounted: function() {
    this.get_block_list();
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


