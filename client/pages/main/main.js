//main.js
//获取应用实例
var app = getApp()
Page({
  data: {
    chooseimagePaths: '',
    showActionsSheet: false,
    actionSheetItems:[
      {bindtap:'camera',txt:'拍照获取图片'},
      {bindtap:'photoalbum',txt:'从相册中选择图片'}
    ]
  },
  //事件处理函数
  chooseimage: function() {
   this.setData({ 
     showActionsSheet: true
   })
  },
  hideActionSheet() {
    this.setData({
      showActionsSheet: false
    })
  },
  camera: function () {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['camera'],
      success: function(res) {
        _this.setData({
            chooseimagePaths:res.tempFilePaths
        })
      }
    }),    
    this.setData({
      showActionsSheet: false
    })
  },
  photoalbum: function () {
    var _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album'],
      success: function(res) {
        _this.setData({
            chooseimagePaths:res.tempFilePaths
        })
      }
    }),    
    this.setData({
      showActionsSheet: false
    })
  },
  onLoad: function () {
  }
})