// component/modal/modal.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    // 是否自定义头
    customTitle: {
      type: Boolean,
      value: false
    },
    // 头部文案
    titleText: {
      type: String,
      value: '请传入标题'
    },
    // 是否自定义底部
    customFooter: {
      type: Boolean,
      value: false
    },
    // 取消文案
    cancleText: {
      type: String,
      value: '取消'
    },
    // 确定文案
    okText: {
      type: String,
      value: '确定'
    },
    okStyle: {
      type: String,
      value: ''
    },
    show: {
      type: Boolean,
      value: false
    },
    // 弹框的位置
    position: {
      type: String,
      value: 'center'
    },
    // 是否展示关闭按钮
    showClose: {
      type: Boolean,
      value: false
    },
    // 点击遮罩是否可以关闭
    maskClose: {
      type: Boolean,
      value: false
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  /**
   * 组件的方法列表
   */
  methods: {
    cancleFn(e) {
      var dataset = e.currentTarget.dataset;
      var maskClose = this.data.maskClose;
      if (dataset.dom == 'mask' && !maskClose){
        return
      }
      this.triggerEvent('cancleFn', e);
    },
    okFn(e) {
      this.triggerEvent('okFn', e);
    },
    // 取消冒泡
    bubbleFn(e){
    }
  }
})
