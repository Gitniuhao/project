require('pages/common')
var _nav = require('pages/common/nav')//引进导航共通样式
require('pages/common/footer')//引进底部共通样式
require('pages/common/search')//引进搜索共通样式
require('./index.css')
var api = require('api')
var _util = require('util')
var _modal = require('./modal.js')
require('util/pagination')
var shippingTpl = require('./shipping.tpl')
var productTpl = require('./product.tpl')
var modalTpl = require('./modal.tpl')

var page = {
	init:function(){
		this.$shippingBox = $('.shipping-box')
		this.$productBox = $('.product-box')
		this.$modalBox = $('.modal-box')
		//绑定事件
		this.bindEvent()
		this.loadShippingBox()		
		this.loadProductBox()
	},
	bindEvent:function(){
		var _this = this
		//监听新增地址后获取最新数据,自动渲染最新数据
        this.$shippingBox.on('get-shippings',function(ev,shippings){
            _this.renderShippingList(shippings)
        })

        //1.弹出添加地址面板
		this.$shippingBox.on('click','.shipping-add',function(){
			_modal.show()//点击加号加载地址框
		})
		//2、处理删除地址
		this.$shippingBox.on('click','.shipping-delete',function(){
			if(_util.showConfirm('您确定要删除这条地址嘛？')){
				var shippingId = $(this).parents('.shipping-item').data('shipping-id')
				api.deleteShipping({
					data:{
						id:shippingId
					},
					success:function(result){
						const shippings = result.data
						_this.renderShippingList(shippings)
					},
					error:function(msg){
						_util.showErrMsg(msg)
					}
				})
			}
		})
		 
	},
	renderShippingList:function(shippings){//抽取渲染地址列表的逻辑
		var html = _util.render(shippingTpl,{
			shippings:shippings
		})
		this.$shippingBox.html(html)
	},
	loadShippingBox:function(){
		var _this = this
		api.getShippingsList({
			success:function(result){
				const shippings = result.data
				// console.log(shippings)
				// var html = _util.render(shippingTpl,{
				// 	shippings:shippings
				// })
				// _this.$shippingBox.html(html)
				_this.renderShippingList(shippings)
			}
		})
	},
	loadProductBox:function(){//加载订单商品清单
		var _this = this
		api.getOrderProducts({
			success:function(result){
				const data = result.data
				if(data.cartList.length > 0){
					var html = _util.render(productTpl,data)
					_this.$productBox.html(html)
				}else{
					_this.$productBox.html('<p class="empty-message">您的商品清单空空如也.....</p>')
				}				
			}
		})
	}
}

;(function($){
	page.init()
})(jQuery);