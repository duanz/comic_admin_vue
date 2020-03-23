<template>
  <el-container class="inline-grid center">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleform"
      label-width="100px"
      class="ruleform"
    >
      <el-form-item>
        <el-tag
          type="danger"
          :key="tag"
          v-for="tag in dynamicTags"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
        >{{tag}}</el-tag>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <!-- <el-form-item label="年龄" prop="age">
      <el-input v-model.number="ruleForm.age"></el-input>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleform')">提交</el-button>
        <el-button @click="resetForm('ruleform')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import { login } from "../api/memberApi";
import Storager from "../utils/storage";
export default {
  name: "LoginView",
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      callback();
    };
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      callback();
    };
    return {
      dynamicTags: [],
      redirect: "",
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm: function(formName) {
      let self = this;
      self.$refs[formName].validate(valid => {
        if (valid) {
          login(self.$data.ruleForm).then(res => {
            if (res.code && res.code != "200") {
              self.$data.dynamicTags = [res.msg];
            } else {
              Storager.saveUserInfo(res);
              self.$emit("userState", true);
              self.$router.push({ path: self.$data.redirect });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm: function(formName) {
      this.$refs[formName].resetFields();
    },
    handleClose(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    }
  },
  mounted() {
    var next_url =
      this.$router.currentRoute.fullPath ||
      typeof this.$route.params.redirect == "undefined"
        ? "/comic"
        : this.$route.params.redirect;
    this.$data.redirect = next_url;
    console.log(this.$data.redirect);
    if (Storager.isAuth()) {
      console.log(1);
      this.$router.push({ path: next_url });
      this.$emit("userState", true);
    } else {
      console.log(2);
      this.$emit("userState", false);
    }
  }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.center {
  align-items: center;
}
.inline-grid {
  display: block !important;
}
.ruleform {
  text-align: end;
  width: 25rem;
  display: inline-block;
}
</style>

