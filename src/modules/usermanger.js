import {initUserListApi,addUserApi,delUserApi,editUserApi} from '../serviecs/usermanger'

export default {
    namespace:'usermanger',
    state:{
        userList:[],
        isInitLoad:false // 是否请求过数据
    },
    effects:{
        *initUserListAsync(action,{call,put}){
            let userList = yield call(initUserListApi);
            userList = userList.userList;
            yield put({type:'initUserList',userList});
        },
        *addUserAsync({userid,username,moneybase},{call,put}){
            let info = yield call(addUserApi,{userid,username,moneybase});
            
            yield put({type:'addUser',userid,username,moneybase});
        }
    },
    reducers:{
        initUserList(state,action){
            return {
                ...state,
                userList:action.userList
            }
        },
        addUser(state,action){
            state.userList.push(action);
            return {
                ...state,
                userList:[...state.userList]
            }
        },
        changeInitLoad(state,action){
            return {
                ...state,
                isInitLoad:action.isInitLoad
            }
        }
    }
}