import request from './http'

request('/test',{
    method:'GET',
    params:{uid:345}
}).then((data)=>{
    // console.log(data);
})


request('/test',{
    method:'POST',
    body:{uid:789}
}).then(data=>{
    // console.log(data);
})