import React , {Component} from 'react'
import {connect} from 'dva'
import './Check.css'
let mapState = (state,parentProps) => {
    window.store = state;
    let {itemKey,groupKey} = parentProps;
    let isCheck;
    if(itemKey === -1 && groupKey === -1){
        isCheck = state.shopcar.allCheck;
    }else if(groupKey > -1 && itemKey === -1){
        isCheck = state.shopcar.groups[groupKey].groupCheck
    }else{
        isCheck = state.shopcar.groups[groupKey].itemList[itemKey].itemCheck;
    }
    return {
        isCheck
    }
}
let mapDispatch = (dispatch)=>{
    return {
        changeCheck(action){
            dispatch({type:'shopcar/changeCheckSync',...action});
        }
    }
}

class Check extends Component{
    handleClick(){
        let {groupKey,itemKey,isCheck} = this.props;
        this.props.changeCheck({groupKey,itemKey,isCheck:!isCheck});
    }
    render(){
        let {isCheck} = this.props;
        return <div onClick={()=>this.handleClick()} className={`checkbox ${isCheck?'active':''}`}></div>
    }
}
Check = connect(mapState,mapDispatch)(Check)
export default Check;