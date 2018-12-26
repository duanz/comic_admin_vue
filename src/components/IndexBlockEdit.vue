<template>
  <el-container style="height:100%">
    <el-form
      :model="form"
      :disabled="block.edit_type=='detail'"
      ref="editIndexBlockForm"
      label-width="80px"
    >
      <el-form-item label="模块类型" prop="block_type">
        <el-select
          v-model="form.block_type"
          placeholder="请选择类型"
          :disabled="block.block_type?true:false"
        >
          <el-option v-for="(val, key) in selector.block_type" :key="key" :label="val" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否生效" prop="active">
        <el-switch v-model="form.active"></el-switch>
      </el-form-item>
      <el-form-item label="模块类型" prop="desc_type">
        <el-select v-model="form.desc_type" placeholder="请选择类型">
          <el-option v-for="(val, key) in selector.desc_type" :key="key" :label="val" :value="key"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="内容ID" prop="content_id">
        <el-input type="number" v-model="form.content_id"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="close">取消</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script>
import {
  getIndexBlockList,
  createIndexBlock,
  getIndexBlockDetail,
  updateIndexBlock
} from "../api/utilsApi";
import { BLOCK_TYPE_CHOICES, BLOCK_DESC_CHOICES } from "../config/commentData";

export default {
  name: "indexBlockEdit",
  data() {
    return {
      form: {
        block_type: "",
        active: false,
        desc_type: "",
        content_id: 0
      },
      selector: {
        block_type: BLOCK_TYPE_CHOICES,
        desc_type: BLOCK_DESC_CHOICES
      }
    };
  },
  props: {
    block: {
      id: { default: 0, type: Number },
      content_id: { default: 0, type: Number },
      block_type: "",
      desc_type: "",
      edit_type: ""
    },
    is_clear: { default: true, type: Boolean }
  },
  methods: {
    close: function() {
      this.$emit("close");
    },
    handleFormRes: function(res) {
      if (res.code == 200 || res.code == undefined) {
        this.close();
        this.$notify({ title: "通知", message: "处理成功" });
      } else {
        this.$notify({ title: "通知", message: "处理失败, " + res.msg });
      }
    },
    update_block: function(block_id, form) {
      updateIndexBlock(block_id, form).then(res => {
        this.handleFormRes(res);
      });
    },
    create_block: function(form) {
      createIndexBlock(form).then(res => {
        this.handleFormRes(res);
      });
    },
    onSubmit() {
      console.log(this.$data.form);
      if (this.$props.block.id != 0) {
        this.update_block(this.$props.block.id, this.$data.form);
      } else {
        this.create_block(this.$data.form);
      }
    },
    refreshData: function(block_id) {
      getIndexBlockDetail(block_id).then(res => {
        this.$data.form.block_type = res.block_type;
        this.$data.form.active = res.active;
        this.$data.form.content_id = res.content_id;
        this.$data.form.desc_type = res.desc_type;
      });
    }
  },
  mounted: function() {
    if (this.$props.block.id != 0) {
      this.refreshData(this.$props.block.id);
    } else if (this.$props.block.content_id) {
      this.$data.form.content_id = this.$props.block.content_id;
      this.$data.form.block_type = this.$props.block.block_type;
      this.$data.form.desc_type = this.$props.block.desc_type;
    }
  },
  watch: {
    block_id: function(val) {
      immediate: true;
      if (val != 0) {
        this.refreshData(val);
      }
    },
    is_clear: function(val) {
      if (val) {
        console.log(val);
        // this.$refs.editIndexBlockForm.resetFields();
      }
    }
  }
};
</script>
<style>
</style>

