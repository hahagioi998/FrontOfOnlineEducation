<template>
  <div class="app-container">
    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="marginbottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="提交审核"/>
    </el-steps> 
    <el-button type="text" @click="dialogChapterFormVisible = true">添加章节</el-button>
    <!-- 章节 -->
<ul class="chanpterList">
    <li
        v-for="chapter in chapterVideoList"
        :key="chapter.id">
        <p>
            {{ chapter.title }}
            <span class="acts">
                <el-button @click="openVideo(chapter.id)" type="text">添加课时</el-button>
                <el-button style="" @click="openEditChapter(chapter.id)" type="text">编辑</el-button>
                <el-button @click="deleteChapter(chapter.id)" type="text">删除</el-button>
            </span>
        </p>
        <!-- 视频 -->
        <ul class="chanpterList videoList">
            <li
                v-for="video in chapter.children" :key="video.id">
                <p>{{ video.title }}
                    <span class="acts">
                      <el-button type="text" @click="openEditVideo(video.id)">编辑</el-button>
                      <el-button type="text" @click="deleteVideo(video.id)">删除</el-button>
                    </span>
                </p>
            </li>
        </ul>     
        </li>
</ul> 
<div>
    <el-button @click="previous">上一步</el-button>
    <el-button :disabled="saveBtnDisabled" type="primary" @click="next">
      下一步
    </el-button> 
</div>
<!-- 添加和修改章节表单 -->
<el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
    <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
            <el-input v-model="chapter.title"/>
        </el-form-item>
        <el-form-item label="章节排序">
            <el-input-number v-model="chapter.sort" :min="0" controlsposition="right"/>         
        </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
    </div>
</el-dialog>

<!-- 添加和修改课时表单 -->
<el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
  <el-form :model="video" label-width="120px">
    <el-form-item label="课时标题">
      <el-input v-model="video.title"/>
    </el-form-item>
    <el-form-item label="课时排序">
      <el-input-number v-model="video.sort" :min="0" controlsposition="right"/>
    </el-form-item>
    <el-form-item label="是否免费">
      <el-radio-group v-model="video.isFree">
        <el-radio :label="true" >免费</el-radio>
        <el-radio :label="false">默认</el-radio>
      </el-radio-group>
    </el-form-item>
<el-form-item label="上传视频">
    <el-upload
           :on-success="handleVodUploadSuccess"
           :on-remove="handleVodRemove"
           :before-remove="beforeVodRemove"
           :on-exceed="handleUploadExceed"
           :file-list="fileList"
           :action="BASE_API+'/eduVod/video/uploadALiYunVideo'"
           :limit="1"            
           class="upload-demo">
    <el-button size="small" type="primary">上传视频</el-button>
    <el-tooltip placement="right-end">         
      <div slot="content">最大支持1G，<br>             
            支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
            GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
            MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
            SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
        <i class="el-icon-question"/>
    </el-tooltip>
    </el-upload>
</el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
    <el-button :disabled="saveVideoBtnDisabled" type="primary" 
      @click="saveOrUpdateVideo">确 定</el-button>
  </div>
</el-dialog>
 </div>
