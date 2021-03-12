// component/costom-head/costom-head.js
var App = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
  },
  ready(){
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        if (!App.globalData) {
          App.globalData = {}
        }
        if (res.model.indexOf('iPhone') !== -1) {
          App.globalData.titleBarHeight = 44
        } else {
          App.globalData.titleBarHeight = 48
        }
        App.globalData.statusBarHeight = res.statusBarHeight
        that.setData({
          statusBarHeight: App.globalData.statusBarHeight,
          titleBarHeight: App.globalData.titleBarHeight
        });

        that.setData({
          topHeight: that.data.titleBarHeight + that.data.statusBarHeight
        });
        App.globalData.homeTopHeight = that.data.titleBarHeight + that.data.statusBarHeight;

        that.setData({
          navHeight: App.globalData.homeTopHeight
        });
        console.log(App.globalData.homeTopHeight)
      },
      failure() {
        that.setData({
          statusBarHeight: 0,
          titleBarHeight: 0
        });
      }
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
  }
})
