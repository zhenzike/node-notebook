const express = require('express');
const app = express();
const apiRouter=require('./路由模块');



//一定要在路由之前，配置 cors 这个中问件，从而解决接口跨域的问题
const cors=require('cors')
app.use(cors());

//配置解析表单数据的中间件
//这里必须在写在路由模块注册在app之前，因为
//除了错误级别的中间件，其他的中间件，必须在路由之前进行配置,不然无法解析数据
app.use(express.urlencoded({extended:false}))

app.use('/api',apiRouter)
app.listen(80, () => {
    console.log('http://127.0.0.1');
})