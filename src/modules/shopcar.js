import {initShopcarData} from '../serviecs/shopcar'

function computedTotal(state){
    return state.groups.reduce((pre,next)=>{
        let nextNum = next.itemList.reduce((pre,next)=>{
            return pre + (next.itemCheck ? next.price * next.num : 0);
        },0) 
        return pre + nextNum
    },0);
}
export default {
    namespace:'shopcar',
    state:{},
    reducers:{
        initShopcarData(state,action){
            state = action.shopData;
            return state;
        },
        changeCheck(state,{groupKey,itemKey,isCheck}){
            // 全选
            if(groupKey === -1 && itemKey === -1){
                state.allCheck = isCheck;
                state.groups.forEach(item=>{
                    item.groupCheck=isCheck
                    item.itemList.forEach(value=>value.itemCheck=isCheck);
                });
            }else if(groupKey > -1 && itemKey === -1){
                state.groups[groupKey].groupCheck = isCheck;
                state.groups[groupKey].itemList.forEach(item=>item.itemCheck=isCheck);
                state.allCheck = state.groups.every(item=>item.groupCheck);
            }else{
                state.groups[groupKey].itemList[itemKey].itemCheck = isCheck;
                state.groups[groupKey].groupCheck = state.groups[groupKey].itemList.every(item=>item.itemCheck);
                state.allCheck = state.groups.every(item=>item.groupCheck);
            }
            state.totalPrice = computedTotal(state);
            return JSON.parse(JSON.stringify(state));
        }

    },
    effects:{
        *initShopcarDataSync(action,{put,call}){
            let shopData = yield call(initShopcarData);
            yield put({type:'initShopcarData',shopData});
        },
        *changeCheckSync({groupKey,itemKey,isCheck},{put,call}){
            // 发请求

            yield put({type:'changeCheck',groupKey,itemKey,isCheck});
        }
    }
}