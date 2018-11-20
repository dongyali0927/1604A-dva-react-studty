import React , {Component} from 'react'
import {
    Route , Switch
} from 'dva/router'
import Home from '../Home'
import Detail from '../Detail'
import Submit from '../Submit'
import Computed from '../Computed'
class Main extends Component{
    render(){
        return <div>
            <Switch>
                <Route path="/main/home" component={Home} />
                <Route path="/main/detail" component={Detail} />
                <Route path="/main/submit" component={Submit} />
                <Route path="/main/computed" component={Computed} />
            </Switch>
        </div>
    }
}
export default Main;