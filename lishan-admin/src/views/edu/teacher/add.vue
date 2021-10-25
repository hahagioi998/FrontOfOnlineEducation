<template>
  <div class="app-container">     
      讲师添加
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0" :max="2"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填             
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>           
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>       
        </el-form-item>
      <!-- 讲师头像：TODO -->  
      <!-- 讲师头像 -->
<el-form-item label="讲师头像">
    <!-- 头衔缩略图 -->
    <pan-thumb :image="String(teacher.avatar)"/>
    <!-- 文件上传按钮 -->
    <el-button type="primary" icon="el-icon-upload" 
      @click="imagecropperShow=true">更换头像     </el-button>
            <!--
        v-show：是否显示上传组件
        :key：类似于id，如果一个页面多个图片上传控件，可以做区分
        :url：后台上传的url地址
        @close：关闭上传组件
        @crop-upload-success：上传成功后的回调 -->
    <image-cropper 
                   v-show="imagecropperShow"
                   :width="300"
                   :height="300"
                   :key="imagecropperKey"
                   :url="BASE_API+'/eduOss/fileOss'"                    
                   field="file"                    
                   @close="close"
                   @crop-upload-success="cropSuccess"/>
</el-form-item>
     
      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" 
        @click="addOrUpdate">保存</el-button>       
      </el-form-item>
    </el-form>   
    </div>
</template>

<script>
import teacherApi from '@/api/edu/teacher'
import ImageCropper from '@/components/ImageCropper' 
import PanThumb from '@/components/PanThumb'
export default { //核心代码位置
  components: { ImageCropper, PanThumb },
  data() {   //定义变量和初始值
  return {
    teacher:{
      name:'',
      sort: 0,         
      level: 1,         
      career: '',         
      intro: '',         
      avatar: 'https://edu-lishan.oss-cn-beijing.aliyuncs.com/2021/10/14/2ca545aa70dd4e7992d0e689c4736839.png'
    },
    //上传弹框组件是否显示
    imagecropperShow:false,
    imagecropperKey:0,//上传组件key值
    BASE_API:process.env.BASE_API, // 接口API地址      
    saveBtnDisabled: false // 保存按钮是否禁用,
  }
    },
    created(){    //页面渲染之前执行，一般调用methods定义的方法
       this.init()
    },
    watch:{ //监听
      $route(to,from){
        this.init()
      }
    },
     methods: {    //创建具体的方法，调用xx.js定义的方法
     close(){     //关闭上传弹框的方法
        this.imagecropperShow = false;
        this.imagecropperKey = this.imagecropperKey+1
     },
     cropSuccess(data){ //上传成功的方法
        this.imagecropperShow = false;
        this.teacher.avatar=data.url
       this.imagecropperKey = this.imagecropperKey+1
     },
        init(){
            //判断路径是否携带id值
       if (this.$route.params && this.$route.params.id) {   
         //拿到路径的id值    
         const id = this.$route.params.id
         //调用根据id查询的方法       
         this.getInfo(id)
       }else{
         this.teacher = {}
       }
        },
        //根据id查询教师
        getInfo(id){
          teacherApi.getTeacherInfo(id)
          .then(response =>{
            //数据回显
              this.teacher = response.data.teacher;
        })
      },
        addOrUpdate(){
          //判断添加 or 修改
          if(this.teacher.id){
            this.updateTeacher()
          }else{
            this.addTeacher()
          }
        },

      updateTeacher(){
        this.$confirm('确认保存?', '提示',{
             confirmButtonText: '确定',
             cancelButtonText: '取消',
             type: 'warning'
        }).then(()=>{
          teacherApi.updateTeacherInfo(this.teacher)
          .then(response => {
               //提示信息
              this.$message({
              type: 'success',
              message: '修改成功!'
          });
            //路由跳转 回到列表
              this.$router.push({path:'/teacher/list'})
          })
        })
      },

       //添加讲师的方法
        addTeacher(){
          teacherApi.addTeacher(this.teacher)
          .then(response =>{//添加成功
              //提示信息
              this.$message({
              type: 'success',
              message: '添加成功!'
          });
              //回到列表
              this.$router.push({path:'/teacher/list'})
          })
        }
   }
}
</script>