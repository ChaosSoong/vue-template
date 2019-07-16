<template>
  <div class="player">
    <el-form :inline="true" :model="form">
      <el-form-item label="选手编号">
        <el-input v-model="q" placeholder="选手编号">
          <el-button
            slot="append"
            icon="el-icon-search"
            @click="getUser"
          ></el-button>
        </el-input>
      </el-form-item>
      <el-form-item label="开始时间">
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
        <el-button @click="exportExcel">导出表格</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="playerList" border style="width: 100%">
      <el-table-column label="序号">
        <template slot-scope="scope"
          >{{ scope.row.no }}
        </template></el-table-column
      >
      <el-table-column prop="number" label="编号">
        <template slot-scope="scope"
          >{{ scope.row.number }}
        </template></el-table-column
      >
      <el-table-column prop="telephone" label="手机号">
        <template slot-scope="scope"
          >{{ scope.row.telephone }}
        </template></el-table-column
      >
      <el-table-column prop="area" label="赛区">
        <template slot-scope="scope"
          >{{ scope.row.area }}
        </template></el-table-column
      >
      <el-table-column prop="group_flag" label="是否团体">
        <template slot-scope="scope"
          >{{ scope.row.group_flag ? "是" : "否" }}
        </template></el-table-column
      >
      <el-table-column prop="form" label="参赛类型">
        <template slot-scope="scope"
          >{{ scope.row.form }}
        </template></el-table-column
      >
      <el-table-column prop="agency" label="是否已签约公司">
        <template slot-scope="scope"
          >{{ scope.row.agency }}
        </template></el-table-column
      >
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
        :page-sizes="[10]"
        :page-size="result.pageSize"
        layout="total, prev, pager, next, sizes, jumper"
        :total="result.item_total"
        @current-change="onPageCurrentChange"
        @size-change="onPageSizeChange"
      >
      </el-pagination>
    </div>
    <el-dialog title="详情" :visible.sync="dialogVisible" width="80%">
      <el-form
        size="small"
        label-width="100px"
        :inline="true"
        label-position="left"
      >
        <el-form-item label="姓名:">{{ userInfo.name }} </el-form-item>
        <el-form-item label="赛区:">{{ userInfo.area }} </el-form-item>
        <el-form-item label="参赛节目:">{{ userInfo.form }} </el-form-item>
        <el-form-item label="三方账号:">{{ userInfo.account }} </el-form-item>
        <el-form-item label="团体人数:"
          >{{ userInfo.group_count }}
        </el-form-item>
        <el-form-item label="团体领导:">{{ userInfo.leader }} </el-form-item>
        <el-form-item label="个人描述:"
          >{{ userInfo.description }}
        </el-form-item>
        <el-form-item label="是否已签约公司:"
          >{{ userInfo.agency }}
        </el-form-item>
        <el-form-item label="是否团体:"
          >{{ userInfo.group_flag ? "是" : "否" }}
        </el-form-item>
        <div>
          <img
            style="width:50px;height:50px"
            :src="'http://syxj.snowland.ltd' + userInfo.photo"
            alt=""
          />
        </div>
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
      q: "谭梦",
      form: {
        user: "",
        date: "",
        starttime: "",
        endtime: ""
      },
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
    getUser() {
      get("/get_contestant_info", {
        token: localStorage.getItem("token"),
        q: this.q
      })
        .then(res => {
          console.log(res);
          if (res.successful) {
            this.dialogVisible = true;
            this.userInfo = res.data;
          } else {
            this.$message(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getList() {
      get("/get_contestant_list", {
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
          } else {
            this.$message(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
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
    submit() {
      console.log(this.form);
      this.getList();
    },
    exportExcel() {
      window.open(
        "http://syxj.snowland.ltd/output_contestant?token=" +
          localStorage.getItem("token")
      );
    },
    // handlerEdit() {},
    handlerDetail(row) {
      console.log(row);
      get("/get_contestant_info", {
        token: localStorage.getItem("token"),
        q: row.number
      })
        .then(res => {
          console.log(res);
          if (res.successful) {
            this.dialogVisible = true;
            this.userInfo = res.data || {};
          } else {
            this.$message(res.message);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="stylus" scoped></style>
