<template>
  <div class="player">
    <el-form :inline="true"
             :model="form">
      <el-form-item label="">
        <el-input v-model="q"
                  placeholder="可通过账号姓名查询">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="getUser"></el-button>
        </el-input>
      </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button @click="add">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="playerList"
              border
              style="width: 100%">
      <el-table-column label="no">
        <template slot-scope="scope">{{ scope.row.no }}
        </template></el-table-column>
      <el-table-column prop="number"
                       label="number">
        <template slot-scope="scope">{{ scope.row.number }}
        </template></el-table-column>
      <el-table-column prop="sex"
                       label="性别">
        <template slot-scope="scope">{{ scope.row.sex === "F" ? "女" : "男" }}
        </template></el-table-column>
      <el-table-column prop="telephone"
                       label="手机号">
        <template slot-scope="scope">{{ scope.row.telephone }}
        </template></el-table-column>
      <el-table-column prop="area"
                       label="赛区">
        <template slot-scope="scope">{{ scope.row.area }}
        </template></el-table-column>
      <el-table-column prop="speciality"
                       label="speciality">
        <template slot-scope="scope">{{ scope.row.speciality }}
        </template></el-table-column>
      <el-table-column label="操作"
                       width="100">
        <template slot-scope="scope">
          <!-- <el-button @click="handlerDetail(scope.row)" type="text" size="small"
            >查看</el-button
          > -->
          <el-button type="text"
                     size="small"
                     @click="handlerEdit(scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="search-form-pagination">
      <el-pagination :current-page="result.currentPage"
                     :page-size="result.pageSize"
                     layout="total, prev, pager, next, sizes, jumper"
                     :total="result.item_total"
                     @current-change="onPageCurrentChange"
                     @size-change="onPageSizeChange">
      </el-pagination>
    </div>
    <el-dialog title="新增账户"
               :visible.sync="dialogVisible"
               width="60%">
      <el-form ref="form"
               :model="form"
               label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"
                    type="password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { get } from "../utils/";
export default {
  name: "player",
  data () {
    return {
      q: "",
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
  created () {
    this.getList();
  },
  methods: {
    getUser () {
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
    getList () {
      get("/get_groupadmin_list", {
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
    onPageCurrentChange (pageNum) {
      //  切换页码
      console.log(pageNum);
      this.result.currentPage = pageNum;
      this.getList();
    },
    onPageSizeChange (pageSize) {
      //  切换页数
      console.log(pageSize);
      this.result.currentPage = pageSize;
      this.getList();
    },
    submit () {
      console.log(this.form);
      this.getList();
    },
    add () {
      this.dialogVisible = true;
    },
    handlerEdit () { }
    // handlerDetail(row) {
    //   console.log(row);
    //   get("/get_contestant_info", {
    //     token: localStorage.getItem("token"),
    //     q: row.number
    //   })
    //     .then(res => {
    //       console.log(res);
    //       if (res.successful) {
    //         this.dialogVisible = true;
    //         this.userInfo = res.data || {};
    //       } else {
    //         this.$message(res.message);
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  }
};
</script>
<style lang="stylus" scoped></style>
