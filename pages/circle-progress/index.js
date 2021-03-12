// pages/circle-progress/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: 'huanxing',
    open: false,
    config: {
      'huanxing': {
        startDrow: true,
        percentage: 0.6,
      },
      'fenshu': {
        startDrow: true,
        percentage: 0.8,
        startAngle: -1.25,
        endAngle: 0.25
      },
      'banyuan': {
        startDrow: true,
        percentage: 1,
        startAngle: 0,
        endAngle: 1
      }
    },
    currentConfig: {
      startDrow: true,
      percentage: 0.6
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  open(){
    this.setData({
      open: true
    })
  },
  changeType(e){
    let dataset = e.target.dataset;
    let type = dataset.type;
    let currentConfig = this.data.config[type];
    this.setData({
      currentConfig,
      type
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})