import React , {Component} from 'react'
import {connect} from 'dva'
import globalData from '../utils/globalData'
const coverStyle = {
    position:'absolute',left:0,top:0,right:0,bottom:0
}
class Loading extends Component{
    constructor(props){
        super(props);
        globalData.changeLoading = this.props.changeLoading;
    }
    state = {
        isLoading:this.props.isLoading,
        isInitLoad:false
    }
    render(){
        let {isLoading,isInitLoad} = this.state;
        if(!isInitLoad){
            return null;
        }
        return <div style={{display:isLoading ? 'block' : 'none',...coverStyle}}>
           loading
        </div>
    }
    componentWillReceiveProps(nextProps){
        if(!nextProps.isInitLoad && nextProps.isLoading){
            this.setState({isInitLoad:true,isLoading:true});
        }else{
            this.setState({isLoading:nextProps.isLoading});
        }
    }
}
let mapState = (state,parentProps)=>{
    let {isLoading} = state.global;
    return {
        isLoading : parentProps.isLoading !== undefined ? parentProps.isLoading : isLoading
    }
}
let mapDispatch = (dispatch)=>{
    return {
        changeLoading(isLoading){
            dispatch({type:'global/changeLoading',isLoading});
        }
    }
}
Loading = connect(mapState,mapDispatch)(Loading);
export default Loading;