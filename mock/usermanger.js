let userList = [
    {userid:'zhangsan',username:'张三',moneybase:0}
]
module.exports = (router)=>{
    // 获取所有用户
    router.get('/initUserList',(req,res,next)=>{
        setTimeout(()=>{
            res.send({msg:'获取数据成功',code:1,userList});
        },1000);
        
    })
    // 添加用户
    router.post('/addUser',(req,res,next)=>{
        userList.push(req.body);
        res.send({msg:'存储成功',code:1});
    })
    // 编辑用户
    router.post('/editUser',(req,res,next)=>{
        let {userid,username,moneybase} = req.body;
        let findItem = userList.find(item=>item.userid === userid);
        findItem.username = username;
        findItem.moneybase = moneybase;
        res.send({msg:'修改成功',code:1});
    })
    // 删除用户
    router.post('/delUser',(req,res,next)=>{
        let {userid} = req.body;
        let index = userList.findIndex(item=>item.userid === userid);
        userList.splice(index,1);
        res.send({msg:'删除成功',code:1});

    })
}