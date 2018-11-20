import request from '../utils/http'
export function initUserListApi(){
    return request('/initUserList');
}
export function addUserApi(userInfo){
    return request('/addUser',{
        method:'POST',
        body:userInfo
    });
}
export function editUserApi(userInfo){
    return request('/editUser',{
        method:'POST',
        body:userInfo
    });
}
export function delUserApi(userId){
    return request('/delUser',{
        method:'POST',
        body:{userId}
    });
}