require('pages/common')//引进共通样式
require('pages/common/footer')//引进底部导航共通样式
require('pages/common/logo')//引进logo样式
var _util = require('util')
var api = require('api')

var formErr = {//将错误提示和清除方法抽取出来
	show:function(msg){
		$('.error-item').show()
		$('.error-item').find('.error-msg')
		.text(msg)
	},
	hide:function(){
		$('.error-item').hide()
		$('.error-item').find('.error-msg')
		.text('')
	}
}

var page ={
	init:function(){//初始化事件
		this.bindEvent()
	},
	bindEvent:function(){//绑定事件
		var _this = this
		$('#btn-submit').on('click',function(){//为按钮绑定提交事件
			_this.submit()
		}),
		$('.form').on('keyup',function(ev){//为enter键绑定提交事件
			if(ev.keyCode == 13){
				_this.submit()
			}
		})	
	},
	submit:function(){//构造提交事件
		//1、获取表单数据
		var formData ={
			username:$.trim($('[name = username]').val()),
			password:$.trim($('[name = password]').val())
		}
		// console.log(formData.username,formData.password)
		//2、验证数据合法性
		var formDataValidate = this.validate(formData)
		// console.log(formDataValidate)
		if(formDataValidate.status){//3、验证通过，消除错误提示，发送ajax
			formErr.hide()//消除错误提示
			//开始发送ajax
			api.login({
				data:formData,
				success:function(result){//登录成功后的操作,如果登陆前在某个页面，后面加上页面所处的地址，登录成功后直接跳转到页面，没有的话默认在首页
					window.location.href = _util.getParamsFromUrl('redirect') || '/'
				},
				error:function(msg){//登录失败后的操作
					formErr.show(msg)
				}
			})
			// $.ajax({
			// 	url:'/sessions/users',
			// 	method:'post',
			// 	dataType:'json',
			// 	data:formData,
			// 	success:function(result){
			// 		if(result.code == 0){

			// 		}else{
			// 			formErr.show(err.message)//错误提示
			// 		}
			// 	},
			// 	error:function(err){
			// 		formErr.show('网络错误，请稍后重试~')//错误提示
			// 	}
			// })
		}else{//验证不通过，出现错误提示
			formErr.show(formDataValidate.msg)//错误提示
		}
	},
	validate:function(formData){
		var result ={
			status:false,
			msg:''
		}
		//用户名非空验证
		if(!_util.validate(formData.username,'required')){
			result.msg = '用户名不能为空'
			return result
		}
		//用户名合法验证
		if(!_util.validate(formData.username,'username')){
			result.msg = '用户名格式不正确'
			return result
		}
		//密码非空验证
		if(!_util.validate(formData.password,'required')){
			result.msg = '密码不能为空'
			return result
		}
		//密码合法验证
		if(!_util.validate(formData.password,'password')){
			result.msg = '密码是3-6位的任意字符~'
			return result
		}
		//以上验证全部通过，将status赋予true,然后再返回出去
		result.status = true;
		return result
	}
}


;(function($){
	page.init()
})(jQuery);