import React , {Component} from 'react'
import ListAdd from './ListAdd'
import {Route , Link , Switch} from 'dva/router'
import ShopCar from './ShopCar'
import Tab from './Tab'
export default class Test extends Component{
    render(){
        return <div>
            <Switch>
                <Route path="/test/listadd" component={ListAdd} />
                <Route path="/test/shopcar" component={ShopCar} />
                <Route path="/test/tab" component={Tab} />
            </Switch>
        </div>
    }
}