// pages/modal/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModal: false,
    position: null
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
  changePosition(e){
    let dataset = e.target.dataset;
    let position = dataset.position;
    this.setData({
      position,
      showModal:true
    });
  },
  cancleModal(){
    wx.showToast({
      icon: 'none',
      title: '点击了取消'
    })
    this.setData({
      showModal:false
    });
  },
  successModal(){
    wx.showToast({
      icon: 'none',
      title: '点击了确定'
    })
    this.setData({
      showModal: false
    });
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