<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程详情 开始 -->
    <section class="container">
      <section class="path-wrap txtOf hLh30">
	        <a href="#" title class="c-999 fsize14">首页</a>
        \
        <a href="#" title class="c-999 fsize14">{{course.subjectLevelOne}}</a>
        \
        <span class="c-333 fsize14">{{course.subjectLevelTwo}}</span>       
        </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box" id="videoPlay">
            <img height="357px" :src="course.cover" :alt="course.title" class="dis c-v-pic">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{course.title}}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">￥{{course.price}}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲： {{course.teacherName}}&nbsp;&nbsp;&nbsp;</span>             
              </section>
            <section class="c-attr-mt of">
              <span class="ml10 vam">
                <em class="icon18 scIcon"></em>
                <a class="c-fff vam" title="收藏" href="#" >收藏</a>              
              </span>
            </section>
            <section v-if="isBuy || Number(course.price) === 0" class="c-attr-mt">
              <a :href="'player/'+video.videoSourceId" title="立即观看" class="comm-btn c-btn-3">立即观看</a>
            </section>
            <section v-else class="c-attr-mt">
              <a @click="createOrders()" :href="'orders/'+orderId" title="立即购买" class="comm-btn c-btn-3">立即购买</a>
            </section>           
            </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol ">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{course.buyCount}}</h6>
	              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{course.lessonNum}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{course.viewCount}}</h6>
              </aside>
            </li>           
            </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">               
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tabtitle">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">                 
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="course.description">
                       {{course.description}}
                      </p>
                    </section>
                  </div>
                </div>
            <!-- /课程介绍 -->
            <div class="mt50">
              <h6 class="c-g-content c-infor-title">
                <span>课程大纲</span>
              </h6>
              <section class="mt20">
                <div class="lh-menu-wrap">                       
                  <menu id="lh-menu" class="lh-menu mt10 mr10">
                    <ul>
                      <!-- 文件目录 -->
                      <li class="lh-menu-stair" v-for="chapter in chapterVideoList" :key="chapter.id">
                        <a href="javascript: void(0)" :title="chapter.title" class="current-1">
                          <em class="lh-menu-i-1 icon18 mr10"></em>{{chapter.title}}
                        </a>
                        <ol class="lh-menu-ol" style="display: block;">
                          <li class="lh-menu-second ml30" v-for="video in chapter.children" :key="video.id">
                            <a :href="'/player/'+video.videoSourceId" :title="video.title" target="_blank">
                              <span class="fr" >
                                <i class="free-icon vam mr10">免费试听</i>
                              </span>
                              <em class="lh-menu-i-2 icon16 mr5">&nbsp;</em>{{video.title}}
                            </a>
                          </li>
                        </ol>
                      </li>
                    </ul>
                  </menu>
                </div>
              </section>
            </div>
            <!-- /课程大纲 -->
          </article>
        </div>
      </section>
    </article>
    <aside class="fl col-3">
      <div class="i-box">
        <div>
          <section class="c-infor-tabTitle c-tab-title">
            <a title href="javascript:void(0)">主讲讲师</a>               
            </section>
          <section class="stud-act-list">                 
            <ul style="height: auto;">
              <li>
                <div class="u-face">
                  <a href="#">
                    <img :src="course.avatar" width="50" height="50" alt>                       
                    </a>                     
                    </div>
                <section class="hLh30 txtOf">
                  <a class="c-333 fsize16 fl" href="#">{{course.teacherName}}</a>
                </section>
                <section class="hLh20 txtOf">
                  <span class="c-999">{{course.intro}}</span>
                </section>                   
                </li>
            </ul>
          </section>
        </div>
      </div>
    </aside>
    <div class="clear"></div>
  </div>
</section>
<!-- /课程详情 结束 -->
  </div>
</template> 
<script>
import courseApi from '@/api/course'
import ordersApi from '@/api/order' 
export default {
  asyncData({params,error}){
    return {
      orderId: '',
      courseId: params.id
    }
  },
      data(){
        return{
            course:{},
            chapterVideoList:[],
            isBuy:false
        }
      },
      created() {
        this.initCourseInfo()
      },
      methods: {
        initCourseInfo(){
          courseApi.getBaseCourseInfo(this.courseId)
            .then(res =>{
                this.course = res.data.data.courseWebVo,
                this.chapterVideoList = res.data.data.chapterVideoList,
                this.courseId = params.id
                this.isBuy = res.data.data.isBuy
            }),
            ordersApi.getOrdersInfo(this.orderId)
            .then(res =>{
              this.orderId = res.data.data.orderNo
            })
        },
        //生成订单
        createOrders(){
          ordersApi.createOrder(this.courseId)
          .then(res =>{
              //获取返回的订单号
              //生成订单之后，跳转到支付页面
              this.$router.push({path:'/orders/'+res.data.data.orderNo})
          })
        }
      },
    };
</script>
