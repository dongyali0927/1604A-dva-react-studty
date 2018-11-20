import dva from 'dva'
import RootRouter from './router'
import models from './modules'
import Loading from './components/Loading'
import React from 'react'

const app = dva(); // 初始化一个dva实例
// 挂载module
models.forEach(item=>app.model(item));
// 挂载路由
app.router(()=>{
    return <div id="box">
        <RootRouter />
        <Loading />
    </div>
});

// 启动应用
app.start('#root');
if(process.env.NODE_ENV === 'development'){
    let serviceWorker = require('./serviceWorker')
    serviceWorker.unregister();
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

