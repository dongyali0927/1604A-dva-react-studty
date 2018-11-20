import React , {Component} from 'react'
import {connect} from 'dva'
import Check from './Check'
class ShopCar extends Component{
    
    render(){
        if(!this.props.shopCar.groups){
            return null;
        }
        return <div>
                g1<Check itemKey={-1} groupKey={0} />
                i1<Check itemKey={0} groupKey={0} />
                i2<Check itemKey={1} groupKey={0} />

                g2<Check itemKey={-1} groupKey={1} />
                i1<Check itemKey={0} groupKey={1} />
                i2<Check itemKey={1} groupKey={1} />
                all<Check itemKey={-1} groupKey={-1} /> 
        </div>
    }
    componentDidMount(){
        this.props.initShopcarData();
    }
}
let mapState = (state)=>{
    return {
        shopCar:state.shopcar
    }
}
let mapDispatch = (dispatch)=>{
    return {
        initShopcarData(){
            dispatch({type:'shopcar/initShopcarDataSync'});
        }
    }
}

ShopCar = connect(mapState,mapDispatch)(ShopCar);
export default ShopCar