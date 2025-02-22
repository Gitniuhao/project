const {mysql} = require('../qcloud.js')

module.exports = async (ctx)=>{
	const {openid} = ctx.request.body
	try{
		let add = 0;
		let mark = 0;
		let note = "清零";
		await mysql('records').insert({
			openid,
			add,
			mark,
			note
		})
		ctx.state.data = {
			code:0,
			msg:"success"
		}
	}catch(e){
		console.log("执行失败",e)
		ctx.state = {
			code:-1,
			data:{
			  msg:"清零失败"+e.sqlMessage
			}
		}
	}
}
