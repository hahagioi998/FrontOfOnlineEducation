<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="1" process-status="wait" align-center style="marginbottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps>
   <el-form label-width="120px">
       <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视视频"></el-input>
      </el-form-item>
    <!-- 所属分类 TODO -->
<el-form-item label="课程分类">
 <el-select 
    v-model="courseInfo.subjectParentId" 
    placeholder="一级分类" @change="subjectLevelOneChanged">
 <el-option     
    v-for="subject in subjectOneList"
    :key="subject.id"
    :label="subject.title"
    :value="subject.id"/>
 </el-select>
 <!-- 二级分类 -->
<el-select v-model="courseInfo.subjectId" placeholder="二级分类">
  <el-option     
    v-for="subject in subjectTwoList"
    :key="subject.value"
    :label="subject.title"
    :value="subject.id"
     />
</el-select>

  </el-form-item>
  <!-- 课程讲师 TODO -->
  <el-form-item label="所属讲师">
 <el-select v-model="courseInfo.teacherId" placeholder="请选择">
 <el-option     
    v-for="teacher in teacherList"
    :key="teacher.id"
    :label="teacher.name"
    :value="teacher.id"/>
 </el-select>
  </el-form-item>
 
 <!-- 总课时 TODO -->
  <el-form-item label="总课时">
    <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="课时数"/>小时
  </el-form-item>
   <!-- 课程封面-->
<el-form-item label="课程封面">
  <el-upload
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :action="BASE_API+'/eduOss/fileOss'" 
    class="avatar-uploader">
    <img :src="courseInfo.cover">
  </el-upload>
</el-form-item>
  <!-- 课程简介-->
<el-form-item label="课程简介">
    <tinymce :height="300" v-model="courseInfo.description"/>
</el-form-item>
  <!-- 课程封面 TODO -->
  <el-form-item label="课程价格">
    <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="课程价格"/>元
  </el-form-item>
  <el-form-item>
    <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存并下一步</el-button>
  </el-form-item>
</el-form>
    </div>
</template> 
<script> 
import course from "@/api/edu/course"
import subject from "@/api/edu/subject"
import Tinymce from '@/components/Tinymce' 
export default {
       components: { Tinymce },
       data() {     
           return {       
                saveBtnDisabled: false, // 保存按钮是否禁用
                courseInfo : {
                title: '',   
                subjectId: '',//二级分类id
                subjectParentId: '',  //一级分类id 
                teacherId: '',   
                lessonNum: 0,   
                description: '',   
                cover: '/static/yyqx.jpg',   
                price: 0
                },
                courseId:'',
                BASE_API: process.env.BASE_API, // 接口API地址
                teacherList:[],//封装所有的讲师
                subjectOneList:[],//封装所有的一级分类
                subjectTwoList:[],//封装所有的二级分类,
        }   
    },   
        created() {
          //通过路由获取id值
          if(this.$route.params && this.$route.params.id){
              this.courseId = this.$route.params.id
              this.getCourseInfo()
          }else{
               //初始化所有讲师
            this.getTeacherList()
            this.getOneSubject()
          }
        }, 
        watch: {
    $route(to, from) {
      //路由变化方式，当路由发送变化，方法就执行
      console.log("watch $route");
      this.courseInfo={
        title: '',   
        subjectId: '',//二级分类id
        subjectParentId: '',  //一级分类id 
        teacherId: '',   
        lessonNum: 0,   
        description: '',   
        cover: '/static/yyqx.jpg',   
        price: 0
      }
    },
  },  
        methods: {  
            //上传封面成功调用的方法
            handleAvatarSuccess(res, file){
                 console.log(res)// 上传响应
                 console.log(URL.createObjectURL(file.raw))// base64编码   
                 this.courseInfo.cover = res.data.url

            }, 
            //上传之前调用的方法
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg'   
                const isLt2M = file.size / 1024 / 1024 < 2
                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!')
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                }
                return isJPG && isLt2M
            },

            //查询所有的一级分类
            getOneSubject(){
                subject.getSubjectList()
                .then(res =>{
                   this.subjectOneList = res.data.list
                })
            },
            //点击某个一级分类触发此方法，显示所属其的二级分类
            subjectLevelOneChanged(value){
                for (let i = 0; i < this.subjectOneList.length; i++){         
                    if (this.subjectOneList[i].id === value) {             
                        this.subjectTwoList = this.subjectOneList[i].children             
                        this.courseInfo.subjectId = ''
                    }
                }

            },
            //查询所有的讲师
            getTeacherList(){
                course.findAllTeacher()
                .then(res =>{
                    this.teacherList=res.data.items
                })
            },
            //添加课程
            addCourse(){
              course.addCourseInfo(this.courseInfo)
                .then(res =>{
                    //提示
                    this.$message({
                        type: 'success',
                        message: '添加课程信息成功!'
                    });
                    //跳转到第二步
                    this.$router.push({path:`/course/chapter/${res.data.courseId}`})
                })  
            },
            //修改课程
            updateCourse(){
                course.updateCourseInfo(this.courseInfo)
                .then(res =>{
                    //提示
                    this.$message({
                        type: 'success',
                        message: '修改课程信息成功!'
                    });
                     //跳转到第二步
                    this.$router.push({path:`/course/chapter/${this.courseId}`})
              })
            },
            saveOrUpdate() {  
                 if(!this.courseInfo.id){
                   this.addCourse()
                 }else{
                   this.updateCourse()
                 }
            },
            getCourseInfo(){
              course.getCourseInfoByCourseId(this.courseId)
              .then(res =>{
                //在courseInfo课程基本信息中包含一级分类id和二级分类id
               this.courseInfo = res.data.courseInfoVo
               //1.查询所有的分类
               subject.getSubjectList()
               .then(res =>{
                 //2.获取所有的一级分类
                 this.subjectOneList = res.data.list
                 //3.遍历所有的一级分类
                 for(var i = 0;i<this.subjectOneList.length;i++){
                   //4.获取每个一级分类
                   var oneSubject = this.subjectOneList[i];
                   //5.比较当前courseInfo里面一级分类id和所有的一级分类id
                   if(oneSubject.id === this.courseInfo.subjectParentId){
                     //6.获取一级分类下的所有二级分类
                        this.subjectTwoList = oneSubject.children
                   }
                 }
               }) 
               //初始化所有讲师
                    this.getTeacherList()
              })
            },
  }
}
</script>
<style scoped> 
.tinymce-container {   
  line-height: 29px;
}
</style>
