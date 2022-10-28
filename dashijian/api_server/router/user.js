const express=require('express');
const router=express.Router();


// 注册新用户，导入用户路由处理函数对应的模块
const user_handler=require('../router_handler/user')
router.post('/reguser',user_handler.regUser)
router.post('/login',user_handler.login)


// 登录
router.post('/login',(req,res)=>{
    res.send('login ok')
})

module.exports=router;