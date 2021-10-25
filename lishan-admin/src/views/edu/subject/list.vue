<template>
  <div class="app-container">
    <el-input v-model="filterText" placeholder="Filter keyword" style="margin-bottom:30px;" />

    <el-tree
      ref="tree2"
      :data="data2"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
    />

  </div>
</template>

<script>
import subject from "@/api/edu/subject.js"
export default {

  data() {
    return {
      filterText: '',
      data2: [],//返回所有分类数据
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },

  created(){
      this.getAllSubjectList()
  },

  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val)
    }
  },

  methods: {
      getAllSubjectList(){
        subject.getSubjectList()
        .then(res =>{
            this.data2 = res.data.list
        })
        .catch(error =>{

        })
      },
    filterNode(value, data) {
      if (!value) 
      return true
      return data.title.toLowerCase().indexOf(value) !== -1
    }
  }
}
</script>