</template> 
<script> 
import chapter from '@/api/edu/chapter.js'
import video from '@/api/edu/video.js'
export default {   
    data() {     
        return {       
            saveBtnDisabled: false, // 保存按钮是否禁用
            chapterVideoList: [],
            courseId: '',
            chapter:{
                title: '',
                sort: 0
            },
            video:{
                title: '',
                sort: 0,
                isFree: 0,
                videoSourceId:'',
                videoOriginalName:''
            },
            fileList: [],//上传文件列表
            BASE_API: process.env.BASE_API, // 接口API地址
            dialogChapterFormVisible:false,
            dialogVideoFormVisible:false
    }  
     },   
     created() {
       if(this.$route.params && this.$route.params.id){
         this.courseId = this.$route.params.id
          this.getChapterVideo()
       }     
  },   
  methods: {
 //=========================小节操作========================================
    //上传视频成功调用的方法
    handleVodUploadSuccess(response, file, fileList){
        this.video.videoSourceId = response.data.videoId
        this.video.video.videoOriginalName = file.name
    },

    //点击确定调用的方法
    handleVodRemove(){
        //调用后台删除视频的接口
        video.deleteVideo(this.video.videoSourceId)
        .then(res =>{
          this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.fileList = [],
                this.video.videoSourceId = '',
                this.video.videoOriginalName = ''
        })
    },
    //点击x调用的方法
    beforeVodRemove(file, fileList){
      return this.$confirm(`确定移除 ${ file.name }？`);
    },
     //
    handleUploadExceed(){
      this.$message.warning('想要重新上传视频，请先删除已上传的视频')
    },
      openVideo(chapterId){
        this.video = {
                title: '',
                sort: 0,
                isFree: 0,
                videoSourceId:''
        }
        //弹框
        this.dialogVideoFormVisible = true
        //设置章节id
        this.video.chapterId = chapterId
      },
      openEditVideo(videoId){
        this.dialogVideoFormVisible = true   
        video.getVideoInfoById(videoId)
        .then(res => {     
          this.video = res.data.eduVideo
       })
      },
      saveOrUpdateVideo(){
          if(this.video.id){
            this.updateVideo()
          }else{
            this.addVideo()
          }
      },
      //添加课时
      addVideo(){
        //设置课程id
        this.video.courseId = this.courseId
        if(this.video.title == ""){
                this.$message({
                    type: 'error',
                    message: '请输入课时标题！'
                });
          }else{
            video.addVideo(this.video)
            .then(res =>{
              //关闭弹框
              this.dialogVideoFormVisible = false
              this.$message({
                        type: 'success',
                        message: '添加课时信息成功!'
                    });
              //刷新课程列表
              this.getChapterVideo()
            })
          }
      },
      //更新课时信息
      updateVideo(){
          if(this.video.title == ''){
             this.$message({
                    type: 'error',
                    message: '请输入课时标题！'
                });
          }else{
               video.updateVideo(this.video)
        .then(res =>{
             //关闭弹框
          this.dialogVideoFormVisible = false
          this.$message({
                    type: 'success',
                    message: '修改课时信息成功!'
                });
           //刷新课程列表
           this.getChapterVideo()
        })
          }
      },
      //通过id删除课时
      deleteVideo(videoId){
           this.$confirm('将永久删除此课时, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //关闭弹框
          this.dialogVideoFormVisible = false
          video.deleteVideoById(videoId)
          .then(response =>{//删除成功
              this.$message({
              type: 'success',
              message: '删除成功!'
          });
          this.chapter = {
                  title: '',
                  sort: 0,
                  isFree: 0,
                  videoSourceId:'',
                  
                      }
          //刷新课程列表
           this.getChapterVideo()
          })
          .error(error =>{

          })
         
        })
      },
//==========================章节操作======================================== 
      saveOrUpdate(){
          //  判断添加 or 修改
          if(this.chapter.id){
            this.updateChapterInfo()
          }else{
            this.addChapterInfo()
          }
      }, 
      //修改章节
      openEditChapter(chapterId){
        //弹框
        this.dialogChapterFormVisible = true
        chapter.getChapterById(chapterId)
        .then(res =>{
          this.chapter = res.data.eduChapter
        })
        this.chapter = {
                   title: '',
                   sort: 0,
            }   
      },
      //增加章节
      addChapterInfo(){
        this.chapter.courseId = this.courseId
        if(this.chapter.title == ""){
                this.$message({
                    type: 'error',
                    message: '请输入章节标题！'
                });
          }else{
              chapter.addChapter(this.chapter)
              .then(res =>{
                    //关闭弹框
                this.dialogChapterFormVisible = false
                this.$message({
                          type: 'success',
                          message: '添加章节信息成功!'
                      });
                //刷新课程列表
                this.getChapterVideo()
              })
          }
      },
      //修改章节信息
      updateChapterInfo(){
        if(this.chapter.title == ''){
             this.$message({
                    type: 'error',
                    message: '请输入章节名称！'
                });
          }else{
               chapter.updateChapter(this.chapter)
        .then(res =>{
             //关闭弹框
          this.dialogChapterFormVisible = false
          this.$message({
                    type: 'success',
                    message: '修改章节信息成功!'
                });
           //刷新课程列表
           this.getChapterVideo()
        })
          }
      },
      //删除章节
      deleteChapter(chapterId){
         this.$confirm('将永久删除此章节, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //关闭弹框
          this.dialogChapterFormVisible = false
          chapter.deleteChapter(chapterId)
          .then(response =>{//删除成功
              this.$message({
              type: 'success',
              message: '删除成功!'
          });
          //刷新课程列表
           this.getChapterVideo()
          })
          .error(error =>{

          })
         
        })
      },
      getChapterVideo(){
        chapter.getAllChapterVideo(this.courseId)
        .then(res =>{
          this.chapterVideoList = res.data.allChapterVideo
        })
      },
       next() {       
               
        this.$router.push({ path: '/course/publish/'+this.courseId })
    },   
      previous() {       
          this.$router.push({ path: '/course/info/'+this.courseId })
    },    
     
  }
}
</script>
<style scoped> 
.chanpterList{     
  position: relative;     
  list-style: none;     
  margin: 0;     
  padding: 0;
}
.chanpterList li{
	  position: relative;
}
.chanpterList p{   
  float: left;   
  font-size: 20px;   
  margin: 10px 0;   
  padding: 10px;   
  height: 70px;   
  line-height: 50px;   
  width: 100%;
  border: 1px solid #DDD;
}
.chanpterList .acts {     
  float: right;     
  font-size: 14px; }
.videoList{   
  padding-left: 50px;
}
.videoList p{   
  float: left;   
  font-size: 14px;  
   margin: 10px 0;   
   padding: 10px;   
   height: 50px;   
   line-height: 30px;  
    width: 100%;
  border: 1px dotted #DDD; 
  }
</style>