<template>
  <div class="player">
    <el-form :inline="true" :model="form">
      <el-form-item label="评委编号">
        <el-input v-model="q" placeholder="评委编号">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getUser"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="报名时间">
        <el-date-picker
          v-model="form.starttime"
          format="yyyyMMdd"
          value-format="yyyyMMdd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="form.endtime"
          format="yyyyMMdd"
          value-format="yyyyMMdd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">查询</el-button>
        <!-- <el-button @click="exportExcel">导出表格</el-button> -->
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
          <!-- <el-button type="text" size="small" @click="handlerEdit(scope.row)"
            >编辑</el-button
          > -->
        </template>
      </el-table-column>
    </el-table>
    <div class="search-form-pagination">
      <el-pagination
        :current-page="result.currentPage"
        :page-sizes="[5, 10, 20]"
        :page-size="result.pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="result.item_total"
        @current-change="onPageCurrentChange"
        @size-change="onPageSizeChange"
      >
      </el-pagination>
    </div>
    <el-dialog title="详情" :visible.sync="dialogVisible" width="80%">
      <el-form size="small" label-width="100px" :inline="true">
        <el-form-item label="姓名:">{{ userInfo.name }} </el-form-item>
        <el-form-item label="赛区:">{{ userInfo.area }} </el-form-item>
        <el-form-item label="参赛节目:">{{ userInfo.form }} </el-form-item>
        <el-form-item label="是否团体:"
          >{{ userInfo.group_flag ? "是" : "否" }}
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
        starttime: "",
        endtime: ""
      },
      q: "",
      playerList: [],
      result: { item_total: 0, page_total: 0, currentPage: 1 },
      dialogVisible: false,
      userInfo: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    onPageCurrentChange(pageNum) {
      //  切换页码
      console.log(pageNum);
      this.result.currentPage = pageNum;
      this.getList();
    },
    onPageSizeChange(pageSize) {
      //  切换页数
      console.log(pageSize);
      this.result.currentPage = pageSize;
      this.getList();
    },
    getList() {
      get("/get_judge_list", {
        token: localStorage.getItem("token"),
        page_number: this.result.currentPage,
        page_size: 10,
        starttime: this.form.starttime,
        endtime: this.form.endtime
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
    submit() {},
    exportExcel() {
      window.open(
        "http://syxj.snowland.ltd/output_contestant?token=" +
          localStorage.getItem("token")
      );
    },
    handlerEdit() {},
    handlerDetail(row) {
      console.log(row);
      this.dialogVisible = true;
      get("/judge_info", {
        token: localStorage.getItem("token"),
        q: row.no
      })
        .then(res => {
          console.log(res);
          if (res.successful) {
            this.userInfo = res.data || {};
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getUser() {
      this.dialogVisible = true;
      get("/judge_info", {
        token: localStorage.getItem("token"),
        q: this.q
      })
        .then(res => {
          console.log(res);
          if (res.successful) {
            this.userInfo = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
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
