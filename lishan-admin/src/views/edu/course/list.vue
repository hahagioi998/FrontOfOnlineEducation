<template>
  <div class="app-container">
    课程列表
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">       
      <el-form-item label="课程名">
        <el-input v-model="courseQuery.title" placeholder="课程名"/>       
        </el-form-item>
        <el-form-item label="课时数">
        <el-input v-model="courseQuery.lessonNum" placeholder="课时数"/>       
        </el-form-item>
        <el-form-item label="添加时间">
        <el-date-picker           
        v-model="courseQuery.gmtCreate"           
          type="datetime"          
          placeholder="选择开始时间"          
          value-format="yyyy-MM-dd HH:mm:ss"           
          default-time="00:00:00"
        />
      </el-form-item>
      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="发布状态">
          <el-option :value="1" label="已发布"/>
          <el-option :value="0" label="未发布"/>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>     
      </el-form>

    <!-- 表格 -->     
    <el-table v-loading="listLoading"
      :data="list"       
      element-loading-text="数据加载中"       
      border       
      fit       
      highlight-current-row>       
      <el-table-column         
      label="序号"         
      width="70"         
      align="center">         
      <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="课程名称" width="200" />
       <el-table-column prop="lessonNum" label="课时数" width="100" />
        <el-table-column prop="gmtCreate" label="添加时间" width="160"/>
      <el-table-column label="发布状态" width="80">
        <template slot-scope="scope">
          {{ scope.row.status===1?'已发布':'未发布' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="500" align="center">
        <template slot-scope="scope">
          <router-link :to="'/edu/course/info/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑基本信息</el-button>
          </router-link>
          <router-link :to="'/edu/course/chapter/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑课程大纲</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete" 
            @click="removeCourseById(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
     <!-- 分页 -->
    <el-pagination 
      background
      :current-page="page"
      :page-size="limit"       
      :total="total"       
      style="padding: 30px 0; text-align: center;"       
      layout="total, prev, pager, next, jumper"
      @current-change="getList"
    />
    </div>

</template>

<script>
import course from "@/api/edu/course.js";

export default {
  //核心代码位置
  data() {
    //定义变量和初始值
    return {
      list: null, //查询之后接口返回集合
      total: 0, //总记录数
      page: 1, //当前页
      limit: 5, //每页记录数
      courseQuery: {}, //条件封装对象
    };
  },
  created() {
    //页面渲染之前执行，一般调用methods定义的方法
    this.getList();
  },
  methods: {
    //创建具体的方法，调用xx.js定义的方法
    //课程列表
    getList(page = 1) {
      this.page = page
      course
        .getCourseListPage(this.page, this.limit, this.courseQuery)
        .then((response) => {
          this.list = response.data.records;
          this.total = response.data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetData() {     
      this.courseQuery = {}     
      this.getList();
    },
    removeCourseById(id){
       this.$confirm('此操作将永久删除课程信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          course.deleteCourse(id)
          .then(response =>{//删除成功
              this.$message({
              type: 'success',
              message: '删除成功!'
          });
          this.getList(this.page);
          })
          .error(error =>{

          })
         
        })
        
  },
  }
};
</script>