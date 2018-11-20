import fetch from 'dva/fetch'
import qs from 'qs'
import globalData from './globalData'
let timer = null;
const request = (url,option = {method:'GET'})=>{
    if(option.method === 'GET'){
        let bodyStr = qs.stringify(option.params);
        if(bodyStr){
            url = url + '?' + bodyStr;
        }
    }
    if(option.method === 'POST'){
        let bodyStr = qs.stringify(option.body)
        option.body = bodyStr;
    }
    timer = setTimeout(()=>{
        // 显示loading动画
        globalData.changeLoading(true);
    },500);
    
    return fetch(url,option).then(res=>{
        clearTimeout(timer);
        // 关闭loading动画
        globalData.changeLoading(false);
        return res.json();
    }).catch(err=>{
        if(err){
            // 给个统一提示
            alert('err');
        }
    })

}


export default request;