import React from 'react'
import {
    BrowserRouter as Router , Route , Switch 
} from 'dva/router'
import Test from './pages/Test'
import Main from './pages/Main'
import Login from './pages/Login'
import UserManger from './pages/UserManger'
function RootRouter(){
    return <Router>
        <Switch>
            <Route path="/test" component={Test}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/main" component={Main}></Route>
            <Route path="/usermanger" component={UserManger}></Route>
        </Switch>
    </Router>
}
export default RootRouter;