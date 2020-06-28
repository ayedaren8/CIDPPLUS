// pages/page/page.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: "",
        textBody: ""

    },
    /**
     * 生命周期函数--监听页面加载
     */
    start: function() {
        let textBody
        switch (this.data.title) {
            case "隐私政策":
                textBody = [{
                    title: "",
                    body: "CIDPPLUS尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，CIDPPLUS会按照本隐私权政策的规定使用和披露您的个人信息。但CIDPPLUS将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，CIDPPLUS不会将这些信息对外披露或向第三方提供。CIDPPLUS会不时更新本隐私权政策。 您在同意CIDPPLUS服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于CIDPPLUS服务使用协议不可分割的一部分",
                    note: ""
                }, {
                    title: "1. 适用范围",
                    body: "a) 在为提供您所要求的产品和服务，而必须和第三方分享您的个人信息；",
                    note: ""
                }, {
                    title: "",
                    body: "b)根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；",
                    note: ""
                }, {
                    title: "",
                    body: "c) 如您出现违反中国有关法律、法规或者CIDPPLUS服务协议或相关规则的情况，需要向第三方披露；",
                    note: ""
                }, {
                    title: "2. 信息使用",
                    body: "a) CIDPPLUS不会向任何无关第三方提供、出售、出租、分享或交易您的个人信息，除非事先得到您的许可，或该第三方和CIDPPLUS（含CIDPPLUS关联公司）单独或共同为您提供服务，且在该服务结束后，其将被禁止访问包括其以前能够访问的所有这些资料。",
                    note: ""
                }, {
                    title: "3. 信息存储和交换",
                    body: "a) 本程序在未经您同意时，不会在服务器端存储您的任何个人信息。",
                    note: ""
                }, {
                    title: "4. 信息安全",
                    body: "a) 请勿将您的学号密码透露给其他组织或机构,因您个人原因造成的信息安全问题，本程序概不负责",
                    note: ""
                }, ]
                break;
            case "使用说明":
                textBody = [{
                    title: "",
                    body: "CIDPPLUS，以下简称本程序，是一款由Ayedaren（啊叶大人）独自开发的微信小程序，采用中间服务器ayedaren.cn利用python抓取数据，Django作为服务框架，免去了在web端的繁琐操作，能力有限，bug难免，此文档描述您可能遇见的问题以及解决方案",
                    note: ""
                }, {
                    title: "1.登录",
                    body: "在登录界面请务必输入您的学号，以及办事大厅密码，如提示错误请您务必检查密码是否正确。",
                    note: ""
                }, {
                    title: "2.验证码",
                    body: "在您输入密码提示错误以后，你的账户会被防灾科技学院网上办事大厅要求携带验证码登录，由于本应用采用爬虫形式，暂无法处理验证码，请您在办事大厅正常登录后使用本程序",
                    note: ""
                }, {
                    title: "3.数据更新问题",
                    body: "您的数据在一次登录后会被缓存到本地，重新登录将会删除所有缓存，以获取到最新的数据",
                    note: ""
                }, {
                    title: "4.清除单项缓存",
                    body: "您可以选择清除单项缓存，以更新单项数据，且不影响程序加载速度",
                    note: ""
                }, {
                    title: "5.退出后清除缓存",
                    body: "此功能默认关闭，以节省服务器带宽提高程序加载速度，但数据更新可能不及时，您可以打开此功能,及时获取最新数据，但可能需要更长的加载时长。",
                    note: ""
                }, {
                    title: "5.其他问题",
                    body: "如您在使用过程中遇到了其他问题，请联系我，我的QQ：1783580635、微信：heyyeguoqing、微博：啊叶大人AYEDAREN、公众号：啊叶大人",
                    note: ""
                }, ]
                break;
            case "版本说明":
                textBody = [{
                    title: "2020/3/4 CIDPPLUS beat1.0",
                    body: "第一次公测",
                    note: ""
                }, {
                    title: "2020/3/15 CIDPPLUS beat1.1",
                    body: "bug修复，修复了部分同学课表显示不全的问题",
                    note: ""
                }, {
                    title: "2020/3/21 CIDPPLUS beat1.2",
                    body: "课表优化，加入课表详情弹出",
                    note: ""
                }, {
                    title: "2020/3/25 CIDPPLUS beat2.0",
                    body: "1.适配IPhoneX、XS、11等机型\n2.开学日期由2月24日更改为3月2日\n3.更新间隔周计算\n",
                    note: ""
                }, {
                    title: "2020/3/26 CIDPPLUS beat2.1",
                    body: "1.加入下拉刷新\n2.优化了网络请求\n3.修复因网络繁忙造成的数据丢失现象\n",
                    note: ""
                },{
                    title: "2020/3/27 CIDPPLUS beat2.2",
                    body: "1.增加了意见与反馈模块\n2.修复IOS端页面X轴溢出问题\n3.接入客服会话",
                    note: ""
                  }, {
                    title: "2020/5/6 CIDPPLUS beat3.0",
                    body: "1.加入校庆头像页制作\n2.关闭非必要页面的下拉刷新",
                    note: ""
                  },
                  {
                    title: "2020/5/29 CIDPPLUS beat3.1",
                    body: "1.修复了IOS端,下拉刷新时截面卡顿问题",
                    note: ""
                  }]
                break;
            case "关于作者":
                textBody = [{
                    title: "概况",
                    body: "AYEDAREN(啊叶大人)，叶国庆，防灾科技学院信息工程学院2017级学生，曾任防灾科技学院电视台台长，第十一届首都高校传媒联盟视频部部长。",
                    note: ""
                }, {
                    title: "个人IP探索者",
                    body: "AYEDAREN旗下拥有网站ayedaren.cn,微信公众号：啊叶大人、哔哩哔哩非全职UP、摄影设计爱好者，曾设计防灾科技学院信息工程学院、应急管理学院、体育运动队LOGO。",
                    note: ""
                }, {
                    title: "项目开源地址",
                    body: "https://github.com/ayedaren8/CIDPPLUS",
                    note: ""
                }, {
                    title: "联系我",
                    body: "QQ:1783580635  微信：heyyeguoqing",
                    note: ""
                }, ]
                break;
            case "实验室功能":
                textBody = [{
                    title: "生成成绩海报",
                    body: "进度：正在优化中",
                    note: ""
                }, {
                    title: "空教室查询",
                    body: "进度：正在优化中",
                    note: ""
                }, {
                    title: "校内碰撞",
                    body: "进度：正在构思中",
                    note: ""
                }, {
                    title: "",
                    body: "",
                    note: ""
                }, ]
                break;
            case "BUG反馈":
                textBody = [{
                    title: "如果你遇到了困难，请联系我，我很乐意听见你的意见！",
                    body: "",
                    note: ""
                }, {
                    title: "QQ",
                    body: "1783580635",
                    note: ""
                }, {
                    title: "微信",
                    body: "heyyeguoqing",
                    note: ""
                }, {
                    title: "",
                    body: "",
                    note: ""
                }, ]
                break;
            default:
                break;
        }
        this.setData({
            textBody: textBody
        })
    },

    onLoad: function (options) {
        console.log(options);
        this.setData({
            title: options.title
        })
        this.start()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

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