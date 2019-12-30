// pages/getluck/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    prizeList: [{
      id: 1,
      value: 'Iphone1'
    }, {
      id: 2,
      value: 'Iphone2'
    }, {
      id: 3,
      value: 'Iphone3'
    }, {
      id: 4,
      value: 'Iphone5'
    }, {
      id: 5,
      value: 'Iphone5'
    }, {
      id: 6,
      value: 'Iphone6'
    }],
    colorList: ['#abc', '#ccc', '#afb', '#aec', '#cef','#dae'],
    prize: null
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },
  getPrize: function() {
    this.setData({
      prize: Math.ceil(Math.random() * 3)
    });
  },
  getPrizeEnd: function(e) {
    wx.showModal({
      title: '恭喜',
      content: `获得礼物${e.detail.prize.value}`,
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})