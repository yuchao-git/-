// components/tree/index.js

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    treeData: {
      type: Object,
      value: {}
    },
    open: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  ready(){

  },
  /**
   * 组件的方法列表
   */
  methods: {
    switchTree(e){
      let key = e.target.dataset.key;
      let { treeData } = this.data;
      treeData[key].treeOpen = !treeData[key].treeOpen;
      this.setData({
        treeData
      })
    }
  }
})
