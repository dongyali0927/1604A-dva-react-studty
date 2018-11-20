const express = require('express');
const router = express.Router();
const querystring = require('querystring');
const path = require('path');
const usermanger = require('./usermanger');

// 处理post请求
router.use((req,res,next)=>{
    let html = '';
    req.on('data',(chuck)=>{
        html += chuck;
    })
    req.on('end',()=>{
        req.body = querystring.parse(html);
        next();
    })
});

router.get('/test',(req,res,next)=>{
    
    res.send({msg:'test',request:req.query.uid});
});


router.post('/test',(req,res,next)=>{
    res.send({msg:'test post',request:req.body.uid});
    
})

// 获取所有的购物车数据
router.get('/shopcardata',(req,res,next)=>{
    res.sendFile(path.join(__dirname,'./shopcardata/shopcar.json'));
});

// 用户管理的接口
usermanger(router);



module.exports = router;