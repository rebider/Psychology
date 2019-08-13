const app = getApp(),
    api = require('../../utils/api.js'),
    utils = require('../../utils/util.js'),
    ui = require('../../utils/Interface.js')
Page({
    data: {
        StatusBar: app.globalData.StatusBar,
        CustomBar: app.globalData.CustomBar
    },
    onGetUserInfo: function(t) {
        var errMsg = t.detail.errMsg
        if (errMsg == 'getUserInfo:ok'){
            wx.setStorageSync("userInfo", t.detail.userInfo)
            wx.setStorageSync("userData", t.detail)
            app.globalData.name = t.detail.userInfo.nickName
            app.globalData.gender = t.detail.userInfo.gender
            wx.navigateBack({
                delta: 1,
            })
        }else{
            ui.showToast('请授权！')
        }
    }
});