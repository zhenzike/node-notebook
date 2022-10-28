// 入口文件
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
//配置解析表单数据的中间件,这个中间件只能解析application/x-www-form-urlencoded格式的表单数据
app.use(express.urlencoded({ extended: false }))

 // 在路由之前封装res.cc函数
app.use(function (req, res, next) {
    res.cc = function (err, status = 1) {
        // status默认值设置为1，表示失败的情况
        // err的值可能是一个错误对象，也可能是一个错误的描述字符串
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next();
})



const userRouter = require('./router/user')
app.use('/api', userRouter)

app.listen(3007, function () {
    console.log('api server running at http://127.0.0.1:3007');
})


