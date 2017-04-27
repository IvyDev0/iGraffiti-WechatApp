//main.js
//获取应用实例
var app = getApp()
Page({
  data: {
    chooseimagePaths: '',
    showActionsSheet: false,
    actionSheetItems: [
      { bindtap: 'camera', txt: '拍照获取图片' },
      { bindtap: 'photoalbum', txt: '从相册中选择图片' }
    ]
  },
  //事件处理函数
  chooseimage: function () {
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
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success: function (res) {
        let paths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://www.pihuataotao.cn/applet/album/upload',
          filePath: paths[0],
          name: 'image',
          header: {
            "Content-Type": "multipart/form-data"
          }, // 设置请求的 header
          // formData: {}, // HTTP 请求中其他额外的 form data
          success: function (res) {
            // success
            wx.downloadFile({
              url: "https://www.pihuataotao.cn/output.jpg",
              // type: 'image', // 下载资源的类型，用于客户端识别处理，有效值：image/audio/video
              // header: {}, // 设置请求的 header
              success: function (res) {
                // success
                _this.setData({
                  chooseimagePaths: res.tempFilePath
                })
              },
              fail: function (res) {
                // fail
              },
              complete: function (res) {
                // complete
              }
            })
          },
          fail: function (res) {
            // fail
            console.log('fail', res);
          },
          complete: function (res) {
            // complete
            console.log("3");
          }
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
      sizeType: ['original', 'compressed'],
      sourceType: ['album'],
      success: function (res) {
        let paths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://www.pihuataotao.cn/applet/album/upload',
          filePath: paths[0],
          name: 'image',
          header: {
            "Content-Type": "multipart/form-data"
          }, // 设置请求的 header
          // formData: {}, // HTTP 请求中其他额外的 form data
          success: function (res) {
            // success
            console.log("1");
            wx.downloadFile({
              url: "https://www.pihuataotao.cn/output.jpg",
              // type: 'image', // 下载资源的类型，用于客户端识别处理，有效值：image/audio/video
              // header: {}, // 设置请求的 header
              success: function (res) {
                // success
                _this.setData({
                  chooseimagePaths: res.tempFilePath
                })
              },
              fail: function (res) {
                // fail
              },
              complete: function (res) {
                // complete
              }
            })
          },
          fail: function (res) {
            // fail
            console.log('fail', res);
          },
          complete: function (res) {
            // complete
            console.log("3");
          }
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