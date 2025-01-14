const app = getApp(), allData = app.globalData, jim = require('../../utils/Jim.js'),ui = require('../../utils/Interface.js')
var id;
Component({
  data: {
    ModalShow: false,
  },
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3,
          msgNum: 0
        })
        allData.msgNum = 0
        jim.setThat(this)
      }
    }
  },

  //处理事件
  methods: {
    onLoad: function (options) {
      app.setTitleWidth(this,'消息')
      allData.gthat = this
      this.setData({
        messageList: allData.messageList ? allData.messageList:null,
        is_super: allData.is_super
      })
    },

    refreshData(e){
      jim.getConversation(this)
    },

    tabSelect(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 1) * 60
      })
    },

    toChatUI(e) {
      allData.chatName = e.currentTarget.dataset.name
      wx.navigateTo({url: ui.page.chat_ui})
    },

    showMenu(e){
      this.setData({
        ModalShow: true
      })
    },

    hideModal() {
      this.setData({
        ModalShow: false
      })
    },

    delete(e) {
      this.setData({
        ModalShow: false
      })
    },

    stick(e){
      this.setData({
        ModalShow: false
      })
    },

  }

})