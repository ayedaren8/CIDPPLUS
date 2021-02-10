// const computedBehavior = require('miniprogram-computed')
const componentOptions = {
	// 组件选项
	options: {
		multipleSlots: true,
	},
	// behaviors: [computedBehavior],
	properties: {
		loginStatus: {
			type: Boolean,
			value: false
		},
		showProgress: {
			type: Boolean,
			value: false
		},
		currentSemesterWeek: Number,
		semesterWeekTotal: Number,
		username: String,
		studentID: Number
	},
	// 组件数据
	data: {
		isPageHidden: false, // 页面是否处于隐藏状态
	},
	computed: {
		percent: (data) => {
			if (Math.round((data.currentSemesterWeek / data.semesterWeekTotal) * 100) > 100) {
				return 100
			} else {
				return Math.round((data.currentSemesterWeek / data.semesterWeekTotal) * 100)
			}
			// 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
			// 这个函数的返回值会被设置到 this.data.sum 字段中
		},
	},
	// 数据监听器s
	observers: {},
	// 组件方法
	methods: {
		calculatePercent() {
			if (Math.round((this.data.currentSemesterWeek / this.data.semesterWeekTotal) * 100) > 100) {
				this.setData({
					percent: 100
				})
			} else {
				this.setData({
					percent: Math.round((this.data.currentSemesterWeek / this.data.semesterWeekTotal) * 100)
				})
			}
		},
		login() {
			var myEventDetail = {} // detail对象，提供给事件监听函数
			var myEventOption = {} // 触发事件的选项
			this.triggerEvent('handleLogin', myEventDetail, myEventOption)
		},
		loginOut() {
			var myEventDetail = {} // detail对象，提供给事件监听函数
			var myEventOption = {} // 触发事件的选项
			this.triggerEvent('handleLoginOut', myEventDetail, myEventOption)
		},
		init() {
			this.calculatePercent()
		},
	},
	// 组件生命周期
	lifetimes: {
		created() {
		},
		attached() {
			this.init()
		},
		ready() { },
		moved() { },
		detached() { },
	},
	definitionFilter() { },
	// 页面生命周期
	pageLifetimes: {
		// 页面被展示
		show() {
			const {
				isPageHidden
			} = this.data
			// show事件发生前，页面不是处于隐藏状态时
			if (!isPageHidden) {
				return
			}
			// 重新执行定时器等操作
		},
		// 页面被隐藏
		hide() {
			this.setData({
				isPageHidden: true,
			})
			// 清除定时器等操作
		},
		// 页面尺寸变化时
		resize() { },
	},
}

Component(componentOptions)