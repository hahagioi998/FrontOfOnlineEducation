<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li>
                  <a title="全部" href="#">全部</a>
                </li>
                <li v-for="(subjectOne,index) in subjectNestedList" v-bind:key="index" :class="{active:oneIndex==index}">
                  <a :title="subjectOne.title" href="#" @click="searchOne(subjectOne.id,index)">{{subjectOne.title}}</a>
                </li>
	              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li v-for="(subjectTwo,index) in subSubjectList" :key="index" :class="{active:twoIndex==index}">
                  <a :title="subjectTwo.title" href="#" @click="searchTwo(subjectTwo.id,index)">{{subjectTwo.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
             <ol class="js-tap clearfix">
              <li :class="{'current bg-orange':buyCountSort!=''}">
                <a title="销量" href="javascript:void(0);" @click="searchBuyCount()">销量
                <span :class="{hide:buyCountSort==''}">↓</span>       
                </a>     
              </li>
            <li :class="{'current bg-orange':gmtCreateSort!=''}">
                <a title="最新" href="javascript:void(0);" @click="searchGmtCreate()">最新
                <span :class="{hide:gmtCreateSort==''}">↓</span>       
                </a>     
                </li>
            <li :class="{'current bg-orange':priceSort!=''}">
                <a title="价格" href="javascript:void(0);" @click="searchPrice()">价格&nbsp;
                <span :class="{hide:priceSort==''}">↓</span>       
                </a>     
                </li>
  </ol>
          </section>
	        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section class="no-data-wrap" v-if="data.total ==0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="items in data.records" :key="items.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="items.cover" 
                          class="img-responsive" :alt="items.title">
                    <div class="cc-mask">
                      <a :href="'/course/'+items.id" title="开始学习" class="comm-btn cbtn-1">开始学习</a>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <a :href="'/course/'+items.id" :title="items.title" class="course-title fsize18 c-333">{{items.title}}</a>
                  </h3>
                  <section class="mt10 hLh20 of">
                     <span class="fr jgTag bg-green" v-if="Number(items.price === 0)">
                        <i class="c-fff fsize12 f-fA" >免费</i>                       
                        </span>
                       <span class="fr jgTag bg-red" v-else>
                        <i class="c-fff fsize12 f-fA" >￥{{items.perice}}元</i>                       
                        </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{items.viewCount}}人学习</i>
                      |
                      <i class="c-999 f-fA">9634评论</i>
                    </span>
                  </section>
                </div>               
                </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
   <div class="paging">
    <!-- undisable这个class是否存在，取决于数据属性hasPrevious -->
    <a
      :class="{undisable: !data.hasPrevious}"       
      href="#"       
      title="首页"
      @click.prevent="gotoPage(1)">首</a>
    <a
      :class="{undisable: !data.hasPrevious}"      
       href="#"       
       title="前一页"
      @click.prevent="gotoPage(data.current-1)">&lt;</a>
    <a
      v-for="page in data.pages"       
      :key="page"
      :class="{current: data.current == page, undisable: data.current == page}"
      :title="'第'+page+'页'"       
      href="#"
      @click.prevent="gotoPage(page)">{{ page }}</a>
    <a
      :class="{undisable: !data.hasNext}"       
      href="#"       
      title="后一页"
      @click.prevent="gotoPage(data.current+1)">&gt;</a>
    <a
      :class="{undisable: !data.hasNext}"       
      href="#"       
      title="末页"
      @click.prevent="gotoPage(data.pages)">末</a>
    <div class="clear"/>
  </div>
</div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template> 
<script> 
import courseApi from '@/api/course'
export default {
  //核心代码位置
  data() {   //定义变量和初始值
  return {
    page:1,  //当前页     
    data:{}, //课程列表      
    subjectNestedList: [], // 一级分类列表       
    subSubjectList: [], // 二级分类列表       
    searchObj: {}, // 查询表单对象       
    oneIndex:-1,       
    twoIndex:-1,       
    buyCountSort:"",      
    gmtCreateSort:"",       
    priceSort:""
  }
    },
    created(){    //页面渲染之前执行，一般调用methods定义的方法
      this.gotoPage()
      this.initSubject()
    },
     methods: {    //创建具体的方法，调用xx.js定义的方法
      //1 查询第一页数据
      gotoPage(){
        courseApi.getCourseList(this.page,8,this.searchObj)
        .then(res =>{
          this.data = res.data.data
        })
      },
      //2 查询所有分类
      initSubject(){
        courseApi.getAllSubject()
        .then(res =>{
          this.subjectNestedList = res.data.data.list
        })
      },
      //一级分类
      searchOne(subjectParentId,index){
          
          this.oneIndex = index
          this.twoIndex = -1
          this.searchObj.subjectId =''
          this.subSubjectList = []

          this.searchObj.subjectParentId = subjectParentId
          this.gotoPage(1)
          for(let i =0;i<this.subjectNestedList.length;i++){
            var oneSubject = this.subjectNestedList[i]
            if(subjectParentId == oneSubject.id){
                 this.subSubjectList = oneSubject.children
            }
          }
      },
      //二级分类
      searchTwo(subjectId,index){
          
          this.twoIndex = index
          this.searchObj.subjectId = subjectId
          this.gotoPage(1)
      },
      //购买量查询
      searchBuyCount(){
          //为了让样式生效，设置对应变量值
          this.buyCountSort = "1";
          //设置其它值为空
          this.gmtCreateSort = '';
          this.priceSort = '';
          //把值赋值给searchObj
          this.searchObj.buyCountSort = this.buyCountSort;
          this.searchObj.gmtCreateSort = this.gmtCreateSort;       
          this.searchObj.priceSort = this.priceSort;       
          this.gotoPage(this.page)
      },
      //更新时间查询
      searchGmtCreate() {      
        this.buyCountSort = "";       
        this.gmtCreateSort = "1";      
        this.priceSort = "";
        this.searchObj.buyCountSort = this.buyCountSort;       
        this.searchObj.gmtCreateSort = this.gmtCreateSort;       
        this.searchObj.priceSort = this.priceSort;       
        this.gotoPage(this.page)
      },
      //价格查询
      searchPrice() {       
        this.buyCountSort = "";       
        this.gmtCreateSort = "";       
        this.priceSort = "1";
        this.searchObj.buyCountSort = this.buyCountSort;       
        this.searchObj.gmtCreateSort = this.gmtCreateSort;      
        this.searchObj.priceSort = this.priceSort;       
        this.gotoPage(this.page)
      },
      // searchAll(){
      //   this.searchObj.subjectId =''
      //   this.buyCountSort = "";       
      //   this.gmtCreateSort = "";       
      //   this.priceSort = "";
      //   this.gotoPage()
      // }
   }
};
</script>
<style scoped>
.active {
    background: #68cb9b;
  }   
.hide {     
    display: none;
  }   
  .show {     
    display: block;
  }
</style>
