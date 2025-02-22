import {combineReducers} from 'redux-immutable'
import { reducer as loginReducer } from 'pages/login/store/index.js'
import { reducer as homeReducer } from 'pages/home/store/index.js'
import { reducer as userReducer } from 'pages/user/store/index.js'
import { reducer as categoryReducer } from 'pages/category/store/index.js'
import { reducer as productReducer } from 'pages/product/store/index.js'
import { reducer as orderReducer } from 'pages/order/store/index.js'
import { reducer as adReducer } from 'pages/ad/store/index.js'

export default combineReducers({
    login:loginReducer,
    home:homeReducer,
    user:userReducer,
    category:categoryReducer,
    product:productReducer,
    order:orderReducer,
    ad:adReducer,
})
