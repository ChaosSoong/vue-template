<template>
  <div class="player">
    <el-form :inline="true" :model="form">
      <el-form-item label="评委编号">
        <el-input v-model="form.user" placeholder="评委编号"></el-input>
      </el-form-item>
      <el-form-item label="报名时间">
        <el-date-picker
          v-model="form.date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">查询</el-button>
        <el-button @click="exportExcel">导出表格</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="playerList" border style="width: 100%">
      <el-table-column prop="no" label="序号" width="100"> </el-table-column>
      <el-table-column prop="number" label="编号"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="telephone" label="手机号"> </el-table-column>
      <el-table-column prop="area" label="赛区"> </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handlerDetail(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small" @click="handlerEdit(scope.row)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="search-form-pagination">
      <el-pagination
        :current-page="result.currentPage"
        :page-sizes="[10, 20, 50]"
        :page-size="result.pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="result.item_total"
        @current-change="onPageCurrentChange"
        @size-change="onPageSizeChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { get } from "../utils/";
export default {
  name: "player",
  data() {
    return {
      form: {
        user: "",
        date: ""
      },
      playerList: [],
      result: { item_total: 0, page_total: 0, currentPage: 1 }
    };
  },
  created() {
    get("/get_judge_list", {
      token: localStorage.getItem("token")
    })
      .then(res => {
        console.log(res);
        if (res.successful) {
          this.playerList = res.data.list;
          this.result = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    onPageCurrentChange(pageNum) {
      //  切换页码
      console.log(pageNum);
    },
    onPageSizeChange(pageSize) {
      //  切换页数
      console.log(pageSize);
    },
    submit() {},
    exportExcel() {},
    handlerEdit() {},
    handlerDetail() {}
  }
};
</script>
<style lang="stylus" scoped>
.search-form-pagination {
  width: 100%;
  margin: 16px 0;
  text-align: right;
}
</style>
