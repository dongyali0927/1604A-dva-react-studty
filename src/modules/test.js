
let initList = [
    {msg:'今天要学习'},
    {msg:'明天要更好的学习'}
]
export default {
    namespace:'test',
    state:{
        list:[],
        isShow:false,
        delIndex:-1
    },
    reducers:{
        addList(state,{msg}){
            state.list.push({msg});
            return {
                ...state,
                list:[...state.list]
            }
        },
        changeShow(state,{show}){
            return {
                ...state,
                isShow:show
            }
        },
        delList(state){
            state.list.splice(state.delIndex,1);
            return {
                ...state,
                list:[...state.list]
            }
        },
        setDelIndex(state,{index}){
            return {
                ...state,
                delIndex:index
            }
        },
        initList(state,{initList}){
            state.list = initList;
            return {...state}
        }
    },
    effects:{
        *initListAsync(action,{put}){
            yield put({type:'initList',initList});
        }
    }
}