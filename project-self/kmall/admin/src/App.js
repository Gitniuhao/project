//组件化：就是页面的一部分，把页面的一部分进行组件化写在另一个页面，然后导出，便于维护修改
//引入react和属于react的Compontent函数
import React,{Component,Fragment} from 'react'
import Login from 'pages/login'
import Home from 'pages/home'
import Err from 'common/err'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	Redirect
} from 'react-router-dom'
import { getUsername } from 'util'

//子组件的集合组件
class App extends Component{	
	render(){
		const HomeRoute = ({component:Component,...rest})=>{//自定义首页路由
			return (
					<Route 
						{...rest}
						render ={(props)=>{//当有登录信息时就渲染首页组件，没有则跳转到登录页面
							return getUsername() ? <Component /> : <Redirect to='/login' /> 
						}}
					/>
			)
		}
		const LoginRoute = ({component:Component,...rest})=>{//自定义登录路由
			return (
					<Route 
						{...rest}
						render ={(props)=>{//当有登录信息时就自动跳转首页组件，没有则渲染登录组件
							return getUsername() ? <Redirect to= '/' /> : <Component />
						}}
					/>
				)
		}
		return(
			<Router>
				<div className ='App'>
					<Switch>
						<HomeRoute exact path='/'  component={Home} />				 
						<HomeRoute exact path='/user'  component={Home} />				 
						<LoginRoute path='/login'  component={Login} />
						<Route component={Err} />				 
					</Switch>
				</div>
			</Router>
		) 
	}
}	

export default App;
