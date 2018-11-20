import React from 'react'
import globalData from '../../../utils/globalData'


function LoadSync(loadComponent){
    return class extends React.Component{
        timer = null
        state = {
            isSuccess:false,
            LoadComponent:null
        }
        render(){
            let {isSuccess , LoadComponent} = this.state;
            if(!isSuccess){
                return null;
            }
            return <LoadComponent />
        }
        componentDidMount(){
            this.timer = setTimeout(()=> globalData.changeLoading(true),500);
            loadComponent().then(c=>{
                this.setState({
                    isSuccess:true,
                    LoadComponent:c.default
                },()=>{
                    clearTimeout(this.timer);
                    globalData.changeLoading(false);
                });
            })
        }
    }
}
let arr = [LoadSync(()=>import('./Home')),LoadSync(()=>import('./List')),LoadSync(()=>import('./Detail'))];

function Content(props){
    let {iNow} = props;
    let Trans = arr[iNow];
    return <Trans {...props} />
}
class Tab extends React.Component{
    state = {
        tabs:[
            {text:'首页'},
            {text:'列表'},
            {text:'详情'}
        ],
        iNow:0
    }
    render(){
        let {tabs , iNow} = this.state;
        return <div>
            <ul>
                {
                    tabs.map((item,key)=>{
                        return <li onClick={()=>this.setState({iNow:key})} style={{color:iNow===key?'red':'#333'}} key={key}>{item.text}</li>
                    })
                }
            </ul>
            <Content iNow={iNow} />
        </div>
    }
}
export default Tab;