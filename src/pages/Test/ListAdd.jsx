import React , {Component} from 'react'
import {connect} from 'dva'

class Input extends Component{
    state = {
        val:''
    }
    handleClick(val){
        this.props.addList(val);
        this.setState({val:''});
    }
    render(){
        let {val} = this.state;
        return <div>
            <input value={val} onChange={ev=>this.setState({val:ev.target.value})} type="text" />
            <input onClick={()=>this.handleClick(val)} type="button" value="提交"/>
        </div>
    }

}
class List extends Component{
    render(){
        let {list} = this.props;
        return <div>
            <ul>
                {
                    list && list.map((item,key)=>{
                        return <li key={key}>
                            {item.msg}
                            <span onClick={()=>this.delClick(key)}>X</span>
                        </li>
                    })
                }
            </ul>
        </div>
    }
    delClick(index){
        this.props.changeShow(true);
        this.props.setDelIndex(index);
    }
    componentDidMount(){
        this.props.initList();
    }
}
let alertStyle = {
    position:'absolute',
    left:0, top:0, right:0, bottom:0,
    backgroundColor:'rgba(0,0,0,.6)',
    textAlign:'center'
}
class Alert extends Component{
    state = {
        flag:this.props.isShow
    }
    render(){
        let {flag} = this.state;
        let {changeShow} = this.props;
        if(!flag){
            return null;
        }
        return  <div style={alertStyle}>
            <button onClick={()=>this.sure()}>确定</button>
            <button onClick={()=>changeShow(false)}>取消</button>
        </div>
    }
    componentWillReceiveProps(nextProps){
        this.setState({flag:nextProps.isShow});
    }
    sure(){
        this.props.changeShow(false);
        this.props.delList();
    }
}

class Test extends Component{
    render(){
        return <div>
            <Input {...this.props} />
            <List {...this.props} />
            <Alert {...this.props} />
        </div>
    }
}


let mapState = (state)=>{
    return {
        list:state.test.list,
        isShow:state.test.isShow
    }
}
let mapDispatch = (dispatch)=>{
    return {
        addList(msg){
            console.log(msg);
            dispatch({type:'test/addList',msg});
        },
        changeShow(show){
            dispatch({type:'test/changeShow',show});
        },
        setDelIndex(index){
            dispatch({type:'test/setDelIndex',index});
        },
        delList(){
            dispatch({type:'test/delList'});
        },
        initList(){
            dispatch({type:'test/initListAsync'});
        }

    }
}
Test = connect(mapState,mapDispatch)(Test);
export default Test;