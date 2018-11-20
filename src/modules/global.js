export default {
    namespace:'global',
    state:{
        isLoading:false,
        isInitLoad:false
    },
    reducers:{
        changeLoading(state,action){
            return {
                ...state,
                isLoading:action.isLoading
            }
        }
    }
}