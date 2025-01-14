const app = getApp(), jim = require('../../utils/Jim.js'),
    allData = app.globalData, api = require('../../utils/api.js'),
    utils = require('../../utils/util.js'), ui = require('../../utils/Interface.js')
/**
 * 计算顶部高度
 */
function getNavHeight(that) {
    var query = wx.createSelectorQuery();//单位px；
    query.select('#nav').boundingClientRect(function (rect) {
        if (rect) {
            that.setData({
                NavHeight: rect.height + app.globalData.CustomBar
            })
        }
    }).exec();
}
Component({
    data: {
        TabCur: 0,
        scrollLeft: 0,
        news: {
            classNames: 'wux-animate--fadeInLeft',
            enter: true,
            exit: false,
            in: true,
        },
        special: {
            classNames: 'wux-animate--fadeInRight',
            enter: true,
            exit: false,
            in: false,
        },
    },
    pageLifetimes: {
        show() {
            if (typeof this.getTabBar === 'function' &&
                this.getTabBar()) {
                this.getTabBar().setData({
                    selected: 2,
                    msgNum: allData.msgNum
                })
                jim.setThat(this)
            }
        }
    },
    methods: {
        onLoad: function (options) {
            getNavHeight(this)
            app.setTitleWidth(this, true)
            !allData.CommunityClass ? Initialization(this) : null
            this.setData({ is_super: allData.is_super })
        },

        /**
         * 顶部TAB被点击事件
         * @param {*} e 
         */
        tabSelect(e) {
            var id = e.currentTarget.dataset.id,
                news = 'news.in',
                special = 'special.in',
                show = id == '0' ? true : false,
                noshow = id == '1' ? true : false
            this.setData({
                TabCur: id,
                scrollLeft: (e.currentTarget.dataset.id - 1) * 60,
                [news]: show,
                [special]: noshow
            })
        },

        /**
         * 跳转专题页面
         * @param {*} e 
         */
        toSpecial(e) {
            var title = e.currentTarget.dataset.title,
                id = e.currentTarget.dataset.id
            wx.navigateTo({ url: ui.page.forum_special + "?title=" + title + "&id=" + id })
        },

        call(e) {
            wx.makePhoneCall({
                phoneNumber: e.currentTarget.dataset.ephone
            })
        },

        chat(e) {
            const id = e.currentTarget.dataset.id, pic = e.currentTarget.dataset.pic
            allData.chatName = id
            wx.navigateTo({ url: ui.page.chat_ui + "?pic=" + pic })
        },


        /**
         * 获取帖子列表
         * @param {*} that 
         */
        getCommunity() {
            var that = this
            utils.GET('community', (e) => {
                // console.log(e)
                e.status == 0 ? that.setData({
                    new_list: e.data
                }) : that.setData({ new_list: 'ErrorNetwork' }) &
                    ui.showToast('错误:' + e.msg, 1)
            }, { sortby: 'time', order: 'desc' })
        },

        send() {
            wx.navigateTo({ url: ui.page.release })
        }
    }
})

/**
 * 初始化
 * @param {*} that 
 */
function Initialization(that) {
    wx.showLoading({
        title: '加载中',
        mask: true,
    })
    utils.GET('getCommunity_class', (res) => {
        res.status == 0 ? that.setData({
            sp_list: res.data
        }) : that.setData({ sp_list: 'ErrorNetwork' }) &
            ui.showToast('错误:' + res.msg, 1)
        that.getCommunity()
    })
}