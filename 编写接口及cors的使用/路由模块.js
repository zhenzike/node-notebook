const express=require('express');
const apiRouter=express.Router();


apiRouter.get('/get',(req,res)=>{
    // 获取客户端通过 查询字符串 发送到 服务器的数据
    const query=req.query;
    // 调用res.send(),把数据响应给客户端
    res.send({
        status:0,    // 状态,0表示成功,1表示失败
        mas:'GET请求成功',  //状态描述
        data:query   //需要响应给客户端的具体数据
    })
})

apiRouter.post('/post',(req,res)=>{
    // 获取客户端通过 请求体 发送到 服务器的URL-encoded数据
    const body=req.body;
    console.log(body);
    // 调用res.send(),把数据响应给客户端
    res.send({
        status:0,    // 状态,0表示成功,1表示失败
        mag:'POST请求成功',  //状态描述
        data:body   //需要响应给客户端的具体数据
    })
})


module.exports=apiRouter;